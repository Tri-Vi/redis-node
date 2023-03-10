import axios from 'axios';

const state = {
  books: [],
  errors: [],
}

const getters = {
  allBooks: state => state.books,
  errors: state => state.errors
}
const actions = {
  async fetchBooks({commit}){
    try {
      const response = await axios.get('http://localhost:3000/api/book');
      commit('setBooks', response.data.rows)
    } catch(error){
      commit('setErrors', error);
    }
  },
  async addBook({commit}, payload){
    try {
      const response = await axios.post('http://localhost:3000/api/book', payload);
      commit('newBook', response.data)
    } catch(error){
      commit('setErrors', error)
    }
  },
  async editBook({commit}, payload){
    const response = await axios.put('http://localhost:3000/api/book', payload);
    commit('testMutation', response)
  }
}
const mutations = {
  setBooks: (state, books) => {state.books = books},
  setErrors: (state, error) => {state.errors.push(error)},
  testMutation: (state, payload) => {console.log(payload)},
  newBook: (state, book) => { 
    state.books.push(book)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}