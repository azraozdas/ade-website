<template>
  <div class="min-h-screen bg-off-white">
    <!-- Tabbar -->
    <Tabbar :activeTab="activeTab" @select="handleTabSelect" />

    <!-- Main Content -->
    <div class="container-ade py-12">
      <h1 class="font-playfair text-4xl font-bold text-deep-black mb-4">{{ t('products') }}</h1>

      <!-- Products Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="card">
          <div class="aspect-[4/5] skeleton"></div>
          <div class="p-4 space-y-3">
            <div class="h-6 skeleton"></div>
            <div class="h-4 skeleton"></div>
            <div class="h-10 skeleton"></div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500">{{ error }}</p>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="activeTab" class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 fade-in">
          <!-- No products message -->
          <div
            v-if="filteredProducts.length === 0"
            class="col-span-full text-center py-20 card"
          >
            <svg
              class="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 class="font-playfair text-2xl font-semibold text-gray-700 mb-2">
              {{ t('noProductsYet') }}
            </h3>
            <p class="text-gray-500">{{ t('checkBackSoon') }}</p>
          </div>

          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/lib/api';
import type { Product, Category } from '@/types';
import Tabbar from '@/components/Tabbar.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useI18n } from '@/composables/useI18n';

const { t, translateProductName, translateProductDesc } = useI18n();

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const activeTab = ref<'ALL' | Category>('ALL');
const searchQuery = ref('');

// Computed property that filters products based on selected category and search query
const filteredProducts = computed(() => {
  // Start with all products
  let filteredList = products.value;

  // If a specific category is selected (not "ALL"), filter by category
  if (activeTab.value !== 'ALL') {
    filteredList = filteredList.filter((product) => product.category === activeTab.value);
  }

  // If there's a search query, filter products that match the search term
  const searchTerm = searchQuery.value.trim().toLowerCase();
  if (searchTerm) {
    filteredList = filteredList.filter((product) => {
      // Get translated product name and description for search
      // This allows searching in both English and German
      const translatedName = translateProductName(product.id, product.name).toLowerCase();
      const translatedDesc = translateProductDesc(product.id, product.short).toLowerCase();
      
      // Check if the search term matches any of these fields:
      // - Original product name
      // - Original product description
      // - Translated product name
      // - Translated product description
      // - Product category
      const matchesOriginalName = product.name.toLowerCase().includes(searchTerm);
      const matchesOriginalDesc = product.short.toLowerCase().includes(searchTerm);
      const matchesTranslatedName = translatedName.includes(searchTerm);
      const matchesTranslatedDesc = translatedDesc.includes(searchTerm);
      const matchesCategory = product.category.toLowerCase().includes(searchTerm);
      
      // Return true if any field matches the search term
      return matchesOriginalName || matchesOriginalDesc || matchesTranslatedName || matchesTranslatedDesc || matchesCategory;
    });
  }

  // Return the filtered list of products
  return filteredList;
});

const handleTabSelect = (tab: 'ALL' | Category) => {
  activeTab.value = tab;
  router.push({ query: { ...route.query, tab } });
};

onMounted(async () => {
  try {
    products.value = await api.getProducts();

    // Set initial tab from query
    const tabQuery = route.query.tab as string;
    if (tabQuery && ['ALL', 'FACE', 'LIPS', 'EYES'].includes(tabQuery)) {
      activeTab.value = tabQuery as 'ALL' | Category;
    }

    if (typeof route.query.search === 'string') {
      searchQuery.value = route.query.search;
    }
  } catch (err) {
    error.value = t('failedToLoadProducts');
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Watch for external query changes (e.g., from search)
watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && ['ALL', 'FACE', 'LIPS', 'EYES'].includes(newTab as string)) {
      activeTab.value = newTab as 'ALL' | Category;
    }
  },
);

watch(
  () => route.query.search,
  (newSearch) => {
    if (typeof newSearch === 'string') {
      searchQuery.value = newSearch;
    } else if (!newSearch) {
      searchQuery.value = '';
    }
  },
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
