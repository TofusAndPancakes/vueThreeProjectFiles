//import './assets/main.css' Commented for ease of editing of Teammates

import { createApp } from 'vue'
import App from './App.vue'
import Router from "./router"


const app = createApp(App);
app.use(Router);
app.mount('#app');