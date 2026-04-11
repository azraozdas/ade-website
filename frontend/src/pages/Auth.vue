<template>
  <div class="min-h-screen bg-off-white py-12">
    <div class="container-ade">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Sign In Form -->
        <div class="card p-10">
          <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-6">{{ t('signIn') }}</h2>

          <form @submit.prevent="handleLogin" novalidate class="space-y-4">
            <div>
              <label for="login-email" class="block text-sm font-semibold mb-2">{{ t('email') }}</label>
              <input
                id="login-email"
                v-model="loginForm.email"
                type="email"
                class="input"
                :class="{ 'border-red-500': loginErrors.email }"
                placeholder="you@example.com"
                @blur="validateLoginEmail"
              />
              <p v-if="loginErrors.email" class="text-xs text-red-500 mt-1">
                {{ loginErrors.email }}
              </p>
            </div>

            <div>
              <label for="login-password" class="block text-sm font-semibold mb-2">{{ t('password') }}</label>
              <input
                id="login-password"
                v-model="loginForm.password"
                type="password"
                class="input"
                :class="{ 'border-red-500': loginErrors.password }"
                placeholder="••••••••"
                @blur="validateLoginPassword"
              />
              <p v-if="loginErrors.password" class="text-xs text-red-500 mt-1">
                {{ loginErrors.password }}
              </p>
            </div>

            <p v-if="loginError" class="text-sm text-red-500">{{ loginError }}</p>

            <button type="submit" :disabled="loginLoading" class="btn-cta w-100">
              {{ loginLoading ? t('signingIn') : t('signIn') }}
            </button>

            <button
              type="button"
              @click="showForgotModal = true"
              class="text-sm text-rose-gold hover:text-rose-gold-dark transition-colors font-semibold"
            >
              {{ t('forgotPassword') }}
            </button>
          </form>
        </div>

        <!-- Create Account Form -->
        <div class="card p-10">
          <h2 class="font-playfair text-3xl font-bold text-rose-gold mb-6">{{ t('createAccount') }}</h2>

          <form @submit.prevent="handleRegister" novalidate class="space-y-4">
            <div class="form-2">
              <div>
                <label for="reg-firstname" class="block text-sm font-semibold mb-2"
                  >{{ t('firstName') }}</label
                >
                <input
                  id="reg-firstname"
                  v-model="registerForm.firstName"
                  type="text"
                  class="input"
                  :class="{ 'border-red-500': registerErrors.firstName }"
                  placeholder="Jane"
                  @blur="validateRegisterFirstName"
                />
                <p v-if="registerErrors.firstName" class="text-xs text-red-500 mt-1">
                  {{ registerErrors.firstName }}
                </p>
              </div>
              <div>
                <label for="reg-lastname" class="block text-sm font-semibold mb-2">{{ t('lastName') }}</label>
                <input
                  id="reg-lastname"
                  v-model="registerForm.lastName"
                  type="text"
                  class="input"
                  :class="{ 'border-red-500': registerErrors.lastName }"
                  placeholder="Doe"
                  @blur="validateRegisterLastName"
                />
                <p v-if="registerErrors.lastName" class="text-xs text-red-500 mt-1">
                  {{ registerErrors.lastName }}
                </p>
              </div>
            </div>

            <div>
              <label for="reg-email" class="block text-sm font-semibold mb-2">{{ t('email') }}</label>
              <input
                id="reg-email"
                v-model="registerForm.email"
                type="email"
                class="input"
                :class="{ 'border-red-500': registerErrors.email }"
                placeholder="you@example.com"
                @blur="validateRegisterEmail"
              />
              <p v-if="registerErrors.email" class="text-xs text-red-500 mt-1">
                {{ registerErrors.email }}
              </p>
            </div>

            <div>
              <label for="reg-password" class="block text-sm font-semibold mb-2">{{ t('password') }}</label>
              <input
                id="reg-password"
                v-model="registerForm.password"
                type="password"
                class="input"
                :class="{ 'border-red-500': registerErrors.password }"
                :placeholder="t('minPasswordRequirement')"
                @blur="validateRegisterPassword"
              />
              <p v-if="registerErrors.password" class="text-xs text-red-500 mt-1">
                {{ registerErrors.password }}
              </p>
            </div>

            <div class="flex items-start space-x-2">
              <input
                id="privacy"
                v-model="registerForm.agreeToPrivacy"
                type="checkbox"
                class="mt-1"
              />
              <label for="privacy" class="text-sm text-gray-muted">
                {{ t('agreeToPrivacy') }} 
                <router-link to="/privacy" class="text-rose-gold font-semibold hover:text-rose-gold-dark">
                  {{ t('privacyPolicy') }}
                </router-link> 
                {{ t('gdpr') }}
              </label>
            </div>
            <p v-if="registerErrors.agreeToPrivacy" class="text-xs text-red-500">
              {{ registerErrors.agreeToPrivacy }}
            </p>

            <p v-if="registerError" class="text-sm text-red-500">{{ registerError }}</p>

            <button type="submit" :disabled="registerLoading" class="btn-cta w-100">
              {{ registerLoading ? t('creatingAccount') : t('createAccount') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <Modal :isOpen="showForgotModal" :title="t('resetPassword')" @close="closeForgotModal">
      <form @submit.prevent="handleForgotPassword" novalidate class="space-y-4">
        <p class="text-sm text-gray-text mb-4" style="line-height: 1.6;">
          {{ t('enterEmailReset') }}
        </p>

        <div>
          <label for="forgot-email" class="block text-sm font-semibold mb-2">{{ t('email') }}</label>
          <input
            id="forgot-email"
            v-model="forgotEmail"
            type="email"
            class="input"
            :class="{ 'border-red-500': forgotErrors.email }"
            placeholder="you@example.com"
            @blur="validateForgotEmail"
          />
          <p v-if="forgotErrors.email" class="text-xs text-red-500 mt-1">
            {{ forgotErrors.email }}
          </p>
        </div>

        <p v-if="forgotSuccess" class="text-sm text-green-600">
          {{ t('checkInboxReset') }}
        </p>

        <button type="submit" :disabled="forgotLoading" class="btn-cta w-100">
          {{ forgotLoading ? t('sending') : t('sendResetLink') }}
        </button>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useUIStore } from '@/stores/ui';
import { api } from '@/lib/api';
import Modal from '@/components/Modal.vue';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const router = useRouter();
const userStore = useUserStore();
const uiStore = useUIStore();

// Login form
const loginForm = ref({
  email: '',
  password: '',
});
const loginErrors = ref<Record<string, string>>({});
const loginError = ref<string | null>(null);
const loginLoading = ref(false);

// Register form
const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeToPrivacy: false,
});
const registerErrors = ref<Record<string, string>>({});
const registerError = ref<string | null>(null);
const registerLoading = ref(false);

