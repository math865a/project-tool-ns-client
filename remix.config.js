/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
    serverDependenciesToBundle: [
        "d3-color",
        "@visx/drag",
        "d3-interpolate",
        "query-string",
        "d3-format",
        "d3-scale-chromatic",
        "luxon"
    ],
    devServerPort: 8002,
    future: {
        v2_routeConvention: true,
    }
//    cacheDirectory: "node_modules("
    // appDirectory: "app",
    // assetsBuildDirectory: "public/build",
    // serverBuildPath: "build/index.js",
    // publicPath: "/build/",
};
