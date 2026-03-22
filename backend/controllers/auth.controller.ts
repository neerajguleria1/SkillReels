import { Request, Response } from "express";

export const loginController = async (req : Request, res : Response)=>{
    const {email, password} = req.body

    if (!email || !password){
        res.status(400).json({message : 'Email and password are required'})
        return 
    }
}