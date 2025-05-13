'use client'
import CustomImage from "@/app/components/CustomImage";
import Link from "next/link";
interface SearchBarResultsProps {
    searchResults: Array<Product>;
    selectedIndex: number;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    onClick: (e: React.MouseEvent, slug: string) => void;
}
export default function SearchBarResults({ searchResults, selectedIndex, handleKeyDown, onClick }: SearchBarResultsProps) {

    return (
        <div
            className="absolute top-10 left-0 w-full bg-gray-400 shadow-lg rounded-md mx-2 z-50"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >

            {searchResults.map((product: Product, index: number) => (
                <Link href={`/products/${product.slug}`} key={product.id} prefetch={false}>
                    <div
                        key={product.id}
                        className={`cursor-pointer flex items-center p-2 gap-2 hover:bg-gray-500 ${index === selectedIndex ? 'bg-gray-500' : ''
                            }`}
                        // onClick={(e) => onClick(e, product.slug)}
                    >
                        <div className="w-10 h-10 relative">
                            <CustomImage
                                src={product.images[0]}
                                alt={product.title}
                                width={100}
                                height={100}
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium">{product.title}</h4>
                            <p className="text-xs">${product.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
