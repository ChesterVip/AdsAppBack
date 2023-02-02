import express, {json} from "express";
import cors from "cors";
import "express-async-errors";
import {log} from "util";
import {handleError, ValidationError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(json());

app.get("/", async (req, res) => {
    res.send("<h1>Strona Główna</h1>")
})
app.use(handleError)

app.listen(3001, "0.0.0.0", () => {
    console.log("Aplikacja napierdala na http://localhost:3001 :P " );
})


