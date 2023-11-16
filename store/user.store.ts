import { create } from 'zustand'

interface UserState {
    detail: {
        _id: string,
        name: string,
        email: string,
        image: string,
        keys: string,
        keynames: string,
        role: string,
    } | null,
    pin: string,
    initialed: boolean,
    setpin: (s: string)=> void,
    fetch: (pond: string)=> void
}

export const useUserStore = create<UserState>((set) => ({
    detail: null,
    pin: '',
    initialed: false,
    setpin: (s: string)=>set(()=> ({pin: s})),
    fetch: async (pond: string) => {
      set({initialed: true})
      const response = await fetch(pond)
      try {
        const res = await response.json()
      set({ detail: res.data })
      } catch (error) {
        console.log("😅😅😅 user store fetch user info failed 😅😅😅")
      }
      
    },
  }))
export const useCurrentUser = ()=> {
  const host = process.env.NEXT_PUBLIC_APP_HOST
  useUserStore((state)=> !state.detail && !state.initialed && state.fetch(host + '/api/user'))
    const userStore = useUserStore((state)=> state.detail)
    return userStore
}