<template>
  <div>
    <h3>Users Dashboard</h3>
    <div class="users">

      <div v-for="user in allUsers" :key="user.id" class="user">
        {{user.id}} | {{ user.first_name }} | {{user.last_name}} |  {{user.email}}
      </div>
    </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
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