/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { NavLink, useActionData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { getUserIdFromSession, requireUserId } from '~/utils/auth.server'
import { submitCampaign } from "~/utils/campaign.server"
import { weekDays, translateWeekDays } from "./user.campaign"
import { NoSideBarFooter } from "~/components/no-sidebar-footer"

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
    if (name === 'year' && Number(value) > 3000) {
      return setFormData((prev) => ({ ...prev, [name]: 3000 }));
    }

    if (name === 'era' && Number(value) > 50) {
      return setFormData((prev) => ({ ...prev, [name]: 50 }));
    }

    if (Number(value) < 1 && name !== 'title') {
      return setFormData((prev) => ({ ...prev, [name]: 1 }));
    }
    return setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (newValue >= 1 && newValue <= 50) {
        return { ...prev, ['era']: newValue };
      }
      return newValue > 50 ? { ...prev, ['era']: 50 } : { ...prev, ['era']: 1 };
    });

  };

  const adjustYear = (adjustment: number) => {
    setFormData((prev) => {
      const newValue = Number(prev['year']) + adjustment;
      if (newValue >= 1 && newValue <= 3000) {
        return { ...prev, ['year']: newValue };
      }
      return newValue > 3000 ? { ...prev, ['year']: 3000 } : { ...prev, ['year']: 1 };
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
        style={{ position: "sticky", top: '64px', zIndex: '1' }}
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
      />

      <div className="container" style={{ position: 'sticky', top: '125px', zIndex: '2', backgroundColor: 'black', borderBottom: '1px solid gold' }}>
        <label className="col-12">
          {errors.title && <p className="error" style={{ textAlign: 'center', textIndent: '0' }}>{errors.title}</p>}

          <h1 style={{ color: 'white', textAlign: 'center' }}>{title.current < 1 ? 'Descrição' : 'Calendário'}</h1>
        </label>
      </div>

      <label>
        <h2>
          <button
            onClick={() => title.current !== 1 ? handleTitleClick(1) : handleTitleClick(0)}
            className="lineBtn"
            type="button">{title.current < 1 ? 'Editar Calendário' : 'Editar Descrição'}</button>
        </h2>
      </label>

      <div style={title.current < 1 ? { display: 'inherit' } : { display: 'none' }} className="container">
        <textarea
          style={{ minHeight: '38vh', fontFamily: 'serif', fontSize: '1.15rem', marginLeft: '10%', marginRight: '10%', width: '80%', marginBottom: '5%' }}
          className="calendar-box"
          name="description"
          placeholder="Descreva a introdução da história para sua Campanha. Você pode alterar e expandir essa descrição mais tarde!"
          value={formData.description}
          onChange={handleTextArea}
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      <div style={title.current < 1 ? { display: 'none' } : { display: 'inherit' }}>
        <div className="calendar-box" style={{ marginLeft: '10%', marginRight: '10%', width: '80%', marginBottom: '5%' }}>

          <div className="calendar-field" style={{ marginBottom: '1%' }}>
            <label><h1>Dia</h1></label>
            <select name="monthDay" value={formData.monthDay} onChange={handleMonthDayChange}>
              {[...Array(30)].map((_, i) => (
                <option style={{ fontFamily: 'serif' }} key={i + 1} value={i + 1}>
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

          <div className="calendar-field" style={{ marginBottom: '1%' }}>

            <label><h1>Mês</h1></label>
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

          <div className="calendar-field" >
            <label style={{ width: '100%' }}>
              <h1>Ano</h1>
              <h1><input
                type='number'
                name="year"
                className="title-input"
                onChange={handleChange}
                value={formData.year}
                style={{ border: '0', boxShadow: '0 0 4px 4px gold' }}
              ></input></h1>
            </label>
            <input style={{ accentColor: "gold", width: '90%' }} type="range" name="year" value={formData.year} min="1" max="3000" onChange={handleChange}></input>
            <div className="container" style={{ width: '100%' }}>
              <button type="button" className="button col-6 calendar-button" onClick={() => adjustYear(-1)}>-</button>
              <button type="button" className="button col-6 calendar-button" onClick={() => adjustYear(1)}>+</button>
            </div>
          </div>

          <div className="calendar-field" >
            <label style={{ width: '100%' }}>
              <h1>Era</h1>
              <h1><input type='number'
                name="era"
                className="title-input"
                onChange={handleChange}
                value={formData.era}
                style={{ border: '0', boxShadow: '0 0 4px 4px gold', width: '100%' }}
              ></input></h1>
            </label>
            <input style={{ accentColor: "gold", width: '90%' }} type="range" name="era" value={formData.era} min="1" max="50" onChange={handleChange}></input>
            <div className="container" style={{ width: '100%' }}>
              <button type="button" className="button col-6 calendar-button" onClick={() => adjustEra(-1)}>-</button>
              <button type="button" className="button col-6 calendar-button" onClick={() => adjustEra(1)}>+</button>
            </div>
          </div>


        </div>
      </div>
      <div className="container" style={{ marginLeft: '10%', marginRight: '10%' }}>
        <NavLink className={'button col-4 logout'} style={{ height: '15vh' }} to={`/user/home/profile/`}>Cancelar</NavLink>
        <button type="submit" className="col-4 button" style={{ height: '15vh' }}>Confirmar</button>
      </div>
    </form >

  );
}
