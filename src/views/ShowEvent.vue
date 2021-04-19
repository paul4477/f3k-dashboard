<template>
  <div id="appmain">
    <NoCompAlert />
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
import NoCompAlert from "@/components/NoCompAlert.vue";
import EventHeader from "@/components/EventHeader.vue";
import PilotChooser from "@/components/PilotChooser.vue";
import PilotGroupList from "@/components/PilotGroupList.vue";

export default {
  name: "ShowEvent",
  components: {
    NoCompAlert,
    EventHeader,
    PilotChooser,
    PilotGroupList
  },
  computed: {
    eventData() {
      return this.$store.state.currentComp.eventDataRaw;
    },
    isLoading() {
      return this.$store.state.currentComp.isLoading;
    },
    populated() {
      return this.$store.state.currentComp.populated;
    }
  },
  created() {
    console.log('Create ShowEvent', this.populated, this.$route.params.id, this.eventData.event_id);
    
    if (this.$route.params.id && this.eventData.event_id != this.$route.params.id) {
      //console.log('Calling currentComp/populate_data from EventHeader')
      this.$store.dispatch("currentComp/populate_data", this.$route.params.id);
    }
  }
};
</script>
