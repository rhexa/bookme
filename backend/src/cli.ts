import { clearDatabase, seedDatabase } from './utils/dataHelpers'
import { connectDB } from './utils/datasource'

const args = process.argv.slice(2)

switch (args[0]) {
  case 'seed':
    void (async () => {
      try {
        await connectDB()
        await clearDatabase()
        await seedDatabase()
        console.log('Database seeded successfully!')
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error seeding database:', error.message)
          process.exit(1)
        }
        console.error('Unknown error when seeding database:', error)
        process.exit(1)
      }
    })()
    break
  default:
    console.error(
      'Invalid command. Please use "node cli.js seed" to seed the database.'
    )
    process.exit(1)
}
