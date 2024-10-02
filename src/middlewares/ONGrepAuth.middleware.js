import jwt from "jsonwebtoken"

export const ONGrepAuthMiddleware = async (req,res,next) =>{
    

    try{
        const {authorization}=req.headers
        const authsplit = authorization.split(" ")

        if (authsplit.length != 2){
            return res.status(400).send({message:"Algo deu errado."})
        }

        const [bearer, token] = authsplit

        if(bearer != "Bearer"){
            return res.status(400).send({message:"Algo deu errado."})
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error){
                return res.status(401).send({ message: "token inválido" });
            }

            const rep = findONGrepById(decoded.id)

            if (!rep || rep._id){
                return res.status(401).send({ message: "token inválido" });
            }

            return next()
        })
    }catch(err){
        res.status(500).send(err.message);
    }

}