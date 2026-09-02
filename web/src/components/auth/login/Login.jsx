import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../shared/button/Button'
import { initialLoginData, initialLoginErrors } from './Login.data'
import { MIN_PASSWORD_LENGTH } from './Login.const'
import './Login.scss'


const Login = ({ onSignIn }) => {
  const [form, setForm] = useState(initialLoginData);
  const [errors, setErrors] = useState(initialLoginErrors);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleInputChange = (event, target) => {
    setForm((prevForm) => ({
      ...prevForm,
      [target]: event.target.value
    }))

    setErrors((prevErrors) => ({
      ...prevErrors,
      [target]: false
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const isPasswordInvalid = passwordRef.current.value.length < MIN_PASSWORD_LENGTH;

    if (!emailRef.current.value.length) {
      setErrors((prevErrors) => ({ ...prevErrors, email: true }))
      emailRef.current.focus();
      return;
    }

    if (isPasswordInvalid) {
      setErrors((prevErrors) => ({ ...prevErrors, password: true }))
      passwordRef.current.focus();
      return;
    }

    onSignIn()
    navigate('/library', { replace: true })
  }

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <header className="login__header">
          <p className="login__eyebrow">Tu biblioteca personal</p>
          <h1 className="login__title">Book Champions</h1>
          <p className="login__subtitle">Ingresá para continuar</p>
        </header>

        <div className="login__field">
          <label className="login__label" htmlFor="email">Correo electrónico</label>
          <input
            ref={emailRef}
            className={`login__input ${errors.email ? "login__input--error" : ""}`}
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(event) => handleInputChange(event, "email")}
            placeholder="lector@bookchampions.com"
          />
        </div>

        <div className="login__field">
          <label className="login__label" htmlFor="password">Contraseña</label>
          <input
            ref={passwordRef}
            className={`login__input ${errors.password ? "login__input--error" : ""}`}
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(event) => handleInputChange(event, "password")}
            placeholder="••••••••"
          />
        </div>

        {(errors.email || errors.password) && (
          <p className="login__hint">Debés completar los campos para iniciar sesión.</p>
        )}

        <div className="login__actions">
          <Button type="submit" variant="primary" size="md">Iniciar sesión</Button>
        </div>
      </form>
    </div>)
}

export default Login
