import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Star,
  X
} from "lucide-react";
import "./styles.css";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID";

const images = {
  logo: "https://i.postimg.cc/2jT8x5VK/logo-transparent.png",
  hero: "https://images.pexels.com/photos/35013077/pexels-photo-35013077.jpeg?auto=compress&cs=tinysrgb&w=1800",
  serviceHero: "https://images.pexels.com/photos/33637609/pexels-photo-33637609.jpeg?auto=compress&cs=tinysrgb&w=1800",
  lashes: "https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=1200",
  lift: "https://images.pexels.com/photos/7479587/pexels-photo-7479587.jpeg?auto=compress&cs=tinysrgb&w=1200",
  artist: "https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&w=1400",
  aboutDetail: "https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&w=1200",
  contact: "https://images.pexels.com/photos/33723106/pexels-photo-33723106.jpeg?auto=compress&cs=tinysrgb&w=1400"
};

const homeImages = {
  hero: "https://fabulashestudio.urbanpetsgrooming.in/wp-content/uploads/2025/06/beautiful-girl-with-creative-colorful-makeup-beauty-face-e1682410945733.jpg",
  lift: "https://fabulashestudio.urbanpetsgrooming.in/wp-content/uploads/2025/07/Untitled-design-24.png",
  aboutDetail: "https://fabulashestudio.urbanpetsgrooming.in/wp-content/uploads/2025/06/unrecognizable-make-up-artist-making-up-hispanic-y-2022-05-11-23-16-55-utc.jpg"
};

const nav = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Contact", "contact"]
];

const services = [
  {
    title: "Classic Lashes",
    price: "$75",
    copy: "Simple. Elegant. Timeless lashes that enhance your natural beauty.",
    image: "https://i.postimg.cc/QMJfWcVT/image.png"
  },
  {
    title: "Hybrid Lashes",
    price: "$85",
    copy: "The perfect blend of natural and volume: meet your hybrid beauty.",
    image: "https://i.postimg.cc/nh82R3D4/image.png"
  },
  {
    title: "Volume Lashes",
    price: "$95",
    copy: "Multiple lightweight extensions per lash for a fuller, fluffier effect.",
    image: "https://i.postimg.cc/vmYNh0J5/image.png"
  },
  {
    title: "Wispy Lashes",
    price: "$95",
    copy: "Soft, fluttery, and full of charm: wispy lashes that wow.",
    image: "https://i.postimg.cc/449B6CKZ/image.png"
  }
];

const pricing = [
  ["Classics", "$75"],
  ["Wetset", "$70"],
  ["Hybrid Set", "$85"],
  ["Volumes", "$95"],
  ["Lashlift", "$42"],
  ["Brow Lamination", "$55 (+$5 tint)"],
  ["Mega Volumes", "$55 (+$5 tint)"]
];

const serviceImages = [
  "https://images.pexels.com/photos/7479587/pexels-photo-7479587.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/35013077/pexels-photo-35013077.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/33723106/pexels-photo-33723106.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/33637609/pexels-photo-33637609.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/29877726/pexels-photo-29877726.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/33794264/pexels-photo-33794264.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/7479594/pexels-photo-7479594.jpeg?auto=compress&cs=tinysrgb&w=900"
];

const fullSetAddOns = [
  { name: "Lash bath", duration: "15 min", price: 10 },
  { name: "Colored accents", duration: "15 min", price: 15 },
  { name: "Removal", duration: "30 min", price: 20 },
  { name: "Bottom lashes", duration: "30 min", price: 40 }
];

const fillAddOns = [
  { name: "Foreign Fill", duration: "30 min", price: 20 },
  { name: "Extended Fill", duration: "30 min", price: 20 },
  { name: "Bottom Lashes", duration: "30 min", price: 40 }
];

const appointmentTimes = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM"
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function extractPrice(value = "") {
  const match = value.match(/\$(\d+)/);
  return match ? Number(match[1]) : 0;
}

function getBookingBaseLabel(booking) {
  if (!booking?.service) return "";
  return booking.bookingType === "Fill" ? booking.service.refill : booking.service.full;
}

function getBookingBasePrice(booking) {
  return extractPrice(getBookingBaseLabel(booking));
}

function getBookingTotal(booking) {
  const addOnsTotal = booking?.addOns?.reduce((total, addOn) => total + (addOn.price || 0), 0) || 0;
  return getBookingBasePrice(booking) + addOnsTotal;
}

const serviceMenu = [
  {
    name: "classic",
    full: "Full set | starting at $75",
    refill: "Refill | starting at $45",
    copy: "Embrace the essence of elegance with our Classic Set, where simplicity meets sophistication. Perfect for enhancing your natural beauty, each lash is meticulously applied to create a seamless, uplifted look.",
    image: serviceImages[0]
  },
  {
    name: "hybrid",
    full: "Full set | starting at $85",
    refill: "Refill | starting at $55",
    copy: "Dive into the best of both worlds with our Hybrid Set. A masterful blend of volume and classic lashes, tailored to offer a look that is as unique as you.",
    image: serviceImages[1]
  },
  {
    name: "volume",
    full: "Full set | starting at $95",
    refill: "Refill | starting at $65",
    copy: "Turn up the volume with our bespoke Volume Set. Ideal for depth and drama without the weight, using handcrafted lightweight fans for a lush, dense look.",
    image: serviceImages[2]
  },
  {
    name: "mega volume",
    full: "Full set | starting at $110",
    refill: "Refill | starting at $75",
    copy: "Experience ultimate opulence with our Mega Volume Set. For the bold and beautiful, this style offers unparalleled density and drama with a show-stopping finish.",
    image: serviceImages[3]
  },
  {
    name: "wetset",
    full: "Full set | starting at $70",
    refill: "Refill | starting at $45",
    copy: "Embrace the allure of the just-showered look with our Wet Set. Designed to mimic sleek, glossy wet lashes with a unique, sultry twist.",
    image: serviceImages[4]
  },
  {
    name: "anime/manga",
    full: "Full set | starting at $95",
    refill: "Refill | starting at $65",
    copy: "Step into a fantasy with expressive, wide-eyed anime-inspired lashes that create dramatic, doll-like definition and captivating charm.",
    image: serviceImages[5]
  },
  {
    name: "strip-lash",
    full: "Full set | starting at $110",
    refill: "Refill | starting at $75",
    copy: "Immerse yourself in the drama of our strip-lash set, designed to mirror the intensity and allure of traditional strip lashes with professional extensions.",
    image: serviceImages[6]
  },
  {
    name: "wet and wispy",
    full: "Full set | starting at $95",
    refill: "Refill | starting at $65",
    copy: "A tantalizing fusion of sleek wet texture and fluttery wispy definition for a unique, eye-catching lash aesthetic.",
    image: serviceImages[7]
  },
  {
    name: "half set",
    full: "Half set | $60",
    refill: "Perfect for soft lift",
    copy: "Accentuate only half of your natural lashes for a subtle, lifted look with balanced dimension and lightweight comfort.",
    image: serviceImages[8]
  },
  {
    name: "bottom lashes",
    full: "Full set | $40",
    refill: "Lower lash detail",
    copy: "Complete your lash transformation with delicate bottom lashes that balance and enhance your eye, giving every angle a captivating gaze.",
    image: serviceImages[9]
  }
];

