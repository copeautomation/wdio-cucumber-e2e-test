import { config as baseConfig } from "../wdio.conf"
export const config = Object.assign(baseConfig, {
    // All test env specific key val pairs
    environment: "TEST",
    sauseDemoURL: "https://www.saucedemo.com"
})