<template>
  <div class="min-h-screen bg-off-white py-12">
    <div class="max-w-[1000px] mx-auto px-6">
      <!-- Heading Section -->
      <div class="text-center mb-12">
        <h1 class="font-playfair text-5xl font-bold text-rose-gold mb-4">
          {{ t('getInTouch') }}
        </h1>
        <p class="text-lg text-gray-text max-w-[600px] mx-auto" style="line-height: 1.6;">
          {{ t('contactIntro') }}
        </p>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left column – Contact form -->
        <div class="card p-10">
          <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-6">
            {{ t('sendUsMessage') }}
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-semibold mb-2">{{ t('name') }} *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input"
                placeholder="Jane Doe"
              />
            </div>

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
            </div>

            <div>
              <label for="message" class="block text-sm font-semibold mb-2">{{ t('message') }} *</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="input"
                :placeholder="t('howCanWeHelp')"
              ></textarea>
            </div>

            <button type="submit" :disabled="loading" class="btn-cta w-100">
              {{ loading ? t('sending') : t('sendMessage') }}
            </button>
          </form>
        </div>

        <!-- Right column – Contact details -->
        <div 
          class="rounded-2xl p-10 flex flex-col gap-6"
          style="background: linear-gradient(135deg, var(--soft-pink), rgba(251,233,236,.6));"
        >
          <h2 class="font-playfair text-3xl font-bold text-rose-gold">
            {{ t('ourStudio') }}
          </h2>

          <!-- Detail items -->
          <div class="flex flex-col gap-6">
            <div>
              <div 
                class="text-sm font-bold text-rose-gold mb-2"
                style="text-transform: uppercase; letter-spacing: 0.5px;"
              >
                {{ t('email') }}
              </div>
              <a
                href="mailto:hello@ade.beauty"
                class="text-base text-gray-text font-semibold hover:opacity-80 transition-opacity"
                style="line-height: 1.6; color: var(--rose-gold);"
              >
                hello@ade.beauty
              </a>
            </div>

            <div>
              <div 
                class="text-sm font-bold text-rose-gold mb-2"
                style="text-transform: uppercase; letter-spacing: 0.5px;"
              >
                {{ t('location') }}
              </div>
              <p class="text-base text-gray-text" style="line-height: 1.6;">
                {{ t('berlinGermany') }}
              </p>
            </div>

            <div>
              <div 
                class="text-sm font-bold text-rose-gold mb-2"
                style="text-transform: uppercase; letter-spacing: 0.5px;"
              >
                {{ t('hours') }}
              </div>
              <p class="text-base text-gray-text" style="line-height: 1.6;">
                {{ t('businessHours') }}<br />
                {{ t('sundayClosed') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUIStore } from '@/stores/ui';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const uiStore = useUIStore();

const form = ref({
  name: '',
  email: '',
  message: '',
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  uiStore.showToast(t('thanksGetBack'), 'success');

  // Reset form
  form.value = {
    name: '',
    email: '',
    message: '',
  };

  loading.value = false;
};
</script>
