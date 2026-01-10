<template>
  <Teleport to="body">
    <div
      class="fixed top-20 right-6 z-[1600] flex flex-col space-y-2 pointer-events-none"
      aria-live="assertive"
    >
      <TransitionGroup name="slide">
        <div
          v-for="toast in uiStore.toasts"
          :key="toast.id"
          class="px-4 py-2.5 rounded-xl shadow-ade-toast pointer-events-auto max-w-sm bg-rose-gold text-white font-semibold text-sm toast-slide-in"
        >
          <div class="flex items-center justify-between space-x-3">
            <span>{{ toast.message }}</span>
            <button
              @click="uiStore.dismissToast(toast.id)"
              class="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui';

const uiStore = useUIStore();
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
