import axios from 'axios';
import jwtDecode from 'jwt-decode';

const state = {
  token: null,
  user: null
}

const getters = {
  
}

const actions = {
  async login({commit}, {username, password}){
    try {
      const response = await axios.post('/api/login', {username, password});
      const token = response.data.token;
      const user = jwtDecode(token);
      // Set the JWT token in the request headers for subsequent requests
      axios.defaults.headers.common['Authorization'] = token;

      // Redirect or perform any necessary action after successful login
      // ...

      commit('setToken', token);
      commit('setUser', user);
      return { success: true }
    } catch (error){
      return {
        success: false,
        error: error.response.data.error
      }
    }
  },

  async register({commit}, {username, password}){
    try {
      const response = await axios.post('/api/register', {username, password});
      const token = response.data.token;
      const user = jwtDecode(token);
      commit('setToken', token);
      commit('setUser', user);

      // Redirect or perform any necessary action after successful login
      // ...
      return {
        success: true
      }
    } catch (error){
      return {
        success: false,
        error: error.response.data.error
      }
    }
  },

  async logout({commit}){
    await axios.post('/api/logout');
    // Clear the JWT token from the request headers
    delete axios.defaults.headers.common['Authorization'];
    commit('clearAuthData')
  }
}
const mutations = {
  setToken(state, token){
    state.token = token;

    // Store the token in localStorage
    localStorage.setItem('token', token)
  },
  setUser(state, user){
    state.user = user;
  },
  clearAuthData(state){
    state.user = null;
    state.token = null;
    localStorage.removeItem('token');
  }


}
export default {
  state,
  getters,
  actions,
  mutations
}
