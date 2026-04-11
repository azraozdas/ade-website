<template>
  <div class="min-h-screen bg-off-white">
    <!-- Top Hero Section -->
    <section class="py-12">
      <div class="container-ade">
        <div class="card p-8 mb-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left column (text) -->
            <div class="flex flex-col justify-center">
              <h1 class="font-playfair text-5xl font-bold text-rose-gold mb-6">
                {{ t('allDayAllEssentialAllYou') }}
              </h1>
              <p class="text-lg text-gray-text" style="line-height: 1.6;">
                {{ t('aboutDescription') }}
              </p>
            </div>

            <!-- Right column (image) -->
            <div class="rounded-2xl overflow-hidden">
              <img 
                src="/assets/images/hero-model.jpg" 
                alt="ADE campaign model in soft pink lighting"
                title="ADE Campaign Hero"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <!-- Mission Section (middle) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Our Philosophy -->
          <div class="card p-8">
            <h2 class="font-playfair text-4xl font-bold text-rose-gold mb-4">
              {{ t('ourPhilosophy') }}
            </h2>
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ t('philosophyDescription') }}
            </p>
          </div>

          <!-- Our Mission -->
          <div class="card p-8">
            <h2 class="font-playfair text-4xl font-bold text-rose-gold mb-4">
              {{ t('ourMission') }}
            </h2>
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ t('missionDescription') }}
            </p>
          </div>
        </div>

        <!-- CTA Section (bottom) -->
        <div class="card p-12 text-center">
          <p class="text-lg text-gray-text mb-6">
            {{ t('haveQuestions') }}
          </p>
          <router-link to="/contact" class="btn-cta">{{ t('contactUs') }}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>
