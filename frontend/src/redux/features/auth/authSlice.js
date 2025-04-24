import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { User } from '../../app/services/auth'
// import type { RootState } from '../../app/store'

// type AuthState = {
//   user: User | null
//   token: string | null
// }

const slice = createSlice({
  name: 'auth',
  initialState: { activeRole: null } ,
  reducers: {
    setActiveRole(state, action) {
        state.activeRole = action.payload
     },
    // setCredentials: (
    //   state,
    //   {
    //     payload: { user, token },
    //   }: PayloadAction<{ user: User; token: string }>,
    // ) => {
    //   state.user = user
    //   state.token = token
    // },
  },
})

export const { setActiveRole } = slice.actions

export default slice.reducer

export const selectActiveRole = (state) => state.auth?.activeRole
