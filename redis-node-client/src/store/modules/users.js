import axios from 'axios';

const state = {
  users: []
};

const getters = {
  allUsers: (state) => state.users
};
const actions = {
  async fetchUsers({commit}){
    const response = await axios.get('http://localhost:3000/api/user');
    commit('setUsers', response.data.rows)
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users) 
};

export default {
  state, 
  getters,
  actions,
  mutations
};