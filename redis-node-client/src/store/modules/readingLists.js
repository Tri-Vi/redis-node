import axios from 'axios';

const state = {
  readingList: [],
  errors: []
};

const getters = {
  readingList: (state) => state.readingList
};
const actions = {
  async fetchReadingList({commit}){
    const response = await axios.get('http://localhost:3000/api/readingList');
    console.log(response);
    commit('setReadingList', response.data.rows)
  },
};

const mutations = {
  setReadingList: (state, readingList) => {
    console.log(readingList);
    state.readingList = readingList
  },
  setErrors: (state, error) => {state.errors.push(error)},
};

export default {
  state, 
  getters,
  actions,
  mutations
};