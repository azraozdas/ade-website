<template>
  <div 
    class="inline-flex items-center rounded-lg overflow-hidden"
    style="border: 2px solid rgba(0,0,0,.12); box-shadow: 0 1px 3px rgba(0,0,0,.05);"
  >
    <button
      @click="decrement"
      :disabled="modelValue <= 1"
      class="bg-transparent hover:bg-soft-pink hover:text-rose-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      style="min-width: 36px; padding: 8px;"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
      </svg>
    </button>
    <input
      :value="modelValue"
      readonly
      type="number"
      min="1"
      max="99"
      class="border-none outline-none text-sm font-medium text-center bg-transparent"
      style="width: 50px;"
    />
    <button
      @click="increment"
      :disabled="modelValue >= 99"
      class="bg-transparent hover:bg-soft-pink hover:text-rose-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      style="min-width: 36px; padding: 8px;"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const increment = () => {
  if (props.modelValue < 99) {
    emit('update:modelValue', props.modelValue + 1);
  }
};

const decrement = () => {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1);
  }
};
</script>
