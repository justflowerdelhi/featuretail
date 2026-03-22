import { getStoreServer } from "@/lib/getStoreServer";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import Newsletter from "@/components/Newsletter";
import MarketplaceLogos from "@/components/MarketplaceLogos";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import FeaturedCollections from "@/components/FeaturedCollections";
import TrustBar from "@/components/TrustBar";
import FeatureHighlights from "@/components/FeatureHighlights";

export default async function Home() {
  const store = await getStoreServer();

  return (
    <main>
      {/* ✅ HERO */}
      <section className="relative w-full mb-4 bg-white">
        <img
          src={store?.bannerImage || "/hero.jpg"}
          alt="Banner"
          className="w-full h-[220px] md:h-[420px] object-cover"
        />

      </section>

      <section className="py-6 md:py-8 bg-gray-50">
        <TrustBar />
      </section>
      <section className="py-6 md:py-8 bg-white">
        <FeaturedCollections />
      </section>

      <section className="py-6 md:py-8
       bg-pink-50">
        <BestSellers />
      </section>

      <section className="py-6 md:py-8">
        <NewArrivals />
      </section>

      <section className="py-6 md:py-8 bg-gray-50">
        <MarketplaceLogos />
      </section>

      <section className="py-6 md:py-8 bg-white">
        <CustomerReviews />
      </section>

      <section className="py-6 md:py-8 bg-pink-50">
        <Newsletter />
      </section>

      <Footer />
    </main>
  );
}