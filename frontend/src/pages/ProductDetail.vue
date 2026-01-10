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

// Function to resolve the product image path, including shade-specific images
// This is similar to ProductCard but handles shade-specific images for the lipstick product
const resolveImage = (product: Product, shade?: string): string => {
  // Special case: The lipstick product (ade-satin-rose) has different images for each shade
  // Each shade has its own image (S1, S2, S3, S4)
  if (product.id === 'ade-satin-rose' && product.shades && product.shades.length > 0) {
    // Find which shade is currently selected
    // If no shade is selected, use the first shade (index 0) as default
    let shadeIndex = 0;
    if (shade) {
      shadeIndex = product.shades.indexOf(shade);
      // If shade not found in array, default to index 0
      if (shadeIndex === -1) {
        shadeIndex = 0;
      }
    }
    
    // Convert the shade index (0-3) to an image number (1-4)
    // Clamp the value to valid range (1-4) to prevent invalid image paths
    let shadeNumber = shadeIndex + 1; // Add 1 because images are numbered 1-4, not 0-3
    if (shadeNumber < 1) {
      shadeNumber = 1;
    } else if (shadeNumber > 4) {
      shadeNumber = 4;
    }
    
    // Return the shade-specific image path
    return `/assets/images/product-lipstick-S${shadeNumber}.jpg`;
  }

  // If the product has an image path defined, use it
  // Ensure the path starts with "/" for proper routing
  if (product.image) {
    if (product.image.startsWith('/')) {
      return product.image; // Already has leading slash
    } else {
      return `/${product.image}`; // Add leading slash if missing
    }
  }
  
  // Fallback: Use a default image based on the product category
  // This ensures every product has an image even if one wasn't explicitly set
  const defaultImages = {
    FACE: '/assets/images/product-foundation.jpg',
    LIPS: '/assets/images/product-lipstick.jpg',
    EYES: '/assets/images/product-eyes.jpg',
  };
  
  // Return the category-specific default, or foundation image as ultimate fallback
  const categoryDefault = defaultImages[product.category];
  return categoryDefault || '/assets/images/product-foundation.jpg';
};

const productImage = computed(() => {
  if (!product.value) return '';
  return resolveImage(product.value, selectedShade.value);
});

// Function to add the product to the cart
const addToCart = () => {
  // Safety check: don't add if product data isn't loaded yet
  if (!product.value) return;
  
  // Determine which shade to use when adding to cart
  // If a shade is already selected, use that
  // Otherwise, if the product has shades available, use the first one as default
  // This ensures products with shades always have a shade value when added to cart
  let shadeToUse = selectedShade.value;
  if (!shadeToUse && product.value.shades && product.value.shades.length > 0) {
    shadeToUse = product.value.shades[0]; // Use first shade as default
  }
  
  // Add the product to the cart with all necessary information
  cartStore.add({
    id: product.value.id,
    name: product.value.name,
    priceCents: product.value.priceCents,
    shade: shadeToUse, // The selected shade (or default first shade)
    image: productImage.value, // The resolved image path (may be shade-specific)
    qty: quantity.value, // The selected quantity
  });
  
  // Show a success toast notification to confirm the item was added
  uiStore.showToast(t('addedToCart'), 'success');
};

// Load the product data when the component mounts
onMounted(async () => {
  // Get the product ID from the route parameters
  const productId = route.params.id as string;
  
  try {
    // Fetch the product details from the API
    product.value = await api.getProduct(productId);
    
    // Auto-select the first shade if the product has shades available
    // This provides a better user experience - the user can see the default shade immediately
    // They can still change it by clicking on a different shade
    if (product.value.shades && product.value.shades.length > 0 && !selectedShade.value) {
      selectedShade.value = product.value.shades[0];
    }
  } catch (errorObject) {
    // If loading fails, show an error message
    error.value = t('failedToLoadProducts');
    console.error(errorObject);
  } finally {
    // Always set loading to false, whether the request succeeded or failed
    loading.value = false;
  }
});
</script>

