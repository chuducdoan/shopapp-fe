import { OrderDetailResponse } from "./order.detail";

export interface OrderResponse {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    order_date: string;
    status: string;
    total_money: number;
    shipping_method: string;
    shipping_address: string;
    shipping_date: string;
    tracking_method: string;
    payment_method: string;
    active: boolean;
    user_id: number;
    order_details: OrderDetailResponse[];

}