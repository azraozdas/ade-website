<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <ToastHost />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ToastHost from '@/components/ToastHost.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';

const cartStore = useCartStore();
const userStore = useUserStore();

// Restore state from localStorage on mount
onMounted(() => {
  cartStore.restore();
  userStore.restore();
  
  // Initialize currency in localStorage
  if (!localStorage.getItem('ade:currency')) {
    localStorage.setItem('ade:currency', 'EUR');
  }
});
</script>

<style>
@import './assets/css/base.css';
</style>

