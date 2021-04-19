<template>
<div v-if="!isLoading && !populated" class="alert alert-danger" role="alert">
  No competition is selected <a href="#/" class="alert-link">return home</a> to set.
</div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'NoCompAlert',
  computed: {
    isLoading() {
      return this.$store.state.currentComp.isLoading;
    },
    populated() {
      return this.$store.state.currentComp.populated;
    }
  },
  created () {
   //console.log('Created NoCompAlert', this.populated, this.isLoading,this.$store.state.currentComp ); 
   if (Vue.$cookies.isKey('currentEvent')) {
      this.$store.state.comp.id = Vue.$cookies.get('currentEvent')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
