import { GET_CATEGORIES } from "@/app/lib/api/categories";
import Image from "next/image";

export default async function Categories() {
  const categories = await GET_CATEGORIES();
  return (
    <>
      {categories && categories.length > 0 && (
        <>
          <h1 className="text-2xl font-bold">Shop Our Top Categories</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full mt-5">
            {categories.map((category) => (
              <div className="cursor-pointer bg-[#F7F8F7] rounded-md p-4 flex flex-col items-center justify-center" key={category.id}>
                <Image src='/images/perfume-product.png'
                  alt={category.name}
                  width={100} height={100}
                />
                <h2 className="text-center font-bold">{category.name}</h2>
              </div>
            ))}
          </div>
        </>

      )}
    </>
  );
}
