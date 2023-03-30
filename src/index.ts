import { create, type Whatsapp } from '@wppconnect-team/wppconnect'
import { ChatGPTAPI } from 'chatgpt'
import 'dotenv/config'

create({
  session: 'session-name'
}).then(async (client: Whatsapp) => { await start(client) }).catch((err) => { console.log(err) })

const chatgpt = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY as string,
  debug: true
})

let context = 'You are in a WhatsApp group and you will be the advisor that will help everyone with the development of Project X, the theme must be one of the 17 UN goals.\n'

context += 'We are codeBuddy, a Brazilian technology, programming and robotics school. Students use tools: Construct 3, Scratch, App Inventor, thunkable, tinkercad, python and web languages\n'

context += 'Give preference to solutions linked to the company "Baterias Moura"\n'

context += 'There are 2 groups and the project must be produced by the end of April using tools such as Design thinking and Trello.\nBudcoins is a currency used on the platform that can be exchanged for real prizes and will be used in the award'

context += 'Use emojis whenever possible, and this markdown format: *bold* , _italic_ , ~strikethrough~ , ```code```\n'

context += `Current date in Brazil: ${new Date().toLocaleDateString('pt-BR')} and time: ${new Date().toLocaleTimeString('pt-BR')}`

async function start (client: Whatsapp): Promise<void> {
  client.onMessage(async (message) => {
    if (message.isGroupMsg && (message.body.toLowerCase().startsWith('!orientador') || message.body.toLowerCase().startsWith('!advisor'))) {
      const chat = await client.getChatById(message.from)
      const lastMessages = await client.getMessages(message.from, {
        count: 3,
        id: message.id,
        fromMe: false,
        direction: 'before'
      })

      let messages = `Last messages for group ${chat.name}:\n`
      lastMessages.forEach((msg) => {
        messages += `Message from ${msg.sender.pushname}: ${msg.body}\n`
      })

      messages += `Message from ${message.sender.pushname ?? ''}: ${message.body.replace('!advisor', '').replace('!orientador', '')}\nYou:`
      client.startTyping(message.from)
      let response = ''
      chatgpt.sendMessage(
        messages,
        {
          systemMessage: context
        }
      ).then((res) => {
        response = res.text
      }).catch((err) => {
        response = 'Desculpe, meu servidor está passando por problemas técnicos no momento. Tente novamente mais tarde.'
        console.log(err)
      }).finally(async () => {
        await client.stopTyping(message.from)
        await client.sendText(message.from, response, {
          quotedMsg: message.id
        })
      })
    }
  })
}
