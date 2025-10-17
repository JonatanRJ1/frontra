import React, { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import type { ProductI, ProductsResponseI, ProductMetaI } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/section/Header';
import ProductsTable from '../components/section/ProductsTable';

const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductI[]>([]);
    const [meta, setMeta] = useState<ProductMetaI | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const loadProducts = useCallback(async (page: number = 1) => {
        setLoading(true);
        try {
            const response: ProductsResponseI = await productService.getProducts(page, searchTerm);

            if (response.status) {
                setProducts(response.data.products);
                setMeta(response.data.meta);
            } else {
                console.error('Error loading products:', response.message);
            }
        } catch (error: any) {
            console.error('Error loading products:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }, [searchTerm, navigate]);

    useEffect(() => {
        loadProducts(1);
    }, [loadProducts]);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    }

    const handlePageChange = (page: number) => {
        if (!meta || page < 1 || page > meta.last_page) return;
        loadProducts(page);
    };

    return (
        <div className="min-h-screen min-w-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProductsTable
                    products={products}
                    meta={meta}
                    searchTerm={searchTerm}
                    loading={loading}
                    onPageChange={handlePageChange}
                    onSearchChange={handleSearchChange}
                />
            </main>
        </div>
    );
};

export default Products;