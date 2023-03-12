<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="readingList"
      :items-per-page="5"
      class="elevation-1">
      <template v-slot:[`item.fullname`]="{ item }">{{ item.user.first_name }} {{ item.user.last_name }}</template>
    </v-data-table>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ReadingList',
  data(){
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Book Name',
          sortable: true,
          value: 'book.name'
        },
        {
          text: 'Reader',
          sortable: true,
          value: 'fullname'
        },
        {
          text: 'Status',
          sortable: true,
          value: 'status'
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
    ...mapActions(['fetchReadingList']),
  },
  computed: {
    ...mapGetters(['readingList']),
    formTitle(){
      return this.editedIndex === -1 ? 'New Assignment' : 'Edit Assignment' 
    }
  },
  watch: {
    dialog(val){
      val || this.close()
    },
    dialogDelete(val){
      val || this.closeDelete();
    }
  },
  created() {
    this.fetchReadingList();
  }
}
</script>

<style>

</style>