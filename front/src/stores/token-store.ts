import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  return { token, setToken }
})
