<template>
  <div class="text-primary text-center">
            <div class="container text-primary text-center">
            <div class="row my-2">
              <div class="col-6">
            <button
              class="btn btn-block  btn-outline-warning py-2"
              v-bind:class="{ 'btn-warning active': rawTimes.length > 0 && !running}"
              :disabled="rawTimes.length === 0 || running"
              data-toggle="modal" data-target="#modalClear"
              type="submit">
                Clear
              </button>
              </div>
            <div class="col-6">
            <button
              class="btn btn-block btn-outline-success py-2"
              v-on:click="$router.replace('Submit')"
              v-bind:class="{ 'btn-success active': rawTimes.length > 0 && !running}"
              :disabled="rawTimes.length === 0 || running"
              type="submit">
                Submit
              </button>
              </div>
            </div>
            </div>
<!-- Modal -->
<div class="modal fade" id="modalClear" tabindex="-1" role="dialog" aria-labelledby="clearResults" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Clear results?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to clear your results?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" data-dismiss="modal" v-on:click="clearResults" class="btn btn-primary">Clear All</button>
      </div>
    </div>
  </div>
</div>

<div class="display-3 border-top border-primary bg-light text-primary text-monospace">
  {{ timeString }}
  </div>
<div class="row no-gutters">
  <div class="col-12 px-auto">
    <button v-if="lastTime"
      v-on:click="checkDouble"
      type="button"
      class="btn btn-block btn-primary p-0 text-monospace btn-last-result"
      v-bind:class="{ 'btn-danger': !lastTime.valid, 'invalid': !lastTime.valid }">
        {{ lastTime.formattedTime }}
      </button>
      </div></div>
<div class="row no-gutters">
  <div class="col-6">
    <div class="container-fluid btn-group-vertical p-2 " >
      <button type="button"
        class="btn btn-block btn-primary text-monospace btn-result my-0 py-0"
        v-bind:key="time.id" v-for="time in reversedOtherTimes"
        v-bind:class="{ 'btn-danger': !time.valid, 'invalid': !time.valid }">
          {{ time.formattedTime }}
      </button>
    </div>
  </div>
  <div class="col-6 pl-1">

  </div>
</div>
<!-- <button  id="btnStartStop" class="btn btn-lg btn-success btn-block active" type="submit">Start/Stop</button> -->
<div id="overlay" ref="btnStartStop">

</div>
</div>

</template>

<script>
/* global Pressure */

import { mapState } from 'vuex'

function formatTime (time, showTenths = false) {
  function pad0 (value, count) {
    var result = value.toString()
    for (; result.length < count; --count) {
      result = '0' + result
    }
    return result
  }
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const fraction = (time * 10) % 10
  if (showTenths) {
    return `${pad0(minutes, 2)}:${pad0(seconds, 2)}.${Math.floor(fraction)}`
  } else { return `${pad0(minutes, 2)}:${pad0(seconds, 2)}` }
}

export default {
  name: 'stopwatch',
  data () {
    return { elapsed: 0, clicks: 0, running: false, startedTime: null }
  },
  computed: {
    ...mapState('result', [
      'rawTimes'
    ]),
    timeString () {
      // console.log('calc remainin')
      const tenths = Math.floor(this.elapsed * 10) / 10
      return formatTime(tenths, true)
    },
    lastTime () {
      // console.log(this.$store.getters)
      return this.$store.getters['result/lastTime']
    },
    reversedOtherTimes () {
      // console.log(this.$store.result.getters)
      // console.log(this.$store.getters['result/otherTimes'])

      return this.$store.getters['result/otherTimes'].slice().reverse()
    }

  },
  mounted () {
    // Set up pressure button for compatible iOS devices
    const ua = window.navigator.userAgent
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
    const webkit = !!ua.match(/WebKit/i)
    const iOSSafari = iOS && webkit && !ua.match(/CriOS/i)
    const button = this.$refs.btnStartStop

    console.log(this.$refs.btnStartStop)
    if (iOS || iOSSafari) {
      // button.removeEventListener('click', this.startStop)
      Pressure.set(button, {
        startDeepPress: (event) => {
          this.startStop()
          // When touch event fires, this is needed to prevent the click
          // event from firing as well
          event.preventDefault()
          event.stopPropagation()
        }
      }, { only: 'touch', preventSelect: true })
    } else {
      button.addEventListener('click', this.startStop)
    }

    setInterval(() => {
      if (this.running) this.elapsed = (Date.now() - this.startedTime) / 1000
    }, 40)
  },
  beforeDestroy () {
    console.log('unregistered listener for clear-results')
    console.log(this.$root)
    if (this.$root.$listeners && this.$root.$listeners.ults) {
      this.$root.removeEventListener('action-clear-results', this.clearResults)
    }
  },

  methods: {
    checkDouble (state, commit) {
      // console.log('checkdouble', this.clicks)
      if (this.clicks < 1) {
        this.clicks = this.clicks + 1

        setTimeout(() => { console.log('callback', this.clicks, this); this.clicks = 0 }, 500)
      } else {
        // clearTimeout(this.timeoutId)
        this.clicks = 0
        this.invalidateLast(this, commit)
      }
    },
    invalidateLast (state, commit) {
      this.$store.commit('result/TOGGLE_INVALID_LAST')
    },
    clearResults (state, commit) {
      console.log('in stopwatch.clearResults.')
      console.log('add a better confirmation screen!')
      if (!this.running) {
        this.startedTime = null
        this.elapsed = 0
        this.$store.commit('result/CLEAR_TIMES')
      }
    },
    submitResults (state, commit) {
      console.log('in stopwatch.submitResults')
      // if (!this.running) {
      // this.$store.commit('result/CLEAR_TIMES')
      // }
    },

    startStop (state, commit) {
      if (this.running) {
        this.$store.dispatch('result/recordTime', { time: this.elapsed, formattedTime: formatTime(this.elapsed, true), valid: true })
        this.running = false
        this.startedTime = null
      } else {
        if (!this.startedTime) this.startedTime = Date.now()
        if (!this.running) this.running = true
      }
      this.$refs.btnStartStop.style['background-color'] = 'rgba(0,128,0,0.7)'
      setTimeout(() => { this.$refs.btnStartStop.style['background-color'] = 'rgba(0,255,0,0)' }, 120)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
