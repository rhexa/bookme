import { faker } from '@faker-js/faker'
import { Category } from '../entity/Category'
import { Service } from '../entity/Service'

/**
 * Deletes all records in the database tables.
 * Should only be used for testing purposes.
 *
 * @returns A promise that resolves when the operation is complete.
 */
export const clearDatabase = async () => {
  await Category.delete({})
  await Service.delete({})
}

/**
 * Seeds the database with some sample data.
 * Should only be used for testing purposes.
 *
 * Populates the categories table with four categories and then populates the services table with ten random services, each of which is assigned to one of the categories.
 *
 * @returns A promise that resolves when the operation is complete.
 */
export const seedDatabase = async () => {
  const newCategories = [
    { name: 'chiropractic' },
    { name: 'massage' },
    { name: 'physiotherapy' },
    { name: 'osteopathy' },
  ]

  await Category.insert(newCategories)

  const createRandomService = () => {
    return {
      name: faker.lorem.words(3),
      price: parseFloat(faker.commerce.price({ dec: 2 })),
      category: {
        name: newCategories[Math.floor(Math.random() * newCategories.length)]
          .name,
      },
    }
  }

  const services = faker.helpers.multiple(createRandomService, {
    count: 10,
  })

  for (const randomService of services) {
    const findCategory = await Category.findOne({
      relations: { services: true },
      where: { name: randomService.category.name },
    })

    if (!findCategory) {
      console.error('category not found')
      break
    }

    const newService = new Service()
    Object.assign(newService, randomService)
    newService.category = findCategory
    await newService.save()
  }
}
