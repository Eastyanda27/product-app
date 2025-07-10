<script setup lang="ts">
const props = defineProps<{
  variants: string[]
}>()

const selected = ref<string | null>(null)
</script>

<template>
  <div class="space-y-2">
    <h2 class="font-medium text-gray-800">Pilih Varian</h2>
    
    <div class="flex flex-wrap gap-3">
      <label
        v-for="variant in variants"
        :key="variant"
        class="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer transition hover:border-blue-500"
        :class="{
          'bg-blue-100 border-blue-600': selected === variant
        }"
      >
        <input
          type="radio"
          class="hidden"
          :value="variant"
          v-model="selected"
        />
        <span class="text-sm">
          {{ variant }}
        </span>
      </label>
    </div>
  </div>
</template>
