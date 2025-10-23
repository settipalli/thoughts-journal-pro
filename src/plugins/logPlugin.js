export default {
    install(app) {
        const isProduction = import.meta.env.PROD == 'production';

        // Helper to get the current datetime in YYYY-MM-DD HH:MM:SS format with timezone
        function getCurrentDatetime() {
            const now = new Date();
            const pad = (num) => String(num).padStart(2, "0");

            // Format date and time
            const dateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
                            `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

            // Get timezone abbreviation
            const timezone = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];

            return `${dateTime} ${timezone}`;
        }

        // define log methods
        const log = {
            info(...args) {
                console.info(`[INFO] [${getCurrentDatetime()}]:`, ...args);
            },
            warn(...args) {
                console.warn(`[WARN] [${getCurrentDatetime()}]:`, ...args);
            },
            error(...args) {
                console.error(`[ERROR] [${getCurrentDatetime()}]:`, ...args);
            },
            debug(...args) {
                if (!isProduction) {
                    console.debug(`[DEBUG] [${getCurrentDatetime()}]:`, ...args);
                } 
            },
            dir(arg, message = '') {
                if (!isProduction) {
                    console.dir(`[DEBUG] [${getCurrentDatetime()}]: ${message.trim()}`, arg);
                } 
            },
        };

        // attach the log function to the app instance
        app.provide('log', log); // make available through `inject`
    }, // end of install
};
