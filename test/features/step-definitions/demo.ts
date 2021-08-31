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
    await browser.url("/windows")
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

    /** 1. Assert default option is selected */
    // let ele = await $('//select/option[@selected="selected"]')
    // let val = ele.getText()
    // chai.expect(val).to.equal("Please select an option")
    // await browser.debug()

    /** 2. Select by attribute, text, index /
    // let ddEle = await $('#dropdown')
    // await ddEle.selectByIndex(2)

    /**3. Get a list of options */
    // let eleArr = await $$(`select > option`)
    // let arr = []
    // for (let i = 0; i < eleArr.length; i++) {
    //     let ele = eleArr[i]
    //     let val = await ele.getText()
    //     arr.push(val)
    // }
    // console.log(`>> Options Array:|${arr}|`);

    /**
     * 3. Checkbox
     * Actions:
     * 1. Select an option
     * 2. Unselect an option (if selected)
     * 3. Assert if option is selected
     * 4. Select all options
     *
     */
    // let eleArr = await $$(`//form[@id="checkboxes"]/input`)
    // for (let i = 0; i < eleArr.length; i++){
    //     let ele = eleArr[i]
    //     if(!await ele.isSelected()){
    //         ele.click()
    //     }
    // }

    /**
    * 4. Windows handling
    * Steps: 
    * 1. Launch the browser
    * 2. Open another windows
    * 3. Switch to the window based on title
    * 4. Switch back to the main window
    
    * Methods used:
    * 1. getTitle()
    * 2. getWindowHandle()
    * 3. getWindowHandles()
    * 4. switchToWindow()
    */

    // Open new windows
    await $(`=Click Here`).click()
    await $(`=Elemental Selenium`).click()
    let currentWinTitle = await browser.getTitle()
    let parentWinHanle = await browser.getWindowHandle()
    console.log(`>> currentWinTitle: ${currentWinTitle}`);

    // Switch to specific window
    let winHandles = await browser.getWindowHandles()
    for (let i = 0; i < winHandles.length; i++){
        console.log(`>> Win handle: ${winHandles[i]}`);
        await browser.switchToWindow(winHandles[i])
        currentWinTitle = await browser.getTitle()
        if (currentWinTitle === "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro"){
            await browser.switchToWindow(winHandles[i])
            let headerTxtEleSel = await $(`<h1>`).getText()
            console.log(`>> headerTxtEleSel: ${headerTxtEleSel}`);
            // Rest of the actions go here....
            break
        }
    }

    // browser.switchWindow()
    // Switch back to parent window
    await browser.switchToWindow(parentWinHanle)
    let parentWinHeaderTxt = await $(`<h3>`).getText()
    console.log(`>> parentWinHeaderTxt: ${parentWinHeaderTxt}`);
    // Continue with rest of the execution..

    await browser.debug()

})