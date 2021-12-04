<template>
  <ad-page>
    <!-- Title -->
    <template #header>Register</template>

    <!-- Form -->
    <ad-input id="register-user" label="User" type="text" />
    <ad-input id="register-email" label="Email" type="email" />
    <ad-input id="register-password" label="Password" type="password" />
    <ad-button variant="primary" class="mt-3" type="submit"> Register </ad-button>

    <!-- Footer -->
    <template #footer>
      <span>Already Registered?</span>
      <router-link :to="{ name: 'login' }" class="text-decoration-none text-dark mx-2">
        <strong>Login Now</strong>
      </router-link>
    </template>
  </ad-page>
</template>
