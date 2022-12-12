import allure from "@wdio/allure-reporter"
import logger from "./logger.js"

/**
 * Global reporter used for both logger and Allure.
 * Currently added message goes as a arg to .addstep() of alllure, add more param as required
 * Allure can ignore certain steps such as retry steps
 * @param testid : this.testid or NA. This is a mandatory field
 * @param loglevel 
 * @param toAllure default true
 * @param msg 
 * @todo 
 * 1. Add more param of allure reporter like add issue (to add an JIRA issue..etc)
 */
function addStep(testid: string, loglevel: string, msg: string, toAllure = true, issueid = undefined) {
    let arr = ["info", "debug", "warn", "error"]
    if (!testid) throw Error(`Invalid testid: ${testid} field to report step`)
    if (!msg) logger.error(`Given message: ${msg} is not valid to report`)
    if (!arr.includes(loglevel)) logger.error(`Given loglevel: ${loglevel} is invalid and should be one of these values: ${arr}`)
    try {
        if (loglevel === "info") logger.info(`[${testid}]: ${msg}`)
        if (loglevel === "debug") logger.debug(`[${testid}]: ${msg}`)
        if (loglevel === "warn") logger.warn(`[${testid}]: ${msg}`)
        if (loglevel === "error") {
            logger.error(`[${testid}]: ${msg}`)
            allure.addStep(msg, {}, "failed") // Substep to fail if error
        } else {
            if (toAllure) allure.addStep(msg)
        }
        if (issueid) allure.addIssue(issueid)
    } catch (err) {
        throw Error(`Error reporting reporter step, ${err}`)
    }
}
export default { addStep }
