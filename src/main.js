import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { persistencePlugin } from 'pinia-persistence-plugin';
import logPlugin from './plugins/logPlugin.js';
import SecureLS from 'secure-ls';

import App from './App.vue';
import router from './router';

import './style.css';

const ls = new SecureLS({
    isCompression: false,
    encodingType: 'aes',
    encryptionSecret: import.meta.env.VITE_SECURE_LS_ENCRYPTION_KEY
});

const pinia = createPinia();
pinia.use(persistencePlugin({
    storeKeysPrefix: 'thoughtsjournalpro',
    persistenceDefault: true,
    storageItemsDefault: [{
        storage: {
            getItem: (key) => {
                const value = ls.get(key);
                // console.debug(`main::reading from localstorage:key=${key}; value=${value}`);
                return value;
            },
            setItem: (key, value) => {
                const result = ls.set(key, value);
                // console.debug(`main::writing to localstorage:key=${key}; value:${value}; result=${result}`);
                return result;
            },
            removeItem: (key) => {
                const result = ls.remove(key);
                // console.debug(`main::removing from localstorage:key=${key}; result=${result}`);
                return result; // not-required; but es-lint blocks - unsed variable `result`
            },
        }
    }]
}));

const app = createApp(App).use(logPlugin).use(router).use(pinia);
app.mount('#app');
