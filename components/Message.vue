<script setup lang="ts">
import type { Message, User } from '@/types'
// @ts-expect-error
import Markdown from 'vue3-markdown-it'

const props = defineProps<{
  text?: string
  createdAt?: Date
  user: User
}>()

const relativeTime = useTimeAgo(() => props?.createdAt)

function isHuman(id: string): boolean {
  return id === 'user'
}
</script>
<template>
  <div class="chat" :class="[isHuman(user.id) ? 'chat-end' : 'chat-start']">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user.avatar" />
      </div>
    </div>
    <div class="chat-header py-2">
      {{ user.name }}
      <time v-if="createdAt" class="text-xs opacity-50">{{ relativeTime }}</time>
    </div>
    <div class="chat-bubble prose prose-sm py-0 bg-white dark:bg-gray-900 max-w-max w-full flex">
      <Markdown v-if="text" :source="text" class="w-full" />
      <div v-else class="dots w-full"></div>
    </div>
  </div>
</template>
<style scoped>
.dots {
  width: 20px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side, white 90%, #111827) 0/calc(100%/3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: d1 1s steps(4) infinite;
}

@keyframes d1 {
  to {
    clip-path: inset(0 -34% 0 0)
  }
}
</style>