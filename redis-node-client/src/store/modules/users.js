import axios from 'axios';

const state = {
  users: [],
  errors: []
};

const getters = {
  allUsers: (state) => state.users
};
const actions = {
  async fetchUsers({commit}){
    const response = await axios.get('http://localhost:3000/api/user');
    commit('setUsers', response.data.rows)
  },
  async addUser({commit}, payload){
    try {
      const response = await axios.post('http://localhost:3000/api/user', payload);
      commit('newUser', response.data)
    } catch(error){
      commit('setErrors', error)
    }
  },
  async editBook({commit}, payload){
    try {
      const response = await axios.put(`http://localhost:3000/api/user/${payload.editedItem.id}`, payload.editedItem);
      commit('editUser', {
        editedIndex: payload.editedIndex,
        ...response
      })
    } catch(error){
      commit('setErrors', error);
    }
  },
  async deleteBook({commit}, payload){
    try {
      await axios.delete(`http://localhost:3000/api/user/${payload.editedItem.id}`)
      commit('deleteUser', {
        editedIndex: payload.editedIndex,
      })
    } catch(error){
      commit('setErrors', error);
    }
  }
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setErrors: (state, error) => {state.errors.push(error)},
  newUser: (state, user) => { 
    state.users.push(user)
  },
  editBook: (state, payload) => {
    Object.assign(state.users[payload.editedIndex], payload.data);
  },
  deleteBook: (state, payload) => {
    state.users.splice(payload.editedIndex, 1)
  } 
};

export default {
  state, 
  getters,
  actions,
  mutations
};