// Forgot password
const showForgotModal = ref(false);
const forgotEmail = ref('');
const forgotErrors = ref<Record<string, string>>({});
const forgotSuccess = ref(false);
const forgotLoading = ref(false);

// Login validation
const validateLoginEmail = () => {
  if (!loginForm.value.email.trim()) {
    loginErrors.value.email = t('thisFieldRequired');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginForm.value.email)) {
      loginErrors.value.email = t('enterValidEmail');
    } else {
      delete loginErrors.value.email;
    }
  }
};

const validateLoginPassword = () => {
  if (!loginForm.value.password.trim()) {
    loginErrors.value.password = t('thisFieldRequired');
  } else {
    delete loginErrors.value.password;
  }
};

const validateLogin = (): boolean => {
  loginErrors.value = {};
  validateLoginEmail();
  validateLoginPassword();
  return Object.keys(loginErrors.value).length === 0;
};

const handleLogin = async () => {
  loginError.value = null;
  
  if (!validateLogin()) {
    uiStore.showToast(t('pleaseFillRequiredFields'), 'error');
    return;
  }

  loginLoading.value = true;

  try {
    await userStore.login(loginForm.value);
    uiStore.showToast(`${t('welcomeBack')}, ${userStore.firstName}!`, 'success');
    router.push('/');
  } catch (err) {
    loginError.value = t('wrongEmailOrPassword');
  } finally {
    loginLoading.value = false;
  }
};

// Register validation
const validateRegisterFirstName = () => {
  if (!registerForm.value.firstName.trim()) {
    registerErrors.value.firstName = t('thisFieldRequired');
  } else {
    delete registerErrors.value.firstName;
  }
};

const validateRegisterLastName = () => {
  if (!registerForm.value.lastName.trim()) {
    registerErrors.value.lastName = t('thisFieldRequired');
  } else {
    delete registerErrors.value.lastName;
  }
};

const validateRegisterEmail = () => {
  if (!registerForm.value.email.trim()) {
    registerErrors.value.email = t('thisFieldRequired');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.value.email)) {
      registerErrors.value.email = t('enterValidEmail');
    } else {
      delete registerErrors.value.email;
    }
  }
};

const validateRegisterPassword = () => {
  if (!registerForm.value.password.trim()) {
    registerErrors.value.password = t('thisFieldRequired');
  } else if (registerForm.value.password.length < 8) {
    registerErrors.value.password = t('passwordMinLength');
  } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(registerForm.value.password)) {
    registerErrors.value.password = t('passwordRequirement');
  } else {
    delete registerErrors.value.password;
  }
};

const validateRegister = (): boolean => {
  registerErrors.value = {};
  validateRegisterFirstName();
  validateRegisterLastName();
  validateRegisterEmail();
  validateRegisterPassword();
  
  if (!registerForm.value.agreeToPrivacy) {
    registerErrors.value.agreeToPrivacy = t('mustAgreeToPrivacy');
  } else {
    delete registerErrors.value.agreeToPrivacy;
  }
  
  return Object.keys(registerErrors.value).length === 0;
};

const handleRegister = async () => {
  registerError.value = null;
  
  if (!validateRegister()) {
    uiStore.showToast(t('pleaseFillRequiredFields'), 'error');
    return;
  }

  registerLoading.value = true;

  try {
    await userStore.register(registerForm.value);
    uiStore.showToast(t('accountCreatedWelcome'), 'success');
    router.push('/');
  } catch (err) {
    registerError.value =
      err instanceof Error ? err.message : t('registrationFailed');
  } finally {
    registerLoading.value = false;
  }
};

// Forgot password validation
const validateForgotEmail = () => {
  if (!forgotEmail.value.trim()) {
    forgotErrors.value.email = t('thisFieldRequired');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail.value)) {
      forgotErrors.value.email = t('enterValidEmail');
    } else {
      delete forgotErrors.value.email;
    }
  }
};

const validateForgot = (): boolean => {
  forgotErrors.value = {};
  validateForgotEmail();
  return Object.keys(forgotErrors.value).length === 0;
};

const handleForgotPassword = async () => {
  forgotSuccess.value = false;
  
  if (!validateForgot()) {
    return;
  }

  forgotLoading.value = true;

  try {
    await api.forgotPassword({ email: forgotEmail.value });
    forgotSuccess.value = true;
    setTimeout(() => {
      closeForgotModal();
    }, 2000);
  } catch (err) {
    console.error(err);
  } finally {
    forgotLoading.value = false;
  }
};

const closeForgotModal = () => {
  showForgotModal.value = false;
  forgotEmail.value = '';
  forgotErrors.value = {};
  forgotSuccess.value = false;
};
</script>
