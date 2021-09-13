import request from "supertest"

// What is request
console.log(`> The typeof request: ${typeof request}`); //function
console.log(`>> Number of args: ${request.length}`); // 1 arg
console.log(`>> what is the definition of the function: ${request.toString()}`);