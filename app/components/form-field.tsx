/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"

interface FormFieldProps {
  htmlFor: string
  label: string
  type?: string
  value: any
  onChange?: (...args: any) => any
  error?: string
}

export function FormField({ htmlFor, label, type = 'text', value, onChange = () => { }, error = ""
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error)
  useEffect(() => {
    setErrorText(error)
  }, [error])

  return (
    <React.Fragment>
      <input autoComplete="new-password"
        className="block"
        onChange={e => {
          onChange(e)
          setErrorText('')
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        placeholder={label}
        style={{ fontFamily: 'serif', fontSize: '2rem', color: "gold", textAlign: 'center' }}
        value={value} />
      <div className="container">
        <p className="error">{errorText || ''}</p>
      </div>
    </React.Fragment>
  )
}