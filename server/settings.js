module.exports = {
    server: {
        port: 8001
    },

    temp: {
        downloadsDir: 'tmp',
        uploadsDir: 'uploads',
        ttl: 5 * 60 * 1000      // temporary file time-to-live (in ms)
    }
};
