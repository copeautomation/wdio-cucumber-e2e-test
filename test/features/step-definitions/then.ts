import { Then } from "@cucumber/cucumber";
import chai from "chai";

Then(/^Inventory page should (.*)\s?list (.*)$/, async function (negativeCheck, noOfProducts) {
	if (!noOfProducts)
		throw Error(`Invalid product count provided: ${noOfProducts}`);
	let eleArr = await $$(`.inventory_item_name`);
	chai.expect(eleArr.length).to.equal(parseInt(noOfProducts)); // ===
});

/**
 * Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if any value is <=0
 */
Then(/^Validate all products have valid price$/, async function () {
	/**1. Get price list */
	let eleArr = await $$(`.inventory_item_price`);
	let priceStrArr = [];
	for (let i = 0; i < eleArr.length; i++) {
		let priceStr = await eleArr[i].getText();
		priceStrArr.push(priceStr);
	}
	console.log(`>> Price with $: ${priceStrArr}`);

	/**2. Convert string to number */
	let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
	console.log(`>> Price in numbers: ${priceNumArr}`);

	/**3. Assert if any value is <=0 */
	let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
	chai.expect(invalidPriceArr.length).to.equal(0);
});
