
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
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
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

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

function CollectionContent() {
  const params = useParams();
  const category = String(params.category || "").toLowerCase();

  const reduceMotion = useReducedMotion();

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
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1 className="text-3xl font-bold text-[#681d2d]">
            Collection Not Found
          </h1>

          <p className="mt-3 text-[#76665a]">
            The collection you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#681d2d] px-6 py-3 text-white transition duration-300 hover:bg-[#501522]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f3e9]">

      {/* HERO SECTION */}

      <section className="relative flex min-h-[430px] w-full flex-col items-center justify-center overflow-hidden bg-[#501522] px-6 py-16 text-center text-[#fff8e9] md:py-24">

        {/* Animated Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          {!reduceMotion && (
            <>
              <motion.div
                className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#d6ad65] blur-3xl"
                animate={{
                  x: [0, 25, 0],
                  y: [0, 20, 0],
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#d6ad65] blur-3xl"
                animate={{
                  x: [0, -25, 0],
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}
        </div>

        <motion.div
          className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
                delayChildren: 0.15,
              },
            },
          }}
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/"
              className="mb-8 inline-flex items-center justify-center gap-2 text-sm text-[#e7c98e] transition duration-300 hover:-translate-x-1 hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mb-5 flex w-full items-center justify-center gap-2 text-center text-sm tracking-[0.3em] text-[#d9b878]"
          >
            <Sparkles size={17} />
            HARISH REDDY SWEETS
            <Sparkles size={17} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="w-full text-center font-serif text-5xl font-bold md:text-7xl"
          >
            {selectedCategory}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mx-auto my-6 h-[2px] w-24 bg-[#d6ad65]"
          />

          <motion.p
            variants={fadeUp}
            className="mx-auto w-full max-w-2xl text-center text-base leading-8 text-[#f0dfc5] md:text-lg"
          >
            Discover our carefully presented collection of traditional Indian
            sweets, made for every celebration and special moment.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-7 w-full text-center text-2xl font-semibold text-[#e7c98e]"
          >
            ₹{categoryPrice} / kg
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-2 w-full text-center text-xs tracking-[0.25em] text-[#e8d7bd]"
          >
            {categoryProducts.length} VARIETIES
          </motion.p>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION */}

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">

        {/* SECTION HEADING */}

        <motion.div
          className="mb-10 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm font-semibold tracking-[0.3em] text-[#a77b3d]">
            OUR COLLECTION
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#501522] md:text-4xl">
            Explore Our {selectedCategory}
          </h2>

          <p className="mt-3 text-sm text-[#77695d]">
            Choose your favourite sweet and order directly through WhatsApp.
          </p>
        </motion.div>

        {/* SEARCH PRODUCTS */}

        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#a77b3d]">
            FIND YOUR FAVOURITE
          </p>

          <h3 className="mb-5 font-serif text-2xl font-bold text-[#501522] md:text-3xl">
            Search Our {selectedCategory}
          </h3>

          <div className="group flex items-center gap-3 rounded-full border border-[#d6ad65] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(80,21,34,0.06)] transition duration-300 focus-within:border-[#a77b3d] focus-within:shadow-[0_5px_22px_rgba(80,21,34,0.12)] hover:shadow-[0_8px_25px_rgba(80,21,34,0.10)]">

            <Search
              size={21}
              className="shrink-0 text-[#a77b3d] transition-transform duration-300 group-focus-within:scale-110"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter sweet name..."
              aria-label={`Search ${selectedCategory} products`}
              className="w-full bg-transparent text-base text-[#501522] outline-none placeholder:text-[#a39482]"
            />

            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#927e68] transition hover:bg-[#f8f3e9] hover:text-[#501522]"
                >
                  <X size={19} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {searchTerm.trim() && (
              <motion.p
                key={filteredProducts.length}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-xs tracking-wide text-[#927e68]"
              >
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "sweet" : "sweets"} found
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* PRODUCT RESULTS */}

        {categoryProducts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center text-[#76665a]"
          >
            No products found in this collection.
          </motion.p>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <Search
              size={35}
              className="mx-auto mb-4 text-[#b49a77]"
            />

            <h3 className="font-serif text-xl font-bold text-[#501522]">
              No Products Found
            </h3>

            <p className="mt-2 text-sm text-[#76665a]">
              No sweets match "{searchTerm}". Try another product name.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-5 rounded-full bg-[#501522] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#681d2d] hover:shadow-lg"
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => {
                const image =
                  productImages[product.id] ||
                  product.image ||
                  fallbackImage;

                return (
                  <motion.article
                    key={product.id}
                    layout
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 70,
                            scale: 0.92,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: reduceMotion ? 0.01 : 0.8,
                      delay: reduceMotion ? 0 : (index % 4) * 0.12,
                      ease,
                      layout: {
                        duration: 0.4,
                      },
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -9,
                          }
                    }
                    className="group overflow-hidden rounded-2xl border border-[#e9ddc9] bg-white shadow-sm transition-all duration-500 hover:border-[#d6ad65] hover:shadow-[0_18px_40px_rgba(80,21,34,0.16)]"
                  >

                    {/* ANIMATED PRODUCT IMAGE */}

                    <div className="relative h-64 overflow-hidden bg-[#eee4d5]">

                      <motion.img
                        src={image}
                        alt={product.name}
                        loading={index < 4 ? "eager" : "lazy"}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                scale: 1.2,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.3,
                        }}
                        transition={{
                          duration: reduceMotion ? 0.01 : 1.1,
                          ease,
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* IMAGE OVERLAY */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#260710]/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />

                      {/* GOLD FRAME */}

                      <div className="pointer-events-none absolute inset-3 rounded-xl border border-transparent transition-all duration-500 group-hover:border-[#f3d99e]" />

                      {/* CATEGORY BADGE */}

                      <motion.div
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -15,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: reduceMotion ? 0 : (index % 4) * 0.12 + 0.2,
                        }}
                        className="absolute left-4 top-4 rounded-full bg-[#501522]/95 px-4 py-2 text-xs font-semibold tracking-wider text-[#f7dfac] shadow-md backdrop-blur-sm"
                      >
                        {selectedCategory}
                      </motion.div>
                    </div>

                    {/* PRODUCT DETAILS */}

                    <div className="p-5">

                      <motion.h3
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 15,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: reduceMotion ? 0 : 0.15,
                        }}
                        className="font-serif text-xl font-bold text-[#501522] transition-colors duration-300 group-hover:text-[#a77b3d]"
                      >
                        {product.name}
                      </motion.h3>

                      <p className="mt-2 min-h-[42px] text-sm leading-6 text-[#786b60]">
                        {product.description}
                      </p>

                      {/* PRICE */}

                      <div className="mt-5 flex items-center justify-between border-t border-[#eee3d4] pt-4">
                        <div>
                          <p className="text-xs tracking-wider text-[#927e68]">
                            PRICE
                          </p>

                          <motion.p
                            initial={
                              reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 12,
                                  }
                            }
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: reduceMotion ? 0 : 0.25,
                            }}
                            className="mt-1 text-2xl font-bold text-[#a77b3d]"
                          >
                            ₹{product.price}
                            <span className="text-sm font-medium text-[#76665a]">
                              /kg
                            </span>
                          </motion.p>
                        </div>
                      </div>

                      {/* WHATSAPP BUTTON */}

                      <motion.a
                        href={whatsappOrder(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 1.035,
                                y: -2,
                              }
                        }
                        whileTap={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 0.97,
                              }
                        }
                        transition={{
                          duration: 0.25,
                        }}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#D4AF37] bg-[#FFF3D6] px-5 py-3.5 text-sm font-bold text-[#501522] shadow-sm transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#501522]"
                      >
                        <MessageCircle size={18} />
                        Order on WhatsApp
                      </motion.a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* FOOTER */}

      <motion.footer
        className="bg-[#501522] px-6 py-10 text-center text-[#f5e8d2]"
        initial={reduceMotion ? false : { opacity: 0, y: 35 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.8,
          ease,
        }}
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
      </motion.footer>
    </main>
  );
}

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f8f3e9]">
          <motion.p
            className="text-lg font-semibold text-[#681d2d]"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading collection...
          </motion.p>
        </main>
      }
    >
      <CollectionContent />
    </Suspense>
  );
}
