<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allBooks"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: 'BookTable',
  data(){
    return {
      headers: [
        {
          text: 'Id',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Book Name',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Action',
          sortable: false,
          value: ''
        }
      ]
    }
  },
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