import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  authUser: {
    userId: string,
    accessToken: string,
    email: string,
    avatar: string,
    username: string,
  },
}

const initialState: UserState = {
  authUser: {
    userId: "",
    accessToken: "",
    email: "",
    avatar: "",
    username: "",
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAuthUser: (state, action: PayloadAction<any>) => {
      state.authUser = action.payload
    },
  },
})

export const { updateAuthUser } = userSlice.actions

export default userSlice.reducer