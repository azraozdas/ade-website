<template>
  <div class="product-card">
    <!-- Image -->
    <router-link :to="`/products/${product.id}`" class="product-image-link">
      <img 
        :src="resolveImage(product)" 
        :alt="product.name"
        :title="product.name"
        class="product-image"
      />
    </router-link>

    <!-- Content -->
    <div class="product-content">
      <!-- Name -->
      <h3 class="product-name">
        {{ translateProductName(product.id, product.name) }}
      </h3>

      <!-- Description -->
      <p class="product-description">
        {{ translateProductDesc(product.id, product.short) }}
      </p>

      <!-- Shades -->
      <div v-if="product.shades && product.shades.length > 0" class="product-shades">
        <button
          v-for="(shade, index) in product.shades"
          :key="index"
          @click="selectedShade = shade"
          class="shade-swatch"
          :class="{ 'shade-active': selectedShade === shade }"
          :style="{ backgroundColor: shade }"
          :title="`Shade ${index + 1}`"
        ></button>
      </div>

      <!-- Price & Add to Cart -->
      <div class="product-footer">
        <span class="product-price">
          {{ formatEUR(product.priceCents) }}
        </span>
        <button @click="addToCart" class="btn-add-to-cart">
          {{ t('addToCart') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';
import { formatEUR } from '@/utils/money';
import { useI18n } from '@/composables/useI18n';

const { t, translateProductName, translateProductDesc } = useI18n();

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const uiStore = useUIStore();

const selectedShade = ref<string | undefined>(
  props.product.shades && props.product.shades.length > 0 ? props.product.shades[0] : undefined,
);

const resolveImage = (product: Product): string => {
  // Special case: Lipstick product uses S1 image by default
  if (product.id === 'ade-satin-rose') {
    return '/assets/images/product-lipstick-S1.jpg';
  }

  // If product has an image path, ensure it starts with "/"
  if (product.image) {
    return product.image.startsWith('/') ? product.image : `/${product.image}`;
  }
  
  // Fallback: use default image based on category
  const defaultImages = {
    FACE: '/assets/images/product-face.jpg',
    LIPS: '/assets/images/product-lips.jpg',
    EYES: '/assets/images/product-eyes.jpg',
  };
  return defaultImages[product.category] || '/assets/images/product-face.jpg';
};

const addToCart = () => {
  cartStore.add({
    id: props.product.id,
    name: props.product.name,
    priceCents: props.product.priceCents,
    shade: selectedShade.value,
    image: resolveImage(props.product),
  });
  uiStore.showToast(t('addedToCart'), 'success');
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(17, 17, 17, 0.05);
  overflow: hidden;
  max-width: 320px;
  margin: 0 auto;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(17, 17, 17, 0.08);
}

.product-image-link {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 4/5;
  overflow: hidden;
  flex-shrink: 0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-content {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--deep-black);
  margin-bottom: 8px;
  line-height: 1.3;
  min-height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.product-description {
  font-size: 13px;
  color: var(--gray-muted);
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.product-shades {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.shade-swatch {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;
}

.shade-swatch:hover {
  transform: scale(1.1);
  border-color: #B76E79;
}

.shade-active {
  border-color: #B76E79 !important;
  transform: scale(1.1);
}

.product-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
  margin-top: auto;
}

.product-price {
  font-weight: 700;
  font-size: 16px;
  color: #B76E79;
}

.btn-add-to-cart {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 50px;
  background: #B76E79;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(183, 110, 121, 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-add-to-cart:hover {
  background: #96284f;
  box-shadow: 0 6px 16px rgba(183, 110, 121, 0.3);
  transform: translateY(-1px);
}

.btn-add-to-cart:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(183, 110, 121, 0.2);
}
</style>
