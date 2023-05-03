import { Configuration, OpenAIApi } from 'openai'


// const openai
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      api: `$(event.context.params.message)`,
      body: body
    }
  })
