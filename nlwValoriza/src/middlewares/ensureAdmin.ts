import { Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    //estre trecho irá substituir o const admin = true;
    const { user_id } = request; //manipulação do Request
    
    const userRepositories = getCustomRepository(UserRepositories);

    const { admin } = await userRepositories.findOne(user_id); //{ admin } -> desestruturar user

    //const admin = true; //este campo é apenas para simulação, apenas para programar a funcionalidade ( será implementado posteriormente com JWT)

    if(admin){
        return next();
    }

    return response.status(401).json({ //sem autorização
        error:"Unauthorized"
    });
    }