
"use client";

import { useState, useRef } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  ArrowDown,
  ArrowRight,
  Menu,
  X,
  Phone,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";

const WHATSAPP_NUMBER = "917799239933";

function getWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const images = {
  hero: "https://weborder.aabsweets.com/order/assets/hero-sweets-Ci2UQYln.jpg",

  heritage:
    "https://bhagvatprasadam.com/cdn/shop/collections/Untitled.png?v=1782557182",

  kaju:
    "https://www.orderyourchoice.com/114687-large_default/order-kaju-burfee-and-darvesh-laddoo.jpg",

  laddu: "https://www.lemieldor.com/blog/indian-sweets-diwali.webp",

  assorted:
    "https://www.chatruhalwai.com/_next/static/media/slide3.359ea5ca.png",

  traditional:
    "https://cdn.shopify.com/s/files/1/1353/1137/articles/e3ed6955-8c00-4685-8762-3c75ffaef37e_55eb43d4-0359-4a5f-a684-edad68742761.png?v=1749792116",

  festive:
    "https://lynkfoods.com/cdn/shop/collections/lynk-bundles-hero.png?v=1776495738",
};

/* =========================================
   ANIMATION CONFIGURATION
========================================= */

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: "easeOut" as const,
    },
  },
};

const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut" as const,
    },
  },
};

/* =========================================
   REUSABLE SCROLL REVEAL
========================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.12,
  });

  const reduceMotion = useReducedMotion();

  const positions = {
    up: { x: 0, y: 45 },
    down: { x: 0, y: -35 },
    left: { x: 45, y: 0 },
    right: { x: -45, y: 0 },
  };

  const initialPosition = positions[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              ...initialPosition,
              filter: "blur(5px)",
            }
      }
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : undefined
      }
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   STAGGERED ANIMATION GROUP
========================================= */

function StaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.08,
  });

  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={
        reduceMotion
          ? { duration: 0 }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : staggerItem}
      initial={reduceMotion ? false : undefined}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   MAIN HOMEPAGE
