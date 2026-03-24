
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'



export async function hash_Password(password : string) : Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password , saltRounds)
}


export async function verif_Password(password : string, hash : string) : Promise<boolean>{
    return await bcrypt.compare(password,hash)
}

export async function create_User(email : string ,  password : string, name? : string) {
const hashed_Password = await hash_Password(password)
return await prisma.user.create({
    data:{
        email,
        password : hashed_Password,
        name: name ?? ''
    },

    select: {id : true , name : true, email : true, role : true}
})
}

export async function findUserBy_Mail(email : string){
    return await prisma.user.findUnique({
        where : {email},
    })
}

export async function authenticate_User(email : string, password :string){
    const user = await findUserBy_Mail(email)
    if(!user) return  null;

    const isValid = await verif_Password(password , user.password)
    return isValid ? user : null
}

export async function registerService(email : string, password : string, name? : string){
    const existing_user = await findUserBy_Mail(email);
    if (existing_user) {
        throw new Error("user already exists");
    }
    return await create_User(email, password, name);

}

