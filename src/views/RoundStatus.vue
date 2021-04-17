<template>
  <div id="appmain">
    <div class="row">
      <div class="col-lg"><EventHeaderCompact /></div>
    </div>
    <div class="row">
      <div class="col-lg"><RunningSlotLarge /></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventHeaderCompact from "@/components/EventHeaderCompact.vue";
import RunningSlotLarge from "@/components/RunningSlotLarge.vue";

export default {
  name: "RoundStatus",
  components: {
    EventHeaderCompact,
    RunningSlotLarge
  },
};
</script>
