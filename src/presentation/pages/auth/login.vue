<template>
  <ad-page>
    <!-- Title -->
    <template #header>Login</template>

    <!-- Form -->
    <ad-input id="login-email" label="Email" type="email" />
    <ad-input id="login-password" label="Password" type="password" />
    <ad-button variant="primary" class="mt-3" type="submit"> Login </ad-button>

    <!-- Footer -->
    <template #footer>
      <span>Don't have a account?</span>
      <router-link to="" class="text-decoration-none text-dark mx-2">
        <strong>Register Now</strong>
      </router-link>
    </template>
  </ad-page>
</template>
