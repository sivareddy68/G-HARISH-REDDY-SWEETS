
"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { products } from "@/lib/products";

const productImages: Record<string, string> = {
  // Specials
  "special-1": "/products/specials/specials-1.jpeg",
  "special-2": "/products/specials/specials-2.jpeg",
  "special-3": "/products/specials/specials-3.jpeg",
  "special-4": "/products/specials/specials-4.jpeg",
  "special-5": "/products/specials/specials-5.jpeg",
  "special-6": "/products/specials/specials-6.jpeg",
  "special-7": "/products/specials/specials-7.jpeg",
  "special-8": "/products/specials/specials-8.jpeg",
  "special-9": "/products/specials/specials-9.jpeg",
  "special-10": "/products/specials/specials-10.jpeg",
  "special-11": "/products/specials/specials-11.jpeg",
  "special-12": "/products/specials/specials-12.jpeg",
  "special-13": "/products/specials/specials-13.jpeg",
  "special-14": "/products/specials/specials-14.jpeg",
  "special-15": "/products/specials/specials-15.jpeg",

  // Ordinary
  "ordinary-1": "/products/ordinary/ordinary-1.jpeg",
  "ordinary-2": "/products/ordinary/ordinary-2.jpeg",
  "ordinary-3": "/products/ordinary/ordinary-3.jpeg",
  "ordinary-4": "/products/ordinary/ordinary-4.jpeg",
  "ordinary-5": "/products/ordinary/ordinary-5.jpeg",
  "ordinary-6": "/products/ordinary/ordinary-6.jpeg",
  "ordinary-7": "/products/ordinary/ordinary-7.jpeg",
  "ordinary-8": "/products/ordinary/ordinary-8.jpeg",
  "ordinary-9": "/products/ordinary/ordinary-9.jpeg",
  "ordinary-10": "/products/ordinary/ordinary-10.jpeg",
  "ordinary-11": "/products/ordinary/ordinary-11.jpeg",
  "ordinary-12": "/products/ordinary/ordinary-12.jpeg",
  "ordinary-13": "/products/ordinary/ordinary-13.jpeg",
  "ordinary-14": "/products/ordinary/ordinary-14.jpeg",
  "ordinary-15": "/products/ordinary/ordinary-15.jpeg",
};

const fallbackImage =
  "https://www.lemieldor.com/blog/indian-sweets-diwali.webp";

