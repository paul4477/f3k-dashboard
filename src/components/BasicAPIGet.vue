<template>
<div>
    <div v-if="isLoading" class="card">
        Loading
    </div>
    <div v-if="!isLoading" class="card">
        {{msg}}
    </div>
    
</div>
</template>

<script>
import axios from "axios";
const API_URL = "http://f3xvault.com/api/";

export default {
  name: "Test",
  data: () => ({
      isLoading: true,
      msg: ''
  }),
  created() {
    console.log(this)
    console.log(this.msg)
    this.isLoading = true

    var config = {
      method: "post",
      url:
        "https://www.f3xvault.com/api.php?login=paul.d.robinson@gmail.com&password=hobra8-dycpic-nyZgoj&function=getEventInfoFull&output_format=json&event_id=2051",
      headers: {},
    };

    axios(config)
      .then(response => {
        console.log(this.msg)
        this.msg = JSON.stringify(response.data)
        this.isLoading = false
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {this.isLoading - false})
  }
};
</script>