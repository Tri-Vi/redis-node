<template>
  <div>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    async register() {
      const { success, error } = await this.register({
        username: this.username,
        password: this.password
      });
      if (success) {
        // Redirect or perform any necessary action after successful registration
      } else {
        console.log('Registration failed:', error);
      }
    }
  }
};
</script>