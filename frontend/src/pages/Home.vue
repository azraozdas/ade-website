<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-layout">
        <!-- Hero Text Box -->
        <div class="hero-text-box">
          <h1 class="hero-title">
            {{ t('heroTitle') }}
          </h1>
          <p class="hero-subtitle">
            {{ t('heroSubtitle') }}
          </p>
          <div class="hero-cta">
            <button @click="router.push('/products')" class="btn-shop-now">{{ t('shopNow') }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section ref="showcaseSection" class="showcase-section">
      <div class="container-ade">
        <h2 class="showcase-title">
          {{ t('findYourBestBase') }}
        </h2>

        <!-- Products Grid -->
        <div v-if="loading" class="products-grid">
          <div v-for="i in 3" :key="i" class="card">
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

        <div v-else class="products-grid">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/lib/api';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard.vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const router = useRouter();

const loading = ref(true);
const error = ref<string | null>(null);
const featuredProducts = ref<Product[]>([]);
const showcaseSection = ref<HTMLElement | null>(null);

onMounted(async () => {
  try {
    const products = await api.getProducts();
    featuredProducts.value = products.slice(0, 3);
  } catch (err) {
    error.value = t('failedToLoadProducts');
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.home-page {
  background: #F7F4EF;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  background-image: 
    linear-gradient(
      90deg,
      #FBE9EC 0%,
      rgba(247, 244, 239, 0.30) 40%,
      rgba(247, 244, 239, 0) 100%
    ),
    url('/assets/images/hero-model.jpg');
  background-size: cover;
  background-position: center right;
}

.hero-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
}

.hero-text-box {
  background: rgba(251, 233, 236, 0.18);
  padding: 24px;
  border-radius: 16px;
  max-width: 560px;
  backdrop-filter: saturate(120%) blur(0.5px);
  text-align: left;
  margin-right: auto;
  margin-left: 0;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(3.25rem, 8vw, 4.5rem);
  line-height: 1.05;
  color: #96284f;
  margin-bottom: 20px;
}

.hero-subtitle {
  color: #7a3f4f;
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 24px;
}

.hero-cta {
  display: flex;
  gap: 16px;
}

.btn-shop-now {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 50px;
  background: #B76E79;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(183, 110, 121, 0.2);
}

.btn-shop-now:hover {
  background: #96284f;
  box-shadow: 0 6px 16px rgba(183, 110, 121, 0.3);
  transform: translateY(-1px);
}

.btn-shop-now:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(183, 110, 121, 0.2);
}

/* Showcase Section */
.showcase-section {
  background: white;
  padding: 48px 0;
}

.showcase-title {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 700;
  color: var(--deep-black);
  text-align: center;
  margin-bottom: 32px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1440px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .hero-section {
    min-height: 420px;
    background-position: center;
  }

  .hero-text-box {
    max-width: 100%;
    padding: 20px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .showcase-section {
    padding: 32px 0;
  }

  .showcase-title {
    font-size: 32px;
    margin-bottom: 24px;
  }
}
</style>
