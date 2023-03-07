<template>
  <div>
    <h3>Books Dashboard</h3>
    <div class="books">

      
    </div>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: 'BookTable',
  methods: {
    ...mapActions([])
  },
  computed: mapGetters([]),
  created() {
    
  }
}
</script>

<style>

</style>