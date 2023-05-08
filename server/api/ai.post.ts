import { Configuration, OpenAIApi } from 'openai'


const { OPENAI_API_KEY } = useRuntimeConfig();
console.log(process.env.NUXT_OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.NUXT_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  const messages = body.map(({ userId, text }) => {
    return {
      role: userId,
      content: text,
    }
  });
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  })
  console.log(response)
  return response.data.choices[0].message?.content
})
