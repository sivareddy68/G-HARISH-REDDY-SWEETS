
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { getProductById } from "@/lib/products";

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

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function ProductDetailsClient({
  id,
}: {
  id: string;
}) {
  const product = getProductById(id);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3e9] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <h1 className="font-serif text-3xl font-bold text-[#501522]">
            Product Not Found
          </h1>

          <p className="mt-3 text-[#76665a]">
            Sorry, this sweet is not available.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#501522] px-6 py-3 text-white transition hover:bg-[#681d2d]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  const image =
    productImages[product.id] || product.image || fallbackImage;

  const collectionLink =
    product.category === "Specials"
      ? "/collections/specials"
      : "/collections/ordinary";

  const whatsappMessage = `Hello Harish Reddy Sweets, I am interested in ordering ${product.name} from your ${product.category} collection. Please share the ordering details.`;

  const whatsappLink = `https://wa.me/917799239933?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f3e9]">

      {/* TOP BRAND SECTION */}

      <section className="relative overflow-hidden bg-[#501522] px-6 py-5">
        <motion.div
          className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#d6ad65] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative mx-auto flex max-w-7xl items-center justify-between"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Link
            href={collectionLink}
            className="inline-flex items-center gap-2 text-sm text-[#e7c98e] transition duration-300 hover:-translate-x-1 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to {product.category}
          </Link>

          <span className="font-serif text-sm font-bold tracking-[0.2em] text-white sm:text-base">
            HARISH REDDY SWEETS
          </span>
        </motion.div>
      </section>

      {/* PRODUCT DETAILS */}

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* PRODUCT IMAGE */}

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -55, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            <div className="absolute -inset-4 rounded-[2rem] border border-[#d6ad65] opacity-50" />

            <div className="group relative overflow-hidden rounded-[1.5rem] bg-[#eee4d5] shadow-[0_20px_60px_rgba(80,21,34,0.16)]">
              <motion.img
                src={image}
                alt={product.name}
                className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.055 }}
                transition={{ duration: 1.1, ease }}
              />

              <div className="absolute left-5 top-5 rounded-full bg-[#501522] px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-[#f7dfac] shadow-lg">
                {product.category.toUpperCase()} COLLECTION
              </div>

              <motion.div
                className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#e7c98e] bg-[#501522]/90 text-[#e7c98e] backdrop-blur-sm"
                initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6, ease }}
              >
                <Sparkles size={24} />
              </motion.div>
            </div>
          </motion.div>

          {/* PRODUCT INFORMATION */}

          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-[#a77b3d]"
            >
              <Sparkles size={16} />
              A SWEET TRADITION
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-serif text-4xl font-bold leading-tight text-[#501522] sm:text-5xl lg:text-6xl"
            >
              {product.name}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-7 h-[2px] w-24 origin-left bg-[#d6ad65]"
            />

            <motion.p
              variants={fadeUp}
              className="mt-7 text-base leading-8 text-[#786b60] sm:text-lg"
            >
              {product.description}
            </motion.p>

            {/* PRICE CARD */}

            <motion.div
              variants={fadeUp}
              className="mt-9 rounded-2xl border border-[#e5d5bb] bg-white p-6 shadow-[0_8px_30px_rgba(80,21,34,0.06)]"
            >
              <p className="text-xs font-semibold tracking-[0.25em] text-[#927e68]">
                OUR PRICE
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-[#a77b3d] sm:text-5xl">
                  ₹{product.price}
                </span>

                <span className="text-base font-medium text-[#76665a]">
                  / kg
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-[#76665a]">
                <CheckCircle2 size={17} className="text-[#a77b3d]" />
                Freshly prepared with care
              </div>
            </motion.div>

            {/* WHATSAPP ORDER BUTTON */}

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ scale: 1.025, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#D4AF37] bg-[#501522] px-7 py-4 text-base font-bold text-[#f7dfac] shadow-[0_10px_25px_rgba(80,21,34,0.18)] transition-colors duration-300 hover:bg-[#681d2d]"
            >
              <MessageCircle size={21} />
              Order on WhatsApp
            </motion.a>

            <motion.div
              variants={fadeUp}
              className="mt-5 flex items-center justify-center gap-2 text-sm text-[#927e68]"
            >
              <ShoppingBag size={16} />
              Contact us for your order details
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MORE COLLECTIONS */}

      <motion.section
        className="px-6 pb-16 text-center"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="mx-auto max-w-3xl border-t border-[#e5d5bb] pt-10">
          <p className="font-serif text-2xl font-bold text-[#501522]">
            Explore More Sweet Delights
          </p>

          <p className="mt-3 text-sm text-[#786b60]">
            Discover more varieties from our {product.category} collection.
          </p>

          <Link
            href={collectionLink}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#a77b3d] px-7 py-3 text-sm font-semibold text-[#501522] transition duration-300 hover:-translate-y-1 hover:bg-[#501522] hover:text-white hover:shadow-lg"
          >
            <ArrowLeft size={17} />
            View {product.category} Collection
          </Link>
        </div>
      </motion.section>

      {/* FOOTER */}

      <footer className="bg-[#501522] px-6 py-10 text-center text-[#f5e8d2]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="font-serif text-2xl font-bold tracking-wider text-white">
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
           © 2026 Harish Reddy Sweets. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
