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
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { _setStep } from '../reducers/step'
import { faker } from '@faker-js/faker'
import { Service } from '../types'

const ServiceSelectionPage = () => {
  const dispatch = useDispatch()
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState('')
  const navigate = useNavigate()

  const serviceGroups = [
    'chiropractic',
    'physiotherapy',
    'massage',
    'osteopathy',
  ]

  const createRandomService = () => {
    return {
      id: faker.string.uuid(),
      group: serviceGroups[Math.floor(Math.random() * serviceGroups.length)],
      name: faker.lorem.words(3),
      price: faker.commerce.price({ dec: 0 }),
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedService(event.target.value)
  }

  const handleClick = () => {
    if (selectedService) {
      navigate(`/${selectedService}`)
    }
  }

  useEffect(() => {
    dispatch(_setStep(0))
    setServices(faker.helpers.multiple(createRandomService, { count: 10 }))
  }, [])

  return (
    <Box sx={{ my: 4 }}>
      {serviceGroups.map((group) => {
        const servicesInGroup = services.filter(
          (service) => service.group === group
        )
        return servicesInGroup.length > 0 ? (
          <Accordion key={group}>
            <AccordionSummary expandIcon={<ArrowDropDown />}>
              <Typography variant="h6" component="h3">
                {group}
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
