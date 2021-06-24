import { Router } from "express"
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

//aqui cria-se todas as rotas
console.log('entrou nas rotas')
router.post("/users", createUserController.handle) //o handle do controller recebe o request e response, por isso não precisa mais passar eles aqui!
router.post("/tags", ensureAdmin, createTagController.handle) //passa o middleware ensureAdmin apenas para esta Rota, pois colocando fora, ele passa a valer para todas as rotas que estiverem abaixo dele



router.get("/ttt", (requisition, response) => {
    console.log('entrou nas rotas')
    return response.send('entrou')
})

export { router };