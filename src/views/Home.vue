<template>
  <div id="appmain">
    <div class="row">
      <div class="col-lg">
        <EventChooser />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventChooser from "@/components/EventChooser.vue";

export default {
  name: "Home",
  components: {
    EventChooser
  }
};
</script>
