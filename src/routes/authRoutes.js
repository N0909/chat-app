import express from 'express';
import {registerClient} from '../services/userService.js';
import verifyClient from '../services/authService.js'

const authRouter = express.Router();

authRouter.post('/sign-up',async (req, res)=>{
    const client_info = req.body;
    console.log(client_info);
    const response = await registerClient(client_info["client_name"], client_info["client_password"]);
    if (response.affectedRows>0){
        return res.status(200).contentType("application/json").json({"message":"success"});
    }
})

authRouter.post('/sign-in', async (req, res)=>{
    const client_info = req.body;
    const token = await verifyClient(client_info["client_name"], client_info["client_password"]);

    return res.status(200).contentType("application/json").json({"token":token});
})

export default authRouter;


