import fs from 'fs'
import { Client } from 'whatsapp-web.js'

export default () => {
  const SESSION_FILE_PATH = './session.json'

  let sessionCfg
  if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH)
  }

  const client = new Client({ puppeteer: { headless: false }, session: sessionCfg })

  client.initialize()

  // Esse evento não será disparado se uma sessão for especificada
  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr)
  })

  client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session)
    sessionCfg = session

    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.log(err)
      }
    })
  })

  // Dispara se a restauração da sessão não for bem sucedida
  client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg)
  })

  client.on('ready', () => {
    console.log('READY')
  })

  client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg)
  })
}

















