import request from "supertest"
import reporter from "../helper/reporter"

async function GET(testid: string, baseURL: string, endpoint: string, authToken: string, queryParam: object,) {
    if (!baseURL || !endpoint) {
        throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
    }
    baseURL = baseURL.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testid, "info", `Making a GET to ${endpoint}`)
    try {
        return await request(baseURL)
            .get(endpoint)
            .query(queryParam)
            .auth(authToken, { type: 'bearer' })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
    } catch (err) {
        err.message = `Error making a GET call to ${endpoint}, ${err}`
        throw err
    }
}
async function POST(testid: string, baseURL: string, endpoint: string, authToken: string, payload: object,) {
    if (!baseURL || !endpoint) {
        throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
    }
    baseURL = baseURL.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testid, "info", `Making a POST to ${endpoint}`)
    try {
        return await request(baseURL)
            .post(endpoint)
            .auth(authToken, { type: 'bearer' })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send(payload)
    } catch (err) {
        err.message = `Error making a POST call to ${endpoint}, ${err}`
        throw err
    }
}

export default { GET, POST }
