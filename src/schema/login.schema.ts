import z from "zod"

 export const loginSchema = z.object({
    email : z.email().nonempty("this filed can't be empty"),
    password : z.string().min( 6,"at least 6 characters").nonempty("this filed can't be empty"),  
})

export type loginSchemaType = z.infer<typeof loginSchema>