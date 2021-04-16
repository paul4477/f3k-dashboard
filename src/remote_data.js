import axios from 'axios'

NProgress.configure({showSpinner: false})
NProgress.configure({parent: '#appmain'})

// create a new axios instance
const instance = axios.create({
  baseURL: 'https://www.f3xvault.com'
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