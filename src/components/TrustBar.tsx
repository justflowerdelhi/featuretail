export default function TrustBar() {
  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-4xl">🚚</span>
            <p className="font-semibold mt-2">Fast Shipping</p>
          </div>
          <div>
            <span className="text-4xl">🔒</span>
            <p className="font-semibold mt-2">Secure Payments</p>
          </div>
          <div>
            <span className="text-4xl">⭐</span>
            <p className="font-semibold mt-2">Quality Guaranteed</p>
          </div>
          <div>
            <span className="text-4xl">🔄</span>
            <p className="font-semibold mt-2">Easy Returns</p>
          </div>
        </div>
      </div>
    </section>
  );
}
