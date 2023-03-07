<template>
  <div>
    <h3>Books Dashboard</h3>
    <div class="books">
      <div v-for="book in allBooks" :key="book.id">
        {{book.id}} | {{book.name}}
      </div>
    </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: 'BookTable',
  methods: {
    ...mapActions(['fetchBooks'])
  },
  computed: mapGetters(['allBooks']),
  created() {
    this.fetchBooks();
  }
}
</script>

<style>

</style>