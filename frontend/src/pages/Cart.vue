<template>
  <div class="min-h-screen bg-off-white py-12">
    <div class="container-ade">
      <!-- Empty Cart -->
      <div v-if="cartStore.isEmpty" class="text-center py-12 card p-12 max-w-2xl mx-auto">
        <svg
          class="w-24 h-24 mx-auto text-gray-300 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 class="font-playfair text-3xl font-semibold text-rose-gold mb-4">{{ t('yourBagEmpty') }}</h2>
        <p class="text-gray-muted mb-8">{{ t('addSomeProducts') }}</p>
        <router-link to="/products" class="btn-cta">{{ t('shopNow') }}</router-link>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <!-- Left - Cart Table -->
        <div class="card overflow-hidden">
          <!-- Table Header -->
          <div 
            class="grid gap-5 px-5 py-5"
            style="
              grid-template-columns: 80px 1fr 100px 140px 100px;
              background: rgba(251,233,236,.15);
              border-bottom: 2px solid rgba(150,40,79,.25);
            "
          >
            <div class="font-bold text-xs text-rose-gold-dark" style="text-transform: uppercase; letter-spacing: 0.8px;">{{ t('image') }}</div>
            <div class="font-bold text-xs text-rose-gold-dark" style="text-transform: uppercase; letter-spacing: 0.8px;">{{ t('product') }}</div>
            <div class="font-bold text-xs text-rose-gold-dark" style="text-transform: uppercase; letter-spacing: 0.8px;">{{ t('unitPrice') }}</div>
            <div class="font-bold text-xs text-rose-gold-dark" style="text-transform: uppercase; letter-spacing: 0.8px;">{{ t('quantity') }}</div>
            <div class="font-bold text-xs text-rose-gold-dark" style="text-transform: uppercase; letter-spacing: 0.8px;">{{ t('total') }}</div>
          </div>

          <!-- Table Rows -->
          <div
            v-for="item in cartStore.items"
            :key="`${item.id}-${item.shade}`"
            class="grid gap-5 px-5 py-5 transition-colors hover:bg-soft-pink/20"
            style="
              grid-template-columns: 80px 1fr 100px 140px 100px;
              border-bottom: 1px solid rgba(0,0,0,.06);
            "
          >
            <!-- Image -->
            <div>
              <img
                :src="item.image || '/assets/images/product-face.jpg'"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-xl"
                style="box-shadow: 0 2px 8px rgba(0,0,0,.08);"
              />
            </div>

            <!-- Product Info -->
            <div class="flex flex-col justify-center">
              <h3 class="font-semibold text-deep-black">{{ item.name }}</h3>
              <p v-if="item.shade" class="text-sm text-gray-muted flex items-center gap-2 mt-1">
                <span>{{ t('shade') }}:</span>
                <span
                  class="w-4 h-4 rounded-full border border-gray-300"
                  :style="{ backgroundColor: item.shade }"
                ></span>
              </p>
            </div>

            <!-- Unit Price -->
            <div class="flex items-center">
              <span class="text-deep-black">{{ formatEUR(item.priceCents) }}</span>
            </div>

            <!-- Quantity -->
            <div class="flex items-center">
              <QuantityStepper
                :modelValue="item.qty"
                @update:modelValue="(qty) => updateQty(item, qty)"
              />
            </div>

            <!-- Line Total -->
            <div class="flex items-center justify-between">
              <span class="font-bold text-deep-black">
                {{ formatEUR(item.priceCents * item.qty) }}
              </span>
              <button
                @click="removeItem(item)"
                class="text-red-500 hover:text-red-700 transition-colors ml-2"
                :title="t('remove')"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Right - Summary Card -->
        <div class="lg:sticky lg:top-24 self-start">
          <div 
            class="card p-6"
            style="max-height: calc(100vh - 120px);"
          >
            <h2 
              class="text-lg font-bold text-rose-gold mb-6"
              style="text-transform: uppercase; letter-spacing: 0.5px;"
            >
              {{ t('summary') }}
            </h2>

            <div class="space-y-3 mb-6">
              <div class="flex items-center justify-between">
                <span class="text-gray-text">{{ t('subtotal') }}</span>
                <span class="font-medium text-deep-black">{{ formatEUR(cartStore.subtotalCents) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-text">{{ t('shipping') }}</span>
                <span class="font-medium text-deep-black">
                  {{ cartStore.shippingCents === 0 ? t('free') : formatEUR(cartStore.shippingCents) }}
                </span>
              </div>
              <div 
                class="pt-3"
                style="height: 1px; background: rgba(0,0,0,.1); margin: 16px 0;"
              ></div>
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg text-deep-black">{{ t('total') }}</span>
                <span class="font-bold text-lg text-rose-gold">
                  {{ formatEUR(cartStore.totalCents) }}
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <router-link to="/checkout" class="btn-cta w-100">
                {{ t('proceedToCheckout') }}
              </router-link>
              <router-link to="/products" class="btn-outline w-100">
                {{ t('continueShopping') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';
import { formatEUR } from '@/utils/money';
import type { CartItem } from '@/types';
import QuantityStepper from '@/components/QuantityStepper.vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const cartStore = useCartStore();
const uiStore = useUIStore();

const updateQty = (item: CartItem, qty: number) => {
  cartStore.setQty(item.id, item.shade, qty);
};

const removeItem = (item: CartItem) => {
  cartStore.remove(item.id, item.shade);
  uiStore.showToast(t('removedFromCart'), 'info');
};
</script>

<style scoped>
@media (max-width: 768px) {
  .grid[style*="grid-template-columns: 80px 1fr 100px 140px 100px"] {
    grid-template-columns: 60px 1fr auto;
    gap: 12px;
  }
  
  .grid[style*="grid-template-columns: 80px 1fr 100px 140px 100px"] > div:nth-child(3),
  .grid[style*="grid-template-columns: 80px 1fr 100px 140px 100px"] > div:nth-child(4) {
    display: none;
  }
}
</style>
