import { Router } from "express"
import { AuthenticateUsercontroller } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagController } from "./controllers/ListTagController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAutenticated } from "./middlewares/ensureAuthenticated";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUsercontroller();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagController();
const listUsersController = new ListUsersController();

//aqui cria-se todas as rotas

router.post("/users", createUserController.handle) //o handle do controller recebe o request e response, por isso não precisa mais passar eles aqui!
router.post("/tags", ensureAutenticated, ensureAdmin, createTagController.handle) //passa o middleware ensureAdmin apenas para esta Rota, pois colocando fora, ele passa a valer para todas as rotas que estiverem abaixo dele
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAutenticated, createComplimentController.handle)

router.get("/users/compliments/send", ensureAutenticated, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAutenticated, listUserReceiveComplimentsController.handle)
router.get("/tags", ensureAutenticated,  listTagsController.handle)
router.get("/users", ensureAutenticated, listUsersController.handle)
export { router };