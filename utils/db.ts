import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    user: "maniek",
    password: "maniek666",
    database: "ads_app",
    namedPlaceholders: true,
    decimalNumbers: true,
    port: 3306
    }
);