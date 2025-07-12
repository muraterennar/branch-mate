const fs = require("fs");

const targetPathProduction = "./src/environments/environment.production.ts";
const targetPath = process.env.NODE_ENV === "production" ? targetPathProduction : "./src/environments/environment.ts";

const apiUrl = process.env.API_BASE_URL || "";

const envConfigFile = `
export const environment = {
  production: true,
  version: '${process.env.VERSION || "1.0.2"}',
  API_BASE_URL: '${apiUrl}'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`✔ Updated ${targetPath} with API_BASE_URL=${apiUrl}`);
