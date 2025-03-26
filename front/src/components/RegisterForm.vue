<script setup lang="ts">
  import FormButton from '@/components/FormButton.vue'
  import { ref } from 'vue'
  import api from '@/services/axios.ts'

  const formData = ref({
    login: '',
    password: '',
    repeatPassword: '',
  })

  const isError = ref(false)
  const textError = ref('')

  const isComplete = ref(false)
  const textComplete = ref('')

  const handleForm = async () => {
    isError.value = false
    isComplete.value = false

    if (
      formData.value.login === '' ||
      formData.value.password === '' ||
      formData.value.repeatPassword === ''
    ) {
      isError.value = true
      textError.value = 'Заполните все поля!'
      return
    }

    if (formData.value.password !== formData.value.repeatPassword) {
      isError.value = true
      textError.value = 'Пароли не совпадают!'
      return
    }

    try {
      const requestBody = {
        login: formData.value.login,
        password: formData.value.password,
      }

      const response = await api.post('/register', { ...requestBody })

      isComplete.value = true
      textComplete.value = response.data.message
    } catch (err) {
      isError.value = true
      textError.value = err.response.data.message
    }
  }
</script>

<template>
  <article class="border-1 rounded-[8px] p-[20px]">
    <h2 class="text-[20px] mb-[12px] text-center">Регистрация</h2>
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

        <div class="flex flex-col gap-[12px]">
          <label for="repeatedPassword" class="text-[18px]">Повторить пароль</label>
          <input
            v-model="formData.repeatPassword"
            type="password"
            name="repeatedPassword"
            class="border-1 rounded-[6px] px-[8px] py-[2px] text-[16px]"
            required
          />
        </div>
      </div>
      <p v-if="isError" class="mt-[20px] text-[18px] text-red-600 font-medium">{{ textError }}</p>
      <p v-if="isComplete" class="mt-[20px] text-[18px] text-green-600 font-medium">
        {{ textComplete }}
      </p>
      <FormButton @click.prevent="handleForm">Зарегистрироваться</FormButton>
    </form>
  </article>
</template>
