import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { Box, Button, TextField } from '@mui/material'

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
    <Box>
      <form onSubmit={handleLogin}>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="username"
            type="text"
            name="Username"
            label="Username"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="password"
            type="password"
            name="Password"
            label="Password"
          />
        </Box>
        <Button variant="contained" id="login-button" type="submit">
          login
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
