<template>
  <transition name="fade">
    <div v-if="!isLoading && currentPilot && currentPilot != 0" class="card">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Round</th>
            <th>Description</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="round in rounds" :key="round.round_number">
            <td>
              <h3>{{ round.round_number }}</h3>
            </td>
            <td>
              <h5>{{ round.flight_type_name_short }}</h5>
            </td>
            <td class="">
              <h3>
                <strong>{{
                  $store.state.currentComp.drawByPilot[currentPilot][
                    round.round_number
                  ]
                }}</strong>
              </h3>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </transition>
</template>

<script>
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
      return this.$store.state.currentComp.rounds != [];
    },
    currentPilot() {
      return this.$store.state.currentComp.currentPilot;
    },
    rounds() {
      return this.$store.state.currentComp.rounds;
    },
    pilotsByID() {
      return this.$store.state.currentComp.pilotsByID;
    }
  }
};
</script>
