import { create } from 'zustand'
import { createUserSlice, UserSlice } from './user'

export const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}))
