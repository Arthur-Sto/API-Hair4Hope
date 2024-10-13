import {createTransport} from "nodemailer"

export const transport = createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"h4h.verify@gmail.com",
        pass:"kitzjhsukjldlejy"
    }
})