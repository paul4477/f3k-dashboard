<template>
  <div id="appmain">
    <div class="row">
      <div class="col-lg">
        <EventHeader />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventHeader from "@/components/EventHeader.vue";

export default {
  name: "ShowEvent",
  components: {
    EventHeader
  }
};
</script>
