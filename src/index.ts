import express from 'express'
import dotenv from 'dotenv'
import psychiatristRoutes from './routes/psychiatristRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Menambahkan routes
app.use('/api', psychiatristRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
