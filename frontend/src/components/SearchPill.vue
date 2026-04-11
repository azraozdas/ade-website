<template>
  <div class="search-pill-container">
    <div class="search-pill">
      <img 
        src="/assets/icons/search.svg" 
        alt="" 
        class="search-icon"
      />
      <input
        v-model="query"
        type="text"
        :placeholder="searchPlaceholder"
        class="search-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from '@/composables/useI18n';

const { currentLanguage } = useI18n();

const router = useRouter();
const route = useRoute();

const query = ref('');

// Dil değiştiğinde otomatik güncellenen placeholder
const searchPlaceholder = computed(() => {
  return currentLanguage.value === 'en' ? 'Search products...' : 'Produkte suchen...';
});

// Navigate to products page when searching
onMounted(() => {
  if (typeof route.query.search === 'string') {
    query.value = route.query.search;
  }
});

watch(
  () => route.query.search,
  (newValue) => {
    if (typeof newValue === 'string' && newValue !== query.value) {
      query.value = newValue;
    }
    if (!newValue && query.value) {
      query.value = '';
    }
  },
);

watch(
  query,
  (newQuery) => {
    const trimmed = newQuery.trim();
    const nextQuery = { ...route.query };

    if (trimmed) {
      nextQuery.search = trimmed;
    } else {
      delete nextQuery.search;
    }

    if (route.path !== '/products') {
      router.push({
        path: '/products',
        query: nextQuery,
      });
    } else {
      router.replace({
        path: '/products',
        query: nextQuery,
      });
    }
  },
  { immediate: false },
);
</script>

<style scoped>
.search-pill-container {
  display: flex;
  align-items: center;
}

.search-pill {
  display: flex;
  align-items: center;
  height: 40px;
  background: white;
  border: 3px solid #B76E79;
  border-radius: 24px;
  padding: 0 16px;
  gap: 10px;
  min-width: 200px;
  transition: all 0.2s ease;
}

.search-pill:focus-within {
  border-color: #96284f;
  box-shadow: 0 0 0 3px rgba(183, 110, 121, 0.1);
}

.search-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.8;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: var(--deep-black);
}

.search-input::placeholder {
  color: #B76E79;
  opacity: 0.8;
}
</style>
