module.exports = {
  apps: [
    {
      name: "auth-service",
      script: "ts-node",
      args: "./src/index.ts",
      watch: true,
      ignore_watch: ["node_modules", "dist"],
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
