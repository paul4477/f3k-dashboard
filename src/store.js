import Vue from "vue";
import Vuex from "vuex";
import axios from "@/remote_data.js";

Vue.use(Vuex);

const events = {
  namespaced: true,
  state: {
    list: [],
    populated: false,
    isLoading: false
  },
  mutations: {
    SET_POPULATED(state) {
      state.populated = true;
    },
    SET_UNPOPULATED(state) {
      state.populated = false;
    },
    SET_ISLOADING(state) {
      state.isLoading = true;
    },
    SET_LOADED(state) {
      state.isLoading = false;
    },
    SET_EVENTLIST(state, payload) {
      state.list = payload;
    }
  },
  actions: {
    populate_events(context) {
      context.commit("SET_ISLOADING");

      var config = {
        method: "post",
        params: {
          function: "searchEvents",
          country: "GB",
          event_type_code: "f3k"
        }
      };

      axios(config)
        .then(response => {
          context.commit("SET_EVENTLIST", response.data.events);
          context.commit("SET_POPULATED");
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          context.commit("SET_LOADED");
        });
    }
  }
};

const currentComp = {
  namespaced: true,
  state: {
    currentPilot: null,
    eventDataRaw: {},
    populated: false,
    isLoading: false,

    pilotsByID: null,
    drawByPilot: null,
    rounds: []
  },
  mutations: {
    SET_POPULATED(state) {
      state.populated = true;
    },
    SET_UNPOPULATED(state) {
      state.populated = false;
    },
    SET_ISLOADING(state) {
      state.isLoading = true;
    },
    SET_LOADED(state) {
      state.isLoading = false;
    },
    SET_EVENTDATA(state, payload) {
      state.eventDataRaw = payload;
    },
    SET_PILOTS(state) {
      // {{this.$store.state.currentComp.eventData.prelim_standings.standings[0].rounds[0].flights[0].flight_group}}
      var pilots = {};
      state.eventDataRaw.pilots.forEach((pilot, index) => {
        pilots[pilot.pilot_id] = pilot;
      });
      state.pilotsByID = pilots;
    },
    SET_ROUNDS(state) {
      var rounds = [];

      //console.log('SET_ROUNDS', state.eventDataRaw.tasks )
      state.eventDataRaw.tasks.forEach((task, index) => {
        rounds.push(task);
      });
      state.rounds = rounds;
    },
    SET_DRAW(state) {
      var draw = {};
      state.eventDataRaw.prelim_standings.standings.forEach((pilot, index) => {
        draw[pilot.pilot_id] = {};

        state.rounds.forEach((task, index) => {
          //console.log(parseInt(task.round_number), pilot.rounds[parseInt(task.round_number) - 1].flights[0].flight_group)

          draw[pilot.pilot_id][task.round_number] =
            pilot.rounds[
              parseInt(task.round_number) - 1
            ].flights[0].flight_group;
        });
      });
      state.drawByPilot = draw;
    }
  },
  actions: {
    populate_data(context, event_id) {
      context.commit("SET_ISLOADING");

      console.log("here");
      console.log(event_id);

      var config = {
        method: "post",
        params: {
          function: "getEventInfoFull",
          event_id: event_id
        }
      };

      axios(config)
        .then(response => {
          context.commit("SET_EVENTDATA", response.data.event);
          context.commit("SET_POPULATED");
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          context.commit("SET_PILOTS");
          context.commit("SET_ROUNDS");
          context.commit("SET_DRAW");
          context.commit("SET_LOADED");
        });
    }
  }
};

const timer = {
  namespaced: true,
  state: {
    round: "00",
    group: "00",
    // running: true,
    slotState: "",
    canFly: false,
    finishTime: Date(),
    shortTaskDescription: "",
    taskDescription: ""
  },
  getters: {
    compId(state, getters, rootState) {
      // console.log('root', rootState, rootState.comp.id)
      return rootState.currentComp.eventDataRaw.event_id;
    }
  },
  actions: {
    updateRoundInfo(context) {
      // console.log('updateRoundInfo', context)
      // fetch(API_URL + `/comp/${this.compId}/round/${this.round}`)
      if (context.getters.compId) {
        axios
          .get(
            API_URL +
              `/comp/${context.getters.compId}/round/${context.state.round}`
          )
          .then(response => {
            context.commit("SET_TASK_DESC", response.data.F3KTaskDescription);
            context.commit(
              "SET_SHORT_TASK_DESC",
              response.data.F3KTaskAbbreviation
            );
          })
          // .catch(e => {})
          .finally(() => {});
      }
    }
  },
  mutations: {
    SET_TASK_DESC(state, payload) {
      // console.log('SET_TASK_DESC', payload)
      state.TaskDescription = payload;
    },
    SET_ROUND(state, payload) {
      console.log("SET_ROUND", payload);
      state.round = payload;
    },

    SET_SHORT_TASK_DESC(state, payload) {
      // console.log('SET_SHORT_TASK_DESC', payload)
      state.shortTaskDescription = payload;
    },
    UPDATE(state, payload) {
      //console.log('slot/UPDATE', state.round, payload.round)
      if (state.round !== payload.round) {
        state.round = payload.round;
        if (payload.round !== "00") {
          store.dispatch("slot/updateRoundInfo");
        }
      }
      state.group = payload.group;
      // console.log(payload.endTime)
      state.finishTime = new Date(payload.endTime);
      state.slotState = payload.type;
      state.canFly = payload.canFly;
    }
  }
};

const store = new Vuex.Store({
  modules: {
    events: events,
    currentComp: currentComp,
    timer: timer
  }
});

var API_URL = "http://f3k.herokuapp.com/api/events";
if (process.env.NODE_ENV == "production") {
  API_URL = "/api/events";
}

const eventSource = new EventSource(API_URL);

eventSource.onmessage = event => {
  const parsedData = JSON.parse(event.data);
  store.commit("timer/UPDATE", parsedData);
};

export default store;
