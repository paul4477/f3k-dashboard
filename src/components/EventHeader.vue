<template>
  <div>
    <div v-if="!isLoading" class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-8 px-1">
            <h4 class="card-title">{{ eventData.event_name }}</h4>
            <p class="card-text">
              <strong>Venue:</strong> {{ eventData.location_name }}
            </p>
            <p class="card-text">
              <strong>Date:</strong>
              {{ new Date(eventData.start_date).toDateString() }}
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
    console.log(this.populated, this.$route.params.id, this.eventData.event_id);
    if (
      !this.populated ||
      (this.$route.params.id &&
        this.eventData.event_id != this.$route.params.id)
    ) {
      this.$store.dispatch("currentComp/populate_data", this.$route.params.id);
    }
  }
};
</script>
