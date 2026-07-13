import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils/cn";

interface ProductGridProps {
  products: Product[];
  className?: string;
  cols?: { sm: 1 | 2; md?: 2 | 3 | 4; lg?: 2 | 3 | 4 };
}

export function ProductGrid({ products, className, cols }: ProductGridProps) {
  const c = { sm: cols?.sm ?? 2, md: cols?.md ?? 3, lg: cols?.lg ?? 3 };
  return (
    <div className={cn(
      "grid gap-6 sm:gap-8",
      c.sm === 1 && "grid-cols-1", c.sm === 2 && "grid-cols-2",
      c.md === 2 && "md:grid-cols-2", c.md === 3 && "md:grid-cols-3", c.md === 4 && "md:grid-cols-4",
      c.lg === 2 && "lg:grid-cols-2", c.lg === 3 && "lg:grid-cols-3", c.lg === 4 && "lg:grid-cols-4",
      className,
    )}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
