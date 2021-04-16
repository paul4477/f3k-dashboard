<template>
<div>
    <div v-if="!isLoading" class="card">
            <div v-for="event in events" :key="event.event_id" class="card text-white bg-primary mb-3 text-center" style="">
                <a href="javascript:goToScoring(88)" class="stretched-link">
                    <div class="card-body">
                        <h1 class="text-white font-weight-bold">{{event.event_name}}</h1>
                    </div>
                </a>
            </div>
    </div>
    
</div>
</template>

<script>
//import axios from "axios";
import axios from "@/remote_data.js"

export default {
  name: "Test",
  data: () => ({
      isLoading: true,
      msg: '',
      comp: null,
      events: {}
  }),
  created() {
    console.log(this)
    console.log(this.msg)
    this.isLoading = true
    

    //sleep(2)
    var config = {
    method: 'post',
    url: 'api.php',
    params: {
        function: 'searchEvents',
        country: 'GB',
        event_type_code: 'f3k'
    },
    headers: { }
    }

    axios(config)
      .then(response => {
        console.log(response.data.error_string)
        this.events = response.data.events
        this.isLoading = false
        
        this.msg = this.events[0].location_name
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {this.isLoading - false})
  }
}
</script>