<template>
  <header class="header">
    <div class="container-ade header-content">
      <!-- Logo -->
      <router-link to="/" class="logo-link">
        <img 
          src="/assets/images/logo-ade.png" 
          alt="ADE logo" 
          title="ADE – All Day Essentials"
          class="logo-image"
        />
      </router-link>

      <!-- Center Navigation -->
      <nav class="nav-center">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ 'nav-link-active': isActive(link.path) }"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Right Utilities -->
      <div class="header-actions">
        <!-- Search -->
        <SearchPill />

        <!-- Language Switcher -->
        <button
          @click="toggleLanguage"
          class="language-btn"
          :title="languageStore.currentLanguage === 'en' ? 'Switch to German' : 'Zu Englisch wechseln'"
        >
          {{ languageStore.currentLanguage === 'en' ? 'EN' : 'DE' }}
        </button>

        <!-- Auth / User -->
        <div v-if="userStore.isLoggedIn" class="user-info">
          <span class="user-greeting">{{ t('hello') }}, {{ userStore.firstName }}</span>
          <button
            @click="handleLogout"
            class="logout-btn"
          >
            {{ t('logout') }}
          </button>
        </div>
        <router-link
          v-else
          to="/auth"
          class="auth-chip"
        >
          <img src="/assets/icons/user.svg" alt="User account icon" class="auth-icon" />
          <span class="auth-text">{{ t('login') }}</span>
        </router-link>

        <!-- Cart -->
        <router-link
          to="/cart"
          class="cart-link"
        >
          <img src="/assets/icons/bag.svg" alt="Shopping bag icon" class="cart-icon" />
          <span
            v-if="cartStore.totalQty > 0"
            class="cart-badge"
          >
            {{ cartStore.totalQty }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';
import { useLanguageStore } from '@/stores/language';
import { useI18n } from '@/composables/useI18n';
import SearchPill from './SearchPill.vue';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const userStore = useUserStore();
const uiStore = useUIStore();
const languageStore = useLanguageStore();
const { t } = useI18n();

const navLinks = computed(() => [
  { label: t('home'), path: '/' },
  { label: t('products'), path: '/products' },
  { label: t('about'), path: '/about' },
  { label: t('contact'), path: '/contact' },
]);

const isActive = (path: string): boolean => {
  return route.path === path;
};

const handleLogout = () => {
  userStore.logout();
  uiStore.showToast(t('loggedOutSuccessfully'), 'info');
  router.push('/');
};

const toggleLanguage = () => {
  languageStore.toggleLanguage();
};
</script>

<style scoped>
.header {
  height: 72px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  padding-left: 12px;
}

.logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-image {
  height: 44px;
}

/* Navigation */
.nav-center {
  display: none;
  align-items: center;
  gap: 20px;
  flex: 0;
  justify-content: flex-start;
}

@media (min-width: 968px) {
  .nav-center {
    display: flex;
  }
}

.nav-link {
  position: relative;
  padding: 8px 6px;
  font-weight: 700;
  font-size: 15px;
  color: var(--deep-black);
  text-decoration: none;
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--rose-gold);
}

.nav-link-active {
  color: var(--rose-gold);
  border-bottom: 3px solid #B76E79;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  margin-left: auto;
}

/* Language Switcher */
.language-btn {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--rose-gold);
  background: white;
  border: 2px solid var(--rose-gold);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 48px;
}

.language-btn:hover {
  color: white;
  background: var(--rose-gold);
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-greeting {
  font-size: 14px;
  font-weight: 600;
  color: var(--deep-black);
}

.logout-btn {
  font-size: 14px;
  font-weight: 600;
  color: var(--rose-gold);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.logout-btn:hover {
  color: var(--rose-gold-dark);
}

/* Auth Chip */
.auth-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.auth-chip:hover {
  background: rgba(0, 0, 0, 0.04);
}

.auth-icon {
  width: 18px;
  height: 18px;
}

.auth-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--deep-black);
  white-space: nowrap;
}

@media (max-width: 968px) {
  .auth-text {
    display: none;
  }
}

/* Cart */
.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.cart-link:hover {
  background: rgba(0, 0, 0, 0.04);
}

.cart-icon {
  width: 24px;
  height: 24px;
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #96284f;
  color: white;
  font-size: 12px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(183, 110, 121, 0.35);
}
</style>
