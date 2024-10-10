/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react'
import { useActionData } from '@remix-run/react'
import { FormField } from '~/components/form-field'
import { ActionFunction, json } from '@remix-run/node'
import { validateEmail, validateName, validatePassword } from '~/utils/validators.server'
import { login, register } from '~/utils/auth.server'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const action = form.get('_action')
  const email = form.get('email')
  let username = form.get('username')
  const password = form.get('password')

  if (typeof action !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }

  if (action === 'register' && (typeof username !== 'string')) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === 'register'
      ? {
        username: validateName((username as string) || ''),
      }
      : {}),
  }

  if (Object.values(errors).some(Boolean))
    return json({ errors, fields: { email, password, username }, form: action }, { status: 400 })

  switch (action) {
    case 'login': {
      return await login({ email, password })
    }
    case 'register': {
      username = username as string
      return await register({ email, password, username })
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
}



export default function Login() {
  const [action, setAction] = useState('login')

  const actionData = useActionData<ActionFunction>()

  const firstLoad = useRef(true)

  const [errors, setErrors] = useState(actionData?.errors || {})

  const [formError, setFormError] = useState(actionData?.error || '')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }


  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    username: actionData?.fields?.username || '',
  })

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: '',
        password: '',
        username: '',
      }
      setErrors(newState)
      setFormError('')
      setFormData(newState)
    }
  }, [action])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError('')
    }
  }, [formData])

  useEffect(() => { firstLoad.current = false }, [])

  const handleSubmit = async (event: React.FormEvent) => {

    if (!formData.email || !formData.password || (action === 'register' && !formData.username)) {
      event.preventDefault();
      setErrors({
        email: !formData.email ? 'Email is required' : undefined,
        password: !formData.password ? 'Password is required' : undefined,
        username: action === 'register' && !formData.username ? 'Username is required' : undefined,
      });
      setFormError('Please fill in all required fields.');
      return;
    }
  };

  return (

    <div className='container'>
      <div>
        <button
          onClick={() => setAction(action == 'login' ? 'register' : 'login')}>
          {action === 'login' ? 'Sign Up' : 'Sign In'}
        </button>
        {/* ... */}
      </div>
      <h2 className="font-semibold text-slate-300">
        {action === 'login' ? 'Log In' : 'Sign Up'}
      </h2>
      <form method="POST" onSubmit={handleSubmit}>
        <div>{formError}</div>
        <div className='block'> <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={e => handleInputChange(e, 'email')}
          error={errors?.email}
        />
        </div>
        <div className='block'><FormField
          htmlFor="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={e => handleInputChange(e, 'password')}
          error={errors?.password}
        />
        </div>

        {action === 'register' && (
          <>
            <div className='block'>
              <FormField
                htmlFor="username"
                label="Username"
                onChange={e => handleInputChange(e, 'username')}
                value={formData.username}
                error={errors?.username}
              />
            </div>


          </>
        )}

        <div className="block">
          <button type="submit" name="_action" value={action} className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
            {
              action === 'login' ? "Sign In" : "Sign Up"
            }
          </button>
        </div>
      </form>
    </div>
  )
}