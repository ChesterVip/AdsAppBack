import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: "localhost",
    user: "maniek",
    password: "maniek666",
    database: "addsapp",
    namedPlaceholders: true,
    decimalNumbers: true,
    port: 3036,
    }
)