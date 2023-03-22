import axios from 'axios';

const state = {
  readingList: [],
  errors: []
};

const getters = {
  readingList: (state) => state.readingList,
  readingListErrors: (state) => state.errors
};
const actions = {
  async fetchReadingList({commit}){
    const response = await axios.get('http://localhost:3000/api/readingList');
    commit('setReadingList', response.data.rows)
  },
  async addAssignment({commit}, payload){
    try {
      const response = await axios.post('http://localhost:3000/api/readingList', payload);
      commit('newAssignment', response.data)
    } catch(error){
      commit('setErrors', error)
    }
  },
  async editAssignment({commit}, payload){
    try {
      const response = await axios.put(`http://localhost:3000/api/readingList/${payload.editedItem.id}`, payload.editedItem);
      
      commit('editAssignment', {
        editedIndex: payload.editedIndex,
        ...response.data
      })
    } catch(error){
      commit('setErrors', error);
    }
  },
  async deleteAssignment({commit}, payload){
    try {
      await axios.delete(`http://localhost:3000/api/readingList/${payload.editedItem.id}`)
      commit('deleteAssignment', {
        editedIndex: payload.editedIndex,
      })
    } catch(error){
      commit('setErrors', error);
    }
  }
};

const mutations = {
  setReadingList: (state, readingList) => {
    state.readingList = readingList
  },
  setErrors: (state, error) => {state.errors.push(error)},
  newAssignment: (state, assignment) => {state.readingList.push(assignment)},
  editAssignment: (state, payload) => {
    Object.assign(state.readingList[payload.editedIndex], payload);
  },
  deleteAssignment: (state, payload) => {
    state.readingList.splice(payload.editedIndex, 1)
  }

};

export default {
  state, 
  getters,
  actions,
  mutations
};