import { Request, Response} from "express";
import { ListUserReceiveComplimentsServer } from "../services/ListUserReceiveComplimentsServer";

class ListUserReceiveComplimentsController {
    async handle(request:Request, response: Response){
        const { user_id } = request;
        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsServer();

        const compliments = await listUserReceiveComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceiveComplimentsController };