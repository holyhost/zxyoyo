import { create } from 'zustand'

interface UserState {
    detail: {
        _id: string,
        name: string,
        email: string,
        image: string,
        keys: string,
        role: string,
    } | null,
    fetch: (pond: string)=> void
}

export const useUserStore = create<UserState>((set) => ({
    detail: null,
    fetch: async (pond: string) => {
      const response = await fetch(pond)
      const res = await response.json()
      set({ detail: res.data })
    },
  }))
export const userCurrentUser = ()=> {
  useUserStore((state)=> !state.detail && state.fetch('/api/user'))
    const userStore = useUserStore((state)=> state.detail)
    return userStore
}