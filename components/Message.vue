<script setup lang="ts">
import type { Message, User } from '@/types'
// @ts-expect-error
import Markdown from 'vue3-markdown-it'

const props = defineProps<{
  message: Message
  user?: User
}>()

const relativeTime = useTimeAgo(() => props.message.createdAt)

function isMe(id: string): boolean {
  return id === 'user'
}
</script>
<template>
  <!-- <div class="chat chat-start">
    <div class="chat-bubble">{{ message }}</div>
</div> -->
  <div class="chat" :class="[isMe(user.id) ? 'chat-end' : 'chat-start']">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user.avatar" />
      </div>
    </div>
    <div class="chat-header py-2">
      {{ user.name }}
      <time class="text-xs opacity-50">{{ relativeTime }}</time>
    </div>
    <div class="chat-bubble prose prose-sm py-0 bg-white dark:bg-gray-900 max-w-max w-full">
      <Markdown v-if="message" :source="message.text" class="w-full" />
    </div>
  </div>
</template>
