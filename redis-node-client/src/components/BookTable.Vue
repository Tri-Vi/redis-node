<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allBooks"
      :items-per-page="5"
      class="elevation-1">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="fetchBooks"
        >
          Reset
        </v-btn>
      </template>
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
          text: 'Actions',
          sortable: false,
          value: 'actions'
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