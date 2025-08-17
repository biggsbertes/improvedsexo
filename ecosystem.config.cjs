/**
 * PM2 ecosystem config for production
 */
module.exports = {
  apps: [
    {
      name: 'skye',
      script: 'server.mjs',
      // Use 1 instance para evitar locking do SQLite
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 8080,
      },
      max_memory_restart: '512M',
      watch: false,
    },
  ],
}


