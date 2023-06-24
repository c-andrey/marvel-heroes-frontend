import { createApp } from 'vue'
import './style.css';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataView from 'primevue/dataview';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import Paginator from 'primevue/paginator';

const app = createApp(App);
app.use(PrimeVue);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('DataView', DataView)
app.component('Card', Card)
app.component('ScrollPanel', ScrollPanel)
app.component('Paginator', Paginator)
app.mount('#app')
