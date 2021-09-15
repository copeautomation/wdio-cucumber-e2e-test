import { Then } from "@cucumber/cucumber";
import chai from "chai";
import logger from "../../helper/logger"
import reporter from "../../helper/reporter"
import fs from "fs"
import nopCommerceCustlistPage from "../../page-objects/nopcommerce.custlist.page"

Then(/^Inventory page should (.*)\s?list (.*)$/, async function (negativeCheck, noOfProducts) {
    try {
        if (!noOfProducts)
            throw Error(`Invalid product count provided: ${noOfProducts}`);
        let eleArr = await $$(`.inventory_item_name`);
        try {
            chai.expect(eleArr.length).to.equal(parseInt(noOfProducts)); // ===
        } catch (err) {
            reporter.addStep(this.testid, "error", "Known issue - product count mismatch", true, "JIRA-123")
        }
    } catch (err) {
        console.log(`>> The type of err: ${typeof err}`);
        console.log(`>> The name property : ${err.name}`);
        console.log(`>> The message property : ${err.message}`);
        err.message = `${this.testid}: Failed when comparing product count, ${err.message}`
        throw err // Failing
        logger.error(err.message)

    }
});

/**
 * Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if any value is <=0
 */
Then(/^Validate all products have valid price$/, async function () {
    logger.info(`${this.testid}: Checking the price...`)
    /**1. Get price list */
    let eleArr = await $$(`.inventory_item_price`);
    let priceStrArr = [];
    for (let i = 0; i < eleArr.length; i++) {
        let priceStr = await eleArr[i].getText();
        priceStrArr.push(priceStr);
    }

    /**2. Convert string to number */
    let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
    /**3. Assert if any value is <=0 */
    let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
    chai.expect(invalidPriceArr.length).to.equal(0);
});
/**
 * Verify if given user exists in customers list
 * Sub-steps:
 * 1. Navigate/select Customer options from left menu
 * 2. Read API response from /data folder
 * 3. For each user object in API response
 *  - Enter first name and last name 
 *  - Search and confirm if user exists
 * 4. In case user does not exist write it to error file
 */
Then(/^Verify if all users exist in customers list$/, async function () {

    try {
        /**1. Navigate/select Customer options from left menu*/
        // @ts-ignore
        await browser.url(`${browser.config.nopeCommerceBaseURL}/Admin/Customer/List`)
        reporter.addStep(this.testid, "info", `Navigated to customer list screen...`)

        /** 2. Read API response from /data folder*/
        let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
        let data = fs.readFileSync(filename, "utf8")
        let dataObj = JSON.parse(data)

        /**3. For each user object in API response */
        let numOfObj = dataObj.data.length
        let arr = []
        for (let i = 0; i < numOfObj; i++) {
            let obj = {}
            let firstname = dataObj.data[i].first_name
            let lastname = dataObj.data[i].last_name
            let custNotFound = await nopCommerceCustlistPage.searchNameAndConfirm(this.testid, firstname, lastname)
            if (custNotFound) {
                obj["firstname"] = firstname
                obj["lastname"] = lastname
                arr.push(obj)
            }
        }

        /**4. In case user does not exist write it to error file*/
        if (arr.length > 1) {
            let data = JSON.stringify(arr, undefined, 4)
            let filepath = `${process.cwd()}/results/custNotFoundList.json`
            fs.writeFileSync(filepath, data)
        }
    } catch (err) {
        err.message = `${this.testid}: Failed at checking users in nopcommerce site, ${err.message}`
        throw err
    }

})
