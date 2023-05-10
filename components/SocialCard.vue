<script setup lang="ts">
const props = defineProps<{
    title: string,
    subtitle: string,
}>()
</script>
<template>
    <div class="card w-full bg-base-100 shadow-xl border-t-4 my-6 border-primary">
        <div class="card-body">
            <h2 class="card-title py-2 border-b border-slate-500">{{ title }}</h2>
            <!-- <p class="pt-4 px-2">{{ subtitle }}</p> -->
            <!-- <textarea> {{ subtitle }}</textarea> -->
            <textarea class="textarea mt-4" :placeholder="subtitle"></textarea>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">POST</button>
            </div>
        </div>
    </div>
</template>
