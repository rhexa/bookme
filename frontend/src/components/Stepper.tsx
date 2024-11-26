import {
  Step,
  StepLabel,
  Stepper as MUIStepper,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../types/store'

const Stepper = () => {
  const step = useSelector((state: RootState) => state.step)
  const steps = [
    { label: 'Select the service' },
    { label: 'Pick the time' },
    { label: 'Fill in the details' },
  ]
  return (
    <MUIStepper sx={{ mt: 4 }} activeStep={step} alternativeLabel>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>
            <Typography variant="h5" component="h2">
              {step.label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
}

export default Stepper