const masterpieces = [
  ["Glam in a Blink", "Luxe Look in Seconds", "https://i.postimg.cc/jS7xKS29/image.png"],
  ["Luxe Lashes", "Elevate Your Natural Beauty", "https://i.postimg.cc/6QhN52XM/image.png"],
  ["Bold Blink", "Eyes that Impress", "https://i.postimg.cc/x1DrvyjC/image.png"],
  ["Lash Power", "Glamour Artistry", "https://i.postimg.cc/3NsqZYhD/image.png"],
  ["Bridal Blink", "The Bride's Glow", "https://i.postimg.cc/s2W4p7Xn/image.png"],
  ["Floral Gaze", "Expressive Glamour", "https://i.postimg.cc/63wnnPFp/image.png"]
];

const testimonials = [
  ["I'm absolutely in love with my lashes! They look so natural yet give me that perfect glam. No more mascara: just wake up and go.", "Sophie, Fashion Designer"],
  ["My lashes have never looked this good! They're full, flawless, and stay perfect all day. I get compliments everywhere I go.", "Emily R., Consultant"],
  ["Absolutely obsessed with my new look! The lashes feel light, look stunning, and add the perfect touch of glam.", "Amelia, Fashion Photographer"],
  ["Never thought lashes could change my vibe this much! From casual coffee runs to fancy nights out, they just work.", "Talia, Hair Artist"],
  ["I walked in tired. I walked out glowing. My lashes are now my secret weapon: clean, lifted, flawless.", "Priya K., Content Writer"]
];

const instagram = [
  "https://images.pexels.com/photos/33723106/pexels-photo-33723106.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/35013077/pexels-photo-35013077.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/7479587/pexels-photo-7479587.jpeg?auto=compress&cs=tinysrgb&w=900"
];

const instagramProfileImages = [
  "https://images.pexels.com/photos/7479587/pexels-photo-7479587.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/33637609/pexels-photo-33637609.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/33794264/pexels-photo-33794264.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=900"
];

const instagramReelCovers = [
  "https://images.pexels.com/photos/35013077/pexels-photo-35013077.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/33723106/pexels-photo-33723106.jpeg?auto=compress&cs=tinysrgb&w=900"
];

const instagramReels = [
  {
    title: "Fabu Lashe Studio Reel 01",
    url: "https://www.instagram.com/reel/DMEmm_usvil/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 02",
    url: "https://www.instagram.com/reel/CuJE2vcAse1/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 03",
    url: "https://www.instagram.com/reel/DYqFx0bJdSC/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 04",
    url: "https://www.instagram.com/reel/DYp_Qe7JEYR/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 05",
    url: "https://www.instagram.com/reel/DYm3kwcC-2w/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 06",
    url: "https://www.instagram.com/reel/DYlYjx3sbUJ/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 07",
    url: "https://www.instagram.com/reel/DYkBwW6iqmy/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 08",
    url: "https://www.instagram.com/reel/DYcsAA-pEfR/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 09",
    url: "https://www.instagram.com/reel/DYbUVnUNdXE/?utm_source=ig_embed&utm_campaign=loading"
  },
  {
    title: "Fabu Lashe Studio Reel 10",
    url: "https://www.instagram.com/reel/DYYV21vMagL/?utm_source=ig_embed&utm_campaign=loading"
  }
];

const instagramPosts = [
  {
    image: "https://images.pexels.com/photos/7479587/pexels-photo-7479587.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "22 May 2026",
    caption: "Classic lash set with soft definition and a clean natural finish.",
    tall: false
  },
  {
    image: "https://images.pexels.com/photos/5128234/pexels-photo-5128234.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "21 May 2026",
    caption: "Hybrid lashes for clients who want texture, lift, and everyday glam.",
    tall: true
  },
  {
    image: "https://images.pexels.com/photos/35013077/pexels-photo-35013077.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "20 May 2026",
    caption: "Volume lashes that stay fluffy, lightweight, and camera ready.",
    tall: false
  },
  {
    image: "https://images.pexels.com/photos/33723106/pexels-photo-33723106.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "19 May 2026",
    caption: "A fresh lash lift moment for naturally lifted, low-maintenance beauty.",
    tall: true
  },
  {
    image: "https://images.pexels.com/photos/33637609/pexels-photo-33637609.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "18 May 2026",
    caption: "Wispy styling with soft spikes and a fluttery eye-opening effect.",
    tall: false
  },
  {
    image: "https://images.pexels.com/photos/36930354/pexels-photo-36930354.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "17 May 2026",
    caption: "Bridal-ready lashes for a polished glow from ceremony to camera.",
    tall: true
  },
  {
    image: "https://images.pexels.com/photos/34930118/pexels-photo-34930118.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "16 May 2026",
    caption: "Mega volume drama, handcrafted for bold eyes without heavy wear.",
    tall: false
  },
  {
    image: "https://images.pexels.com/photos/29877726/pexels-photo-29877726.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "15 May 2026",
    caption: "Wet set texture for that glossy, sleek, just-styled lash look.",
    tall: true
  },
  {
    image: "https://images.pexels.com/photos/33794264/pexels-photo-33794264.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "14 May 2026",
    caption: "Soft glam details from inside the Fabu Lashe Studio studio.",
    tall: false
  },
  {
    image: "https://images.pexels.com/photos/7479594/pexels-photo-7479594.jpeg?auto=compress&cs=tinysrgb&w=900",
    date: "13 May 2026",
    caption: "Every blink deserves a custom map, a clean finish, and lasting confidence.",
    tall: true
  }
];

