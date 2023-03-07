import axios from 'axios';

const state = {
  books: []
}

const getters = {
  allBooks: state => state.books
}
const actions = {
  async fetchBooks({commit}){
    const response = await axios.get('http://localhost:3000/api/book');
    commit('setBooks', response.data.rows)
  }
}
const mutations = {
  setBooks: (state, books) => {state.books = books}
}
export default {
  state,
  getters,
  actions,
  mutations
}