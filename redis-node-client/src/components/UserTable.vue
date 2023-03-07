<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allUsers"
      :items-per-page="5"
      class="elevation-1"
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
          value: ''
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