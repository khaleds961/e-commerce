import Products from "@/app/components/Products";
import Categories from "@/app/ui/HomePage/Categories";
import MegaPromotion from "@/app/ui/HomePage/MegaPromotion";
import Advertisement from "@/app/ui/HomePage/Advertisement";
import { GET_CATEGORIES } from "@/app/lib/api/categories";
import { GET_PRODUCTS } from "@/app/lib/api/products";


export default async function Home() {
  const categories = await GET_CATEGORIES();
  const products = await GET_PRODUCTS();
  const limitedProducts = products.slice(0, 20);

  const siteProperties = {
    color: '#BE1C26',
    fontFamily: 'Poppins',
    backgroundColor: '#F7F8F7',
    logo: '/images/logo.png',
  };

  return (
    <div className="mx-2 md:mx-10 px-0 md:px-10 mt-5">
      <Categories categories={categories} />
      <Products titleKey="todayDeals" products={limitedProducts} />
      <MegaPromotion  />
      <Advertisement />
      <Products titleKey="popularProducts" products={limitedProducts} />
      <Products titleKey="justForYou" products={limitedProducts} />
    </div>
  );
}   