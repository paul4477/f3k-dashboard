<template>
  <div>
    <div v-if="!isLoading" class="card">
      <div class="card-body">
        <div class="row">
          <div class="col px-1">
            <h4 class="card-title">{{ eventData.event_name }}</h4>
          </div>
          <div class="col">
            <p class="card-text">
              <strong>Venue:</strong> {{ eventData.location_name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//import axios from "@/remote_data.js";
import { mapState } from "vuex";

export default {
  name: "EventChooser",

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
    if (
      !this.populated ||
      (this.$route.params.id &&
        this.eventDataRaw.event_id != this.$route.params.id)
    ) {
      this.$store.dispatch("currentComp/populate_data", this.$route.params.id);
    }
  }
};
</script>
