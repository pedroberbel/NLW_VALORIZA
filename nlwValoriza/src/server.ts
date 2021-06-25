import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import { router } from "./routes"
import "./database";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors())
app.use(router); //funciona como um middleware - para inserir as rotas dentro do express

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) { 
        return response.status(400).json({
            error: err.message
        });
    }
    //Se for qualquer outro erro ainda não lançado no service (por throw new error)
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(3000, () => console.log("Server is running at localhost:3000"));