/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { getUserIdFromSession, requireUserId } from '~/utils/auth.server'
import { submitCampaign } from "~/utils/campaign.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({ userId })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = form.get('title') as string;
  const snippet = form.get('snippet') as string;
  const theme = form.get('theme') as string;
  const era = parseInt(form.get('era') as string, 10)
  const year = parseInt(form.get('year') as string, 10)
  const month = parseInt(form.get('month') as string, 10);
  const monthDay = parseInt(form.get('monthDay') as string, 10);
  const weekDay = parseInt(form.get('weekDay') as string, 10);
  const masterId = await getUserIdFromSession(request);

  console.log(form)
  console.log(masterId)

  if (!masterId) {
    return json({ error: "Unauthorized" }, { status: 401 });;
  }

  if (!title || !(snippet) || !(theme) || isNaN(era) || isNaN(year) || isNaN(month) || isNaN(monthDay) || isNaN(weekDay)) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const campaign = await submitCampaign({ title, snippet, theme, masterId, era, year, month, monthDay, weekDay });
    console.log(masterId)
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
  const [limit, setLimit] = useState(5000);

  const firstLoad = useRef(true);
  const [formData, setFormData] = useState({
    title: '',
    snippet: '',
    theme: '',
    era: 1,
    year: 1,
    month: 1,
    monthDay: 1,
    weekDay: 1,
  });
  const [errors, setErrors] = useState({
    title: '',
    snippet: '',
    theme: '',
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
        snippet: '',
        theme: '',
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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const weekDays = [
    "Partilha",
    "Vigília",
    "Jornada",
    "Batalha",
    "Luto",
    "Descanso",
  ];

  const handleMonthDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = parseInt(e.target.value, 10);
    const calculatedWeekDay = ((selectedDay - 1) % 6) + 1;
    setFormData({
      ...formData,
      monthDay: selectedDay,
      weekDay: calculatedWeekDay,
    });
  };

  const adjustAttribute = (attribute: 'era' | 'year', adjustment: number) => {
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
    console.log({ formData })
    if (!formData.title || !(formData.snippet) || !(formData.theme) || isNaN(formData.era) || isNaN(formData.year) || isNaN(formData.month) || isNaN(formData.monthDay) || isNaN(formData.weekDay)) {
      event.preventDefault();
      setErrors({
        title: !formData.title ? 'É necessário informar um Título' : '',
        snippet: !formData.snippet ? 'É necessário informar uma Descrição' : '',
        theme: !formData.theme ? 'É necessário informar um Tema' : '',
        era: !formData.era ? 'É necessário informar uma Æra' : '',
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

      <input
        type="text"
        name="theme"
        placeholder="Tema"
        value={formData.theme}
        onChange={handleChange}
      />
      {errors.theme && <p className="error">{errors.theme}</p>}

      <div className="calendar-container">

        {/* Left Side - Description */}
        <div className="calendar-description">
          <label><h2>Descrição</h2></label>
          <input
            className="text-area"
            type="text"
            name="snippet"
            placeholder="Descrição Curta"
            value={formData.snippet}
            onChange={handleChange}
          />
          {errors.snippet && <p className="error">{errors.snippet}</p>}
        </div>

        {/* Right Side - Date Selection */}
        <div className="calendar-section">

          {/* Era Selection */}
          <div className="calendar-field">
            <label>Æra: {formData.era}</label>
            <input hidden type="number" name="era" value={formData.era} onChange={handleChange} />
            <div className="calendar-buttons">
              <button type="button" onClick={() => adjustAttribute('era', 1)}>+</button>
              <button type="button" onClick={() => adjustAttribute('era', -1)}>-</button>
            </div>
          </div>
          {errors.era && <p className="error">{errors.era}</p>}

          {/* Calendar Box */}
          <div className="calendar-box">

            {/* Year Selection */}
            <div className="calendar-field">
              <label>Ano: {formData.year}</label>
              <input hidden type="number" name="year" value={formData.year} onChange={handleChange} />
              <div className="calendar-buttons">
                <button type="button" onClick={() => adjustAttribute('year', 1)}>+</button>
                <button type="button" onClick={() => adjustAttribute('year', -1)}>-</button>
              </div>
            </div>
            {errors.era && <p className="error">{errors.year}</p>}

            {/* Month Selection */}
            <div className="calendar-field">
              <label>Mês</label>
              <select title="month" name="month" value={formData.month} onChange={handleSelect}>
                <optgroup label="Verão">
                  <option value="1">Æterna</option>
                  <option value="2">Luxar</option>
                  <option value="3">Vita</option>
                </optgroup>
                <optgroup label="Outono">
                  <option value="4">Lual</option>
                  <option value="5">Agnus</option>
                  <option value="6">Malkar</option>
                </optgroup>
                <optgroup label="Inverno">
                  <option value="7">Magika</option>
                  <option value="8">Kronica</option>
                  <option value="9">Exora</option>
                </optgroup>
                <optgroup label="Primavera">
                  <option value="10">Natura</option>
                  <option value="11">Fortuna</option>
                  <option value="12">Harmonia</option>
                </optgroup>
              </select>
            </div>
            {errors.month && <p className="error">{errors.month}</p>}

            <label>
              Dia do Mês: {formData.monthDay}
              <br />
              <select name="monthDay" value={formData.monthDay} onChange={handleMonthDayChange}>
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Dia da Semana: {weekDays[formData.weekDay - 1]}
              <br />
              <select hidden name="weekDay" value={formData.weekDay} onChange={()=>null}>
                {weekDays.map((name, index) => (
                  <option key={index + 1} value={index + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Form Errors */}
      {formError && <p className="error form-error">{formError}</p>}

      {/* Submit Button */}
      <div className="submit-container">
        <button type="submit" className="submit-button">Confirmar</button>
      </div>
    </form>
  );
}
