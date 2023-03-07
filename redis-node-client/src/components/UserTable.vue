<template>
  <div>
    <h3>Users Dashboard</h3>
    <div class="users">

      <div v-for="user in allUsers" :key="user.id" class="user">
        {{ user.first_name }}
      </div>
    </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: "Users",
  methods: {
    ...mapActions['fetchUsers']
  },
  computed: mapGetters(['allUsers']),
  created() {
    this.fetchUsers();
  }
}
</script>

<style>

</style>