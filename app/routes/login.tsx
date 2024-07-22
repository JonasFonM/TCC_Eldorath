import { useState } from 'react'
import { FormField } from '~/components/form-field'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }

  return (
      <div>
        <h2>Log in</h2>

        <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
         <div className='block'> <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={e => handleInputChange(e, 'email')}
          />
          </div>
          <div className='block'><FormField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={e => handleInputChange(e, 'password')}
          />
          </div>
          
          <div className="block">
            <input
              type="submit"
              className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
              value="Sign In"
            />
          </div>
        </form>
      </div>
  )
}