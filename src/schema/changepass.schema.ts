import z from "zod"

 export const changePasswordSchema   = z.object({
    currentPassword :z.string().min( 6,"at least 6 characters").nonempty("this filed can't be empty"),
    password : z.string().min( 6,"at least 6 characters").nonempty("this filed can't be empty"),
    rePassword : z.string(),
}).refine((obj)=>{
    return obj.password === obj.rePassword
},{
    error : "password and repassword not matched",
    path: ["rePassword"]
})

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>