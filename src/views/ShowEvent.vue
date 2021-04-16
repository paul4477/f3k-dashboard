<template>
  <div id="appmain">
    <div class="row">
      <div class="col-lg">
        <EventHeader />
      </div>
    </div>
    <div class="row">
      <div class="col-lg">
        <PilotChooser />
      </div>
    </div>
    <div class="row">
      <div class="col-lg">
        <PilotGroupList />
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import EventHeader from "@/components/EventHeader.vue";
import PilotChooser from "@/components/PilotChooser.vue";
import PilotGroupList from "@/components/PilotGroupList.vue";

export default {
  name: "ShowEvent",
  components: {
    EventHeader,
    PilotChooser,
    PilotGroupList
  }
};
</script>
