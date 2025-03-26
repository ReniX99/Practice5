<script setup lang="ts">
  import FormButton from '@/components/FormButton.vue'
  import { ref } from 'vue'
  import api from '@/services/axios.ts'
  import { useTokenStore } from '@/stores/token-store'
  import { storeToRefs } from 'pinia'

  const isError = ref(false)
  const textError = ref('')

  const isComplete = ref(false)
  const textComplete = ref('')

  const checkAccess = async () => {
    isError.value = false
    isComplete.value = false
    try {
      const tokenStore = useTokenStore()
      const { token } = storeToRefs(tokenStore)

      const response = await api.get('/protected', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      isComplete.value = true
      textComplete.value = response.data.message
    } catch (err) {
      isError.value = true
      textError.value = err.response.data.message
    }
  }
</script>

<template>
  <article class="border-1 rounded-[8px] p-[20px] self-start">
    <h2 class="text-[20px] mb-[12px] text-center">Проверка доступа</h2>
    <div class="flex flex-col">
      <p v-if="isError" class="mt-[20px] text-[18px] text-red-600 font-medium">{{ textError }}</p>
      <p v-if="isComplete" class="mt-[20px] text-[18px] text-green-600 font-medium">
        {{ textComplete }}
      </p>
      <FormButton @click.prevent="checkAccess">Проверить доступ</FormButton>
    </div>
  </article>
</template>
