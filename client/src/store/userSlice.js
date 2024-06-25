import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: "test",
}

export const userSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		login: (state) => {
			state.value = 'non login'
		},
		logout: (state) => {
			state.value = 'nonlogout'
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, login, logout } = userSlice.actions

export default userSlice.reducer
