import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';
import vueDevTools from 'vite-plugin-vue-devtools';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['logo.svg'],
            manifest: {
                name: 'Thoughts Journal Pro',
                short_name: 'Thoughts Journal Pro',
                description: 'Journal your ideas as and when they occur.',
                theme_color: '#ffffff',
                msTileColor: '#222222',
                appleMobileWebAppCapable: 'yes',
                appleMobileWebAppStatusBarStyle: 'black',
                icons: [
                    {
                        "src": "@/assets/img/pwa/icons/manifest-icon-192.maskable.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "@/assets/img/pwa/icons/manifest-icon-192.maskable.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "@/assets/img/pwa/icons/manifest-icon-512.maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "@/assets/img/pwa/icons/manifest-icon-512.maskable.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
});
