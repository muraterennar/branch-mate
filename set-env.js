const fs = require("fs");
const path = require("path");

const envDir = "./src/environments";
const apiUrl = process.env.API_BASE_URL || "";
const version = process.env.VERSION || "1.0.2";

const envConfigFile = `
export const environment = {
    production: true,
    version: '${version}',
    API_BASE_URL: '${apiUrl}'
};
`;

// envDir altındaki tüm environment.*.ts dosyalarını bul
fs.readdirSync(envDir)
    .filter(file => file.startsWith("environment") && file.endsWith(".ts"))
    .forEach(file => {
        const filePath = path.join(envDir, file);
        fs.writeFileSync(filePath, envConfigFile);
        console.log(`✔ Updated ${filePath} with API_BASE_URL=${apiUrl}`);
    });
