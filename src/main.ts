import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import { HWPreset } from './theme/hw';
import '@/assets/styles/style.css';
// import '@/assets/styles/variables.css';
// import '@/assets/styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: HWPreset,
  },
});

app.mount('#app');
