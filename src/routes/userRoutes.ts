import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";



export async function getAllPromptsRoute(app: FastifyInstance){
    app.post('/login', userController.login);
    app.post('/signup', userController.signup);    
}