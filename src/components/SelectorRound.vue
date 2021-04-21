<template>
  <!-- Need access to a pilot and then find last round they haven't entered scores for yet
     or use currrent round as in store.slot (or last round if in prep time for new round?) -->
  <transition v-if="!isLoading && populated" name="fade">
    <form>
      <div class="input-group input-group-lg mb-2">
        <div class="input-group-prepend">
          <span class="input-group-text">Round</span>
        </div>
        <select
          class="form-control form-control-lg"
          id="round"
          v-model="scoreRound"
        >
          <optgroup>
            <option selected>Select a round...</option>
            <option
              v-for="round in rounds"
              :key="round.round_number"
              v-bind:value="round.round_number"
            >
              {{ round.round_number + " - " + round.flight_type_name_short }}
            </option>
          </optgroup>
        </select>
      </div>
      <!-- <button v-on:click="setCompID" class="btn btn-primary">Set Competition</button> -->
    </form>
  </transition>
</template>

<script>
export default {
  name: "SelectorRound",
  computed: {
    scoreRound: {
      get() {
        return this.$store.state.currentComp.currentScoreRound;
      },
      set(value) {
        this.$store.commit("currentComp/updateScoreRound", value);
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
    currentPilot() {
      return this.$store.state.currentComp.currentPilot;
    },
    rounds() {
      return this.$store.state.currentComp.rounds;
    },
    pilotsByID() {
      return this.$store.state.currentComp.pilotsByID;
    },
  },
};
</script>
