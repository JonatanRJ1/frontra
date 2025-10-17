import api from './api';

export interface ProductI {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    category: string;
    created_at: string;
    updated_at: string;
}

export interface ProductMetaI {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
}

export interface ProductsResponseI {
    status: string;
    message: string;
    data: {
        products: ProductI[];
        meta: ProductMetaI;
    };
}

export interface CategoriesResponse {
    status: boolean;
    message: string;
    data: {
        categories: string[];
    };
}

class ProductService {
    private static instance: ProductService;

    private constructor() { }

    static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    async getProducts(page: number = 1, searchTerm: string = "", per_page: number = 10): Promise<ProductsResponseI> {
        const params = new URLSearchParams({
            page: page.toString(),
            per_page: per_page.toString(),
            query: searchTerm
        }).toString();

        const response = await api.get<ProductsResponseI>(`/products?${params}`);
        return response.data;
    }
}

export const productService = ProductService.getInstance();