import  express  from "express";

import { FollowerController } from "../controller/follow.controller";
import { validateToken } from "../middlewares/auth.middleware";


const router = express.Router();

const followerController = new FollowerController();
 
 // Follower 

        // Seguir um usuário
        router.post("/users/:userId/follow/:followId", validateToken, followerController.followUser);

        // Deixar de seguir um usuário
        router.delete("/users/:userId/follow/:followId", validateToken, followerController.unfollowUser);

        export default router;
