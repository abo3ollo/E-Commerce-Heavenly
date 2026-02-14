"use client"


import OrderLoading from "@/app/_components/Loading/OrderLoading";
import { getUserOrders } from "@/OrdersActions/getUserOrders";
import { Order } from "@/types/order.type";
import { useEffect, useState } from "react";



export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrdersData() {
    try {
      setIsLoading(true);
      const data  = await getUserOrders();
      console.log("Orders data:", data);
      
      if (data?.data && Array.isArray(data.data)) {
        setOrders(data.data);
      } else if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.warn("Unexpected data structure:", data);
        setOrders([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch orders";
      setError(errorMessage);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const toggleOrderItems = (orderId: number) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <OrderLoading/>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No orders found.</p>
          <p className="text-gray-500 text-sm mt-2">Start shopping to create your first order!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.map((order) => {
        const showItems = expandedOrders.has(order.id);

        return (
          <div key={order.id} className="bg-white rounded-lg shadow">
            {/* Order Header */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Order #{order.id}
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="text-gray-900">
                    {new Date(order.createdAt).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={order.isPaid ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {order.paymentMethodType} ({order.isPaid ? "Paid" : "Unpaid"})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivered:</span>
                  <span className={order.isDelivered ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {order.isDelivered ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {order.totalOrderPrice.toLocaleString('en-US')} EGP
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h3>
                <div className="text-sm text-gray-700">
                  <p>{order.shippingAddress.details}, {order.shippingAddress.city}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>

              <button
                onClick={() => toggleOrderItems(order.id)}
                className="mt-6 px-4 py-2 bg-black text-white  hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {showItems ? "Hide Order Items" : "View Order Items"}
              </button>
            </div>

            {/* Order Items Section */}
            {showItems && (
              <div className="bg-white border border-gray-200 rounded-b-lg">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                  <span className="text-xs text-gray-500">
                    Last updated: {new Date(order.createdAt).toLocaleString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      
                      hour12: true
                    })}
                  </span>
                </div>

                {order.cartItems.map((item, index) => (
                  <div
                    key={item.product._id || index}
                    className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.product.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty: {item.count} | Price: {item.price.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}