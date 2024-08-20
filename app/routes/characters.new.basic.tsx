/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { getUserIdFromSession, requireUserId } from '~/utils/auth.server'
import { submitCharacter, tierByLevel } from "~/utils/character.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({userId})
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
      redirect(`/characters/new/${character}/skills`)
    );
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to create character" }, { status: 500 });
  }

}

export default function NewCharacterRoute() {
  const actionData = useActionData<ActionFunction>();
  
  const firstLoad = useRef(true);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    agility: '',
    body: '',
    mind: ''
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

  

  const handleSubmit = async (event: React.FormEvent) => {
    if (!formData.name || !formData.level  || !formData.agility || !formData.body || !formData.mind) {
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

  return (<>
    <form method="post" onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>
          Level:
          <input type="number" name="level" value={formData.level} onChange={handleChange} />
        </label>
        {errors.level && <p>{errors.level}</p>}
      </div>
      
      <div>
        <label>
          Agility:
          <input type="number" name="agility" value={formData.agility} onChange={handleChange} />
        </label>
        {errors.agility && <p>{errors.agility}</p>}
      </div>
      <div>
        <label>
          Body:
          <input type="number" name="body" value={formData.body} onChange={handleChange} />
        </label>
        {errors.body && <p>{errors.body}</p>}
      </div>
      <div>
        <label>
          Mind:
          <input type="number" name="mind" value={formData.mind} onChange={handleChange} />
        </label>
        {errors.mind && <p>{errors.mind}</p>}
      </div>
         
      {formError && <p>{formError}</p>}
      <button type="submit">Submit</button>
    </form>
    </>
  );
}