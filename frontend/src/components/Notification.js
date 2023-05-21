
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const { notfiy, type } = message

  return (
    <div className={type}>
      <p>{notfiy}</p>
    </div>
  )
}

export default Notification
