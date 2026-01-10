<template>
  <div class="min-h-screen bg-off-white py-12">
    <div class="container-ade">
      <div class="max-w-[800px] mx-auto card p-12">
        <!-- Main heading -->
        <h1 class="font-playfair text-5xl font-bold text-rose-gold mb-6">
          {{ t('privacyPolicyTitle') }}
        </h1>

        <!-- Date -->
        <p class="text-gray-text mb-8">
          {{ t('lastUpdated') }}
        </p>

        <!-- Sections -->
        <div class="space-y-8">
          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('introduction') }}
            </h2>
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ t('introductionText') }}
            </p>
          </section>

          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('dataWeCollect') }}
            </h2>
            <p class="text-base text-gray-text mb-4" style="line-height: 1.7;">
              {{ t('dataWeCollectIntro') }}
            </p>
            <ul class="ml-6 space-y-2 text-base text-gray-text" style="line-height: 1.7; list-style-type: disc;">
              <li>{{ t('dataWeCollectIdentity') }}</li>
              <li>{{ t('dataWeCollectContact') }}</li>
              <li>{{ t('dataWeCollectTransaction') }}</li>
              <li>{{ t('dataWeCollectTechnical') }}</li>
            </ul>
          </section>

          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('howWeUseData') }}
            </h2>
            <p class="text-base text-gray-text mb-4" style="line-height: 1.7;">
              {{ t('howWeUseDataIntro') }}
            </p>
            <ul class="ml-6 space-y-2 text-base text-gray-text" style="line-height: 1.7; list-style-type: disc;">
              <li>{{ t('howWeUseDataRegister') }}</li>
              <li>{{ t('howWeUseDataProcess') }}</li>
              <li>{{ t('howWeUseDataManage') }}</li>
              <li>{{ t('howWeUseDataImprove') }}</li>
              <li>{{ t('howWeUseDataRecommend') }}</li>
            </ul>
          </section>

          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('dataSecurity') }}
            </h2>
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ t('dataSecurityText') }}
            </p>
          </section>

          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('yourLegalRights') }}
            </h2>
            <p class="text-base text-gray-text mb-4" style="line-height: 1.7;">
              {{ t('yourLegalRightsIntro') }}
            </p>
            <ul class="ml-6 space-y-2 text-base text-gray-text" style="line-height: 1.7; list-style-type: disc;">
              <li>{{ t('rightAccess') }}</li>
              <li>{{ t('rightCorrection') }}</li>
              <li>{{ t('rightErasure') }}</li>
              <li>{{ t('rightObject') }}</li>
              <li>{{ t('rightRestriction') }}</li>
              <li>{{ t('rightTransfer') }}</li>
              <li>{{ t('rightWithdraw') }}</li>
            </ul>
          </section>

          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('cookies') }}
            </h2>
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ t('cookiesText') }}
            </p>
          </section>

          <section>
            <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-4">
              {{ t('contact') }}
            </h2>
            <p class="text-base text-gray-text" style="line-height: 1.7;">
              {{ t('contactUsPrivacy') }} 
              <a href="mailto:hello@ade.beauty" class="text-rose-gold font-semibold hover:text-rose-gold-dark">
                hello@ade.beauty
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>

