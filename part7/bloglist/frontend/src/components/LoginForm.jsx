import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login({ username, password }))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" name="Username" />
        </div>
        <div>
          password
          <input id="password" type="password" name="Password" />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
