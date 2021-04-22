<template>
  <div id="app">
      <nav class="navbar navbar-dark bg-dark">
        
        <router-link class="navbar-brand" class-active="nav-link active" to="/">
        <img src="./assets/glider15.svg" height="25" alt="">
        </router-link>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
      
      <div class="navbar navbar-dark bg-dark collapse navbar-collapse" id="collapsibleNavbar">
        <div class="btn-group" role="toolbar">
          <router-link data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn btn-primary" class-active="btn btn-outline-primary" to="/event">Groups</router-link>
          <router-link data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn btn-primary" class-active="btn btn-outline-primary" to="/roundstatus">Live</router-link>
          <router-link data-toggle="collapse" data-target="#collapsibleNavbar" tag="button" class="btn btn-outline-primary" class-active="btn btn-outline-primary" to="/scoring">Scoring</router-link>
          
          <div v-if="$store.state.currentComp.populated" class="btn-group" role="group">
          <form name="f3xvault_self_entry" method="POST" v-bind:action="'https://www.f3xvault.com/?action=event&function=event_view&event_id=' + $store.state.currentComp.eventDataRaw.event_id">
            <input type="hidden" name="action" value="event">
            <input type="hidden" name="function" value="event_self_entry">
            <input type="hidden" name="event_id" v-bind:value="$store.state.currentComp.eventDataRaw.event_id">
          </form>
            <button id="f3xbuttongrp" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              F3XVault
            </button>
            
            <div class="dropdown-menu" aria-labelledby="f3xbuttongrp">
              <a class="dropdown-item" v-bind:href="'https://www.f3xvault.com/?action=event&function=event_view&event_id=' + $store.state.currentComp.eventDataRaw.event_id">View Event</a>
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
