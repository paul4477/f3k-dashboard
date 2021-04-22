<template>
  <transition v-if="!isLoading && populated" name="fade">
    <form>
      <div class="input-group input-group-lg mb-2">
        
        <select
          class="form-control form-control-lg"
          id="pilot"
          v-model="currentPilot"
        >
          <option selected value="0">Select a pilot...</option>
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
  name: "SelectorPilot",

  computed: {
    currentPilot: {
      get() {
        return this.$store.state.currentComp.currentPilot;
      },
      set(value) {
        this.$store.commit("currentComp/updatePilot", value);
      },
    },
    pilotData() {
      return this.$store.state.currentComp.eventDataRaw.pilots;
    },
    isLoading() {
      return this.$store.state.currentComp.isLoading;
    },
    populated() {
      return this.$store.state.currentComp.populated;
    },
  },
  mounted() {
    if (Vue.$cookies.isKey("currentPilot")) {
      this.currentPilot = Vue.$cookies.get("currentPilot");
    }
  },
};
</script>
