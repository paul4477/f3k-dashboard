<template>
  <div>
    <div v-if="!isLoading && populated" class="card">
      <div
        v-for="event in list"
        :key="event.event_id"
        class="card text-white bg-primary mb-3 text-center"
        style=""
      >
        <router-link :to="'/event/' + event.event_id" class="stretched-link">
          <div class="card-body">
            <h1 class="text-white font-weight-bold">{{ event.event_name }}</h1>
          </div>
        </router-link>
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
  data: () => ({
    events: {},
  }),
  computed: {
    list() {
      return this.$store.state.events.list;
    },
    isLoading() {
      return this.$store.state.events.isLoading;
    },
    populated() {
      return this.$store.state.events.populated;
    },
  },

  created() {
    console.log(this.populated);

    if (!this.populated) {
      this.$store.dispatch("events/populate_events");
    }
    /*     this.isLoading = true;

    var config = {
      method: "post",
      params: {
        function: "searchEvents",
        country: "GB",
        event_type_code: "f3k",
      }
    };
    // Push this off to Vuex State
    axios(config)
      .then((response) => {
        this.events = response.data.events
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.isLoading = false
      }); */
  },
};
</script>