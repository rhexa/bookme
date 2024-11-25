import { Step, StepLabel, Stepper as MUIStepper } from '@mui/material'
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
    <MUIStepper activeStep={step}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </MUIStepper>
  )
}

export default Stepper
