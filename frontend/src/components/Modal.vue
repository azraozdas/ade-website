<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[1400] flex items-center justify-center p-5"
        style="background: rgba(17,17,17,.4); backdrop-filter: blur(4px);"
        @click.self="close"
      >
        <div
          class="bg-white rounded-2xl max-w-[480px] w-full max-h-[90vh] overflow-y-auto modal-slide-in"
          style="box-shadow: 0 20px 60px rgba(17,17,17,.3);"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header -->
          <div 
            class="px-7 pt-7 pb-5"
            style="background: linear-gradient(135deg, var(--soft-pink), rgba(251,233,236,.3)); border-bottom: 1px solid rgba(0,0,0,.06);"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-2xl font-playfair font-bold text-rose-gold">
                {{ title }}
              </h3>
              <button
                @click="close"
                class="w-9 h-9 rounded-full flex items-center justify-center text-rose-gold hover:bg-white/50 transition-all"
                style="transition: transform 0.2s ease;"
                @mouseenter="(e) => (e.currentTarget as HTMLElement).style.transform = 'rotate(90deg)'"
                @mouseleave="(e) => (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)'"
                aria-label="Close"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <!-- Content -->
          <div class="px-7 py-7">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.2s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>
