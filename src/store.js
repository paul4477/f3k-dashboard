import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/remote_data.js'

Vue.use(Vuex)

const events = {
    namespaced: true,
    state: {
        list: [],
        populated: false,
        isLoading: false
    },
    mutations: {
        SET_POPULATED(state) { state.populated = true },
        SET_UNPOPULATED(state) { state.populated = false },
        SET_ISLOADING(state) { state.isLoading = true },
        SET_LOADED(state) { state.isLoading = false },
        SET_EVENTLIST(state, payload) { state.list = payload },
    },
    actions: {
        populate_events(context) {
            context.commit('SET_ISLOADING')

            var config = {
                method: "post",
                params: {
                    function: "searchEvents",
                    country: "GB",
                    event_type_code: "f3k",
                }
            };

            axios(config)
                .then((response) => {
                    context.commit('SET_EVENTLIST', response.data.events)
                    context.commit('SET_POPULATED')
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    context.commit('SET_LOADED')
                });
        }
    }
}

const currentComp = {
    namespaced: true,
    state: {
        currentPilot: null,
        eventDataRaw: {},
        populated: false,
        isLoading: false,

        pilotsByID: null,
        drawByPilot: null,
        rounds: [],
    },
    mutations: {
        SET_POPULATED(state) { state.populated = true },
        SET_UNPOPULATED(state) { state.populated = false },
        SET_ISLOADING(state) { state.isLoading = true },
        SET_LOADED(state) { state.isLoading = false },
        SET_EVENTDATA(state, payload) { state.eventDataRaw = payload },
        SET_PILOTS(state) {
            // {{this.$store.state.currentComp.eventData.prelim_standings.standings[0].rounds[0].flights[0].flight_group}}
            var pilots = {}
            state.eventDataRaw.pilots.forEach((pilot, index) => {
                pilots[pilot.pilot_id] = pilot
            })
            state.pilotsByID = pilots
        },
        SET_ROUNDS(state) {
            var rounds = []
            //for (const [pilot_id, pilot] of Object.entries(state.pilotsByID)) { 
            //    console.log(pilot_id)
            //}
            console.log('SET_ROUNDS', state.eventDataRaw.tasks )
            state.eventDataRaw.tasks.forEach((task, index) => {
                rounds.push(task)
            })
            state.rounds = rounds
        },
        SET_DRAW(state) {
            var draw = {}
            state.eventDataRaw.prelim_standings.standings.forEach((pilot, index) => {
                draw[pilot.pilot_id] = {}

                state.rounds.forEach((task, index) => {

                    console.log(parseInt(task.round_number), pilot.rounds[parseInt(task.round_number) - 1].flights[0].flight_group)

                    draw[pilot.pilot_id][task.round_number] = pilot.rounds[parseInt(task.round_number) - 1].flights[0].flight_group

                })
            })
            state.drawByPilot = draw
        }
    },
    actions: {
        populate_data(context, event_id) {
            context.commit('SET_ISLOADING')

            console.log('here')
            console.log(event_id)

            var config = {
                method: "post",
                params: {
                    function: "getEventInfoFull",
                    event_id: event_id
                }
            };

            axios(config)
                .then((response) => {
                    context.commit('SET_EVENTDATA', response.data.event)
                    context.commit('SET_POPULATED')
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {

                    context.commit('SET_PILOTS')
                    context.commit('SET_ROUNDS')
                    context.commit('SET_DRAW')
                    context.commit('SET_LOADED')
                });
        }
    }
}

const store = new Vuex.Store({
    modules: {
        events: events,
        currentComp: currentComp,
        
    }
})

export default store