========================================= */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"]
  );

  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "45%"]
  );

  /* BULK ORDER FORM */

  function handleBulkEnquiry(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const eventType = formData.get("eventType");
    const quantity = formData.get("quantity");
    const deliveryDate = formData.get("deliveryDate");
    const requirements = formData.get("requirements");

    const message = `
BULK ORDER / CATERING ENQUIRY

HARISH REDDY SWEETS

Name: ${name}
Customer Phone: ${phone}
Occasion: ${eventType}
Approximate Quantity: ${quantity}
Required Delivery Date: ${deliveryDate}
Additional Requirements: ${requirements || "Not specified"}

Please contact me with the details.

Thank you!
`;

    window.open(
      getWhatsAppLink(message),
      "_blank",
      "noopener,noreferrer"
    );

    form.reset();
  }

  const links = [
    ["Home", "#home"],
    ["Our Heritage", "#story"],
    ["Collections", "#collections"],
    ["Celebrations", "#celebrations"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ];

  return (
    <main>

      {/* =====================================
          ANNOUNCEMENT
      ===================================== */}

      <motion.div
        className="announcement"
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.span
          animate={
            reduceMotion
              ? {}
              : { rotate: [0, 12, -12, 0] }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={13} />
        </motion.span>

        <span>MADE WITH LOVE · ROOTED IN TRADITION</span>

        <motion.span
          animate={
            reduceMotion
              ? {}
              : { rotate: [0, -12, 12, 0] }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={13} />
        </motion.span>
      </motion.div>

      {/* =====================================
          NAVIGATION
      ===================================== */}

      <motion.header
        className="navbar"
        initial={reduceMotion ? false : { opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
      >
        <motion.a
          href="#home"
          className="brand"
          whileHover={reduceMotion ? {} : { y: -2 }}
        >
          <motion.span
            className="brand-symbol"
            whileHover={
              reduceMotion
                ? {}
                : { rotate: -8, scale: 1.06 }
            }
            transition={{ duration: 0.35 }}
          >
            H
          </motion.span>

          <span className="brand-name">
            G HARISH REDDY
            <small>
              SWEETS
              <br />
              A Legacy of Sweetness Since 1998
            </small>
          </span>
        </motion.a>

        <nav className="desktop-nav">
          {links.map(([name, href], index) => (
            <motion.a
              key={name}
              href={href}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: -12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.25 + index * 0.08,
              }}
            >
              {name}
            </motion.a>
          ))}
        </nav>

        <motion.a
          className="nav-order"
          href={getWhatsAppLink(
            "Hello Harish Reddy Sweets! I would like to place an order. Please share the details."
          )}
          target="_blank"
          rel="noreferrer"
          whileHover={reduceMotion ? {} : { y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          ORDER NOW <ArrowRight size={15} />
        </motion.a>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.header>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            {links.map(([name, href], index) => (
              <motion.a
                key={name}
                href={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.045,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* =====================================
          HERO
      ===================================== */}

      <section
        className="hero"
        id="home"
        ref={heroRef}
      >
        <motion.div
          className="hero-image"
          style={{
            y: reduceMotion ? 0 : heroImageY,
            scale: 1.03,
          }}
        >
          <div className="hero-overlay" />
        </motion.div>

        <motion.div
          className="hero-content"
          style={{
            y: reduceMotion ? 0 : heroTextY,
          }}
        >
          <motion.div
            className="eyebrow light"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
          >
            <span />
            THE ART OF INDIAN SWEETS
            <span />
          </motion.div>

          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 60,
                    filter: "blur(10px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              delay: 0.4,
            }}
          >
            Crafted with
            <br />
            <em>Love.</em> Served with
            <br />
            <span>Tradition.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
          >
            Discover the timeless taste of authentic Indian sweets,
            lovingly prepared to make life's beautiful moments sweeter.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.1,
              duration: 0.7,
            }}
          >
            <motion.a
              href="#collections"
              className="button-gold"
              whileHover={reduceMotion ? {} : { y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              EXPLORE COLLECTION <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#story"
              className="button-outline"
              whileHover={reduceMotion ? {} : { y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              OUR STORY
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span>01 — A LEGACY OF TASTE</span>

          <motion.a
            href="#story"
            animate={
              reduceMotion
                ? {}
                : { y: [0, 5, 0] }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            SCROLL TO DISCOVER <ArrowDown size={14} />
          </motion.a>

          <span>EST. WITH LOVE</span>
        </motion.div>

        <div className="hero-side-text">
          SWEETNESS IS AN ART
        </div>
      </section>

      {/* =====================================
          HERITAGE INTRODUCTION
      ===================================== */}

      <section
        className="intro section-padding"
        id="story"
      >
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">
              A SWEET TRADITION
            </span>

            <h2>
              More than sweets.
              <br />
              <em>A celebration of life.</em>
            </h2>
          </div>
        </Reveal>

        <div className="intro-grid">
          <Reveal
            className="intro-copy"
            direction="left"
          >
            <p className="large-copy">
              Some flavours stay with us forever. They remind us of
              celebrations, family gatherings, and moments worth
              remembering.
            </p>

            <p>
              At Harish Reddy Sweets, every creation celebrates the
              beautiful heritage of Indian mithai. Our vision is to bring
              together traditional flavours, thoughtful presentation,
              and the joy of sharing something special.
            </p>

            <motion.a
              href="#contact"
              className="text-link"
              whileHover={
                reduceMotion ? {} : { x: 6 }
              }
            >
              DISCOVER OUR STORY <ArrowRight size={16} />
            </motion.a>
          </Reveal>

          <Reveal
            className="intro-image-wrap"
            direction="right"
            delay={0.15}
          >
            <motion.img
              src={images.heritage}
              alt="Traditional Indian mithai arranged on decorative platters"
              whileHover={
                reduceMotion ? {} : { scale: 1.035 }
              }
              transition={{ duration: 0.8 }}
            />

            <div className="image-caption">
              <span>THE BEAUTY OF</span>
              <strong>Indian Mithai</strong>
            </div>

            <motion.div
              className="intro-stamp"
              animate={
                reduceMotion
                  ? {}
                  : { y: [0, -7, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={25} />
              <span>MADE FOR</span>
              <strong>Moments</strong>
              <span>THAT MATTER</span>
            </motion.div>
          </Reveal>
        </div>

        {/* BRAND PROMISE */}

        <Reveal delay={0.1}>
          <div className="collection-top">
            <div>
              <span className="eyebrow">
                OUR PROMISE
              </span>

              <h2>
                Tradition in
                <br />
                <em>every creation.</em>
              </h2>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="product-grid">
          {[
            [
              "01",
              "A SWEET LEGACY",
              "Celebrating the beauty of Indian mithai.",
            ],
            [
              "02",
              "TIMELESS FLAVOURS",
              "Traditional favourites for every generation.",
            ],
            [
              "03",
              "THOUGHTFUL PRESENTATION",
              "Beautifully presented for every occasion.",
            ],
          ].map(([number, title, description]) => (
            <StaggerItem
              className="product-card"
              key={number}
            >
              <motion.div
                className="product-info"
                whileHover={
                  reduceMotion ? {} : { y: -5 }
                }
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* =====================================
          COLLECTIONS
      ===================================== */}

      <section
        className="collections section-padding"
        id="collections"
      >
        <div className="collection-top">
          <Reveal direction="left">
            <span className="eyebrow">
              THE FINEST SELECTION
            </span>

            <h2>
              Discover our
              <br />
              <em>sweet collections.</em>
            </h2>
          </Reveal>

          <Reveal direction="right">
            <p>
              Explore our carefully presented selection of Indian sweets,
              with something special for every celebration and every
              occasion.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          className="product-grid"
        >
          {/* SPECIALS */}

          <StaggerItem className="product-card">
            <Link
              href="/collections/specials"
              className="collection-card-link"
            >
              <motion.div
                className="product-image-wrap"
                whileHover="hover"
              >
                <motion.img
                  src={images.kaju}
                  alt="Premium Indian sweets from the Specials collection"
                  loading="lazy"
                  variants={{
                    hover: {
                      scale: reduceMotion ? 1 : 1.08,
                    },
                  }}
                  transition={{ duration: 0.8 }}
                />

                <span className="product-number">
                  01
                </span>

                <motion.span
                  className="product-arrow"
                  whileHover={
                    reduceMotion
                      ? {}
                      : { rotate: -35 }
                  }
                >
                  <ArrowRight size={19} />
                </motion.span>
              </motion.div>

              <div className="product-info">
                <span>15 EXCLUSIVE VARIETIES</span>

                <h3>Specials Collection</h3>

                <div className="product-price">
                  <strong>₹680</strong>
                  <small>per kg</small>
                </div>

                <span className="text-link">
                  EXPLORE SPECIALS <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </StaggerItem>

          {/* ORDINARY */}

          <StaggerItem className="product-card">
            <Link
              href="/collections/ordinary"
              className="collection-card-link"
            >
              <motion.div
                className="product-image-wrap"
                whileHover="hover"
              >
                <motion.img
                  src={images.assorted}
                  alt="Traditional Indian sweets from the Ordinary collection"
                  loading="lazy"
                  variants={{
                    hover: {
                      scale: reduceMotion ? 1 : 1.08,
                    },
                  }}
                  transition={{ duration: 0.8 }}
                />

                <span className="product-number">
                  02
                </span>

                <motion.span
                  className="product-arrow"
                  whileHover={
                    reduceMotion
                      ? {}
                      : { rotate: -35 }
                  }
                >
                  <ArrowRight size={19} />
                </motion.span>
              </motion.div>

              <div className="product-info">
                <span>15 TRADITIONAL VARIETIES</span>

                <h3>Ordinary Collection</h3>

                <div className="product-price">
                  <strong>₹600</strong>
                  <small>per kg</small>
                </div>

                <span className="text-link">
                  EXPLORE ORDINARY <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.2}>
          <div className="center-button">
            <motion.a
              href={getWhatsAppLink(
                "Hello Harish Reddy Sweets! I would like to enquire about your complete sweet collection."
              )}
              target="_blank"
              rel="noreferrer"
              className="button-dark"
              whileHover={
                reduceMotion ? {} : { y: -4 }
              }
              whileTap={{ scale: 0.97 }}
            >
              ENQUIRE ABOUT OUR COLLECTION <ArrowRight size={16} />
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* =====================================
          BRAND MESSAGE
      ===================================== */}

      <section className="quote-section">
        <div className="quote-overlay" />

        <Reveal className="quote-content">
          <span className="eyebrow light">
            THE SWEETEST MEMORIES
          </span>

          <h2>
            Every celebration
            <br />
            deserves a little
            <br />
            <em>extra sweetness.</em>
          </h2>

          <motion.span
            className="quote-decoration"
            animate={
              reduceMotion
                ? {}
                : { rotate: 360 }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✳
          </motion.span>
        </Reveal>
      </section>

      {/* =====================================
          GALLERY
      ===================================== */}

      <section
        className="gallery section-padding"
        id="gallery"
      >
        <Reveal>
          <div className="gallery-heading">
            <span className="eyebrow">
              A FEAST FOR THE EYES
            </span>

            <h2>
              Sweet moments,
              <br />
              <em>beautifully captured.</em>
            </h2>
          </div>
        </Reveal>

        <StaggerGroup className="gallery-grid">
          <StaggerItem className="gallery-item gallery-tall">
            <motion.img
              src={images.traditional}
              alt="Traditional Indian sweets on a festive platter"
              loading="lazy"
              whileHover={
                reduceMotion ? {} : { scale: 1.07 }
              }
              transition={{ duration: 0.9 }}
            />

            <span>01 / TRADITION</span>
          </StaggerItem>

          <StaggerItem className="gallery-item">
            <motion.img
              src={images.festive}
              alt="Premium Indian sweet gift boxes"
              loading="lazy"
              whileHover={
                reduceMotion ? {} : { scale: 1.07 }
              }
              transition={{ duration: 0.9 }}
            />

            <span>02 / CELEBRATION</span>
          </StaggerItem>

          <StaggerItem className="gallery-item">
            <motion.img
              src={images.laddu}
              alt="Traditional Indian mithai assortment"
              loading="lazy"
              whileHover={
                reduceMotion ? {} : { scale: 1.07 }
              }
              transition={{ duration: 0.9 }}
            />

            <span>03 / CRAFT</span>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* =====================================
          CELEBRATIONS
      ===================================== */}

      <section
        className="celebration section-padding"
        id="celebrations"
      >
        <Reveal>
          <div className="celebration-content">
            <span className="eyebrow light">
              MADE FOR YOUR SPECIAL DAYS
            </span>

            <h2>
              Make your occasions
              <br />
              <em>unforgettable.</em>
            </h2>

            <p>
              From weddings and family celebrations to festive gifting
              and special gatherings, let's make every occasion sweeter.
            </p>

            <motion.a
              href={getWhatsAppLink(
                "Hello Harish Reddy Sweets! I would like to enquire about bulk orders and catering for a special occasion."
              )}
              target="_blank"
              rel="noreferrer"
              className="button-gold"
              whileHover={
                reduceMotion ? {} : { y: -4 }
              }
              whileTap={{ scale: 0.97 }}
            >
              PLAN YOUR SWEET CELEBRATION <ArrowRight size={16} />
            </motion.a>
          </div>
        </Reveal>

        {/* DECORATIVE ORBIT */}

        <motion.div
          className="celebration-orbit"
          animate={
            reduceMotion
              ? {}
              : { rotate: 360 }
          }
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="orbit-circle">✳</div>
        </motion.div>

        {/* =====================================
            BULK ENQUIRY FORM
        ===================================== */}

        <Reveal delay={0.15}>
          <div className="bulk-enquiry">
            <div className="bulk-enquiry-heading">
              <span className="eyebrow">
                LET'S PLAN SOMETHING SPECIAL
              </span>

              <h3>
                Bulk orders & <em>catering enquiries.</em>
              </h3>

              <p>
                Tell us about your celebration. Submit your details and
                continue the enquiry directly through WhatsApp.
              </p>
            </div>

            <form
              className="bulk-form"
              onSubmit={handleBulkEnquiry}
            >
              <div className="bulk-form-grid">
                <label>
                  Your Name *
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  Phone Number *
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    pattern="[0-9+\s-]{10,15}"
                    title="Enter a valid phone number"
                    required
                  />
                </label>

                <label>
                  Occasion *
                  <select
                    name="eventType"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your occasion
                    </option>

                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Festival">Festival</option>

                    <option value="Corporate Event">
                      Corporate Event
                    </option>

                    <option value="Family Function">
                      Family Function
                    </option>

                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  Approximate Quantity *
                  <input
                    type="text"
                    name="quantity"
                    placeholder="e.g. 20 kg or 100 boxes"
                    required
                  />
                </label>

                <label className="bulk-full-width">
                  Required Delivery Date *
                  <input
                    type="date"
                    name="deliveryDate"
                    required
                  />
                </label>

                <label className="bulk-full-width">
                  Additional Requirements
                  <textarea
                    name="requirements"
                    placeholder="Tell us about the sweets, packaging or catering you need..."
                    rows={4}
                  />
                </label>
              </div>

              <motion.button
                type="submit"
                className="bulk-submit"
                whileHover={
                  reduceMotion ? {} : { y: -3 }
                }
                whileTap={{ scale: 0.98 }}
              >
                SEND ENQUIRY ON WHATSAPP <ArrowRight size={17} />
              </motion.button>

              <small>
                Your enquiry will be prepared in WhatsApp so you can
                review and send it.
              </small>
            </form>
          </div>
        </Reveal>
      </section>

      {/* =====================================
          CONTACT
      ===================================== */}

      <section
        className="contact section-padding"
        id="contact"
      >
        <Reveal>
          <span className="eyebrow">
            LET'S MAKE IT SWEETER
          </span>

          <h2>
            Your next sweet
            <br />
            <em>moment starts here.</em>
          </h2>

          <p>
            Have an order in mind? We'd love to hear from you.
            Get in touch for product enquiries, gifting, and celebrations.
          </p>

          <div className="contact-actions">
            <motion.a
              href={getWhatsAppLink(
                "Hello Harish Reddy Sweets! I would like to place an order. Please share the details."
              )}
              target="_blank"
              rel="noreferrer"
              className="button-dark"
              whileHover={
                reduceMotion ? {} : { y: -4 }
              }
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={17} /> CHAT ON WHATSAPP
            </motion.a>

            <motion.a
              href="tel:+917799239933"
              className="contact-phone"
              whileHover={
                reduceMotion ? {} : { x: 5 }
              }
            >
              CALL US <ArrowRight size={15} />
            </motion.a>
          </div>
        </Reveal>

        <StaggerGroup className="contact-details">
          <StaggerItem>
            <MapPin size={19} />
            <span>VISIT OUR STORE</span>

            <strong>
              DRS Complex, Ganesh Nagar, HMT Road,
              Chintal, Hyderabad - 500054
            </strong>
          </StaggerItem>

          <StaggerItem>
            <Clock size={19} />
            <span>OPENING HOURS</span>
            <strong>
              Every Day · 10:00 AM – 10:00 PM
            </strong>
          </StaggerItem>

          <StaggerItem>
            <Phone size={19} />
            <span>PROPRIETOR</span>
            <strong>G. Harish Reddy</strong>
          </StaggerItem>

          <StaggerItem>
            <span className="instagram-symbol">◎</span>
            <span>FOLLOW OUR JOURNEY</span>

            <strong>
              <a
                href="https://www.instagram.com/harishreddysweets/"
                target="_blank"
                rel="noreferrer"
              >
                @harishreddysweets
              </a>
            </strong>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <motion.footer
        className="footer"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 30 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{ duration: 0.8 }}
      >
        <motion.a
          href="#home"
          className="brand footer-brand"
          whileHover={
            reduceMotion ? {} : { y: -3 }
          }
        >
          <span className="brand-name">
            G HARISH REDDY
            <br />
            SWEETS
            <small>
              A Legacy of Sweetness Since 1998
            </small>
          </span>
        </motion.a>

        <span>
          MADE WITH LOVE. ROOTED IN TRADITION.
        </span>

        <motion.a
          href="#home"
          whileHover={
            reduceMotion ? {} : { y: -3 }
          }
        >
          BACK TO TOP ↑
        </motion.a>

        <small>
          © 2026 Harish Reddy Sweets. All rights reserved.
        </small>
      </motion.footer>

    </main>
  );
}
