import Vuex from 'vuex';
import Vue from 'vue';
import users from './modules/users';
import books from './modules/books'
import readingLists from './modules/readingLists';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    users,
    books,
    readingLists
  }
})
