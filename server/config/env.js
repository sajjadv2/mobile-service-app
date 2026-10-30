const requiredEnvVariables = ["DATABASE_URL"];

const missingVariables = requiredEnvVariables.filter(
  (name) => !process.env[name],
);

if (missingVariables.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVariables.join(", ")}`,
  );

  process.exit(1);
}

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
};
