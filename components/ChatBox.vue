<script setup lang="ts">
import type { Message, User } from '@/types'
const props = defineProps<{
  messages: Message[]
  users: User[]
  me: User
  usersTyping?: User[]
}>()
const isOpen = ref(false)
// const messagesOrder = {}
const getUser = (users: User[], id: string): User  | undefined => {
  console.log(users[0].id)
  console.log(id)
  const user = users.find(user => user.id === id)
  console.log(user)
  return user
}

</script>
<template>
  <div class="fixed bottom-[10px] right-[10px]">
    <button
    v-show="!isOpen"
    class="bg-blue-500 p3 rounded "
    @click="isOpen = true">
    <!-- {{ isOpen }} -->
    <svg class="h-8 w-8 text-white"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </button>
  <div v-show="isOpen" class="w-[450px] overflow-hidden">
    <header>
      <button @click="isOpen = false">
        Customer Support Chat
      </button>
      <div v-for="message in messages" :key="message.id">
        <Message :message="message" :user="getUser(users, message.userId)">
        </Message>
      </div>
    </header>
  </div>
  </div>
  
  <!-- <img src="user." alt=""> -->
</template>
