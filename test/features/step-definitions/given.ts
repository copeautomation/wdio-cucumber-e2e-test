import { Given } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../helper/reporter"
import sauseHomePage from "../../page-objects/sause.home.page"
import constants from "../../../data/constants.json"
import apiHelper from "../../helper/apiHelper"
import fs from "fs"

Given(/^As (a|an) (.*) user I login to inventory web app$/, async function (prefixTxt, userType, dataTable) {
    try {
        reporter.addStep(this.testid, "info", "Login to sause demo..")
        let dt = dataTable.hashes()
        // @ts-ignore
        await sauseHomePage.navigateTo(browser.config.sauseDemoURL)
        await sauseHomePage.loginToSauseApp(this.testid, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD)
    } catch (err) {
        err.message = `${this.testid}: Failed at login step, ${err.message}`
        throw err
    }

})
/**
 * Get list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
    if (!endpointRef) throw Error(`Given endpoint ref: ${endpointRef} is not valid`)

    try {
        /** 1. Get payload data*/
        reporter.addStep(this.testid, "info", `Getting the payload data for endpoint: ${endpointRef}`)
        let endpoint = ""
        if (endpointRef.trim().toUpperCase() === "USERS") {
            endpoint = constants.REQRES.GET_USERS
        }
        if (!endpoint) throw Error(`Error getting endpoint:${endpoint} from the constants.json`)

        /**2. Make get call by using API helper */
        let testid = this.testid
        let res
        await browser.call(async function () {
            // @ts-ignore
            res = await apiHelper.GET(testid, browser.config.reqresBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM)
        })
        // @ts-ignore
        if (res.status !== 200) chai.expect.fail(`Failed getting users from :${browser.config.reqresBaseURL}/${endpoint}`)
        reporter.addStep(this.testid, "debug", `API response received, data: ${JSON.stringify(res.body)}`)

        /** 3.Store results*/
        let data = JSON.stringify(res.body, undefined, 4)
        let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
        fs.writeFileSync(filename, data)
        reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`)
    } catch (err) {
        err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`
        throw err
    }
})
