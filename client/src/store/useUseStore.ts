import { create } from 'zustand'

interface UserProfile {
    email: string,
    name: string,
    businessName?: string,
    businessAddress?: string,
    defaultCurrency?: string,
    logoUrl?: string,
}

interface UserStore {
    userProfile: UserProfile | null
    setUserProfile: (profile: UserProfile | null) => void
    clearUserProfile:() => void
}

export const useUserStore = create<UserStore>((set) => ({
    userProfile: null,
    setUserProfile: (profile) => set({ userProfile: profile }),
    clearUserProfile: () => set({ userProfile: null })
}))

