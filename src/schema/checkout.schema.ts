import z from "zod"

 export const checkoutSchema = z.object({
    details: z.string().nonempty("this filed can't be empty"),
    phone: z.string().nonempty("this filed can't be empty").regex(/^01[0125]\d{8}$/, "must be egyptian number"),
    city : z.string().nonempty("this filed can't be empty"),
      
})

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>