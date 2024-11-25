import { useParams } from 'react-router-dom'

const TimeSelectionPage = () => {
  const { serviceId } = useParams()
  return (
    <div>
      <h1>Time Selection Page</h1>
      <p>Service ID: {serviceId}</p>
    </div>
  )
}

export default TimeSelectionPage
