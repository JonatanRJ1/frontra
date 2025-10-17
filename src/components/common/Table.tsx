import type React from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "../ui/table";
import { Badge } from "../ui/badge";
import type { ProductI } from "../../services/productService";

const TableProducts: React.FC<{ products: ProductI[] }> = ({ products }) => {

    const getStockVariant = (stock: number) => {
        if (stock > 20) return "default";
        if (stock > 0) return "secondary";
        return "destructive";
    };

    return (
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
    )
}

export default TableProducts;