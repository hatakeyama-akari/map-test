exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\bmapbox-gl-csp-worker.js\b/i,
          use: { loader: "worker-loader" },
        },
      ],
    },
  })
}
