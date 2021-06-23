import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

//aqui cria-se todas as rotas
console.log('entrou nas rotas')
router.post("/users", createUserController.handle) //o handle do controller recebe o request e response, por isso não precisa mais passar eles aqui!

router.get("/ttt", (requisition, response) => {
    console.log('entrou nas rotas')
    return response.send('entrou')
})

export { router };