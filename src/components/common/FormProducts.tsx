import React, { useState, useEffect } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import type { ProductI } from "../../services/productService";
import { Button } from "@/components/ui/button";
import {
    DialogTrigger,
} from "@/components/ui/dialog";
import { productService } from "@/services/productService";
import { CheckCircleIcon, Loader2 } from "lucide-react";

const FormProducts: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const form = useForm<ProductI>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            sku: "",
        },
    });

    useEffect(() => {
        if (success) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                setSuccess(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const validateForm = (product: ProductI) => {
        let errors = false;
        form.clearErrors();

        if (!product.name || product.name.trim() === "") {
            form.setError("name", { message: "El nombre es obligatorio." });
            errors = true;
        }
        if (!product.description || product.description.trim() === "") {
            form.setError("description", { message: "La descripción es obligatoria." });
            errors = true;
        }
        if (!product.sku || product.sku.trim() === "") {
            form.setError("sku", { message: "El SKU es obligatorio." });
            errors = true;
        }
        if (product.price <= 0) {
            form.setError("price", { message: "El precio debe ser mayor que cero." });
            errors = true;
        }
        if (product.stock < 0) {
            form.setError("stock", { message: "El stock no puede ser negativo." });
            errors = true;
        }
        return errors;
    };

    const onSubmit = async (product: ProductI) => {
        const hasErrors = validateForm(product);
        if (hasErrors) {
            return;
        }

        setLoading(true);
        setSuccess(false);
        setShowAlert(false);

        try {
            const response = await productService.createProduct(product);
            if (response.status) {
                form.reset();
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            {showAlert && (
                <Alert className="sticky top-0 right-0 bg-green-50 border-green-200 text-green-800 animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="text-green-500 w-5 h-5" />
                        <span>Producto guardado exitosamente.</span>
                    </div>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Campo Nombre */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Producto</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ingrese el nombre"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo Descripción */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ingrese una descripción del producto"
                                    className="resize-none"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo Precio */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo Stock */}
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo SKU */}
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Código SKU"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    </DialogTrigger>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="min-w-20"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            "Guardar Producto"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default FormProducts;