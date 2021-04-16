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
        eventData: {},
        populated: false,
        isLoading: false
    },
    mutations: {
        SET_POPULATED(state) { state.populated = true },
        SET_UNPOPULATED(state) { state.populated = false },
        SET_ISLOADING(state) { state.isLoading = true },
        SET_LOADED(state) { state.isLoading = false },
        SET_EVENTDATA(state, payload) { state.eventData = payload },
    },
    actions: {
        populate_data(context, event_id) {
            context.commit('SET_ISLOADING')
            
            console.log('here')
            console.log(event_id)

            var config = {
                method: "post",
                params: {
                    function: "getEventInfo",
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
                    context.commit('SET_LOADED')
                });
        }
    }
}


const store = new Vuex.Store({
    modules: {
        events: events,
        currentComp: currentComp
    }
})

export default store