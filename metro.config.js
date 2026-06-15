const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withExpoRouter } = require("expo-router/metro");

const config = getDefaultConfig(__dirname);

module.exports = withExpoRouter(
    withNativeWind(config, {
        input: "./src/global.css",
    })
);