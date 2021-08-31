import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai"


Given(/^Google page is opened$/, async function () {
    console.log(`Before opening browser...`);
    await browser.url("https://www.google.com")
    await browser.pause(1000)
    console.log(`After opening browser...`);
})

When(/^Search with (.*)$/, async function (searchItem) {
    console.log(`>> searchItem: ${searchItem}`);
    let ele = await $(`[name=q]`)
    await ele.setValue(searchItem)
    await browser.keys("Enter")
})

Then(/^Click on the first search result$/, async function () {
    let ele = await $(`<h3>`)
    ele.click()
})

Then(/^URL should match (.*)$/, async function (expectedURL) {
    console.log(`>> expectedURL: ${expectedURL}`);
    let url = await browser.getUrl()
    chai.expect(url).to.equal(expectedURL)
})
/**
 * Web Interactions
 */
Given(/^A web page is opened$/, async function () {
    await browser.url("/inputs")
    await browser.setTimeout({ implicit: 15000, pageLoad: 10000 })
    // await browser.maximizeWindow()
})

When(/^Perfom web interactions$/, async function () {
    /**
     * 1. Input box
     * Actions:
     * 1. Type into input box
     * 2. Clear the field and type or just addvalue
     * 3. Click and type
     * 4. Slow typiing
     * 
     */
    //     let num = 12345
    //     let strNum = num.toString()

    //     let ele = await $(`[type=number]`)
    //    // await ele.setValue(strNum)
    //     await ele.click()
    //     for (let i = 0; i < strNum.length; i++) {
    //         let charStr = strNum.charAt(i)
    //         await browser.pause(1000)
    //         await browser.keys(charStr)
    //     }

    /**
     * 2. Dropdown
     * Actions:
     * 1. Assert default option is selected
     * 2. Select by attribute, text, index 
     * 3. Get a list of options
     */




    await browser.debug()


})