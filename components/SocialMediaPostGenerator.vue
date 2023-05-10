<script setup lang="ts">
const url = ref('https://google.com')
const temperature = ref(0.5)
</script>
<template>
  <h1 class="text-4xl my-10">Social Media Post Generator</h1>
  <!-- ImportUrlForm Here -->
  <ImportUrlForm :url="url" :temperature="temperature" />
  <div>
    <!-- Twitter Card Here -->
    <!-- Facebook Card Here -->
    <!-- Images Card Here -->
  </div>
</template>
