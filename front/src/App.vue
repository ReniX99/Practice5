<script setup lang="ts">
  import RegisterForm from '@/components/RegisterForm.vue'
  import LoginForm from '@/components/LoginForm.vue'
  import CheckAccessForm from '@/components/CheckAccessForm.vue'
</script>

<template>
  <main>
    <div class="max-w-[1200px] py-[40px] mx-auto grid grid-cols-3 gap-[60px]">
      <RegisterForm />
      <LoginForm />
      <CheckAccessForm />
    </div>
  </main>
</template>
