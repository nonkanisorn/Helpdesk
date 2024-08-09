// import { createSlice } from '@reduxjs/toolkit'
//
// const initialState = {
// 	value: "test",
// 	user: []
// }
//
// export const userSlice = createSlice({
// 	name: 'counter',
// 	initialState,
// 	reducers: {
// 		login: (state, action) => {
// 			state.value = 'non login'
// 			state.user = action.payload
// 		},
// 		logout: (state) => {
// 			state.value = 'nonlogout'
// 		},
// 		incrementByAmount: (state, action) => {
// 			state.value += action.payload
// 		},
// 	},
// })
//
// // Action creators are generated for each case reducer function
// export const { incrementByAmount, login, logout } = userSlice.actions
//
// export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate()
const initialState = {
	username: '',
	role: '',
	token: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			const { username, role, token, name, users_id } = action.payload;
			state.username = username;
			state.role = role;
			state.token = token;
			state.name = name;
			state.users_id = users_id;
			localStorage.setItem('user', JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.username = '';
			state.role = '';
			state.token = '';
			localStorage.removeItem('user');
			// navigate('/login')
		},
		loadUserFromStorage: (state, action) => {
			const userData = action.payload;
			if (userData) {
				state.username = userData.username;
				state.role = userData.role;
				state.token = userData.token;
			}
		}
	}
});

export const { login, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
