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
    try {
      const response = await axios.put(`http://localhost:3000/api/book/${payload.editedItem.id}`, payload.editedItem);
      commit('editBook', {
        editedIndex: payload.editedIndex,
        ...response
      })
    } catch(error){
      commit('setErrors', error);
    }
  },
  async deleteBook({commit}, payload){
    try {
      await axios.delete(`http://localhost:3000/api/book/${payload.editedItem.id}`)
      commit('deleteBook', {
        editedIndex: payload.editedIndex,
      })
    } catch(error){
      commit('setErrors', error);
    }
  }
}
const mutations = {
  setBooks: (state, books) => {state.books = books},
  setErrors: (state, error) => {state.errors.push(error)},
  newBook: (state, book) => { 
    state.books.push(book)
  },
  editBook: (state, payload) => {
    Object.assign(state.books[payload.editedIndex], payload.data);
  },
  deleteBook: (state, payload) => {
    state.books.splice(payload.editedIndex, 1)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}