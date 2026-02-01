import z from "zod"

 export const registerSchema = z.object({
    name : z.string().nonempty("this filed can't be empty").min(2,"min lenght is 2 characters").max(15 , "max lenght is 15 characters"),
    email : z.email().nonempty("this filed can't be empty"),
    password : z.string().min( 6,"at least 6 characters").nonempty("this filed can't be empty"),
    rePassword : z.string(),
    phone: z.string().regex(/^01[0125]\d{8}$/, "must be egyptian number"),
}).refine((obj)=>{
    return obj.password === obj.rePassword
},{
    error : "password and repassword not matched",
    path: ["rePassword"]
})

export type registerSchemaType = z.infer<typeof registerSchema>