<template>
  <div class="bg-soft-pink-light" style="height: 56px; border-bottom: 1px solid rgba(0,0,0,.06);">
    <div class="container-ade h-full flex items-center justify-center">
      <nav class="flex items-center gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="$emit('select', tab.value)"
          class="py-2.5 px-3.5 text-sm font-semibold transition-all rounded-xl"
          :class="activeTab === tab.value ? 'text-deep-black' : 'text-gray-text hover:text-deep-black hover:bg-white/30'"
          :style="activeTab === tab.value ? { borderBottom: '3px solid var(--rose-gold)' } : {}"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Category } from '@/types';
import { useI18n } from '@/composables/useI18n';

interface Tab {
  label: string;
  value: 'ALL' | Category;
}

const { t } = useI18n();

defineProps<{
  activeTab: 'ALL' | Category;
}>();

defineEmits<{
  select: [tab: 'ALL' | Category];
}>();

const tabs = computed<Tab[]>(() => [
  { label: t('all'), value: 'ALL' },
  { label: t('face'), value: 'FACE' },
  { label: t('lips'), value: 'LIPS' },
  { label: t('eyes'), value: 'EYES' },
]);
</script>
