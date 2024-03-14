import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  if (notification.isError) {
    return (
      <Alert sx={{ marginBottom: 2 }} severity="error">
        {notification.message}
      </Alert>
    )
  }

  return (
    <Alert sx={{ marginBottom: 2 }} severity="success">
      {notification.message}
    </Alert>
  )
}

export default Notification
