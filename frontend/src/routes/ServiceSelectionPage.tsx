import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { _setStep } from '../reducers/step'
import { useSelector } from 'react-redux'
import { RootState } from '../types/store'
import { initializeServices } from '../reducers/services'
import { initializeCategories } from '../reducers/categories'

const ServiceSelectionPage = () => {
  const [selectedService, setSelectedService] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const services = useSelector((state: RootState) => state.services)
  const categories = useSelector((state: RootState) => state.categories)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService(event.target.value)
  }

  const handleClick = () => {
    if (selectedService) {
      navigate(`/${selectedService}`)
    }
  }

  useEffect(() => {
    console.log('rendered')
    dispatch(_setStep(0))
    dispatch(initializeServices())
    dispatch(initializeCategories())
  }, [])

  return (
    <Box sx={{ my: 4 }}>
      {categories.map((category) => {
        const servicesInGroup = services.filter(
          (service) => service.category.name === category.name
        )
        return servicesInGroup.length > 0 ? (
          <Accordion key={category.id}>
            <AccordionSummary expandIcon={<ArrowDropDown />}>
              <Typography variant="h6" component="h3">
                {category.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup value={selectedService} onChange={handleChange}>
                {servicesInGroup.map((service) => (
                  <FormControlLabel
                    key={service.id}
                    value={service.id}
                    control={<Radio />}
                    label={service.name}
                  />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        ) : null
      })}

      <Box sx={{ my: 4 }}>
        {selectedService ? (
          <Button variant="contained" fullWidth onClick={handleClick}>
            Pick the time
          </Button>
        ) : (
          <Button variant="contained" fullWidth disabled={true}>
            Please select the service
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default ServiceSelectionPage
