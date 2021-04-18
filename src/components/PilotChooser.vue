<template>
  <transition v-if="!isLoading" name="fade">
    <form>
      <div class="form-inline my-3">
        <select
          class="form-control form-control-lg"
          id="pilot"
          v-model="$store.state.currentComp.currentPilot"
        >
          <option value="0">Select a pilot...</option>
          <option
            v-for="pilot in pilotData"
            :key="pilot.pilot_id"
            v-bind:value="pilot.pilot_id"
            >{{ pilot.pilot_first_name + " " + pilot.pilot_last_name }}</option
          >
        </select>
      </div>
      <!-- <button v-on:click="setCompID" class="btn btn-primary">Set Competition</button> -->
    </form>
  </transition>

</template>

<script>
export default {
  name: "PilotChooser",

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
    }
  }
};
</script>
