import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-amber/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '@/assets/styles/variables.css';
import '@/assets/styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });

app.mount('#app');
