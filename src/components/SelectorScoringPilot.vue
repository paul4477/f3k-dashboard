<template>
  <!-- Generate a drop down.
      Default selection should be based on existing data or cookie (which sets internal data dfor next time)
     Cokie should not expire so there for next comp-->
  <transition v-if="!isLoading && populated" name="fade">
    <form>
      <div class="input-group input-group-lg mb-2">
        <select class="form-control" id="pilot" v-model="currentScoringPilot">
          <option v-if="!currentScoringPilot" selected value="">
            Select a pilot...
          </option>
          <option
            v-for="pilot in pilotData"
            :key="pilot.pilot_id"
            v-bind:value="pilot.pilot_id"
          >
            {{ pilot.pilot_first_name + " " + pilot.pilot_last_name }}
          </option>
        </select>
        <div class="input-group-append">
          <span class="input-group-text">Pilot</span>
        </div>
      </div>

      <!-- <button v-on:click="setCompID" class="btn btn-primary">Set Competition</button> -->
    </form>
  </transition>
</template>

<script>
import Vue from "vue";

export default {
  name: "SelectorScoringPilot",

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
    currentScoringPilot: {
      get() {
        return this.$store.state.currentComp.currentScoringPilot;
      },
      set(value) {
        this.$store.commit("currentComp/updateScoringPilot", value);
      },
    },
  },
  mounted() {
    if (Vue.$cookies.isKey("currentScoringPilot")) {
      this.currentScoringPilot = Vue.$cookies.get("currentScoringPilot");
    }
  },
};
</script>
