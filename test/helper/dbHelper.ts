import sql from "mssql/msnodesqlv8";
import reporter from "../helper/reporter";

const sqlConfig = {
  user: "copeautomation",
  password: "demo",
  database: "AdventureWorksDW2019",
  server: "DESKTOP-P5LNVC8",
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
    trustedConnection: true
  },
};

let query = `SELECT TOP 1 *
              FROM [AdventureWorksDW2019].[dbo].[FactSalesQuota]
              WHERE [Date] ='2010-12-29 00:00:00.000'`;

(async () => {
  const pool1 = new sql.ConnectionPool(sqlConfig);
  const pool1Connect = pool1.connect();
  pool1.on("error", (err) => {
    throw err;
  });
  await pool1Connect; // ensures that the pool has been created
  try {
    const request = pool1.request(); // or: new sql.Request(pool1)
    const result = await request.query(query);
    console.log(result);
    return result;
  } catch (err) {
    console.error("SQL error", err);
  }
})();
