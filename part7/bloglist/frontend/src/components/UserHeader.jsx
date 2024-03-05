import { logout } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const UserHeader = ({ username }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate('/')
  }

  const navStyle = {
    backgroundColor: 'lightgrey',
    display: 'flex',
    padding: 5,
  }

  return (
    <div style={navStyle}>
      <NavBar /> {username} logged in
      <button style={{ marginLeft: 5 }} onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default UserHeader
