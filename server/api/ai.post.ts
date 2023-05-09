import { Configuration, OpenAIApi } from 'openai'


const { OPENAI_API_KEY } = useRuntimeConfig()
const configuration = new Configuration({ apiKey: OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
  console.log(body)
  const body = await readBody(event)
  const messages = body.map(({ userId, text }: { userId: string, text: string }) => {
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
