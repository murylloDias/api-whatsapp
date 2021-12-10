import { Service, Inject } from 'typedi'
import { Logger } from 'winston'

import { Buttons, Client, MessageMedia } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import fs from 'fs'

@Service()
export default class WebAppService {
  constructor(
    @Inject('logger')
    private logger: Logger,
    @Inject('sessionModel')
    private sessionModel: Models.SessionModel
  ) {}

  public account(phone: string) {
    const SESSION_FILE_PATH = '../../session.json'
    let sessionCfg

    if(fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH)
    }

    const client = new Client({puppeteer: { headless: false }, session: sessionCfg })

    client.initialize()

    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true })
      console.log('QR CODE RECEIVED ', qr)
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

    client.on('auth_failure', msg => {
      console.error('AUTHENTICATION FAILURE ', msg)
    })

    client.on('ready', () => {
      console.log('CLIENT IS READY')
    })

    client.on('message', async msg => {
      console.log('MESSAGE RECEIVED ', msg)

      switch (msg.body) {
        case 'Ping':
          msg.reply('Pong')
          break
        case 'Menu':
          let button = new Buttons(
            'Button body', [
              { body: 'Acesse o nosso menu' }
            ],
            'Accon Demonstração',
            'delivery.accon.app'
          )
          client.sendMessage(msg.from, button)
          break
        case 'Image':
            const media = MessageMedia.fromUrl('https://cdn.accon.app/1615893371593724420757259278-1080p.jpg')
            client.sendMessage()
            break
        default:
          msg.reply('Poderia ser mais especifico?')
      }
    })
  }
}