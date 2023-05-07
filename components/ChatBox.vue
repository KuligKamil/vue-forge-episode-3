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
  (event: 'new-message', text: Message): void
}>()

const isOpen = ref(true)
const messageBox = ref<HTMLElement>()
const inputText = ref<string>()
const isScrolling = ref(false)

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

async function search(text: string) {
  inputText.value = ''
  await nextTick(() => {
    emit('new-message', {
      id: nanoid(),
      userId: 'user',
      createdAt: new Date(new Date().getTime()),
      text: text,
    })

  })
}

function getUser(users: User[], id: string): User | undefined {
  return users.find(user => user.id === id)
}

function handleScroll() {
  if (messageBox.value) {
    const scrollPosition = messageBox.value.scrollHeight - messageBox.value.clientHeight - messageBox.value.scrollTop
    if (scrollPosition > 10) {
      isScrolling.value = true
    } else {
      isScrolling.value = false
    }
  }
}

function scrollDown() {
  if (messageBox.value) { messageBox.value.scrollTop = messageBox.value.scrollHeight }
}

</script>
<template>
  {{ usersTyping }}
  <div class="fixed bottom-[10px] right-[10px]">
    <ChatButton v-show="!isOpen" @click="isOpen = true" class="bg-blue-500 p-2 rounded-full">
    </ChatButton>
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
      <div ref="messageBox" @scroll.passive="handleScroll" class="overflow-y-auto min-h-[40vh] max-h-[80vh]">
        <div v-for=" { text, createdAt, userId, id }  in  messages" :key="id" class="px-3 pt-2">
          <Message :text="text" :created-at="createdAt" :user="getUser(users, userId)" />
        </div>
        <div v-if="usersTyping[0]" class="px-3 pt-2">
          <Message :user="getUser(users, 'assistant')" />
        </div>
      </div>
      <footer>
        <input v-model="inputText" @keypress.enter.extract="search(inputText)" type="text" placeholder="Type you message"
          class="input input-bordered w-[434px] my-4 mx-2" />
      </footer>

      <button v-show="isScrolling" @click="scrollDown"
        class="btn fixed bottom-[110px] right-[20px] dark:bg-gray-900 rounded-full animate-bounce">
        <DownArrow class="h-8 w-8 text-white"></DownArrow>
      </button>
    </div>
  </div>
</template>
