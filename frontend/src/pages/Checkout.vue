<template>
  <div class="min-h-screen bg-off-white py-12">
    <div class="container-ade">
      <!-- Order Success Overlay -->
      <div 
        v-if="orderSuccess"
        class="fixed inset-0 z-[1500] flex items-center justify-center p-5"
        style="background: rgba(17,17,17,.5); backdrop-filter: blur(4px);"
      >
        <div 
          class="bg-white rounded-2xl p-12 max-w-lg w-full text-center modal-slide-in"
        >
          <h1 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
            {{ t('orderPlaced') }}
          </h1>
          <p class="text-gray-text mb-6">
            {{ t('thankYouOrder') }}
            <span class="font-semibold text-deep-black">{{ orderNumber }}</span>
          </p>
          <div class="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 class="font-semibold text-lg mb-3">{{ t('orderSummary') }}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span>{{ t('subtotal') }}</span>
                <span>{{ formatEUR(orderSummary.subtotalCents) }}</span>
              </div>
              <div class="flex justify-between">
                <span>{{ t('shipping') }}</span>
                <span>{{
                  orderSummary.shippingCents === 0
                    ? t('free')
                    : formatEUR(orderSummary.shippingCents)
                }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>{{ t('total') }}</span>
                <span class="text-rose-gold">{{ formatEUR(orderSummary.totalCents) }}</span>
              </div>
            </div>
          </div>
          <router-link to="/" class="btn-cta">{{ t('backToHome') }}</router-link>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-if="!orderSuccess">
        <h1 class="font-playfair text-5xl font-bold text-rose-gold mb-8">{{ t('checkout') }}</h1>

        <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          <!-- Left - Checkout Form -->
          <div class="card p-10">
            <h2 class="font-playfair text-xl font-bold text-rose-gold mb-6">
              {{ t('shippingDetails') }}
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="fullName" class="block text-sm font-semibold mb-2">{{ t('fullName') }} *</label>
                <input
                  id="fullName"
                  v-model="form.fullName"
                  type="text"
                  required
                  class="input"
                  placeholder="Jane Doe"
                />
                <p v-if="errors.fullName" class="text-xs text-red-500 mt-1">
                  {{ errors.fullName }}
                </p>
              </div>

              <div class="form-2">
                <div>
                  <label for="email" class="block text-sm font-semibold mb-2">{{ t('email') }} *</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="input"
                    placeholder="you@example.com"
                  />
                  <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
                </div>
                <div>
                  <label for="phone" class="block text-sm font-semibold mb-2">{{ t('phone') }} *</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    class="input"
                    placeholder="+1 234 567 890"
                  />
                  <p v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</p>
                </div>
              </div>

              <div class="form-2">
                <div>
                  <label for="country" class="block text-sm font-semibold mb-2">{{ t('country') }} *</label>
                  <select id="country" v-model="form.addressCountry" required class="input">
                    <option value="">{{ t('selectCountry') }}</option>
                    <option value="Germany">{{ t('germany') }}</option>
                    <option value="France">{{ t('france') }}</option>
                    <option value="Turkey">{{ t('turkey') }}</option>
                    <option value="UK">{{ t('unitedKingdom') }}</option>
                    <option value="USA">{{ t('unitedStates') }}</option>
                  </select>
                  <p v-if="errors.addressCountry" class="text-xs text-red-500 mt-1">
                    {{ errors.addressCountry }}
                  </p>
                </div>
                <div>
                  <label for="city" class="block text-sm font-semibold mb-2">{{ t('city') }} *</label>
                  <input
                    id="city"
                    v-model="form.addressCity"
                    type="text"
                    required
                    class="input"
                    placeholder="Istanbul"
                  />
                  <p v-if="errors.addressCity" class="text-xs text-red-500 mt-1">
                    {{ errors.addressCity }}
                  </p>
                </div>
              </div>

              <div>
                <label for="postalCode" class="block text-sm font-semibold mb-2"
                  >{{ t('postalCode') }} *</label
                >
                <input
                  id="postalCode"
                  v-model="form.postalCode"
                  type="text"
                  required
                  class="input"
                  placeholder="34000"
                />
                <p v-if="errors.postalCode" class="text-xs text-red-500 mt-1">
                  {{ errors.postalCode }}
                </p>
              </div>

              <div>
                <label for="addressLine" class="block text-sm font-semibold mb-2"
                  >{{ t('addressLine') }} *</label
                >
                <textarea
                  id="addressLine"
                  v-model="form.addressLine"
                  required
                  rows="3"
                  class="input"
                  :placeholder="t('streetAddressPlaceholder')"
                ></textarea>
                <p v-if="errors.addressLine" class="text-xs text-red-500 mt-1">
                  {{ errors.addressLine }}
                </p>
              </div>

              <!-- Payment Method Section -->
              <div class="pt-6 border-t">
                <h2 class="font-playfair text-xl font-bold text-rose-gold mb-6">
                  {{ t('paymentMethod') }}
                </h2>
                <div class="flex flex-col gap-3">
                  <label 
                    class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-rose-gold hover:bg-soft-pink/30"
                    :style="{ borderColor: paymentMethod === 'card' ? 'var(--rose-gold)' : 'rgba(0,0,0,.12)' }"
                  >
                    <div class="relative">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card"
                        v-model="paymentMethod"
                        class="sr-only"
                      />
                      <div 
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        :style="{ 
                          borderColor: paymentMethod === 'card' ? 'var(--rose-gold)' : 'rgba(0,0,0,.3)',
                          background: paymentMethod === 'card' ? 'var(--rose-gold)' : 'transparent'
                        }"
                      >
                        <div v-if="paymentMethod === 'card'" class="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <span class="font-semibold">{{ t('creditDebitCard') }}</span>
                  </label>
                  
                  <label 
                    class="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-rose-gold hover:bg-soft-pink/30"
                    :style="{ borderColor: paymentMethod === 'paypal' ? 'var(--rose-gold)' : 'rgba(0,0,0,.12)' }"
                  >
                    <div class="relative">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="paypal"
                        v-model="paymentMethod"
                        class="sr-only"
                      />
                      <div 
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        :style="{ 
                          borderColor: paymentMethod === 'paypal' ? 'var(--rose-gold)' : 'rgba(0,0,0,.3)',
                          background: paymentMethod === 'paypal' ? 'var(--rose-gold)' : 'transparent'
                        }"
                      >
                        <div v-if="paymentMethod === 'paypal'" class="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <span class="font-semibold">{{ t('paypal') }}</span>
                  </label>
                </div>
              </div>

              <p v-if="submitError" class="text-sm text-red-500">{{ submitError }}</p>

              <button type="submit" :disabled="loading" class="btn-cta w-100 mt-6">
                {{ loading ? t('processing') : t('placeOrder') }}
              </button>
            </form>
          </div>

          <!-- Right - Order Summary -->
          <div class="lg:sticky lg:top-24 self-start">
            <div class="card p-6">
              <h2 class="font-playfair text-xl font-bold text-rose-gold mb-6">{{ t('orderSummary') }}</h2>

              <div class="space-y-3 mb-6 max-h-[300px] overflow-y-auto pb-3" style="border-bottom: 1px solid rgba(0,0,0,.06);">
                <div
                  v-for="item in cartStore.items"
                  :key="`${item.id}-${item.shade}`"
                  class="flex items-center justify-between text-sm py-3"
                >
                  <div class="flex-1">
                    <span class="font-semibold text-sm">{{ item.qty }}× {{ item.name }}</span>
                  </div>
                  <span class="text-gray-text">{{ formatEUR(item.priceCents * item.qty) }}</span>
                </div>
              </div>

              <div class="space-y-3 pt-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-text">{{ t('subtotal') }}</span>
                  <span class="font-medium">{{ formatEUR(cartStore.subtotalCents) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-text">{{ t('shipping') }}</span>
                  <span class="font-medium">
                    {{
                      cartStore.shippingCents === 0 ? t('free') : formatEUR(cartStore.shippingCents)
                    }}
                  </span>
                </div>
                <div class="border-t pt-3 flex items-center justify-between">
                  <span class="font-semibold text-lg">{{ t('total') }}</span>
                  <span class="font-bold text-xl text-rose-gold">{{
                    formatEUR(cartStore.totalCents)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { api } from '@/lib/api';
import { formatEUR } from '@/utils/money';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const cartStore = useCartStore();

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  addressCountry: '',
  addressCity: '',
  postalCode: '',
  addressLine: '',
});

const paymentMethod = ref('card');

const errors = ref<Record<string, string>>({});
const submitError = ref<string | null>(null);
const loading = ref(false);

const orderSuccess = ref(false);
const orderNumber = ref('');
const orderSummary = ref({
  subtotalCents: 0,
  shippingCents: 0,
  totalCents: 0,
});

const validate = (): boolean => {
  errors.value = {};

  if (!form.value.fullName.trim()) {
    errors.value.fullName = t('thisFieldRequired');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = t('enterValidEmail');
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = t('thisFieldRequired');
  }

  if (!form.value.addressCountry) {
    errors.value.addressCountry = t('thisFieldRequired');
  }

  if (!form.value.addressCity.trim()) {
    errors.value.addressCity = t('thisFieldRequired');
  }

  if (!form.value.postalCode.trim()) {
    errors.value.postalCode = t('thisFieldRequired');
  }

  if (!form.value.addressLine.trim()) {
    errors.value.addressLine = t('thisFieldRequired');
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) {
    return;
  }

  if (cartStore.isEmpty) {
    submitError.value = t('cartIsEmpty');
    return;
  }

  loading.value = true;
  submitError.value = null;

  try {
    // Prepare the order data for the API
    // We need to remove the image property from cart items (server doesn't need it)
    const cartItemsForOrder = cartStore.items.map((cartItem) => {
      // Destructure to separate image from other properties
      const { image, ...itemWithoutImage } = cartItem;
      return itemWithoutImage;
    });

    // Create the order by sending the form data and cart items to the API
    const orderResponse = await api.createOrder({
      ...form.value, // Spread all form fields (email, name, address, etc.)
      items: cartItemsForOrder, // Include cart items without images
    });

    // Store the order number and summary for display
    orderNumber.value = orderResponse.orderNumber;
    orderSummary.value = orderResponse.summary;
    // Show the success overlay
    orderSuccess.value = true;

    // Clear the cart since the order has been placed
    cartStore.clear();

    // Scroll to the top of the page so user can see the success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (errorObject) {
    // If order creation fails, show an error message
    submitError.value =
      errorObject instanceof Error ? errorObject.message : t('failedToPlaceOrder');
  } finally {
    // Always set loading back to false, whether success or failure
    loading.value = false;
  }
};
</script>
