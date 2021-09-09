import { setWorldConstructor } from "@cucumber/cucumber";
import chai from "chai"

class CustomWorld {
    appid: string
    constructor() {
        this.appid = ""
    }
}
setWorldConstructor(CustomWorld)