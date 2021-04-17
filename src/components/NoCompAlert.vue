<template>
<div v-if="!compId" class="alert alert-danger" role="alert">
  No competition is selected <a href="#/" class="alert-link">return home</a> to set.
</div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'NoCompAlert',
  computed: {
    ...mapState('comp', { compId: 'id' })
  },
  created () {
    if (Vue.$cookies.isKey('SelectedComp')) {
      this.$store.state.comp.id = Vue.$cookies.get('SelectedComp')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
