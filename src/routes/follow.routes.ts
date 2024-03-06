import  express  from "express";

import { FollowerController } from "../controller/follow.controller";


const router = express.Router();

const followerController = new FollowerController();
 
 // Follower 

        // Seguir um usuário
        router.post("/users/:userId/follow/:followId", followerController.followUser);

        // Deixar de seguir um usuário
        router.delete("/users/:userId/follow/:followId", followerController.unfollowUser);

        export default router;
