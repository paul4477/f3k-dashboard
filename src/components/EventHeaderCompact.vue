<template>
  <div>
    <div v-if="!isLoading && populated" class="card">
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
export default {
  name: "EventHeaderCompact",

  computed: {
    eventData() {
      return this.$store.state.currentComp.eventDataRaw;
    },
    isLoading() {
      return this.$store.state.currentComp.isLoading;
    },
    populated() {
      return this.$store.state.currentComp.populated;
    },
  },
};
</script>