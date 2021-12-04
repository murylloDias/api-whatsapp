import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const eventFound = dotenv.config()

if (eventFound.error) {
  throw new Error('Não foi possivel encontrar o arquivo .env')
}

export default {
  port: process.env.PORT || 3001,
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  api: {
    prefix: '/api'
  }
}
