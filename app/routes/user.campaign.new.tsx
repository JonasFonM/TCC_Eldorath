/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { getUserIdFromSession, requireUserId } from '~/utils/auth.server'
import { submitCampaign } from "~/utils/campaign.server"
import { weekDays, translateWeekDays } from "./user.campaign"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({ userId })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get('title') as string;
  const description = form.get('description') as string;
  const era = parseInt(form.get('era') as string, 10)
  const year = parseInt(form.get('year') as string, 10)
  const month = parseInt(form.get('month') as string, 10);
  const monthDay = parseInt(form.get('monthDay') as string, 10);
  const weekDay = parseInt(form.get('weekDay') as string, 10);
  const masterId = await getUserIdFromSession(request);

  if (!masterId) {
    return json({ error: "Unauthorized" }, { status: 401 });;
  }

  if (!title || !(description) || isNaN(era) || isNaN(year) || isNaN(month) || isNaN(monthDay) || isNaN(weekDay)) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const campaign = await submitCampaign({ title, description, masterId, era, year, month, monthDay, weekDay });
    return (
      json({ campaign }, { status: 201 }),
      redirect(`/user/campaign/${campaign}`)
    );
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to create campaign" }, { status: 500 });;
  }
}

export default function NewCampaignRoute() {
  const actionData = useActionData<ActionFunction>();

  const title = useRef<number>(-1); // Avoid re-renders

  const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

  const handleTitleClick = (index: number) => {
    title.current = title.current != index
      ? index
      : title.current;
    forceUpdate(n => n + 1); // Minimal re-render
  };

  const firstLoad = useRef(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    era: 1,
    year: 1,
    month: 1,
    monthDay: 1,
    weekDay: 1,
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    era: '',
    year: '',
    month: '',
    monthDay: '',
    weekDay: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!firstLoad.current && actionData) {
      setErrors(actionData.errors || {
        title: '',
        description: '',
        era: '',
        year: '',
        month: '',
        monthDay: '',
        weekDay: '',
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

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMonthDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = parseInt(e.target.value, 10);
    const calculatedWeekDay = ((selectedDay - 1) % 6) + 1;
    setFormData({
      ...formData,
      monthDay: selectedDay,
      weekDay: calculatedWeekDay,
    });
  };

  const adjustEra = (adjustment: number) => {
    setFormData((prev) => {
      const newValue = Number(prev['era']) + adjustment;
      if (newValue >= 0 && newValue <= 50) {
        return { ...prev, ['era']: newValue };
      }
      return newValue > 50 ? { ...prev, ['era']: 50 } : { ...prev, ['era']: 0 };
    });

  };

  const adjustYear = (adjustment: number) => {
    setFormData((prev) => {
      const newValue = Number(prev['year']) + adjustment;
      if (newValue >= 0 && newValue <= 3000) {
        return { ...prev, ['year']: newValue };
      }
      return newValue > 3000 ? { ...prev, ['year']: 3000 } : { ...prev, ['year']: 0 };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (!formData.title || !(formData.description) || isNaN(formData.era) || isNaN(formData.year) || isNaN(formData.month) || isNaN(formData.monthDay) || isNaN(formData.weekDay)) {
      event.preventDefault();
      setErrors({
        title: !formData.title ? 'É necessário informar um Título' : '',
        description: !formData.description ? 'É necessário informar uma Descrição' : '',
        era: !formData.era ? 'É necessário informar uma Era' : '',
        year: !formData.era ? 'É necessário informar um Ano' : '',
        month: !formData.month ? 'É necessário informar um Mês' : '',
        monthDay: !formData.monthDay ? 'É necessário informar um Dia do Mês' : '',
        weekDay: !formData.weekDay ? 'É necessário informar um Dia da Semana' : '',
      });
      setFormError('Please fill in all required fields.');
      return;
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input
        className="title-input"
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <label>
        <h1>
          <button
            onClick={() => title.current !== 1 ? handleTitleClick(1) : handleTitleClick(0)}
            className="lineBtn"
            type="button">{title.current < 1 ? 'Descrição' : 'Calendário'}</button>
        </h1>
      </label>

      <div style={title.current < 1 ? { display: 'inherit' } : { display: 'none' }} className="container">
        <textarea
          style={{ minHeight: '50vh' }}
          className="calendar-box"
          name="description"
          placeholder="Descreva os pontos básicos da sua Campanha. Você pode alterar essa descrição mais tarde!"
          value={formData.description}
          onChange={handleTextArea}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div style={title.current < 1 ? { display: 'none' } : { display: 'inherit' }} className="container">
        <div className="calendar-box">
          <div className="calendar-field">

            <label>Era: {formData.era}</label>
            <input style={{ accentColor: "gold" }} type="range" name="era" value={formData.era} min="0" max="50" onChange={handleChange}></input>
            <div className="calendar-buttons">
              <button type="button" onClick={() => adjustEra(-10)}>-10</button>
              <button type="button" onClick={() => adjustEra(-5)}>-5</button>
              <button type="button" onClick={() => adjustEra(-1)}>-</button>
              <button type="button" onClick={() => adjustEra(1)}>+</button>
              <button type="button" onClick={() => adjustEra(5)}>+5</button>
              <button type="button" onClick={() => adjustEra(10)}>+10</button>
            </div>
          </div>

          <div className="calendar-field">

            <label>Ano: {formData.year}</label>
            <input style={{ accentColor: "gold" }} type="range" name="year" value={formData.year} min="0" max="3000" onChange={handleChange}></input>
            <div className="calendar-buttons">
              <button type="button" onClick={() => adjustYear(-250)}>-250</button>
              <button type="button" onClick={() => adjustYear(-50)}>-50</button>
              <button type="button" onClick={() => adjustYear(-1)}>-</button>
              <button type="button" onClick={() => adjustYear(1)}>+</button>
              <button type="button" onClick={() => adjustYear(50)}>+50</button>
              <button type="button" onClick={() => adjustYear(250)}>+250</button>
            </div>
          </div>

          <div className="calendar-field">

            <label>Dia</label>
            <select name="monthDay" value={formData.monthDay} onChange={handleMonthDayChange}>
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}  -  {translateWeekDays(i + 1)}
                </option>
              ))}
            </select>
            <select hidden name="weekDay" value={formData.weekDay} onChange={() => null}>
              {weekDays.map((name, index) => (
                <option key={index + 1} value={index + 1}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="calendar-field">

            <label>Mês</label>
            <select title="month" name="month" value={formData.month} onChange={handleSelect}>
              <optgroup label="Verão">
                <option value="1">Solmáris</option>
                <option value="2">Dracorius</option>
                <option value="3">Aethis</option>
              </optgroup>
              <optgroup label="Outono">
                <option value="4">Sombríel</option>
                <option value="5">Véltar</option>
                <option value="6">Nocturnis</option>
              </optgroup>
              <optgroup label="Inverno">
                <option value="7">Glacirion</option>
                <option value="8">Umbraeth</option>
                <option value="9">Renováris</option>
              </optgroup>
              <optgroup label="Primavera">
                <option value="10">Luzális</option>
                <option value="11">Verthar</option>
                <option value="12">Floravélis</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <button className="button" type="submit">Confirmar</button>

    </form>
  );
}
