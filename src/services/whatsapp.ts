import { Inject, Service } from "typedi"
import { Logger } from "winston"

import fs from 'fs'
import { Buttons, Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

@Service()
export default class whatsappService {
  constructor(
    @Inject('logger')
    private logger: Logger
  ) { }

  public session() {
    const SESSION_FILE_PATH = '../../session.json'

    let sessionCfg
    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH)
    }

    const client = new Client({ puppeteer: { headless: false }, session: sessionCfg })

    client.initialize()

    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true })
      console.log('QR Code received')
    })

    client.on('authenticated', (session) => {
      console.log('Authenticated')
      sessionCfg = session
      fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
          console.error(err)
        }
      })
    })

    client.on('auth_failure', msg => {
      console.log('Authentication Failure')
    })

    client.on('ready', () => {
      console.log('Client Whatsapp is ready!')
    })

    client.on('message', async msg => {
      console.log('Message Received', msg)

      if (msg.body === '!ping reply') {
        msg.reply('pong')
      } else if (msg.body === 'ping') {
        msg.reply('pong')
      } else if (msg.body === 'buttons') {
        let button = new Buttons(
          'Button body',
          [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }],
          'title',
          'footer'
        )
        client.sendMessage(msg.from, button)
      }
    })

    client.on('message_create', (msg) => {
      if (msg.fromMe) {
        console.log('Nova mensagem enviada', msg.fromMe)
      }
    })

    client.on('message_revoke_everyone', async (after, before) => {
      console.log(after)
      if (before) {
        console.log(before)
      }
    })

    client.on('message_revoke_me', async (msg) => {
      console.log(msg.body)
    })

    client.on('message_ack', (msg, ack) => {
      if (ack === 3) {
        console.log('A mensagem foi lida!')
      }
    })

    client.on('change_battery', (batteryInfo) => {
      const { battery, plugged } = batteryInfo
      console.log(`Battery: ${battery}% - Charging? ${plugged}`)
    })

    client.on('change_state', state => {
      console.log('Change State', state)
    })

    client.on('disconnected', (reason) => {
      console.log('Client was logged out', reason)
    })
  }
}
