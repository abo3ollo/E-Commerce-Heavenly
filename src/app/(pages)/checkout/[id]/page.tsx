"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { checkoutSchema, CheckoutSchemaType } from "@/schema/checkout.schema"
import { CheckPayment } from "@/CheckoutActions/Checkout.action"
import { clearCart } from "@/CartActions/clearCart.action"
import { CheckoutCash } from "@/CheckoutActions/CheckoutCash.action"
import { getUserCart } from "@/CartActions/getUserCart.action"
import { useState, useEffect } from "react"
import { Cart, ProductCartType } from "@/types/cart.type"
import CartLoading from "@/app/_components/Loading/CartLoading"


export default function Checkout() {
    const { id }: { id: string } = useParams()
    console.log(id);

    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState<"delivery" | "online">("delivery")
    const [cartData, setCartData] = useState<Cart | null>(null)
    const [isLoading, setIsLoading] = useState(true)



    async function fetchCartData() {
        try {
            setIsLoading(true)
            const data = await getUserCart()
            console.log("Cart data:", data)
            setCartData(data)
        } catch (error) {
            console.error("Error fetching cart:", error)
            toast.error("Failed to load cart data")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        function fetchData() {
            fetchCartData()
        }
        fetchData()
    }, [])

    const form = useForm({
        defaultValues: {

            details: "",
            phone: "",
            city: "",
        },
        resolver: zodResolver(checkoutSchema)
    })
    const { handleSubmit } = form


    async function handleCheckoutOnline(values: CheckoutSchemaType) {
        console.log(values);
        try {
            const res = await CheckPayment(id, values)

            if (res.status == "success") {
                console.log(res);
                toast.success("Redirecting to payment...");
                router.push(res.session.url)
            } else {
                toast.error(res.message || "Checkout failed");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("An error occurred during checkout");
        }
    }
    async function handleCheckoutOnDelivery(values: CheckoutSchemaType) {
        console.log(values);
        try {
            const res = await CheckoutCash(id, values)

            if (res.status == "success") {
                console.log(res);
                await clearCart();
                toast.success("Order placed successfully!");
                router.push(`/allorders`)

            } else {
                toast.error(res.message || "Checkout failed");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("An error occurred during checkout");
        }
    }


    // fieldState.isTouched &&

    const onSubmit = (values: CheckoutSchemaType) => {
        if (paymentMethod === "delivery") {
            handleCheckoutOnDelivery(values);
        } else {
            handleCheckoutOnline(values);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Shipping Address & Payment */}
                    <div className="space-y-6">
                        {/* Shipping Address Section */}
                        <div className="bg-white rounded-lg overflow-hidden shadow">
                            <div className="bg-black text-white p-4 flex items-center gap-2">
                                <span className="text-xl">📍</span>
                                <div>
                                    <h2 className="font-bold text-lg">Shipping Address</h2>
                                    <p className="text-sm text-green-100">Where should we deliver your order?</p>
                                </div>
                            </div>

                            <form className="p-6 space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2 items-center">
                                    <span className="text-blue-600 text-lg">ℹ️</span>
                                    <p className="text-sm text-blue-700">Please ensure your address is accurate for smooth delivery</p>
                                </div>

                                <FieldGroup>
                                    <Controller
                                        name="city"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>City *</FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    type="text"
                                                    className="border border-gray-300 rounded-lg"
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
                                        name="details"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Street Address *</FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    type="text"
                                                    className="border border-gray-300 rounded-lg"
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
                                        name="phone"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Phone Number *</FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    type="tel"
                                                    className="border border-gray-300 rounded-lg"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Egyptian numbers only</p>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </form>
                        </div>

                        {/* Payment Method Section */}
                        <div className="bg-white rounded-lg overflow-hidden shadow">
                            <div className="bg-black text-white p-4 flex items-center gap-2">
                                <span className="text-xl">💳</span>
                                <div>
                                    <h2 className="font-bold text-lg">Payment Method</h2>
                                    <p className="text-sm text-white">Choose how you&apos;d like to pay</p>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Cash on Delivery Option */}
                                <div
                                    onClick={() => setPaymentMethod("delivery")}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === "delivery"
                                        ? "border-black bg-gray-200"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">📦</span>
                                            <div>
                                                <p className="font-bold text-gray-900">Cash on Delivery</p>
                                                <p className="text-sm text-gray-600">Pay when your order arrives at your doorstep</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "delivery"
                                            ? "border-black bg-black"
                                            : "border-gray-300"
                                            }`}>
                                            {paymentMethod === "delivery" && <span className="text-white text-sm">✓</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Pay Online Option */}
                                <div
                                    onClick={() => setPaymentMethod("online")}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === "online"
                                        ? "border-black bg-gray-200"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">💰</span>
                                            <div>
                                                <p className="font-bold text-gray-900">Pay Online</p>
                                                <p className="text-sm text-gray-600">Secure payment with Credit/Debit Card via Stripe</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online"
                                            ? "border-black bg-black"
                                            : "border-gray-300"
                                            }`}>
                                            {paymentMethod === "online" && <span className="text-white text-sm">✓</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="bg-white rounded-lg overflow-hidden shadow h-fit sticky top-4">
                        <div className="bg-black text-white p-4 flex items-center gap-2">
                            <span className="text-xl">🛍️</span>
                            <div>
                                <h2 className="font-bold text-lg">Order Summary</h2>
                                <p className="text-sm text-green-100">{cartData?.numOfCartItems || 0} items</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {isLoading ? (
                                <CartLoading />
                            ) :
                                <>
                                    {/* Products */}
                                    <div className="space-y-4 border-b pb-4 max-h-86 overflow-y-auto">
                                        {cartData?.data?.products?.map((item: ProductCartType, index: number) => (
                                            <div key={item.product._id || index} className="flex justify-between items-start gap-3">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <img
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div className="text-sm flex-1">
                                                        <p className="font-medium text-gray-900 line-clamp-2">{item.product.title}</p>
                                                        <p className="text-gray-500">{item.count} x {item.price} EGP</p>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-gray-900 text-sm">{(item.count * item.price).toLocaleString('en-US')} EGP</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Details */}
                                    <div className="space-y-3 border-b pb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium text-gray-900">{cartData?.data.totalCartPrice.toLocaleString('en-US')} EGP</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">🚚 Shipping</span>
                                            <span className="font-bold text-green-600">FREE</span>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">Total</span>
                                            <span className="text-2xl font-bold text-blue-600">{cartData?.data.totalCartPrice.toLocaleString('en-US')} EGP</span>
                                        </div>
                                    </div>

                                    {/* Place Order Button */}
                                    <Button
                                        onClick={handleSubmit(onSubmit)}
                                        className="w-full bg-black hover:bg-gray-700 text-white font-bold py-3 rounded-lg cursor-pointer transition-colors "
                                    >
                                        ✓ Place Order
                                    </Button>

                                    {/* Trust Badges */}
                                    <div className="flex justify-between text-xs text-gray-600 pt-4">
                                        <span>🔒 Secure</span>
                                        <span>🚀 Fast Delivery</span>
                                        <span>↩️ Easy Returns</span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
