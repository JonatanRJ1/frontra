import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import type { ProductI, ProductsResponseI, ProductMetaI } from '../services/productService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, LogOut, Loader2 } from 'lucide-react';

const Products: React.FC = () => {
    const [products, setProducts] = useState<ProductI[]>([]);
    const [meta, setMeta] = useState<ProductMetaI | null>(null);
    const [loading, setLoading] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const loadProducts = async (page: number = 1) => {
        setLoading(true);
        try {
            const response: ProductsResponseI = await productService.getProducts(page);

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
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handlePageChange = (page: number) => {
        if (!meta || page < 1 || page > meta.last_page) return;
        loadProducts(page);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const startItem = meta ? (meta.current_page - 1) * meta.per_page + 1 : 0;
    const endItem = meta ? Math.min(meta.current_page * meta.per_page, meta.total) : 0;

    const getStockVariant = (stock: number) => {
        if (stock > 20) return "default";
        if (stock > 0) return "secondary";
        return "destructive";
    };

    return (
        <div className="min-h-screen min-w-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <Button onClick={handleLogout} className="flex items-center gap-2 bg-white">
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Productos</CardTitle>
                    </CardHeader>
                    <CardContent>

                        {/* Información de paginación */}
                        {meta && (
                            <div className="mb-4 text-sm text-muted-foreground">
                                Mostrando <span className="font-medium">{startItem}</span> a <span className="font-medium">{endItem}</span> de <span className="font-medium">{meta.total}</span> productos totales
                            </div>
                        )}

                        {/* Tabla de productos */}
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p className="text-sm text-muted-foreground">Cargando productos...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>SKU</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                            <TableHead className="text-right">Stock</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <div>{product.name}</div>
                                                        <div className="text-sm text-muted-foreground line-clamp-2 mt-1
                                                           max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]">
                                                            {product.description}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                        {product.sku}
                                                    </code>
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    ${product.price.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={getStockVariant(product.stock)}>
                                                        {product.stock} unidades
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Mensaje cuando no hay productos */}
                                {products.length === 0 && !loading && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="rounded-full bg-muted p-3 mb-4">
                                            <Search className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-semibold text-lg">No se encontraron productos</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Intenta ajustar los filtros de búsqueda
                                        </p>
                                    </div>
                                )}

                                {/* Paginación */}
                                {meta && meta.last_page > 1 && (
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                onClick={() => handlePageChange(meta.current_page - 1)}
                                                disabled={meta.current_page === 1 || loading}
                                                className="flex items-center gap-1"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Anterior
                                            </Button>

                                            {/* Indicador de páginas */}
                                            <div className="flex items-center gap-1">
                                                <span className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                                                    {meta.current_page}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    de {meta.last_page}
                                                </span>
                                            </div>

                                            <Button
                                                onClick={() => handlePageChange(meta.current_page + 1)}
                                                disabled={meta.current_page === meta.last_page || loading}
                                                className="flex items-center gap-1"
                                            >
                                                Siguiente
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Products;