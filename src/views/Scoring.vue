<template>
  <div id="appmain">
    <NoCompAlert />
    <div class="row">
      <div class="col-lg"><EventHeaderCompact /></div>
    </div>
    <div class="row">
      <div class="col-lg"><SelectorScoringPilot /></div>
    </div>
    <div class="row">
      <div class="col-lg"><SelectorRound /></div>
    </div>        
    <div class="row">
      <div class="col-lg"><FlightTimeEntry /></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventHeaderCompact from "@/components/EventHeaderCompact.vue";
import FlightTimeEntry from "@/components/FlightTimeEntry.vue";
import NoCompAlert from "@/components/NoCompAlert.vue";
import SelectorRound from "@/components/SelectorRound.vue";
import SelectorScoringPilot from "@/components/SelectorScoringPilot.vue";

export default {
  name: "RoundStatus",
  components: {
    NoCompAlert,
    EventHeaderCompact,
    FlightTimeEntry,
    SelectorRound,
    SelectorScoringPilot

    
  },
};
</script>
