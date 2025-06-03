import Products from "@/app/template-2-components/Products";
import Categories from "@/app/ui/template-2/Categories";
import Topmenu from "@/app/ui/template-2/Topmenu";
import { GET_CATEGORIES } from "@/app/lib/api/categories";
import { GET_PRODUCTS } from "@/app/lib/api/products";
import MainMenu from "@/app/ui/template-2/Mainmenu";
import Searchbar from "@/app/ui/template-2/Searchbar";
import Mainslider from "@/app/ui/template-2/MainSlider";
import FeaturedCategories from "@/app/ui/template-2/FeaturedCategories";
import FlashSalesToday from "@/app/ui/template-2/FlashSalesToday";
import SpecialOffers from "@/app/ui/template-2/SpecialOffers";
import RecommendedForYou from "@/app/ui/template-2/RecommendedForYou";
import MegaPromotionDaily from "@/app/ui/template-2/MegaPromotionDaily";
import TopVendors from "@/app/ui/template-2/TopVendors";
import DailyBestSells from "@/app/ui/template-2/DailyBestSells";
import DeliveryBanner from "@/app/ui/template-2/DeliveryBanner";
import CategoryFeaturedProducts from "@/app/ui/template-2/CategoryFeaturedProducts";
import FourPartCarousels from "@/app/ui/template-2/FourPartCarousels";
import ShopByBrand from "@/app/ui/template-2/ShopByBrand";
import NewArrivals from "@/app/ui/template-2/NewArrivals";
import InfoCards from "@/app/ui/template-2/InfoCards";
import Subscribe from "@/app/ui/template-2/Subscribe";




export default async function Home() {
  const categories = await GET_CATEGORIES();
  const products = await GET_PRODUCTS();
  const limitedProducts = products.slice(0, 20);

  const siteProperties = {
    color: '#BE1C26',
    fontFamily: 'Poppins',
    backgroundColor: '#F7F8F7',
    logo: '/images/logo.png',
    textColor: '#000000',
  };
  const slides = [
    {
      id: 1,
      image: "/images/banner-bg.png",
      title: "Welcome to Our Store 1",
      rightImage: "/images/banner-img3.png",
      rightImageAlt: "Special Offer",
    },
    {
      id: 2,
      image: "/images/banner-bg.png",
      title: "Welcome to Our Store 2",
      rightImage: "/images/banner-img1.png",
      rightImageAlt: "Special Offer",
    },
    {
      id: 3,
      image: "/images/banner-bg.png",
      title: "Welcome to Our Store 3",
      rightImage: "/images/banner-img3.png",
      rightImageAlt: "Special Offer",
    },
  ]

  return (
    <div>
      <Topmenu siteProperties={siteProperties} />
      <Searchbar siteProperties={siteProperties} />
      <MainMenu siteProperties={siteProperties} />
      <div className="mx-2 md:mx-10 px-0 md:px-10 mt-5 md:mt-20">
        <div className="mb-5">
          <Mainslider
            slides={slides}
          />
        </div>
        <Categories categories={categories} />
        <FeaturedCategories />
        <FlashSalesToday />
        <Products titleKey="N/A" products={limitedProducts} />
        <SpecialOffers />
        <RecommendedForYou />
        <MegaPromotionDaily />
        <TopVendors />
        <DailyBestSells />
        <DeliveryBanner />
        <CategoryFeaturedProducts />
        <FourPartCarousels />
        <ShopByBrand />
        <NewArrivals />
        <InfoCards />

      </div>
      <div className="w-full bg-[url('/images/body-bottom-bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="md:px-20 py-10">
          <Subscribe />

        </div>
      </div>
    </div>

  );
}   