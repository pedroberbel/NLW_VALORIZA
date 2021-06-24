import { Request, Response, NextFunction} from "express"


export function ensureAdmin(request: Request, response: Response, next: NextFunction){
    const admin = true; //este campo é apenas para simulação, apenas para programar a funcionalidade ( será implementado posteriormente com JWT)

    if(admin){
        return next();
    }

    return response.status(401).json({ //sem autorização
        error:"Unauthorized"
    });
    }