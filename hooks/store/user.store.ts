import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';

export type UserState = {
    uid: string,
    token: string,
    validation: number,
    image?: string,
    username?: string,
    email?: string
}

type UserStore = {
    info: UserState | undefined,
    update: (props: UserState) => void
}

const useCurrentUser = create<UserStore>(set => ({
    info: undefined,
    update: (props) => set(state => ({ info: props })),
  }))

export default useCurrentUser