import {create} from "zustand";
import {persist} from "zustand/middleware";

const userConfigStoreBase = (set: any, get: any) => ({
  username: '',
  setUsername: (val: string) => set({username: val}),
  password: '',
  setPassword: (val: string) => set({password: val}),
  apiConfig: {
    MODEL: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    BASE_URL: window.mainAPI.get('BASE_URL') || 'https://api.siliconflow.cn/v1',
    API_KEY: window.mainAPI.get('API_KEY') || ''
  },
  setApiConfig: (val: string) => set({apiConfig: val}),
  _hasHydrated: false,
  setHasHydrated: (val: boolean) => set({_hasHydrated: val}),
})
type UserConfig = ReturnType<typeof userConfigStoreBase>

export const userConfigStore = create<UserConfig>(
  persist(
    userConfigStoreBase,
    {
      name: 'user-config',
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            console.log('hydration finished',state)
            state?.setHasHydrated(true)
          }
        }
      }
    }
  )
)


