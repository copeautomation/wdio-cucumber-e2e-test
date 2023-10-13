import { setWorldConstructor } from "@cucumber/cucumber";

class CustomWorld {
    testid: string
    appid: string
    constructor() {
        this.appid = "",
        this.testid = ""
    }
}
setWorldConstructor(CustomWorld)