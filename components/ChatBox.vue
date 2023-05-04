<script setup lang="ts">
import type { Message, User } from '@/types'
import { nanoid } from 'nanoid'
import { nextTick } from 'vue'

const props = defineProps<{
  messages: Message[]
  users: User[]
  me: User
  usersTyping?: User[]
}>()
const emit = defineEmits<{
  (event: newMessage, text: Message): void
}>()
const isOpen = ref(true)
const inputText = ref<string>()
const getUser = (users: User[], id: string): User | undefined => {
  const user = users.find(user => user.id === id)
  return user
}
const search = async (text: string) => {
  inputText.value = ''
  await nextTick(() => {
    emit('newMessage', {
      id: nanoid(),
      userId: 'user',
      createdAt: new Date(new Date().getTime()),
      text: text,
    })

  })
}
const messageBox = ref<HTMLElement>()
watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    if (messageBox.value) {
      console.log(messageBox.value.scrollHeight)
      messageBox.value.scrollTop = messageBox.value.scrollHeight
    }
  }
)
const isScrolling = ref(false)
const handleScroll = (event: any) => {
  if (messageBox.value) {
    const scrollPosition = messageBox.value.scrollHeight - messageBox.value.clientHeight - messageBox.value.scrollTop
    console.log()
    console.log()
    if (scrollPosition > 10) {
      isScrolling.value = true
    }
    if (scrollPosition <= 10) {
      isScrolling.value = false
    }
  }
}
const scrollDown = () => {
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight
  }
}
</script>
<template>
  <div class="fixed bottom-[10px] right-[10px]">
    <button v-show="!isOpen" class="bg-blue-500 p-2 rounded-full" @click="isOpen = true">
      <svg class="h-8 w-8 text-white" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
    <div v-show="isOpen" class="w-[450px] bg-info-content rounded ">
      <header>
        <div>
          <button class="bg-white dark:bg-gray-900 py-5 px-4 rounded w-full flex justify-between items-center"
            @click="isOpen = false">
            Customer Support Chat
            <DownArrow class="h-[32px] w-[32px]"></DownArrow>
          </button>
        </div>
      </header>
      <div ref="messageBox" v-on:scroll.passive="handleScroll" class="overflow-y-auto min-h-[40vh] max-h-[80vh]">
        <div v-for=" message  in  messages " :key="message.id" class="px-3 pt-2">
          <Message :message="message" :user="getUser(users, message.userId)" />
        </div>
      </div>
      <footer>
        <input v-model=inputText type="text" placeholder="Type you message"
          class="input input-bordered w-[434px] my-4 mx-2" @keypress.enter.extract="search(inputText)" />
      </footer>
      <button v-show="isScrolling" @click="scrollDown"
        class="btn fixed bottom-[110px] right-[20px] dark:bg-gray-900 rounded-full">
        <DownArrow class="h-8 w-8 text-white"></DownArrow>
      </button>
    </div>
  </div>
</template>
