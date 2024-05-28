import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const variant = notification.type === 'success' ? 'success' : 'danger'

  if (!notification.message) {
    return null
  }

  return (
    <Alert variant={variant}>
      {notification.message}
    </Alert>
  )
}

export default Notification
