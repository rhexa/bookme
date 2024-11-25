import { Route, Routes as RRDRoutes  } from 'react-router-dom'
import ServiceSelectionPage from './ServiceSelectionPage'
import TimeSelectionPage from './TimeSelectionPage'
import ClientFormPage from './ClientFormPage'

const Routes = () => {
  return (
    <RRDRoutes>
      <Route path="/" element={<ServiceSelectionPage />} />
      <Route path="/:serviceId" element={<TimeSelectionPage />} />
      <Route path="/:serviceId/book" element={<ClientFormPage />} />
    </RRDRoutes>
  )
}

export default Routes
