
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
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

const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: "easeOut" as const,
    },
  },
};

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

  // BULK ORDER FORM SUBMISSION
  function handleBulkEnquiry(
    event: React.FormEvent<HTMLFormElement>
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
      {/* ANNOUNCEMENT */}
      <div className="announcement">
        <Sparkles size={13} />
        <span>MADE WITH LOVE · ROOTED IN TRADITION</span>
        <Sparkles size={13} />
      </div>

      {/* NAVIGATION */}
      <header className="navbar">
        <a href="#home" className="brand">
       <span className="brand-symbol">H</span>

<span className="brand-name">
  G HARISH REDDY
  <small>
    SWEETS
    <br />
    A Legacy of Sweetness Since 1998
  </small>
</span>
        </a>

        <nav className="desktop-nav">
          {links.map(([name, href]) => (
            <a key={name} href={href}>
              {name}
            </a>
          ))}
        </nav>

        <a
          className="nav-order"
          href={getWhatsAppLink(
            "Hello Harish Reddy Sweets! I would like to place an order. Please share the details."
          )}
          target="_blank"
          rel="noreferrer"
        >
          ORDER NOW <ArrowRight size={15} />
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map(([name, href]) => (
              <a
                key={name}
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="hero" id="home" ref={heroRef}>
        <motion.div
          className="hero-image"
         style={{
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  justifyContent: "center",
  gap: "16px",
  width: "100%",
}}
        >
          <div className="hero-overlay" />
        </motion.div>

        <motion.div className="hero-content" style={{ y: heroTextY }}>
          <motion.div
            className="eyebrow light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span />
            THE ART OF INDIAN SWEETS
            <span />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4 }}
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
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Discover the timeless taste of authentic Indian sweets,
            lovingly prepared to make life's beautiful moments sweeter.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a href="#collections" className="button-gold">
              EXPLORE COLLECTION <ArrowRight size={16} />
            </a>

            <a href="#story" className="button-outline">
              OUR STORY
            </a>
          </motion.div>
        </motion.div>

        <div className="hero-bottom">
          <span>01 — A LEGACY OF TASTE</span>

          <a href="#story">
            SCROLL TO DISCOVER <ArrowDown size={14} />
          </a>

          <span>EST. WITH LOVE</span>
        </div>

        <div className="hero-side-text">SWEETNESS IS AN ART</div>
      </section>

      {/* HERITAGE INTRODUCTION */}
      <section className="intro section-padding" id="story">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">A SWEET TRADITION</span>

            <h2>
              More than sweets.
              <br />
              <em>A celebration of life.</em>
            </h2>
          </div>
        </Reveal>

        <div className="intro-grid">
          <Reveal className="intro-copy">
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

            <a href="#contact" className="text-link">
              DISCOVER OUR STORY <ArrowRight size={16} />
            </a>
          </Reveal>

          <Reveal className="intro-image-wrap">
            <img
              src={images.heritage}
              alt="Traditional Indian mithai arranged on decorative platters"
            />

            <div className="image-caption">
              <span>THE BEAUTY OF</span>
              <strong>Indian Mithai</strong>
            </div>

            <div className="intro-stamp">
              <Sparkles size={25} />
              <span>MADE FOR</span>
              <strong>Moments</strong>
              <span>THAT MATTER</span>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="collection-top">
            <div>
              <span className="eyebrow">OUR PROMISE</span>

              <h2>
                Tradition in
                <br />
                <em>every creation.</em>
              </h2>
            </div>
          </div>

          <div className="product-grid">
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
              <div className="product-card" key={number}>
                <div className="product-info">
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* COLLECTIONS - SPECIALS AND ORDINARY */}
      <section className="collections section-padding" id="collections">
        <div className="collection-top">
          <Reveal>
            <span className="eyebrow">THE FINEST SELECTION</span>

            <h2>
              Discover our
              <br />
              <em>sweet collections.</em>
            </h2>
          </Reveal>

          <Reveal>
            <p>
              Explore our carefully presented selection of Indian sweets,
              with something special for every celebration and every
              occasion.
            </p>
          </Reveal>
        </div>

        {/* CENTERED AND RESPONSIVE COLLECTION CARDS */}
        <div
          className="product-grid"
          style={{
            display: "grid",
           gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
          }}
        >
          {/* SPECIALS COLLECTION */}
          <Reveal className="product-card">
            <Link
              href="/collections/specials"
              className="collection-card-link"
            >
              <div className="product-image-wrap">
                <img
                  src={images.kaju}
                  alt="Premium Indian sweets from the Specials collection"
                  loading="lazy"
                />

                <span className="product-number">01</span>

                <span className="product-arrow">
                  <ArrowRight size={19} />
                </span>
              </div>

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
          </Reveal>

          {/* ORDINARY COLLECTION */}
          <Reveal className="product-card">
            <Link
              href="/collections/ordinary"
              className="collection-card-link"
            >
              <div className="product-image-wrap">
                <img
                  src={images.assorted}
                  alt="Traditional Indian sweets from the Ordinary collection"
                  loading="lazy"
                />

                <span className="product-number">02</span>

                <span className="product-arrow">
                  <ArrowRight size={19} />
                </span>
              </div>

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
          </Reveal>
        </div>

        <div className="center-button">
          <a
            href={getWhatsAppLink(
              "Hello Harish Reddy Sweets! I would like to enquire about your complete sweet collection."
            )}
            target="_blank"
            rel="noreferrer"
            className="button-dark"
          >
            ENQUIRE ABOUT OUR COLLECTION <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* BRAND MESSAGE */}
      <section className="quote-section">
        <div className="quote-overlay" />

        <Reveal className="quote-content">
          <span className="eyebrow light">THE SWEETEST MEMORIES</span>

          <h2>
            Every celebration
            <br />
            deserves a little
            <br />
            <em>extra sweetness.</em>
          </h2>

          <span className="quote-decoration">✳</span>
        </Reveal>
      </section>

      {/* GALLERY */}
      <section className="gallery section-padding" id="gallery">
        <Reveal>
          <div className="gallery-heading">
            <span className="eyebrow">A FEAST FOR THE EYES</span>

            <h2>
              Sweet moments,
              <br />
              <em>beautifully captured.</em>
            </h2>
          </div>
        </Reveal>

        <div className="gallery-grid">
          <motion.div
            className="gallery-item gallery-tall"
            whileHover={{ scale: 1.025 }}
          >
            <img
              src={images.traditional}
              alt="Traditional Indian sweets on a festive platter"
              loading="lazy"
            />

            <span>01 / TRADITION</span>
          </motion.div>

          <motion.div
            className="gallery-item"
            whileHover={{ scale: 1.025 }}
          >
            <img
              src={images.festive}
              alt="Premium Indian sweet gift boxes"
              loading="lazy"
            />

            <span>02 / CELEBRATION</span>
          </motion.div>

          <motion.div
            className="gallery-item"
            whileHover={{ scale: 1.025 }}
          >
            <img
              src={images.laddu}
              alt="Traditional Indian mithai assortment"
              loading="lazy"
            />

            <span>03 / CRAFT</span>
          </motion.div>
        </div>
      </section>

      {/* CELEBRATIONS AND BULK ORDERS */}
      <section className="celebration section-padding" id="celebrations">
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

            <a
              href={getWhatsAppLink(
                "Hello Harish Reddy Sweets! I would like to enquire about bulk orders and catering for a special occasion."
              )}
              target="_blank"
              rel="noreferrer"
              className="button-gold"
            >
              PLAN YOUR SWEET CELEBRATION <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>

        <motion.div
          className="celebration-orbit"
          animate={{ rotate: 360 }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="orbit-circle">✳</div>
        </motion.div>

        {/* BULK ORDER AND CATERING FORM */}
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

          <form className="bulk-form" onSubmit={handleBulkEnquiry}>
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

            <button type="submit" className="bulk-submit">
              SEND ENQUIRY ON WHATSAPP <ArrowRight size={17} />
            </button>

            <small>
              Your enquiry will be prepared in WhatsApp so you can
              review and send it.
            </small>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section-padding" id="contact">
        <Reveal>
          <span className="eyebrow">LET'S MAKE IT SWEETER</span>

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
            <a
              href={getWhatsAppLink(
                "Hello Harish Reddy Sweets! I would like to place an order. Please share the details."
              )}
              target="_blank"
              rel="noreferrer"
              className="button-dark"
            >
              <Phone size={17} /> CHAT ON WHATSAPP
            </a>

            <a href="tel:+917799239933" className="contact-phone">
              CALL US <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>

        <div className="contact-details">
          <div>
            <MapPin size={19} />
            <span>VISIT OUR STORE</span>

            <strong>
              DRS Complex, Ganesh Nagar, HMT Road,
              Chintal, Hyderabad - 500054
            </strong>
          </div>

          <div>
            <Clock size={19} />
            <span>OPENING HOURS</span>
            <strong>Every Day · 10:00 AM – 10:00 PM</strong>
          </div>

          <div>
            <Phone size={19} />
            <span>PROPRIETOR</span>
            <strong>G. Harish Reddy</strong>
          </div>

          <div>
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
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-name">
  G HARISH REDDY
   SWEETS
  <small>A Legacy of Sweetness Since 1998</small>
</span>
        </a>

        <span>MADE WITH LOVE. ROOTED IN TRADITION.</span>

        <a href="#home">BACK TO TOP ↑</a>

        <small>
          © 2026 Harish Reddy Sweets. All rights reserved.
        </small>
      </footer>
    </main>
  );
}
