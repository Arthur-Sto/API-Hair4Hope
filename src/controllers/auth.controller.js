import bcrypt from 'bcrypt';
import { loginService, generateToken } from '../services/auth.service.js'

//autentifica se usuario existe e se a senha é compativel.
const login = async (req, res) => {
   

    try {
        const { email, password } = req.body;
        const user = await loginService(email);


        if (!user) {
            return res.status(404).send({ message: "Email ou senha incorretos" });
        };
        const passwordIsValid =  bcrypt.compareSync(password, user.senha)

        if (!passwordIsValid || !user) {
            return res.status(400).send({ message: "Email ou senha incorretos" });
        }

        const token =  generateToken(user._id.toString());

        res.send({token});
    } catch (err) {
        res.status(500).send({message:err.message});
    }
}

export { login };