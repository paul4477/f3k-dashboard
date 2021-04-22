<template>
  <div>
    <div v-if="!isLoading && populated && roundToScore >= 0" class="card">
      <div class="row" v-for="task in taskInfo" :key="task[0]">
            <input
              type="text"
              class="form-control time"
              style="width: auto; text-align: right"
              size="7"
              maxlength="7"
              pattern="[0-9]*"
              inputmode="numeric"
              v-on:keydown="updateOnKey($event)"
              @blur="validateValue($event, 9)"
              @focus="clearValue($event)"
            />
            Max: {{ task[1] | secondsToString }}

      </div>
      <button class="btn btn-primary">Submit Scores</button>


      <div class="card-body">
        <div class="row">
          <div class="col-8 px-1">
            <h4 class="card-title">
              Number of flights in round:
              {{ rounds[roundToScore].flight_type_sub_flights }}
            </h4>
            <p class="card-text">
              {{ rounds[roundToScore] }}
            </p>
            <p class="card-text">
              <strong>Date:</strong>
              {{ new Date(eventData.start_date).toDateString() }}
            </p>
            {{taskInfo}}
            <input
              type="text"
              class="form-control time"
              style="width: auto; text-align: right"
              size="7"
              maxlength="7"
              pattern="[0-9]*"
              inputmode="numeric"
              v-on:keydown="updateOnKey($event)"
              @blur="validateValue($event, 9)"
              @focus="clearValue($event)"
            />
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

import taskScorer from "@/tasks.js";

export default {
  name: "EventHeader",
  state: {
    clicks: 0,
  },
  computed: {
    roundToScore: {
      get() {
        console.log(this.$store.state.currentComp.currentScoringRound)
        return this.$store.state.currentComp.currentScoringRound - 1;
      },
    },
    eventData() {
      return this.$store.state.currentComp.eventDataRaw;
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
    times() {
      // if state doesn't have times then get default for the round to submit
      // check the backend for existing times?
    },
    taskInfo() {
      return taskScorer.scoreTask([{'time': 0, 'valid': false}], this.rounds[this.roundToScore].flight_type_code )
    },
    ...mapState("slot", ["round", "group"]),
  },
  mounted() {
    //console.log(this.round)
    //var results = taskScorer.scoreTask([{'time': 0, 'valid': false}], this.rounds[parseInt(this.round)].flight_type_code )
    //console.log(results)
  },
  methods: {
    checkDouble(event) {
      console.log("click");
      if (this.clicks < 1) {
        this.clicks = this.clicks + 1;

        setTimeout(() => {
          this.clicks = 0;
        }, 500);
      } else {
        // clearTimeout(this.timeoutId)
        this.clicks = 0;

        // Add code to set to max here:
        event.target.rawInput = "3000";
        this.reFormat(event.target);
        //event.target.blur()
      }
    },
    reFormat(input) {
      const decimals = 1;

      function pad0(value, count) {
        var result = value.toString();
        for (; result.length < count; --count) {
          result = "0" + result;
        }
        return result;
      }

      // Check we don't have an empty string and convert to an integer
      var numberInput = 0;
      if (input.rawInput != "") {
        numberInput = parseInt(input.rawInput);
      }

      //console.log('decimals', Math.floor((numberInput) % Math.pow(10, decimals)))
      //console.log('seconds', Math.floor((numberInput / Math.pow(10, decimals)) % Math.pow(10, 2)))
      //console.log('minutes', Math.floor((numberInput / Math.pow(10, decimals + 2)) % Math.pow(10, 2)))

      // Shift digits around using / and %
      const minutes = Math.floor(numberInput / Math.pow(10, decimals + 2));
      const seconds = Math.floor(
        (numberInput / Math.pow(10, decimals)) % Math.pow(10, 2)
      );
      const fraction = Math.floor(numberInput % Math.pow(10, decimals));

      if (decimals > 0) {
        input.value = `${pad0(minutes, 2)}:${pad0(seconds, 2)}.${fraction}`;
      } else {
        // decimals == 0
        input.value = `${pad0(minutes, 2)}:${pad0(seconds, 2)}`;
      }
    },

    // Do whatever checks we want on the final value
    validateValue(event, minuteLimit) {
      const decimals = 1;
      const numberInput = parseInt(event.target.rawInput);
      // Catch the case where nothing was input
      this.reFormat(event.target);

      event.target.classList.remove("is-invalid");
      // Length (assuming no more than double digit minutes)
      if (event.target.rawInput.length > 4 + decimals) {
        //alert("Input appears to be too many digits.")
        event.target.classList.add("is-invalid");
      }

      // Check range for seconds (<= 59)
      const seconds = Math.floor(
        (numberInput / Math.pow(10, decimals)) % Math.pow(10, 2)
      );
      if (seconds > 59) {
        //alert("Seconds > 59. Please check and re-enter.")
        event.target.classList.add("is-invalid");
      }

      // Check minutes is not over the limit specified
      const minutes = Math.floor(numberInput / Math.pow(10, decimals + 2));
      if (minutes > minuteLimit) {
        //alert(`Minutes > ${minuteLimit}. Please check and re-enter.`)
        event.target.classList.add("is-invalid");
      }

      const fraction = Math.floor(numberInput % Math.pow(10, decimals));
      event.target.seconds = [minutes * 60 + seconds, fraction];

      console.log(
        "User input:",
        event.target.rawInput,
        "Time string:",
        event.target.value,
        "Converted to seconds and decimal:",
        event.target.seconds
      );
    },

    // On entering the input box clear everything for a clean start
    clearValue(event) {
      event.target.value = "";
      event.target.rawInput = "";
    },

    // Store raw input separately to the value displayed
    updateOnKey(event) {

      // Check the key is an integer
      if (isFinite(event.key)) {
        // Don't allow the event to update the box "normally"
        event.preventDefault();
        // Set up the blank rawInput value if not already there - it should be - but lets be sure
        if (!event.target.hasOwnProperty("rawInput")) {
          event.target.rawInput = "";
        }
        // Add the new character to the rawInput
        event.target.rawInput += event.key;
        // Call reFormat to process the change
        this.reFormat(event.target);
      }
      if (event.key == "Backspace") {
        // Don't allow the event to update the box "normally"
        event.preventDefault();
        // Remove last character from the rawInput string
        event.target.rawInput = event.target.rawInput.slice(0, -1);
        this.reFormat(event.target);
      }
      if (event.key == "Enter") {
        //event.target.rawInput = event.target.rawInput.slice(0, -1);
        event.target.blur()
      }

      // Ignore if its not an integer or backspace
    },
  },
};
</script>
