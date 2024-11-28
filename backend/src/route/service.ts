import express from 'express'
import { Service } from '../entity/Service'
import { QueryFailedError } from 'typeorm'
const router = express.Router()

router.get('/', async (_req, res) => {
  res.send(
    await Service.find({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
    })
  )
})

router.get('/', async (_req, res) => {
  res.send(
    await Service.find({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
    })
  )
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).send('Invalid ID')
      return
    }

    const service = await Service.findOne({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
      where: { id: id },
    })

    if (!service) {
      res.status(404).send('Service with the given id is not found')
      return
    }

    res.send(service)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const newService = new Service()
    await Object.assign(newService, req.body)

    await newService.save()
    res.send(newService)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      console.error(error)
      res
        .status(400)
        .json({ parameters: error.parameters, message: error.message })
    }
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const serviceToBeUpdated = await Service.findOne({
      where: { id: id },
      relations: {
        category: true,
      },
    })

    if (!serviceToBeUpdated) {
      res.status(404).send('Service not found')
      return
    }

    await Object.assign(serviceToBeUpdated, req.body)

    const updatedService = await serviceToBeUpdated.save()

    res.send(updatedService.toJSON())
  } catch (error) {
    if (error instanceof QueryFailedError) {
      console.error(error)
      res.status(400).send(error.message)
    }
    console.error(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await Service.delete(id)
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

export default router
