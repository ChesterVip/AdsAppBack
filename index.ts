import express, {json} from "express";
import cors from "cors";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import {handleError, ValidationError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))

app.get("/", async (req, res) => {
    res.send("<h1>Strona Główna</h1>")
})
app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
    console.log("Aplikacja napierdala na http://localhost:3001 :P " );
})


