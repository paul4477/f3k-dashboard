<template>
  <div id="app" class="container-sm px-0">

    <div class="modal fade" id="modalVault" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body mb-0 p-0">
                    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half" style="height: 500px">
                        <iframe id="modaliframe" class="embed-responsive-item" src="" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary btn-md ml-4" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>


      <nav class="navbar navbar-dark bg-primary">
        
        <router-link class="navbar-brand" class-active="nav-link active" to="/">
        <img src="./assets/glider15.svg" height="25" alt="">
        </router-link>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      
      <div class="navbar bg-primary collapse navbar-collapse" id="collapsibleNavbar">
        <div class="btn-group" role="toolbar">
          <router-link data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn btn-secondary" class-active="btn btn-outline-primary" to="/event">Groups</router-link>
          <router-link data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn btn-secondary" class-active="btn btn-outline-primary" to="/roundstatus">Live</router-link>
          
          <router-link v-if="!production" data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn btn-outline-secondary" class-active="btn btn-outline-primary" to="/scoring">Scoring</router-link>
          
          <div v-if="$store.state.currentComp.populated" class="btn-group" role="group">
          <form name="f3xvault_self_entry" method="POST" target="_blank" v-bind:action="'https://www.f3xvault.com/?action=event&function=event_view&event_id=' + $store.state.currentComp.eventDataRaw.event_id">
            <input type="hidden" name="action" value="event">
            <input type="hidden" name="function" value="event_self_entry">
            <input type="hidden" name="event_id" v-bind:value="$store.state.currentComp.eventDataRaw.event_id">
          </form>
            <button id="f3xbuttongrp" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              F3XVault
            </button>
            
            <div class="dropdown-menu" aria-labelledby="f3xbuttongrp">
              <a class="dropdown-item" @click="goToVaultEvent">View Standings</a>
              <a class="dropdown-item" onclick="document.f3xvault_self_entry.submit()" href="#">Scoring</a>
            </div>
          </div>
          
        </div>
      
        
                        <!--<div class="btn-group" role="group">
                        <router-link data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn-sm btn-primary" class-active="btn btn-outline-primary" to="/about">About</router-link>
                        </div>     --> 
        <!--<ul class="navbar-nav">
        <li class="nav-item"><router-link data-toggle="collapse" data-target="#collapsibleNavbar" class="nav-link" class-active="nav-link active" to="/roundstatus">Current Round</router-link></li>
        <li class="nav-item"><router-link data-toggle="collapse" data-target="#collapsibleNavbar" class="nav-link" class-active="nav-link active" to="/about">About</router-link></li>
        </ul>-->
      
      </div>

      
      <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data () {return {production: false}},
  methods: {
    goToVaultEvent() {
      const vaultEventURL = "https://www.f3xvault.com/?action=event&function=event_view&event_id=" + this.$store.state.currentComp.eventDataRaw.event_id
      $("#modaliframe").attr('src', vaultEventURL)
      $('#modalVault').modal('toggle')
    },
  },
  created() { this.production = (process.env.NODE_ENV === "production") },
};
</script>

<style>
.invalid {
  text-decoration: line-through;
}
.btn-result {
  font-size: 1.7rem;
  height: 2.7rem;
}
.btn-last-result {
  font-size: 2.1rem;
  height: 3.2rem;
}
.fade-enter-active {
  transition: opacity 0.7s;
}
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
