import React from "react";
import type { ProductI, ProductMetaI } from "../../services/productService";

import { Card } from "../ui/card";
import TableProducts from "@/components/common/Table";
import AddProducts from "../common/Add";
import PaginationProducts from "../common/Pagination";
import SearchProducts from "../common/Search";
import FormProducts from "../common/FormProducts";
import { Loader2 } from "lucide-react";
import TriggerProducts from "../common/TriggerProducts";

const ProductTable: React.FC<{
    products: ProductI[],
    meta: ProductMetaI | null,
    searchTerm: string,
    loading: boolean,
    onSearchChange: (term: string) => void,
    onPageChange: (page: number) => void
}> = ({ products, meta, searchTerm, loading, onSearchChange, onPageChange }) => {
    return (
        <div className="w-full">
            {loading ? (
                <div className="flex justify-center items-center p-4">
                    <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
                </div>
            ) : (
                <Card className="w-90% mx-auto p-4">
                    <div className="flex items-center justify-between mb-4">
                        <SearchProducts searchTerm={searchTerm || ""} onSearchChange={onSearchChange} />
                        <AddProducts trigger={<TriggerProducts />} title="Agregar Productos" description="Complete el formulario para agregar un nuevo producto.">
                            <FormProducts />
                        </AddProducts>
                    </div>
                    <TableProducts products={products} />
                    <PaginationProducts meta={meta} onPageChange={onPageChange} />
                </Card>
            )}
        </div>
    )
}

export default ProductTable;