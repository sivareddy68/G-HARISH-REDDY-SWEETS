
"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getProductById } from "@/lib/products";

const WHATSAPP_NUMBER = "917799239933";

const productImages: Record<string, string> = {
  "Ajmeer Kalakhand":
    "https://vellankifoods.com/cdn/shop/products/ajmeer_kalakand_1200x1200.jpg?v=1680179018",
  "Chocolate Burfi":
    "https://www.garudabazaar.net/cdn/shop/files/Chocolate_Burfi_2_1024x1024.png?v=1753964856",
};

const fallbackImage =
  "https://www.chatruhalwai.com/_next/static/media/slide3.359ea5ca.png";

const quantities = [
  { label: "250 g", grams: 250 },
  { label: "500 g", grams: 500 },
  { label: "1 kg", grams: 1000 },
];

function ProductDetailsContent() {
  const params = useParams();
  const product = getProductById(String(params.id));

  const [quantity, setQuantity] = useState(500);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf6ed]">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#681c2b]">
            Product not found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block text-[#681c2b] underline"
          >
            Return to home
          </Link>
        </div>
      </main>
    );
  }

  const totalPrice = Math.round((product.price * quantity) / 1000);

  const image =
    product.image || productImages[product.name] || fallbackImage;

  const handleOrder = () => {
    const quantityLabel =
      quantity === 1000 ? "1 kg" : `${quantity} g`;

    const message = `Hello Harish Reddy Sweets!

I would like to order:

Product: ${product.name}
Category: ${product.category}
Quantity: ${quantityLabel}
Price per kg: ₹${product.price}
Total price: ₹${totalPrice}

Please confirm my order.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-[#faf6ed] text-[#35151b]">
      <header className="sticky top-0 z-40 border-b border-[#eadfcf] bg-[#faf6ed]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#681c2b] font-serif text-xl text-[#e9c77e]">
              H
            </div>

            <div>
              <p className="font-serif text-lg tracking-wide text-[#681c2b]">
                HARISH REDDY
              </p>

              <p className="text-[9px] tracking-[0.35em] text-[#a47a3d]">
                ARTISAN SWEETS
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#681c2b] hover:text-[#a47a3d]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-10 md:grid-cols-2 md:items-center md:gap-20 md:px-10 md:py-20">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#e7d8bd] bg-[#efe2cc] shadow-xl">
          <div className="aspect-square">
            <img
              src={image}
              alt={`${product.name} representative image`}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="absolute left-5 top-5 rounded-full bg-[#681c2b] px-5 py-2 text-xs tracking-widest text-[#f5dfaa] shadow-lg">
            {product.category.toUpperCase()}
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-7 pt-20">
            <p className="text-xs tracking-[0.3em] text-[#f5dfaa]">
              HARISH REDDY SWEETS
            </p>

            <h2 className="mt-2 font-serif text-3xl text-white">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Product Details */}
        <div className="py-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-[#a47a3d]">
            <Sparkles size={15} />
            OUR SWEET COLLECTION
          </div>

          <h1 className="mt-6 font-serif text-4xl leading-tight text-[#681c2b] md:text-6xl">
            {product.name}
          </h1>

          <div className="mt-6 h-[2px] w-20 bg-[#b38a4d]" />

          <p className="mt-6 max-w-lg text-base leading-8 text-[#796b5d]">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-8 rounded-2xl border border-[#e5d6bc] bg-white/60 p-5">
            <p className="text-sm text-[#88735e]">
              Price per kilogram
            </p>

            <p className="mt-2 font-serif text-4xl text-[#681c2b]">
              ₹{product.price}
              <span className="ml-2 text-base text-[#88735e]">
                / kg
              </span>
            </p>
          </div>

          {/* Quantity Selection */}
          <div className="mt-9">
            <p className="mb-4 text-sm font-semibold tracking-wide text-[#681c2b]">
              SELECT YOUR QUANTITY
            </p>

            <div className="grid grid-cols-3 gap-3">
              {quantities.map((option) => {
                const selected = quantity === option.grams;

                return (
                  <button
                    key={option.grams}
                    onClick={() => setQuantity(option.grams)}
                    className={`rounded-2xl border-2 px-3 py-4 text-center transition-all duration-200 ${
                      selected
                        ? "border-[#681c2b] bg-[#681c2b] text-white shadow-lg"
                        : "border-[#dfcfb4] bg-white/60 text-[#681c2b] hover:border-[#a47a3d] hover:bg-white"
                    }`}
                  >
                    <span className="block text-lg font-semibold">
                      {option.label}
                    </span>

                    <span
                      className={`mt-1 block text-xs ${
                        selected
                          ? "text-[#f0dba8]"
                          : "text-[#88735e]"
                      }`}
                    >
                      ₹
                      {Math.round(
                        (product.price * option.grams) / 1000
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total Price */}
          <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#efe4d2] px-6 py-5">
            <div>
              <p className="text-xs tracking-wider text-[#88735e]">
                YOUR SELECTED QUANTITY
              </p>

              <p className="mt-1 text-lg font-semibold text-[#681c2b]">
                {quantity === 1000 ? "1 kg" : `${quantity} g`}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs tracking-wider text-[#88735e]">
                TOTAL PRICE
              </p>

              <p className="mt-1 font-serif text-3xl text-[#681c2b]">
                ₹{totalPrice}
              </p>
            </div>
          </div>

          {/* WhatsApp Order */}
          <button
            onClick={handleOrder}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#681c2b] px-7 py-5 text-sm font-semibold tracking-widest text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#84283b] hover:shadow-xl"
          >
            <MessageCircle size={20} />
            ORDER ON WHATSAPP
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#88735e]">
            <CheckCircle2 size={17} className="text-[#a47a3d]" />
            Order directly with Harish Reddy Sweets
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8dcc8] px-5 py-9 text-center">
        <p className="font-serif text-xl tracking-wider text-[#681c2b]">
          HARISH REDDY SWEETS
        </p>

        <p className="mt-3 text-xs text-[#88735e]">
          DRS Complex, Ganesh Nagar, HMT Road, Chintal, Hyderabad – 500054
        </p>

        <p className="mt-3 text-xs text-[#a47a3d]">
          © {new Date().getFullYear()} Harish Reddy Sweets. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#faf6ed]">
          <p className="font-semibold text-[#681c2b]">
            Loading product details...
          </p>
        </main>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