function InstagramMark({ size = 18, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function App() {
  const requestedPage = new URLSearchParams(window.location.search).get("page");
  const routePages = [...nav.map((item) => item[1]), "schedule", "book"];
  const [page, setPage] = useState(routePages.includes(requestedPage) ? requestedPage : "home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState({});
  const [serviceDetailsOpen, setServiceDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const openBooking = (context = {}) => {
    setBookingContext(context);
    setBookingOpen(true);
  };

  const goToPage = (id) => {
    setPage(id);
    window.history.replaceState(null, "", id === "home" ? window.location.pathname : `${window.location.pathname}?page=${id}`);
  };

  const openServiceBooking = (service, bookingType) => {
    setSelectedBooking({ service, bookingType, addOns: [], date: "", time: "" });
    setServiceDetailsOpen(true);
  };

  const continueToSchedule = (addOns) => {
    setSelectedBooking((current) => ({ ...current, addOns }));
    setServiceDetailsOpen(false);
    goToPage("schedule");
  };

  const continueToBook = ({ date, time }) => {
    setSelectedBooking((current) => ({ ...current, date, time }));
    goToPage("book");
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pageTitles = {
      schedule: "Schedule Service",
      book: "Book an Appointment"
    };
    document.title = `${nav.find((item) => item[1] === page)?.[0] ?? pageTitles[page] ?? "Home"} | Fabu Lashe Studio`;
  }, [page]);

  return (
    <div className="min-h-screen bg-pearl text-ink selection:bg-rose selection:text-ink">
      <Nav page={page} setPage={setPage} openBooking={openBooking} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {page === "home" && <Home setPage={goToPage} openBooking={openBooking} />}
            {page === "services" && <ServicesPage openBooking={openServiceBooking} />}
            {page === "about" && <AboutPage setPage={setPage} />}
            {page === "contact" && <ContactPage />}
            {page === "schedule" && <ScheduleServicePage booking={selectedBooking} onNext={continueToBook} onBack={() => goToPage("services")} />}
            {page === "book" && <BookAppointmentPage booking={selectedBooking} onBack={() => goToPage("schedule")} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <ServiceDetailsModal open={serviceDetailsOpen} booking={selectedBooking} onClose={() => setServiceDetailsOpen(false)} onNext={continueToSchedule} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} bookingContext={bookingContext} />
      <Footer setPage={setPage} />
    </div>
  );
}

function Nav({ page, setPage, openBooking }) {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setPage(id);
    window.history.replaceState(null, "", id === "home" ? window.location.pathname : `${window.location.pathname}?page=${id}`);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/55 bg-pearl/82 backdrop-blur-xl">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <button onClick={() => go("home")} className="group grid size-20 place-items-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm md:size-24" aria-label="Fabu Lashe Studio home">
          <img src={images.logo} alt="Fabu Lashe Studio" className="max-h-full max-w-full object-contain object-left" />
        </button>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${page === id ? "bg-white shadow-sm" : "hover:bg-white/70"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <button onClick={openBooking} className="hidden rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-bloom transition hover:-translate-y-0.5 hover:bg-black lg:inline-flex">
          Book Now
        </button>
        <button onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-full bg-white shadow-sm lg:hidden" aria-label="Open menu">
          <Menu />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-sm lg:hidden">
            <motion.nav initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ ease: "easeOut" }} className="ml-auto h-screen w-[86%] bg-pearl p-6 shadow-bloom">
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-24 place-items-center overflow-hidden rounded-2xl bg-white p-2">
                  <img src={images.logo} alt="Fabu Lashe Studio" className="max-h-full max-w-full object-contain object-left" />
                </span>
                <button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full bg-white" aria-label="Close menu">
                  <X />
                </button>
              </div>
              <div className="grid gap-3">
                {nav.map(([label, id]) => (
                  <button key={id} onClick={() => go(id)} className="rounded-full bg-white px-5 py-4 text-left text-lg font-semibold">
                    {label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Section({ eyebrow, title, copy, children, className = "" }) {
  return (
    <section className={`px-5 py-20 lg:px-8 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <Reveal className="mb-12 max-w-3xl">
            {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">{eyebrow}</p>}
            {title && <h2 className="font-display text-4xl font-bold leading-[0.98] md:text-6xl">{title}</h2>}
            {copy && <p className="mt-6 max-w-2xl text-base leading-8 text-ink/68 md:text-lg">{copy}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Home({ setPage, openBooking }) {
  return (
    <>
      <Hero setPage={setPage} openBooking={openBooking} />
      <Intro />
      <ServicePreview openBooking={openBooking} />
      <LiftBrow setPage={setPage} />
      <PricingSection openBooking={openBooking} />
      <Offer openBooking={openBooking} />
      <Testimonials />
      <Masterpieces />
      <InstagramWall />
      <AboutBand setPage={setPage} image={homeImages.aboutDetail} imageAlt="Salon artist applying beauty products" />
      <BookingCTA openBooking={openBooking} />
    </>
  );
}

function Hero({ setPage, openBooking }) {
  return (
    <section id="content" className="relative min-h-[92vh] overflow-hidden pt-24">
      <img src={homeImages.hero} alt="Luxury lash salon makeup detail" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-pearl via-pearl/78 to-white/10" />
      <div className="relative mx-auto grid min-h-[calc(92vh-6rem)] max-w-7xl items-center px-5 lg:px-8">
        <Reveal className="max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.42em] text-ink/58">Premium lash styling Across GTA Greater Toronto Area</p>
          <h1 className="font-display text-6xl font-black leading-[0.86] sm:text-7xl lg:text-8xl">
            Enhance Your Look with Our Stunning Eyelash Styles
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72">
            Lashes That Speak Louder Than Words: custom classic, hybrid, volume, mega volume, wispy, cat eye, doll eye, natural, and open-eye styles.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={openBooking} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white shadow-bloom transition hover:-translate-y-1">
              Book Appointment <Calendar size={18} />
            </button>
            <button onClick={() => setPage("services")} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/85 px-7 py-4 font-semibold backdrop-blur transition hover:-translate-y-1 hover:bg-white">
              Explore Services <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <Section eyebrow="Artistry by Muskan" title="The Lash Edition." copy="As a skilled eyelash makeup artist, Muskan creates custom lash looks from soft and subtle to bold and dramatic, tailored to your face, occasion, and style. High-quality products and advanced techniques keep every set lightweight, long-lasting, and flawlessly blended.">
      <div className="grid gap-6 md:grid-cols-4">
        {[
          ["10,000 +", "Lash care projects"],
          ["5+", "Years Experience"],
          ["7", "Services Available"],
          ["100%", "Customer Satisfaction"]
        ].map(([number, label]) => (
          <Reveal key={label} className="rounded-[2rem] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-bloom">
            <span className="font-bodoni text-5xl text-rose">{number}</span>
            <h3 className="mt-5 font-display text-2xl font-bold">{label}</h3>
            <p className="mt-4 leading-7 text-ink/62">Professional detail, graceful styling, and confidence in every blink.</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ServicePreview({ openBooking }) {
  return (
    <Section eyebrow="Lashes Styled by Experience" title="Finished with grace." className="bg-white">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Reveal key={service.title}>
            <article className="group overflow-hidden rounded-[2rem] bg-pearl shadow-sm">
              <div className="h-72 overflow-hidden">
                <img src={service.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold">{service.title}</h3>
                  <span className="rounded-full bg-blush px-4 py-2 text-sm font-semibold">{service.price}</span>
                </div>
                <p className="mt-4 leading-7 text-ink/62">{service.copy}</p>
                <button onClick={openBooking} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold transition hover:bg-ink hover:text-white">
                  Reserve <ArrowRight size={16} />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function LiftBrow({ setPage }) {
  return (
    <Section className="bg-gradient-to-br from-blush via-pearl to-white">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative">
          <img src={homeImages.lift} alt="Lash lift and brow styling" className="h-[560px] w-full rounded-[2.5rem] object-cover shadow-bloom" />
          <div className="absolute -bottom-8 -right-4 max-w-xs rounded-[2rem] bg-white p-6 shadow-bloom">
            <p className="font-display text-3xl font-bold">Wide variety style.</p>
            <p className="mt-2 text-sm leading-6 text-ink/62">From natural to dramatic, find the perfect lash look for every mood and occasion.</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">Why clients choose us</p>
          <h2 className="font-display text-5xl font-bold leading-none md:text-7xl">You bring the beauty, we create the art.</h2>
          <p className="mt-6 text-lg leading-8 text-ink/68">Flawless finish, fuller look, and lasting charm. Fabu Lashe Studio defines your unique style with custom lash designs that enhance natural beauty effortlessly.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Wide Variety Style", "Exquisite Results", "Signature Look", "Skilled Specialists"].map((item) => (
              <div key={item} className="rounded-full bg-white/78 px-5 py-4 font-semibold shadow-sm">{item}</div>
            ))}
          </div>
          <button onClick={() => setPage("services")} className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white">
            View full menu <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </Section>
  );
}

function Offer({ openBooking }) {
  return (
    <section className="px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink text-white shadow-bloom">
        <div className="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55">Some special offers</p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">New clients get 15% off any lash set.</h2>
            <p className="mt-5 max-w-3xl text-white/68">Regular clients save 10%, birthday sets receive 20% off, referrals get $10 off, and selfie tags get $5 off.</p>
          </div>
          <button onClick={openBooking} className="inline-flex items-center justify-center gap-2 rounded-full bg-rose px-7 py-4 font-semibold text-ink transition hover:-translate-y-1">
            Claim Offer <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ openBooking }) {
  return (
    <Section eyebrow="Pricing" title="Customized beauty services to fit your needs and budget.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pricing.map(([name, price]) => (
          <Reveal key={name} className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="font-display text-3xl font-bold">{name}</p>
            <p className="mt-4 font-bodoni text-5xl text-rose">{price}</p>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 max-w-3xl leading-8 text-ink/65">Custom options are available to meet your unique needs and preferences. Let's discuss your ideas and goals.</p>
      <button onClick={openBooking} className="mt-8 rounded-full bg-ink px-7 py-4 font-semibold text-white">Contact Us</button>
    </Section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];
  return (
    <Section eyebrow="Client notes" title="Lashes loved by real clients.">
      <Reveal className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-12">
        <div className="mb-8 flex gap-1 text-rose">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="currentColor" size={20} />)}</div>
        <AnimatePresence mode="wait">
          <motion.blockquote key={testimonial[0]} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-4xl font-display text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
            "{testimonial[0]}"
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-between">
          <p className="font-semibold">{testimonial[1]}</p>
          <div className="flex gap-2">
            <button onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)} className="grid size-12 place-items-center rounded-full bg-pearl" aria-label="Previous testimonial"><ChevronLeft /></button>
            <button onClick={() => setActive((active + 1) % testimonials.length)} className="grid size-12 place-items-center rounded-full bg-pearl" aria-label="Next testimonial"><ChevronRight /></button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Masterpieces() {
  return (
    <Section eyebrow="Our masterpieces" title="Step into our lash world." className="bg-white">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {masterpieces.map(([name, copy, image]) => (
          <Reveal key={name}>
            <article className="group rounded-[2rem] bg-pearl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-bloom">
              <div className="mb-5 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-blush">
                <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <h3 className="font-display text-2xl font-bold">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/62">{copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function InstagramWall() {
  return (
    <section className="bg-[#f6f6f6] px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1540px]">
        <Reveal className="text-center">
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
            Lash Looks, Deals & Updates on Instagram
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <img src={images.logo} alt="Fabu Lashe Studio profile" className="size-14 rounded-full bg-white object-contain p-1 ring-2 ring-rose" />
            <p className="font-bold">fabulashe_studio</p>
            <p className="text-sm"><strong>48</strong> posts</p>
            <p className="text-sm"><strong>2.4K</strong> followers</p>
            <a
              href="https://www.instagram.com/fabulashe_studio?igsh=ajlsZ3N1NGZoZWl4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0095f6] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1877f2]"
            >
              <InstagramMark size={16} /> Follow
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {instagramReels.slice(0, 5).map((reel) => (
            <Reveal key={reel.url} className="min-w-0">
              <div className="ig-reel-card overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                <InstagramOfficialEmbed reel={reel} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramOfficialEmbed({ reel }) {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"], script[src="https://www.instagram.com/embed.js"]');

    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(script);
      script.onload = () => window.instgrm?.Embeds?.process();
      return;
    }

    window.instgrm?.Embeds?.process();
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={reel.url}
      data-instgrm-version="14"
      style={{
        background: "#fff",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: 0,
        maxWidth: "100%",
        minWidth: 0,
        padding: 0,
        width: "100%"
      }}
    >
      <div style={{ padding: 16 }}>
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#fff",
            lineHeight: 0,
            padding: 0,
            textAlign: "center",
            textDecoration: "none",
            width: "100%"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ backgroundColor: "#f4f4f4", borderRadius: "50%", height: 40, marginRight: 14, width: 40 }} />
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
              <div style={{ backgroundColor: "#f4f4f4", borderRadius: 4, height: 14, marginBottom: 6, width: 100 }} />
              <div style={{ backgroundColor: "#f4f4f4", borderRadius: 4, height: 14, width: 60 }} />
            </div>
          </div>
          <div style={{ padding: "19% 0" }} />
          <div style={{ color: "#3897f0", fontFamily: "Arial,sans-serif", fontSize: 14, fontWeight: 550, lineHeight: "18px", paddingTop: 8 }}>
            View this post on Instagram
          </div>
          <div style={{ padding: "12.5% 0" }} />
        </a>
        <p style={{ color: "#c9c8cd", fontFamily: "Arial,sans-serif", fontSize: 14, lineHeight: "17px", marginBottom: 0, marginTop: 8, overflow: "hidden", padding: "8px 0 7px", textAlign: "center", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <a href={reel.url} style={{ color: "#c9c8cd", fontFamily: "Arial,sans-serif", fontSize: 14, fontWeight: "normal", lineHeight: "17px", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
            A post shared by BRAMPTON LASH AND BROW ARTIST (@fabulashe_studio)
          </a>
        </p>
      </div>
    </blockquote>
  );
}

function InstagramGrid() {
  return (
    <Section eyebrow="@Fabu Lashe Studio" title="A soft-focus lash diary.">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {instagram.map((src, index) => (
          <Reveal key={src} className={index % 2 ? "lg:mt-10" : ""}>
            <a href="https://www.instagram.com/" aria-label="Open Instagram" className="group block aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
              <img src={src} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function InstagramReels() {
  return (
    <Section eyebrow="Instagram reels" title="Watch the latest lash moments." className="bg-white">
      <div className="grid gap-5 lg:grid-cols-3">
        {instagramReels.map((reel, index) => (
          <Reveal key={`${reel.title}-${index}`}>
            <article className="overflow-hidden rounded-[2rem] border border-ink/10 bg-pearl shadow-sm">
              {reel.url.includes("/reel/") || reel.url.includes("/p/") ? (
                <div className="aspect-[9/16] bg-ink">
                  <iframe
                    title={reel.title}
                    src={`${reel.url.replace(/\/$/, "")}/embed`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              ) : (
                <a
                  href="https://www.instagram.com/fabulashe_studio?igsh=ajlsZ3N1NGZoZWl4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[9/16] overflow-hidden bg-ink"
                  aria-label="Open Fabu Lashe Studio reels on Instagram"
                >
                  <img src={instagramReelCovers[index % instagramReelCovers.length]} alt="" className="h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-80" />
                  <div className="absolute inset-0 grid place-items-center bg-ink/20 px-6 text-center text-white">
                    <div>
                      <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/90 text-ink shadow-bloom">
                        <InstagramMark size={24} />
                      </span>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em]">Watch reels</p>
                    </div>
                  </div>
                </a>
              )}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold">{reel.title}</h3>
                <a
                  href="https://www.instagram.com/fabulashe_studio?igsh=ajlsZ3N1NGZoZWl4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold transition hover:bg-ink hover:text-white"
                >
                  <InstagramMark size={16} /> Open Instagram
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function InstagramProfile() {
  return (
    <section className="overflow-hidden bg-ink px-5 py-20 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-3">
            {instagramProfileImages.map((src, index) => (
              <a
                key={src}
                href="https://www.instagram.com/fabulashe_studio?igsh=ajlsZ3N1NGZoZWl4"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block overflow-hidden rounded-[2rem] bg-white/10 ${index % 2 ? "translate-y-8" : ""}`}
                aria-label="Open Fabu Lashe Studio Instagram profile"
              >
                <img src={src} alt="" className="aspect-[4/5] h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-white/50">Follow the lash diary</p>
          <h2 className="font-display text-5xl font-black leading-none md:text-7xl">
            Fresh sets, soft glam, and studio moments.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            See real lash transformations, appointment openings, client finishes, and daily Fabu Lashe Studio inspiration on Instagram.
          </p>
          <a
            href="https://www.instagram.com/fabulashe_studio?igsh=ajlsZ3N1NGZoZWl4"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-4 font-semibold text-ink transition hover:-translate-y-1"
          >
            <InstagramMark size={18} /> Visit @fabulashe_studio
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function AboutBand({ setPage, image = images.aboutDetail, imageAlt = "Eyelash extension artist working in salon" }) {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">About Fabu Lashe Studio</p>
          <h2 className="font-display text-5xl font-bold leading-none md:text-7xl">Premium lash styling with a professional touch.</h2>
          <p className="mt-6 text-lg leading-8 text-ink/68">From special events and bridal glam to everyday elegance, Fabu Lashe Studio creates lightweight, long-lasting lashes tailored to your face, occasion, and personal style.</p>
          <button onClick={() => setPage("about")} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white">Meet the brand <ArrowRight size={18} /></button>
        </Reveal>
        <Reveal className="relative">
          <img src={image} alt={imageAlt} className="h-[540px] w-full rounded-[2.5rem] object-cover shadow-bloom" />
          <div className="absolute -left-5 top-10 rounded-full bg-blush px-6 py-4 font-bodoni text-2xl shadow-bloom">Since 2019</div>
        </Reveal>
      </div>
    </Section>
  );
}

function BookingCTA({ openBooking }) {
  return (
    <Section className="bg-gradient-to-r from-blush to-rose">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-ink/55">Ready when you are</p>
        <h2 className="font-display text-5xl font-bold leading-none md:text-7xl">Book the set your eyes have been waiting for.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/68">Choose a service, tell us your beauty goals, and we will match you with the right appointment length.</p>
        <button onClick={openBooking} className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-white shadow-bloom">Start Booking <Calendar size={18} /></button>
      </Reveal>
    </Section>
  );
}

function ServiceDetailsModal({ open, booking, onClose, onNext }) {
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedAddOns([]);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, booking?.service?.name, booking?.bookingType]);

  if (!booking?.service) return null;

  const isFill = booking.bookingType === "Fill";
  const availableAddOns = isFill ? fillAddOns : fullSetAddOns;
  const baseLabel = getBookingBaseLabel(booking);
  const projectedBooking = { ...booking, addOns: selectedAddOns };
  const totalPrice = getBookingTotal(projectedBooking);

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((current) =>
      current.some((item) => item.name === addOn.name)
        ? current.filter((item) => item.name !== addOn.name)
        : [...current, addOn]
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/45 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            aria-modal="true"
            role="dialog"
            aria-labelledby="service-details-title"
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-pearl p-5 shadow-bloom md:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="mb-7 flex items-start justify-between gap-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">{booking.bookingType}</p>
                <h2 id="service-details-title" className="font-display text-4xl font-bold capitalize leading-none md:text-5xl">
                  {booking.service.name} {booking.bookingType}
                </h2>
              </div>
              <button onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-sm" aria-label="Close service details">
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-7 md:grid-cols-[0.95fr_1.05fr]">
              <img src={booking.service.image} alt="" className="h-full min-h-72 w-full rounded-[1.5rem] object-cover shadow-sm" />
              <div>
                <div className="rounded-[1.5rem] bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose">Service details</p>
                  <p className="mt-4 text-sm leading-7 text-ink/70">{booking.service.copy}</p>
                  <div className="mt-5 grid gap-2 text-sm font-semibold">
                    <p>{baseLabel}</p>
                    {isFill && <p className="text-ink/55">Choose optional fill add-ons below before scheduling.</p>}
                  </div>
                </div>

                <div className="mt-5 rounded-[1.5rem] bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose">{isFill ? "Fill add-ons" : "Add-ons"}</p>
                  <div className="mt-4 grid gap-3">
                    {availableAddOns.map((addOn) => {
                      const checked = selectedAddOns.some((item) => item.name === addOn.name);
                      return (
                        <label key={addOn.name} className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-pearl px-4 py-3 text-sm font-semibold">
                          <span className="flex items-center gap-3">
                            <input type="checkbox" checked={checked} onChange={() => toggleAddOn(addOn)} className="size-4 accent-rose" />
                            <span>
                              <span className="block">{addOn.name}</span>
                              <span className="block text-xs font-medium text-ink/50">{addOn.duration}</span>
                            </span>
                          </span>
                          <span>{money.format(addOn.price)}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-blush px-4 py-3 text-sm font-bold">
                    <span>Estimated total</span>
                    <span>{money.format(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={onClose} className="rounded-full bg-white px-7 py-4 font-semibold text-ink shadow-sm">
                Cancel
              </button>
              <button onClick={() => onNext(selectedAddOns)} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white">
                Next <ArrowRight size={18} />
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BookingModal({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const minDate = new Date().toISOString().split("T")[0];
  const serviceOptions = [
    "Classics",
    "Wetset",
    "Hybrid Set",
    "Volumes",
    "Mega Volumes",
    "Lashlift",
    "Brow Lamination",
    "Custom Lash Style"
  ];
  const timeOptions = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM"
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submitBooking = async (event) => {
    event.preventDefault();

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      setStatus("error");
      setMessage("Add your Formspree endpoint to VITE_FORMSPREE_ENDPOINT before submitting.");
      return;
    }

    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Formspree rejected the request.");
      }

      form.reset();
      setStatus("success");
      setMessage("Your appointment request has been sent. We will confirm your time shortly.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please check your Formspree endpoint and try again.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/45 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            aria-modal="true"
            role="dialog"
            aria-labelledby="booking-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-pearl p-5 shadow-bloom md:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="mb-7 flex items-start justify-between gap-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">Appointment request</p>
                <h2 id="booking-title" className="font-display text-4xl font-bold leading-none md:text-5xl">
                  Book an appointment
                </h2>
              </div>
              <button onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-sm" aria-label="Close appointment form">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitBooking} className="grid gap-4">
              <input type="hidden" name="_subject" value="New Fabu Lashe Studio appointment request" />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Name
                  <input required name="name" autoComplete="name" className="rounded-2xl border border-ink/10 bg-white px-5 py-4 outline-none transition focus:border-rose" placeholder="Your name" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Email
                  <input required type="email" name="email" autoComplete="email" className="rounded-2xl border border-ink/10 bg-white px-5 py-4 outline-none transition focus:border-rose" placeholder="you@example.com" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">
                Phone Number
                <input required type="tel" name="phone" autoComplete="tel" className="rounded-2xl border border-ink/10 bg-white px-5 py-4 outline-none transition focus:border-rose" placeholder="Phone number" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Select Service
                <select required name="service" defaultValue="" className="rounded-2xl border border-ink/10 bg-white px-5 py-4 outline-none transition focus:border-rose">
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Select Date
                  <input required type="date" name="date" min={minDate} className="rounded-2xl border border-ink/10 bg-white px-5 py-4 outline-none transition focus:border-rose" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Select Time
                  <select required name="time" defaultValue="" className="rounded-2xl border border-ink/10 bg-white px-5 py-4 outline-none transition focus:border-rose">
                    <option value="" disabled>Select time</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </label>
              </div>
              {message && (
                <p className={`rounded-2xl px-5 py-4 text-sm font-medium ${status === "success" ? "bg-white text-ink" : "bg-rose/35 text-ink"}`} role="status">
                  {message}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {status === "sending" ? "Submitting..." : "Submit Appointment"}
                <Calendar size={18} />
              </button>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ServicesPage({ openBooking }) {
  return (
    <>
      <section id="content" className="bg-[#fff5f5] pb-8 pt-28">
        <div className="relative mx-4 overflow-hidden rounded-[1.5rem] bg-rose shadow-bloom lg:mx-8">
          <img src={images.serviceHero} alt="Fabu Lashe Studio lash extension texture" className="h-[390px] w-full object-cover opacity-55 md:h-[520px]" />
          <div className="absolute inset-0 bg-rose/45" />
          <div className="absolute inset-0 grid place-items-center px-6 text-center text-white">
            <Reveal className="max-w-3xl">
              <h1 className="font-display text-6xl font-black leading-none md:text-8xl">
                LASH <span className="italic">Extensions</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-6 text-white/92">
                Skilled lash artistry to enhance your natural beauty with a glamorous, long-lasting finish that perfectly suits your style.
              </p>
              <button onClick={openBooking} className="mt-6 rounded-full border border-white/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] transition hover:bg-white hover:text-ink">
                View our booking policy
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="w-full bg-rose px-5 py-14 text-center lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
          <Reveal>
            <div className="flex justify-center -space-x-12">
              {serviceMenu.slice(6, 8).map((item) => (
                <img key={item.name} src={item.image} alt="" className="h-36 w-36 rounded-[2rem] border-2 border-white object-cover shadow-bloom md:h-44 md:w-44" />
              ))}
            </div>
          </Reveal>
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/75">Don't know which style to choose?</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-none text-white md:text-5xl">
              Find Your <span className="italic">Signature</span> Lash Set by Taking Our Quiz
            </h2>
            <button onClick={openBooking} className="mt-6 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
              Take the quiz
            </button>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fff5f5]">
        {serviceMenu.map((service) => (
          <Reveal key={service.name}>
            <article className="border-b border-ink/25 px-5 py-7 lg:px-8">
              <div className="grid w-full items-center gap-7 md:grid-cols-[0.85fr_2.25fr_150px] xl:grid-cols-[0.72fr_2.5fr_170px]">
                <div>
                  <h2 className="font-display text-3xl font-black lowercase tracking-wide text-rose md:text-4xl">{service.name}</h2>
                  <div className="mt-5 space-y-1 text-xs font-bold uppercase tracking-[0.08em]">
                    <p>{service.full}</p>
                    <p>{service.refill}</p>
                  </div>
                </div>
                <div>
                  <p className="max-w-5xl text-sm leading-7 text-ink/76">{service.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => openBooking(service, "Full Set")} className="rounded-full border border-ink bg-blush px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-ink hover:text-white">
                      Book full set
                    </button>
                    <button onClick={() => openBooking(service, "Fill")} className="rounded-full border border-ink bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-ink hover:text-white">
                      Book a fill
                    </button>
                  </div>
                </div>
                <img src={service.image} alt="" className="h-36 w-36 rounded-[1.25rem] object-cover shadow-sm md:h-40 md:w-40 md:justify-self-end" />
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <div className="overflow-hidden border-y border-ink/20 bg-white py-2">
        <div className="animate-[marquee_22s_linear_infinite] whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink/70">
          Leading lash artistry | Fabu Lashe Studio | Lashes that speak louder than words | Leading lash artistry | Fabu Lashe Studio |
        </div>
      </div>
    </>
  );
}

function BookingSummary({ booking }) {
  if (!booking?.service) {
    return (
      <div className="rounded-[2rem] bg-white p-7 shadow-sm">
        <p className="font-display text-3xl font-bold">No service selected</p>
        <p className="mt-3 leading-7 text-ink/65">Please choose a service from the Services page to continue booking.</p>
      </div>
    );
  }

  const baseLabel = getBookingBaseLabel(booking);
  const basePrice = getBookingBasePrice(booking);
  const addOnsTotal = booking.addOns?.reduce((total, addOn) => total + (addOn.price || 0), 0) || 0;
  const totalPrice = getBookingTotal(booking);

  return (
    <aside className="rounded-[2rem] bg-white p-7 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose">Booking details</p>
      <h2 className="mt-4 font-display text-4xl font-bold capitalize">
        {booking.service.name} {booking.bookingType === "Fill" ? "Fill" : "Full Set"}
      </h2>
      <div className="mt-6 grid gap-4 text-sm">
        <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
          <span className="text-ink/55">Selected service</span>
          <strong>{booking.bookingType}</strong>
        </div>
        <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
          <span className="text-ink/55">Base price</span>
          <strong>{baseLabel}</strong>
        </div>
        <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
          <span className="text-ink/55">Date</span>
          <strong>{booking.date || "Not selected"}</strong>
        </div>
        <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
          <span className="text-ink/55">Time</span>
          <strong>{booking.time || "Not selected"}</strong>
        </div>
        <div>
          <span className="text-ink/55">Add-ons</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {booking.addOns?.length ? booking.addOns.map((addOn) => (
              <span key={addOn.name} className="rounded-full bg-blush px-3 py-1 text-xs font-semibold">
                {addOn.name} ({addOn.duration}) {money.format(addOn.price)}
              </span>
            )) : <strong className="block pt-1">None</strong>}
          </div>
        </div>
        <div className="grid gap-2 rounded-2xl bg-pearl p-4">
          <div className="flex justify-between gap-4 text-ink/65">
            <span>Service</span>
            <strong>{money.format(basePrice)}</strong>
          </div>
          <div className="flex justify-between gap-4 text-ink/65">
            <span>Add-ons</span>
            <strong>{money.format(addOnsTotal)}</strong>
          </div>
          <div className="flex justify-between gap-4 border-t border-ink/10 pt-3 text-base">
            <span className="font-bold">Total</span>
            <strong>{money.format(totalPrice)}</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ScheduleServicePage({ booking, onNext, onBack }) {
  const [date, setDate] = useState(booking?.date || "");
  const [time, setTime] = useState(booking?.time || "");
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <PageShell eyebrow="Schedule Service" title="Choose your appointment date and time." image={booking?.service?.image || images.lashes}>
      <Section className="bg-pearl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
          <Reveal className="rounded-[2rem] bg-white p-7 shadow-sm md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose">Availability</p>
            <h2 className="mt-4 font-display text-4xl font-bold">Schedule Service</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">
                Select Date
                <input required type="date" min={minDate} value={date} onInput={(event) => setDate(event.target.value)} onChange={(event) => setDate(event.target.value)} className="rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Select Time
                <select required value={time} onInput={(event) => setTime(event.target.value)} onChange={(event) => setTime(event.target.value)} className="rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose">
                  <option value="" disabled>Select time</option>
                  {appointmentTimes.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={onBack} className="rounded-full bg-pearl px-7 py-4 font-semibold">Back</button>
              <button disabled={!date || !time} onClick={() => onNext({ date, time })} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                Next <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>
          <Reveal>
            <BookingSummary booking={{ ...booking, date, time }} />
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}

function BookAppointmentPage({ booking, onBack }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submitBooking = async (event) => {
    event.preventDefault();

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      setStatus("error");
      setMessage("Add your Formspree endpoint to VITE_FORMSPREE_ENDPOINT before submitting.");
      return;
    }

    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Formspree rejected the request.");

      event.currentTarget.reset();
      setStatus("success");
      setMessage("Your appointment request has been sent. We will confirm your booking shortly.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please check your Formspree endpoint and try again.");
    }
  };

  return (
    <PageShell eyebrow="Book an Appointment" title="Confirm your details and request your booking." image={booking?.service?.image || images.contact}>
      <Section className="bg-pearl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <Reveal>
            <BookingSummary booking={booking} />
          </Reveal>
          <Reveal className="rounded-[2rem] bg-white p-7 shadow-sm md:p-9">
            <form onSubmit={submitBooking} className="grid gap-4">
              <input type="hidden" name="_subject" value="New scheduled Fabu Lashe Studio appointment request" />
              <input type="hidden" name="service" value={booking?.service?.name || ""} />
              <input type="hidden" name="booking_type" value={booking?.bookingType || ""} />
              <input type="hidden" name="date" value={booking?.date || ""} />
              <input type="hidden" name="time" value={booking?.time || ""} />
              <input type="hidden" name="addons" value={booking?.addOns?.map((addOn) => `${addOn.name} (${addOn.duration}) ${money.format(addOn.price)}`).join(", ") || "None"} />
              <input type="hidden" name="total_price" value={money.format(getBookingTotal(booking))} />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Name
                  <input required name="name" autoComplete="name" className="rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" placeholder="Your name" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Email
                  <input required type="email" name="email" autoComplete="email" className="rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" placeholder="you@example.com" />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">
                Phone Number
                <input required type="tel" name="phone" autoComplete="tel" className="rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" placeholder="Phone number" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Notes
                <textarea name="notes" className="min-h-32 rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" placeholder="Any lash history, allergies, or styling notes?" />
              </label>
              {message && (
                <p className={`rounded-2xl px-5 py-4 text-sm font-medium ${status === "success" ? "bg-pearl text-ink" : "bg-rose/35 text-ink"}`} role="status">
                  {message}
                </p>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={onBack} className="rounded-full bg-pearl px-7 py-4 font-semibold">Back</button>
                <button type="submit" disabled={status === "sending" || !booking?.date || !booking?.time} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                  {status === "sending" ? "Submitting..." : "Submit Appointment"} <Calendar size={18} />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}

function AboutPage({ setPage }) {
  return (
    <PageShell eyebrow="About" title="Artistry by Muskan: The Lash Edition." image={images.artist}>
      <AboutBand setPage={setPage} />
      <Section eyebrow="Our standards" title="Styled by experience, finished with grace.">
        <div className="grid gap-6 md:grid-cols-4">
          {["Wide Variety Style", "Exquisite Results", "Signature Look", "Skilled Specialists"].map((item) => (
            <Reveal key={item} className="rounded-[2rem] bg-white p-8 shadow-sm">
              <Minus className="mb-8 text-rose" />
              <h3 className="font-display text-2xl font-bold">{item}</h3>
              <p className="mt-4 leading-7 text-ink/62">Personalized, high-quality lash services built around your mood, occasion, and natural beauty.</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="You bring the beauty, we create the art." image={images.contact}>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="font-display text-4xl font-bold">Studio details</h2>
            <div className="mt-8 grid gap-5 text-ink/68">
              <p><strong className="text-ink">Hours:</strong> Tue to Sat, 10 AM to 6 PM</p>
              <p><strong className="text-ink">Location:</strong> Canada</p>
              <p><strong className="text-ink">Email:</strong> fabulashestudio.ca@gmail.com</p>
              <p><strong className="text-ink">Phone:</strong> +1 647-675-8432</p>
              <p><strong className="text-ink">Instagram:</strong> @Fabu Lashe Studio</p>
            </div>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <form className="grid gap-4" aria-label="Booking inquiry form">
              {["Full name", "Email address", "Preferred service"].map((label) => (
                <label key={label} className="grid gap-2 text-sm font-semibold">
                  {label}
                  <input className="rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" placeholder={label} />
                </label>
              ))}
              <label className="grid gap-2 text-sm font-semibold">
                Beauty goals
                <textarea className="min-h-36 rounded-2xl border border-ink/10 bg-pearl px-5 py-4 outline-none transition focus:border-rose" placeholder="Tell us about your ideal look, timing, and any previous lash history." />
              </label>
              <button type="button" className="mt-2 rounded-full bg-ink px-7 py-4 font-semibold text-white">Send inquiry</button>
            </form>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, image, children }) {
  return (
    <>
      <section id="content" className="relative overflow-hidden px-5 pb-20 pt-36 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blush/80 to-pearl" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-ink/55">{eyebrow}</p>
            <h1 className="font-display text-5xl font-black leading-[0.9] md:text-7xl">{title}</h1>
          </Reveal>
          <Reveal className="relative">
            <img src={image} alt="" className="h-[420px] w-full rounded-[2.5rem] object-cover shadow-bloom" />
          </Reveal>
        </div>
      </section>
      {children}
    </>
  );
}

function Footer({ setPage }) {
  const footerGo = (id) => {
    setPage(id);
    window.history.replaceState(null, "", id === "home" ? window.location.pathname : `${window.location.pathname}?page=${id}`);
  };

  return (
    <footer className="bg-ink px-5 py-14 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h2 className="font-display text-4xl font-bold">Fabu Lashe Studio</h2>
          <p className="mt-4 max-w-md leading-7 text-white/62">Lashes That Speak Louder Than Words: premium lash styling Across GTA Greater Toronto Area.</p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Explore</h3>
          <div className="grid gap-2">
            {nav.map(([label, id]) => (
              <button key={id} onClick={() => footerGo(id)} className="text-left text-white/65 transition hover:text-white">{label}</button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Stay close</h3>
          <a href="https://www.instagram.com/fabulashe_studio?igsh=ajlsZ3N1NGZoZWl4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/70 transition hover:text-white"><InstagramMark size={18} /> Instagram</a>
          <p className="mt-4 text-sm text-white/55">fabulashestudio.ca@gmail.com</p>
          <p className="mt-1 text-sm text-white/55">+1 647-675-8432</p>
          <p className="mt-8 text-sm text-white/42">© 2026 Fabu Lashe Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
