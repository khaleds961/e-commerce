import Products from "@/app/components/Products";
import Categories from "@/app/ui/HomePage/Categories";
import MegaPromotion from "@/app/ui/HomePage/MegaPromotion";

export default function Home() {
  return (
    <div className="mx-10 mt-5 bg-red-500">
      <Categories />
      <Products />
      <MegaPromotion />

    </div>
  );
}   