function CollectionContent() {
  const params = useParams();
  const category = String(params.category || "").toLowerCase();

  const [searchTerm, setSearchTerm] = useState("");

  const isSpecials = category === "specials";
  const isOrdinary = category === "ordinary";

  const selectedCategory = isSpecials
    ? "Specials"
    : isOrdinary
      ? "Ordinary"
      : "";

  const categoryProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  // Search only within the currently selected collection
  const filteredProducts = categoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const categoryPrice = isSpecials ? 680 : 600;

  const whatsappOrder = (productName: string) => {
    const message = `Hello Harish Reddy Sweets, I am interested in ordering ${productName} from your ${selectedCategory} collection. Please share the ordering details.`;

    return `https://wa.me/917799239933?text=${encodeURIComponent(message)}`;
  };

  if (!selectedCategory) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3e9] px-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-[#681d2d]">
            Collection Not Found
          </h1>

          <p className="mt-3 text-[#76665a]">
            The collection you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#681d2d] px-6 py-3 text-white"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3e9]">

      {/* HERO SECTION */}
      <section className="relative flex min-h-[430px] w-full flex-col items-center justify-center overflow-hidden bg-[#501522] px-6 py-16 text-center text-[#fff8e9] md:py-24">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#d6ad65] blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#d6ad65] blur-3xl" />
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">

          <Link
            href="/"
            className="mb-8 inline-flex items-center justify-center gap-2 text-sm text-[#e7c98e] transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="mb-5 flex w-full items-center justify-center gap-2 text-center text-sm tracking-[0.3em] text-[#d9b878]">
            <Sparkles size={17} />
            HARISH REDDY SWEETS
            <Sparkles size={17} />
          </div>

          <h1 className="w-full text-center font-serif text-5xl font-bold md:text-7xl">
            {selectedCategory}
          </h1>

          <div className="mx-auto my-6 h-[2px] w-24 bg-[#d6ad65]" />

          <p className="mx-auto w-full max-w-2xl text-center text-base leading-8 text-[#f0dfc5] md:text-lg">
            Discover our carefully presented collection of traditional Indian
            sweets, made for every celebration and special moment.
          </p>

          <p className="mt-7 w-full text-center text-2xl font-semibold text-[#e7c98e]">
            ₹{categoryPrice} / kg
          </p>

          <p className="mt-2 w-full text-center text-xs tracking-[0.25em] text-[#e8d7bd]">
            {categoryProducts.length} VARIETIES
          </p>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">

        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#a77b3d]">
            OUR COLLECTION
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#501522] md:text-4xl">
            Explore Our {selectedCategory}
          </h2>

          <p className="mt-3 text-sm text-[#77695d]">
            Choose your favourite sweet and order directly through WhatsApp.
          </p>
        </div>

        {/* SEARCH PRODUCTS */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#a77b3d]">
            FIND YOUR FAVOURITE
          </p>

          <h3 className="mb-5 font-serif text-2xl font-bold text-[#501522] md:text-3xl">
            Search Our {selectedCategory}
          </h3>

          <div className="group flex items-center gap-3 rounded-full border border-[#d6ad65] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(80,21,34,0.06)] transition duration-300 focus-within:border-[#a77b3d] focus-within:shadow-[0_5px_22px_rgba(80,21,34,0.12)]">

            <Search
              size={21}
              className="shrink-0 text-[#a77b3d]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter sweet name..."
              aria-label={`Search ${selectedCategory} products`}
              className="w-full bg-transparent text-base text-[#501522] outline-none placeholder:text-[#a39482]"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#927e68] transition hover:bg-[#f8f3e9] hover:text-[#501522]"
              >
                <X size={19} />
              </button>
            )}

          </div>

          {searchTerm.trim() && (
            <p className="mt-3 text-xs tracking-wide text-[#927e68]">
              {filteredProducts.length} {filteredProducts.length === 1 ? "sweet" : "sweets"} found
            </p>
          )}

        </div>

        {categoryProducts.length === 0 ? (
          <p className="py-16 text-center text-[#76665a]">
            No products found in this collection.
          </p>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <Search size={35} className="mx-auto mb-4 text-[#b49a77]" />

            <h3 className="font-serif text-xl font-bold text-[#501522]">
              No Products Found
            </h3>

            <p className="mt-2 text-sm text-[#76665a]">
              No sweets match "{searchTerm}". Try another product name.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-5 rounded-full bg-[#501522] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#681d2d]"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product, index) => {
              const image =
                productImages[product.id] || product.image || fallbackImage;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-[#e9ddc9] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="relative h-64 overflow-hidden bg-[#eee4d5]">
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading={index < 4 ? "eager" : "lazy"}
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-[#501522] px-4 py-2 text-xs font-semibold tracking-wider text-[#f7dfac]">
                      {selectedCategory}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl font-bold text-[#501522]">
                      {product.name}
                    </h3>

                    <p className="mt-2 min-h-[42px] text-sm leading-6 text-[#786b60]">
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#eee3d4] pt-4">
                      <div>
                        <p className="text-xs tracking-wider text-[#927e68]">
                          PRICE
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#a77b3d]">
                          ₹{product.price}
                          <span className="text-sm font-medium text-[#76665a]">
                            /kg
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* WHATSAPP ORDER BUTTON */}
                    <a
                      href={whatsappOrder(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#D4AF37] bg-[#FFF3D6] px-5 py-3.5 text-sm font-bold text-[#501522] shadow-sm transition duration-300 hover:bg-[#D4AF37] hover:text-[#501522]"
                    >
                      <MessageCircle size={18} />
                      Order on WhatsApp
                    </a>
                  </div>

                </article>
              );
            })}

          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#501522] px-6 py-10 text-center text-[#f5e8d2]">

        <h2
          className="font-serif text-2xl font-bold tracking-wider"
          style={{ color: "#FFFFFF" }}
        >
          HARISH REDDY SWEETS
        </h2>

        <p className="mt-3 text-sm text-[#ddc7a5]">
          A Sweet Tradition for Every Celebration
        </p>

        <p className="mt-5 text-sm text-[#ddc7a5]">
          DRS Complex, Ganesh Nagar, HMT Road, Chintal, Hyderabad – 500054
        </p>

        <p className="mt-2 text-sm text-[#ddc7a5]">
          Contact: 7799239933
        </p>

        <p className="mt-6 text-xs text-[#c5a77c]">
          © {new Date().getFullYear()} Harish Reddy Sweets. All rights reserved.
        </p>

      </footer>

    </main>
  );
}

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f8f3e9]">
          <p className="text-lg font-semibold text-[#681d2d]">
            Loading collection...
          </p>
        </main>
      }
    >
      <CollectionContent />
    </Suspense>
  );
}
