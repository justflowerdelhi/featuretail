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
        <div className="w-full aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] max-h-[420px] overflow-hidden">
          <img
            src={store?.bannerImage || "/hero.jpg"}
            alt="Banner"
            className="w-full h-full object-cover object-center"
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{ maxHeight: 420, width: '100%', height: '100%' }}
          />
        </div>
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