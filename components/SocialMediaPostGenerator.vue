<script setup lang="ts">
const url = ref('https://google.com')
const temperature = ref(0.5)
const socials = [{ title: 'Twitter', link: 'https://twitter.com/intent/tweet?text={TEXT-HERE}', hasCharacterCount: true },
{ title: 'Linkedin', hasCopyButton: true },
{ title: 'Facebook' }]
</script>
<template>
  <h1 class="text-4xl my-10">Social Media Post Generator</h1>
  <ImportUrlForm :url="url" :temperature="temperature" />
  <div class="mt-4">
    <template v-for="social in socials" :key="social.title">
      <SocialCard :title="social.title" subtitle="Import any article to generate an announcement" />
    </template>
    <!-- Images Card Here -->
  </div>
</template>
