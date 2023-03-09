<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allUsers"
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
          @click="fetchUsers"
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
  data(){
    return {
      headers: [
        {
          text: 'Id',
          sortable: true,
          value: 'id'
        },
        {
          text: 'First Name',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Last Name',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Email',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Action',
          sortable: false,
          value: 'actions'
        },
      ]
    }
  },
  methods: {
    ...mapActions(['fetchUsers'])
  },
  computed: {
    ...mapGetters(['allUsers'])
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>

</style>