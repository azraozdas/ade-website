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

// Search query state - this is the text the user types in the search box
const query = ref('');

// Computed property for the search placeholder text
// This automatically updates when the language changes (English or German)
const searchPlaceholder = computed(() => {
  if (currentLanguage.value === 'en') {
    return 'Search products...'; // English placeholder
  } else {
    return 'Produkte suchen...'; // German placeholder
  }
});

// When the component loads, check if there's a search query in the URL
// This allows the search box to restore its value when navigating back/forward
onMounted(() => {
  // Check if the URL has a search parameter (from previous search or direct navigation)
  if (typeof route.query.search === 'string') {
    // Restore the search query from the URL
    query.value = route.query.search;
  }
});

// Watch for changes in the URL search parameter
// This keeps the search box in sync when navigating (e.g., browser back/forward)
watch(
  () => route.query.search,
  (newSearchValue) => {
    // If the URL has a search value and it's different from our current query, update it
    if (typeof newSearchValue === 'string' && newSearchValue !== query.value) {
      query.value = newSearchValue;
    }
    // If the URL doesn't have a search parameter but we have a query value, clear it
    if (!newSearchValue && query.value) {
      query.value = '';
    }
  },
);

// Watch for changes in the search query
// When the user types in the search box, update the URL and navigate to products page
watch(
  query,
  (newQuery) => {
    // Remove leading and trailing whitespace from the search query
    const trimmedQuery = newQuery.trim();
    
    // Create a copy of the current route query parameters
    const updatedQuery = { ...route.query };

    // If there's a search term, add it to the query parameters
    // Otherwise, remove the search parameter from the URL
    if (trimmedQuery) {
      updatedQuery.search = trimmedQuery;
    } else {
      delete updatedQuery.search; // Remove search parameter if query is empty
    }

    // Navigate to the products page with the updated search query
    // If we're already on the products page, use replace to avoid adding history entry
    // Otherwise, use push to create a new history entry
    if (route.path !== '/products') {
      // We're on a different page, so navigate to products page
      router.push({
        path: '/products',
        query: updatedQuery,
      });
    } else {
      // We're already on products page, just update the query without adding history entry
      router.replace({
        path: '/products',
        query: updatedQuery,
      });
    }
  },
  { immediate: false }, // Don't run this watcher immediately on mount
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
