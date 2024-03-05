import { logout } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserHeader = ({ username }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <h3>{username} logged in</h3>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default UserHeader
