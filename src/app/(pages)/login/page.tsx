"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { loginSchema, loginSchemaType } from "@/schema/login.schema"


export default function Register() {

    let router = useRouter()

    let form = useForm<loginSchemaType>({
        defaultValues: {
            
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    })
    let { handleSubmit } = form


    function handleLogin(values: loginSchemaType) {
        console.log(values);

        // call api 
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((res) => {
            console.log(res);
            if (res.data.message == "success") {
                toast.success("you loggedIn successfully", {
                    position: "top-center"
                }),
                    router.push("/")
            }
        }).catch((err) => { 
            // console.log(err.response.data.message);
            toast.error(err.response.data.message, {
                position: "top-center"
            })
        })
    }


    // fieldState.isTouched &&

    return <>
        <div className='w-[50%] mx-auto my-20'>
            <h2 className='text-center font-bold text-2xl'>Signin Now!</h2>
            <form className="space-y-8" onSubmit={handleSubmit(handleLogin)}>
                
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel > Email </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                    type="email"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel > Password </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                    type="password"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                

                <Button className="bg-black text-white w-full my-2 cursor-pointer">
                    Submit
                </Button>

            </form>
        </div>

    </>

}
