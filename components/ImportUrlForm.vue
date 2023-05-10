<script setup lang="ts">
const props = defineProps<{
    url: string,
    temperature: number,
}>()

</script>

<template>
    <!-- <label class="label">
        <span class="label-text">Your Email</span>
      </label>
      <label class="input-group">
        <span>Email</span>
        <input type="text" placeholder="info@site.com" class="input input-bordered" />
      </label> -->
    <div class="form-control">
        <div class="input-group flex flex-col">
            <div class="flex w-full">
                <input :value="url" type="text" placeholder="Full Article URL"
                    class="input input-bordered w-full rounded-none rounded-l" />
                <button class="btn rounded-none rounded-r">GENERATE ANNOUNCEMENT</button>
            </div>
            <!-- <input :value="temperature" type="range" min="0" max="1" step="0.1" class="range range-secondary" /> -->
        </div>
        <input :value="temperature" type="range" min="0" max="1" step="0.1" class="range range-secondary" />
    </div>
</template>
