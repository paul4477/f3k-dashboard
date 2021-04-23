<template>
  <transition name="fade">
    <div v-if="!isLoading && populated && currentPilot && currentPilot != 0" class="card">
      <h3>Pilot: {{pilotsByID[currentPilot].pilot_first_name}} {{pilotsByID[currentPilot].pilot_last_name}} is flying in Group {{group}}</h3>
  </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PilotGroupList",

  computed: {
    pilotData() {
      return this.$store.state.currentComp.eventDataRaw.pilots;
    },
    isLoading() {
      return this.$store.state.currentComp.isLoading;
    },
    populated() {
      return this.$store.state.currentComp.populated;
    },
    currentPilot() {
      return this.$store.state.currentComp.currentPilot;
    },
    rounds() {
      return this.$store.state.currentComp.rounds;
    },
    pilotsByID() {
      return this.$store.state.currentComp.pilotsByID;
    },
    ...mapState("slot", [
      "round",
      "group",
      "canFly",
      "slotState"
    ]),
  }
};
</script>
