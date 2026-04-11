<template>
  <footer class="bg-white" style="border-top: 1px solid rgba(0,0,0,.06);">
    <div class="text-center py-3">
      <p class="text-sm text-gray-muted">{{ t('allRightsReserved') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>
