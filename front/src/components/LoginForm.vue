<script setup lang="ts">
  import FormButton from '@/components/FormButton.vue'
  import { ref } from 'vue'
  import api from '@/services/axios.ts'
  import { useTokenStore } from '@/stores/token-store'

  const formData = ref({
    login: '',
    password: '',
  })

  const isError = ref(false)
  const textError = ref('')

  const isComplete = ref(false)
  const textComplete = ref('')

  const handleForm = async () => {
    isError.value = false
    isComplete.value = false

    if (formData.value.login === '' || formData.value.password === '') {
      isError.value = true
      textError.value = 'Заполните все поля!'
      return
    }

    try {
      const requestBody = {
        login: formData.value.login,
        password: formData.value.password,
      }

      const response = await api.post('/login', { ...requestBody })

      isComplete.value = true
      textComplete.value = response.data.message

      const tokenStore = useTokenStore()
      tokenStore.setToken(response.data.token)
    } catch (err) {
      isError.value = true
      textError.value = err.response.data.message
    }
  }
</script>

<template>
  <article class="border-1 rounded-[8px] p-[20px] self-start">
    <h2 class="text-[20px] mb-[12px] text-center">Вход</h2>
    <form class="flex flex-col">
      <div class="flex flex-col gap-[20px]">
        <div class="flex flex-col gap-[12px]">
          <label for="register" class="text-[18px]">Логин</label>
          <input
            v-model="formData.login"
            type="text"
            name="register"
            class="border-1 rounded-[6px] px-[8px] py-[2px] text-[16px]"
            required
          />
        </div>

        <div class="flex flex-col gap-[12px]">
          <label for="password" class="text-[18px]">Пароль</label>
          <input
            v-model="formData.password"
            type="password"
            name="password"
            class="border-1 rounded-[6px] px-[8px] py-[2px] text-[16px]"
            required
          />
        </div>
      </div>
      <p v-if="isError" class="mt-[20px] text-[18px] text-red-600 font-medium">{{ textError }}</p>
      <p v-if="isComplete" class="mt-[20px] text-[18px] text-green-600 font-medium">
        {{ textComplete }}
      </p>
      <FormButton @click.prevent="handleForm">Войти</FormButton>
    </form>
  </article>
</template>
