import React from "react";
import type { ProductI, ProductMetaI } from "../../services/productService";

import TableProducts from "@/components/common/Table";
import PaginationProducts from "../common/Pagination";
import SearchProducts from "../common/Search";
import { Loader2 } from "lucide-react";

const ProductTable: React.FC<{
    products: ProductI[],
    meta: ProductMetaI | null,
    searchTerm: string,
    loading: boolean,
    onSearchChange: (term: string) => void,
    onPageChange: (page: number) => void
}> = ({ products, meta, searchTerm, loading, onSearchChange, onPageChange }) => {
    return (
        <div className="min-w-full overflow-x-auto">
            {loading ? (
                <div className="flex justify-center items-center p-4">
                    <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
                </div>
            ) : (
                <>
                    <SearchProducts searchTerm={searchTerm || ""} onSearchChange={onSearchChange} />
                    <TableProducts products={products} />
                    <PaginationProducts meta={meta} onPageChange={onPageChange} />
                </>
            )}
        </div>
    )
}

export default ProductTable;