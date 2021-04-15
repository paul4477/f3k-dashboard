<template>
<div>
  <div class="row">
    <div class="col-lg">
      <BasicAPIGet />
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import BasicAPIGet from '@/components/BasicAPIGet.vue'

export default {
  name: 'Home',
  components: {
    BasicAPIGet
  }
}
</script>
