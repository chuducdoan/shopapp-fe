import { ProductImage } from "./product_image.model";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    product_images: ProductImage[];
    url: string;
    category_id: number;
}