export default () => ({
  port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_PORT,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
