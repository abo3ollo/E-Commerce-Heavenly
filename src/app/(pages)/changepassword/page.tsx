"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { changePasswordSchema, changePasswordSchemaType } from "@/schema/changepass.schema"
import { getChangePassword } from "@/ChangePasswordActions/ChangePassword"
import { useState, useTransition } from "react"

export default function ChangePassword() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<changePasswordSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(changePasswordSchema)
    })

    const { handleSubmit, reset } = form

    async function handleChangePassword(values: changePasswordSchemaType) {
        setIsLoading(true)

        startTransition(async () => {
            try {
                const result = await getChangePassword(
                    values.currentPassword,
                    values.password,
                    values.rePassword
                )

                if (result.success) {
                    toast.success("Password changed successfully!", {
                        position: "top-center"
                    }) 
                    reset()
                    setTimeout(() => {
                        router.push("/login")
                    }, 1500)
                } else {
                    toast.error(result.message, {
                        position: "top-center"
                    })
                }
            } catch (error) {
                toast.error("An unexpected error occurred", {
                    position: "top-center"
                })
            } finally {
                setIsLoading(false)
            }
        })
    }

    const loading = isLoading || isPending

    return (
        <div className="w-full max-w-md mx-auto my-20 px-4">
            <h2 className="text-center font-bold text-2xl mb-8">Change Password</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit(handleChangePassword)}>
                <FieldGroup>
                    <Controller
                        name="currentPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Current Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="current-password"
                                    type="password"
                                    disabled={loading}
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
                                <FieldLabel>New Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="new-password"
                                    type="password"
                                    disabled={loading}
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
                        name="rePassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Confirm New Password</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="new-password"
                                    type="password"
                                    disabled={loading}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <Button 
                    type="submit"
                    className="bg-black text-white w-full hover:bg-gray-800 transition-colors"
                    disabled={loading}
                >
                    {loading ? "Changing Password..." : "Change Password"}
                </Button>
            </form>
        </div>
    )
}