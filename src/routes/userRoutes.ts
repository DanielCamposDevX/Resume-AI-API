import { FastifyInstance } from "fastify";
import { userControllers } from "../controllers/userControllers";


export async function UserRoutes(app: FastifyInstance) {
    app.post('/user',userControllers.createUser);
    app.post('/tokens',userControllers.authUser);
}
