module.exports = {
  apps: [
    {
      name: "project-management-app",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
