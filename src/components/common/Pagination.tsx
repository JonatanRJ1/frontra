import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../ui/pagination";
import type { ProductMetaI } from "../../services/productService";

const PaginationProducts: React.FC<{
    meta: ProductMetaI | null;
    onPageChange: (page: number) => void
}> = ({ meta, onPageChange }) => {

    const getPageNumbers = () => {
        if (!meta) return [];

        const current = meta.current_page;
        const last = meta.last_page;
        const delta = 2;
        const range = [];

        for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
            range.push(i);
        }

        if (current - delta > 2) {
            range.unshift('...');
        }
        if (current + delta < last - 1) {
            range.push('...');
        }

        range.unshift(1);
        if (last !== 1) range.push(last);

        return range;
    };

    if (!meta) return null;

    return (
        <div className="flex items-center justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(meta.current_page - 1)}
                            className={meta.current_page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {page === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    onClick={() => onPageChange(page as number)}
                                    isActive={meta.current_page === page}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(meta.current_page + 1)}
                            className={meta.current_page === meta.last_page ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default PaginationProducts;

