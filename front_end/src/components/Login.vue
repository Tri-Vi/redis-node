<template>
  <div>
    <input v-model="username" type="text" placeholder="Username"/>
    <input v-model="password" type="password" placeholder="Password" /> 
    <button @click="login"><button>
  </div>
</template>
<script>
import {mapActions} from vuex;

export default {
  data(){
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      const { success, error } = await this.login({
        username: this.username,
        password: this.password
      });

      if(success){
        // Redirect or perform any necessary action after successful login
      } else {
        console.log('Login failed:' , error);
      }
    }
  }
}
</script>