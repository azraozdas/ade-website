<template>
  <div class="min-h-screen bg-off-white py-12">
    <div class="container-ade">
      <!-- Loading State -->
      <div v-if="loading" class="max-w-[1100px] mx-auto card p-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="aspect-[4/5] skeleton"></div>
          <div class="space-y-6">
            <div class="h-12 skeleton"></div>
            <div class="h-6 skeleton"></div>
            <div class="h-24 skeleton"></div>
            <div class="h-10 skeleton"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error || !product" class="text-center py-20">
        <p class="text-red-500 mb-4">{{ error || t('productNotFound') }}</p>
        <router-link to="/products" class="btn-cta">{{ t('backToProducts') }}</router-link>
      </div>

      <!-- Product Detail -->
      <div v-else class="max-w-[1100px] mx-auto card p-10">
        <div class="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12">
          <!-- Left Side - Product Image -->
          <div class="md:sticky md:top-24 self-start">
            <img 
              :src="productImage" 
              :alt="product.name"
              :title="product.name"
              class="w-full max-w-[450px] aspect-[4/5] object-cover rounded-2xl shadow-ade"
            />
          </div>

          <!-- Right Side - Product Info -->
          <div class="space-y-6">
            <!-- Category Label -->
            <div 
              class="text-xs font-semibold text-rose-gold"
              style="text-transform: uppercase; letter-spacing: 1px;"
            >
              {{ product.category }}
            </div>

            <!-- Title & Price -->
            <div class="flex items-start justify-between gap-4">
              <h1 class="font-playfair text-5xl font-bold text-deep-black">
                {{ translateProductName(product.id, product.name) }}
              </h1>
              <div class="text-2xl font-bold text-rose-gold text-right">
                {{ formatEUR(product.priceCents) }}
              </div>
            </div>

            <!-- Description -->
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ translateProductDesc(product.id, product.short) }}
            </p>

            <!-- Available Shades -->
            <div v-if="product.shades && product.shades.length > 0">
              <h3 
                class="text-base font-bold text-deep-black mb-3"
                style="text-transform: uppercase; letter-spacing: 0.5px;"
              >
                {{ t('availableShades') }}
              </h3>
              <div class="flex items-center gap-2.5">
                <button
                  v-for="(shade, index) in product.shades"
                  :key="index"
                  @click="selectedShade = shade"
                  class="w-8 h-8 rounded-full transition-all"
                  :class="selectedShade === shade ? 'scale-110' : 'hover:scale-110'"
                  :style="{ 
                    backgroundColor: shade,
                    border: selectedShade === shade ? '2px solid var(--rose-gold)' : '2px solid rgba(0,0,0,.12)'
                  }"
                  :title="`Shade ${index + 1}`"
                ></button>
              </div>
            </div>

            <!-- Quantity Controls -->
            <div>
              <label 
                class="text-xs font-semibold text-deep-black mb-2 block"
                style="text-transform: uppercase; letter-spacing: 0.5px;"
              >
                {{ t('qty') }}
              </label>
              <QuantityStepper v-model="quantity" />
            </div>

            <!-- Add to Cart Button -->
            <button @click="addToCart" class="btn-cta w-100 mt-5">
              {{ t('addToCart') }}
            </button>

            <!-- Extra Product Details Box -->
            <div class="bg-white rounded-2xl p-6 mt-8" style="border: 1px solid rgba(0,0,0,.08);">
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-sm" style="line-height: 1.6;">
                  <span class="text-rose-gold text-lg">✓</span>
                  <span class="text-gray-text">{{ t('premiumQualityIngredients') }}</span>
                </li>
                <li class="flex items-start gap-3 text-sm" style="line-height: 1.6;">
                  <span class="text-rose-gold text-lg">✓</span>
                  <span class="text-gray-text">{{ t('crueltyFreeVegan') }}</span>
                </li>
                <li class="flex items-start gap-3 text-sm" style="line-height: 1.6;">
                  <span class="text-rose-gold text-lg">✓</span>
                  <span class="text-gray-text">{{ t('longLastingFormula') }}</span>
                </li>
                <li class="flex items-start gap-3 text-sm" style="line-height: 1.6;">
                  <span class="text-rose-gold text-lg">✓</span>
                  <span class="text-gray-text">{{ t('suitableAllSkinTypes') }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';
import { formatEUR } from '@/utils/money';
import QuantityStepper from '@/components/QuantityStepper.vue';
import { useI18n } from '@/composables/useI18n';

const { t, translateProductName, translateProductDesc } = useI18n();

const route = useRoute();
const cartStore = useCartStore();
const uiStore = useUIStore();

const loading = ref(true);
const error = ref<string | null>(null);
const product = ref<Product | null>(null);
const quantity = ref(1);
const selectedShade = ref<string | undefined>(undefined);

const resolveImage = (product: Product, shade?: string): string => {
  // Special case: Lipstick product has shade-specific images (S1-S4)
  if (product.id === 'ade-satin-rose' && product.shades && product.shades.length > 0) {
    const shadeIndex = shade ? product.shades.indexOf(shade) : 0;
    const shadeNumber = shadeIndex >= 0 && shadeIndex < 4 ? shadeIndex + 1 : 1;
    return `/assets/images/product-lipstick-S${shadeNumber}.jpg`;
  }

  // If product has an image path, ensure it starts with "/"
  if (product.image) {
    return product.image.startsWith('/') ? product.image : `/${product.image}`;
  }
  
  // Fallback: use default image based on category
  const defaultImages = {
    FACE: '/assets/images/product-foundation.jpg',
    LIPS: '/assets/images/product-lipstick.jpg',
    EYES: '/assets/images/product-eyes.jpg',
  };
  return defaultImages[product.category] || '/assets/images/product-foundation.jpg';
};

const productImage = computed(() => {
  if (!product.value) return '';
  return resolveImage(product.value, selectedShade.value);
});

const addToCart = () => {
  if (!product.value) return;
  
  cartStore.add({
    id: product.value.id,
    name: product.value.name,
    priceCents: product.value.priceCents,
    shade: selectedShade.value,
    image: productImage.value,
    qty: quantity.value,
  });
  
  uiStore.showToast(t('addedToCart'), 'success');
};

onMounted(async () => {
  const productId = route.params.id as string;
  
  try {
    product.value = await api.getProduct(productId);
    
    if (product.value.shades && product.value.shades.length > 0) {
      selectedShade.value = product.value.shades[0];
    }
  } catch (err) {
    error.value = t('failedToLoadProducts');
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

