/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { getUserIdFromSession, requireUserId } from '~/utils/auth.server'
import { submitCharacter, tierByLevel } from "~/utils/character.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({ userId })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name') as string;
  const level = parseInt(form.get('level') as string, 10);
  const tier = parseInt(tierByLevel(form.get('level')) as string, 10);
  const agility = parseInt(form.get('agility') as string, 10);
  const body = parseInt(form.get('body') as string, 10);
  const mind = parseInt(form.get('mind') as string, 10);
  const authorId = await getUserIdFromSession(request);


  if (!authorId) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!name || isNaN(level) || isNaN(tier) || isNaN(agility) || isNaN(body) || isNaN(mind)) {
    return json({ error: "All fields are required and must be valid numbers" }, { status: 400 });
  }

  try {
    const character = await submitCharacter({ name, level, tier, agility, body, mind, authorId });

    return (
      json({ character }, { status: 201 }),
      redirect(`/characters/new/${character}`)
    );
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to create character" }, { status: 500 });
  }

}

export default function NewCharacterRoute() {
  const actionData = useActionData<ActionFunction>();
  const [limit, setLimit] = useState(7);

  const firstLoad = useRef(true);
  const [formData, setFormData] = useState({
    name: '',
    level: 1,
    agility: 0,
    body: 0,
    mind: 0
  });
  const [errors, setErrors] = useState({
    name: '',
    level: '',
    agility: '',
    body: '',
    mind: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!firstLoad.current && actionData) {
      setErrors(actionData.errors || {
        name: '',
        level: '',
        agility: '',
        body: '',
        mind: ''
      });
      setFormError(actionData.error || '');
    }
  }, [actionData]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('');
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const adjustAttribute = (attribute: 'agility' | 'body' | 'mind', adjustment: number) => {
    setFormData((prev) => {
      const newValue = prev[attribute] + adjustment;
      if (newValue >= 0 && limit - adjustment >= 0) {
        setLimit(limit - adjustment);
        return { ...prev, [attribute]: newValue };
      }
      return prev;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (limit > 0) {
      event.preventDefault();
      setFormError(`Please allocate all available points. ${limit} points left.`);
      return;
    }

    if (!formData.name || !formData.level || !formData.agility || !formData.body || !formData.mind) {
      event.preventDefault();
      setErrors({
        name: !formData.name ? 'Name is required' : '',
        level: !formData.level ? 'Level is required' : '',
        agility: !formData.agility ? 'Agility is required' : '',
        body: !formData.body ? 'Body is required' : '',
        mind: !formData.mind ? 'Mind is required' : '',
      });
      setFormError('Please fill in all required fields.');
      return;
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>

      <div className="container">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <input hidden type="number" name="level" value={formData.level} onChange={handleChange} />
      {errors.level && <p>{errors.level}</p>}

      <h2>Attributes:</h2>
      <div className="container">
        <div className="block">
          <label>
            Agility: {formData.agility}
            <input hidden type="number" name="agility" value={formData.agility} onChange={handleChange} />
            <div className="col-12">
              <button className="col-6 button" type="button" onClick={() => adjustAttribute('agility', 1)}>+</button>
              <button className="col-6 button" type="button" onClick={() => adjustAttribute('agility', -1)}>-</button>
            </div>
          </label>
          {errors.agility && <p className="error">{errors.agility}</p>}
        </div>

        <div className="block">
          <label>
            Body: {formData.body}
            <input hidden type="number" name="body" value={formData.body} onChange={handleChange} />
            <div className="col-12">
              <button className="col-6 button" type="button" onClick={() => adjustAttribute('body', 1)}>+</button>
              <button className="col-6 button" type="button" onClick={() => adjustAttribute('body', -1)}>-</button>
            </div>
          </label>
          {errors.body && <p className="error">{errors.body}</p>}
        </div>

        <div className="block">
          <label>
            Mind: {formData.mind}
            <input hidden type="number" name="mind" value={formData.mind} onChange={handleChange} />
            <div className="col-12">
              <button className="col-6 button" type="button" onClick={() => adjustAttribute('mind', 1)}>+</button>
              <button className="col-6 button" type="button" onClick={() => adjustAttribute('mind', -1)}>-</button>
            </div>
          </label>
          {errors.mind && <p className="error">{errors.mind}</p>}
        </div>
      </div>

      <h3>Points remaining: {limit}</h3>
      {formError && <p className="error">{formError}</p>}
      <div className="container">
        <button className="button" type="submit">Submit</button>
      </div>
    </form>
  );
}
