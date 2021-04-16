import axios from 'axios'

NProgress.configure({showSpinner: false})
NProgress.configure({parent: '#appmain'})


const APIPASS = process.env.VUE_APP_APIPASS || 'set.ENV.VUE_APP_APIPASS';
const APIUSER = process.env.VUE_APP_APIUSER || 'set.ENV.VUE_APP_APIUSER';

console.log(process.env)
// create a new axios instance
const instance = axios.create({
  baseURL: 'https://www.f3xvault.com',
  params: {
    login: APIUSER,
    password: APIPASS,
    output_format: 'json'
    //&function=searchEvents&output_format=json&country=GB&event_type_code=f3k
  }
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start()
  console.log('start progress')
  return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done()
  console.log('stop progress')
  return response
})

export default instance