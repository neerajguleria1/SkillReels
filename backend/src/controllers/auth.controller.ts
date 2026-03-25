import { Request, Response } from "express";
import { registerService, loginServce } from "../services/auth.service";

export const registerController = async (req : Request, res : Response) => {
    try{
    const {email , password , name} = req.body
  //  res.json({message : 'User created successfully'})

    if(!name || !email || !password ){
        res.json({message : 'Name, email and password is required'})
        return
    }
    
    const result = await registerService (email, password, name)

    res.status(201).json(result)
    
}catch(error : any){
    res.status(400).json({message:error.message})
}
}


export const loginController = async ( req : Request , res : Response) =>{
    try{
        const {email,password} = req.body

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password is required' })
            return
        }

        const user = await loginServce(email, password)
        res.status(200).json(user)
    }
        catch (error:any){
            res.status(401).json({message:error.message})
        }
    
    } 
