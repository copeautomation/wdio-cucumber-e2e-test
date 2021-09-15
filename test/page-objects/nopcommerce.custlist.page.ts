import Page from "./page"
import chai from "chai"
import reporter from "../helper/reporter"

class CustList extends Page {
    constructor() {
        super()
    }

    /**Page objects */
    get firstNameInputBox() { return $(`#SearchFirstName`) }
    get lastNameInputBox() { return $(`#SearchLastName`) }
    get searchBtn() { return $(`#search-customers`) }
    get noResultsMesage() { return $(`td=No data available in table`) }

    /**Page Actiions */
    async searchNameAndConfirm(testid: string, firstname: string, lastname: string): Promise<boolean> {
        if (!firstname || !lastname) throw Error(`Invalid firstname: ${firstname} or lastname: ${lastname} to search`)
        let nameNotExist = false
        firstname = firstname.trim()
        lastname = lastname.trim()
        reporter.addStep(testid, "info", `Searching user: ${firstname} ${lastname}`)
        try {
            await this.typeInto(await this.firstNameInputBox, firstname)
            await this.typeInto(await this.lastNameInputBox, lastname)
            await this.click(await this.searchBtn)
            await browser.pause(1000)
            let isNotDisplayed = await this.noResultsMesage.isDisplayed()
            if (isNotDisplayed) nameNotExist = true
        } catch (err) {
            throw `Failed searching given firstname: ${firstname} and lastname: ${lastname} on customers page, ${err}`
        }
        return nameNotExist
    }
}
export default new CustList()
