import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'issues',
  initialState: { meta: null } ,
  reducers: {
    setMeta(state, action) {
        state.meta = action.payload
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

export default slice.reducer

export const { setMeta } = slice.actions

export const selectMeta = (state) => state.issues?.meta
