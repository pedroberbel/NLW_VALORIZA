declare namespace Express {   //padrão para sobrescrever uma biblioteca
    export interface Request{ //exporta toda a tipagem que tem dentro + a que vamos passar aqui dentro
        user_id:string;
    }
}


//tsconfir > typeRoots : ["./src/@types"] -> para validar que tudo que tem ali dentro 