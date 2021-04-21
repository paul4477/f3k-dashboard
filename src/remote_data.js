import axios from 'axios'

NProgress.configure({showSpinner: true})
//NProgress.configure({parent: '#appmain'})
//NProgress.configure({trickleSpeed: 200, trickleRate: 0.1,  trickle: true, easing: 'ease', speed: 50});

const APIPASS = process.env.VUE_APP_APIPASS || process.env.APIPASS || 'set ENV.VUE_APP_APIPASS';
const APIUSER = process.env.VUE_APP_APIUSER || process.env.APIUSER || 'set ENV.VUE_APP_APIUSER';

// create a new axios instance
const instance = axios.create({
  baseURL: 'https://www.f3xvault.com/api.php',
  params: {
    login: APIUSER,
    password: APIPASS,
    output_format: 'json'
  }
})

// before a request is made start the nprogress bar
instance.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress bar
instance.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default instance