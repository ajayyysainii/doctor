// ============================================================
// SITE DATA — Edit this file to update content across the site
// ============================================================

// ── Doctor / Clinic Info ─────────────────────────────────────
export const doctor = {
  name: "Dr. Suresh Palsania",
  shortName: "Dr. Suresh",
  specialization: "Orthopedic Surgeon",
  qualification: "MS (Orthopedics) — SMS Medical College, Jaipur ",
  experience: "1 Year in Healthcare",
  phone: "+91 98765 43210",
  image: "/doctor-headshot.png",   // swap path to update the photo
};

// ── Clinic Info ───────────────────────────────────────────────
export const clinic = {
  name: "Dr. Suresh Palsania",
  nameShort: "Dr. Suresh",
  tagline: "Joint Replacement & Trauma Surgeon",
  address:
    "1st Floor, Hanuman Heights, Near Ram Mandir, Behind SK Hospital, Sakpura Mohlla, Sikar‑332001, Rajasthan",
  email: "contact@drsureshpalsania.in",
  phone: doctor.phone,
  copyright: `Copyright © ${new Date().getFullYear()} Dr. Suresh Palsania`,
  // Opening hours (used for display only — adjust as needed)
  hours: [
    { day: "Mon", time: "9:00 am – 7:00 pm" },
    { day: "Tue", time: "9:00 am – 7:00 pm" },
    { day: "Wed", time: "9:00 am – 7:00 pm" },
    { day: "Thu", time: "9:00 am – 7:00 pm" },
    { day: "Fri", time: "9:00 am – 7:00 pm" },
    { day: "Sat", time: "9:00 am – 7:00 pm" },
    { day: "Sun", time: "9:00 am – 7:00 pm" },
  ],
};

// ── Hero Section ─────────────────────────────────────────────
export const heroContent = {
  headline: "Together for\nBetter Health",
  subtext:
    "Providing world-class orthopedic care with advanced facilities, expert diagnosis, and compassionate treatment.",
  rating: "4.9",
  ratingMax: "5.0",
  trustedCount: "500+",
  ctaPrimary: "BOOK A CALL",
  ctaSecondary: "OUR SERVICES",
};

// ── About Section ────────────────────────────────────────────
export const aboutContent = {
  sectionLabel: "About Dr. Suresh Palsania",
  headline: "Discover ",
  headlineHighlight: "Dr. Suresh Palsania",
  description:
    `At our clinic, we are dedicated to delivering exceptional orthopedic care — from joint replacement surgeries to complex trauma management. Under the expert guidance of ${doctor.name}, ${doctor.specialization}, we combine clinical precision with compassionate patient support to help you recover faster and live better.`,
  features: [
    {
      title: "Innovative Solutions",
      description:
        "We combine the latest orthopedic technology with expert surgical care to improve health outcomes.",
    },
    {
      title: "Patient-Centered Approach",
      description:
        "We prioritize personalized care tailored to each individual's needs and recovery journey.",
    },
  ],
};

// ── Services Highlight Strip ─────────────────────────────────
export const servicesHighlights = [
  {
    id: "regenerative-orthopedics",
    title: "Regenerative Orthopedics",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200",
    href: "#services",
  },
  {
    id: "med-fit",
    title: "Med-Fit",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    href: "#services",
  },
  {
    id: "sports-medicine",
    title: "Sports Medicine",
    image:
      "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=1200",
    href: "#services",
  },
] as const;

// ── Why Choose Us ────────────────────────────────────────────
export const whyChooseUsContent = {
  sectionLabel: "Why Choose Us",
  headline: "Your trusted partner in orthopedic care",
  subtext:
    "Our clinic is always ready to provide immediate, life-saving orthopedic treatment and joint care with highly trained specialists.",
  features: [
    {
      iconKey: "stethoscope",
      title: "Complete Care",
      description:
        "Full-spectrum orthopedic support from diagnosis through post-operative rehabilitation.",
    },
    {
      iconKey: "hand-heart",
      title: "Expert Guidance",
      description:
        `Led by ${doctor.name}, our team helps you make smart, informed surgical decisions.`,
    },
    {
      iconKey: "dna",
      title: "Wellness Blend",
      description:
        "We enhance recovery by blending evidence-based medicine with holistic wellness protocols.",
    },
    {
      iconKey: "microscope",
      title: "Modern Tools",
      description:
        "Advanced imaging, precision implants, and minimally invasive techniques for quick results.",
    },
  ],
};

// ── Appointment Section ───────────────────────────────────────
export const appointmentContent = {
  headline: "Book An Appointment",
  doctors: [
    {
      value: "dr-suresh",
      label: `${doctor.name} — ${doctor.specialization}`,
    },
  ],
  ctaLabel: "Book Appointment Now",
  phonePlaceholder: "+91 98765 43210",
};

// ── Pain Areas Section ────────────────────────────────────────
export const painAreasContent = {
  titleStart: "Where are you",
  titleHighlight: "pain",
  titleEnd: "?",
  areas: [
    {
      id: "spine",
      label: "Spine",
      symptoms: [
        "Low back pain",
        "Neck pain",
        "Sacroiliac joint pain or instability",
        "Bulging/ herniated/ torn disc",
        "Continued pain after lower back or neck surgery",
        "Arthritis",
        "Atrophied muscles",
        "Instability",
        "Pinched nerve/ sciatica",
        "Spinal stenosis",
        "Spondylolysis",
      ],
    },
    {
      id: "shoulder",
      label: "Shoulder",
      symptoms: [
        "Rotator cuff injury",
        "Shoulder impingement",
        "Frozen shoulder",
        "Shoulder instability",
        "Labral tear",
      ],
    },
    {
      id: "elbow",
      label: "Elbow",
      symptoms: [
        "Tennis elbow",
        "Golfer's elbow",
        "Elbow stiffness",
        "Ligament strain",
      ],
    },
    {
      id: "hand-wrist",
      label: "Hand/Wrist",
      symptoms: [
        "Carpal tunnel syndrome",
        "Wrist sprain",
        "Finger joint pain",
        "Numbness or tingling",
      ],
    },
    {
      id: "hip",
      label: "Hip",
      symptoms: [
        "Hip arthritis",
        "Hip labral tear",
        "Groin pain while walking",
        "Hip impingement",
      ],
    },
    {
      id: "knee",
      label: "Knee",
      symptoms: [
        "Knee osteoarthritis",
        "ACL/PCL injury",
        "Meniscus tear",
        "Pain while climbing stairs",
      ],
    },
    {
      id: "foot-ankle",
      label: "Foot/Ankle",
      symptoms: [
        "Ankle sprain instability",
        "Plantar fasciitis",
        "Achilles tendon pain",
        "Heel pain",
      ],
    },
  ],
  centerImage:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1200",
} as const;

// ── Treatments Section ────────────────────────────────────────
export const treatmentsContent = {
  title: "Treatments",
  items: [
    {
      id: "orthopedic",
      title: "Orthopedic Treatments",
      description:
        "Heal your body using advanced regenerative therapies with minimally invasive methods that support faster recovery and reduce dependence on traditional surgery.",
      label: "Lumbar/Cervical Spine",
      image:
        "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&q=80&w=1200",
      stripImages: [
        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1580281657521-47f249e8f4df?auto=format&fit=crop&q=80&w=300",
      ],
      points: ["Knee", "Lumbar/Cervical Spine", "Hip", "Shoulder", "Hand/Wrist", "Foot/Ankle"],
    },
    {
      id: "sports-medicine",
      title: "Sports Medicine Treatments",
      description:
        "Whether you are a professional athlete or active individual, our non-surgical, customized protocols target injury recovery while helping restore strength and performance.",
      label: "Elbow Tendinitis/Arthritis",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200",
      stripImages: [
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517963628607-235ccdd5476b?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=300",
      ],
      points: [
        "Hip/Thy",
        "Elbow Tendinitis/Arthritis",
        "Shoulder RC Tear/Labral Tear",
        "Lumbar/Cervical Disc Bulge/Sciatica",
        "Foot/Ankle Ligament Injuries",
        "ACL/Meniscus/Ligament Injuries",
      ],
    },
    {
      id: "med-fit",
      title: "Med-Fit",
      description:
        "Our Med-Fit approach emphasizes prevention and healthy lifestyle through guided movement, nutrition support, stress management, and advanced therapeutic techniques.",
      label: "Brain Tap Therapy",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200",
      stripImages: [
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=300",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300",
      ],
      points: [
        "HBOT",
        "PEMF Therapy",
        "Custom fitness/Corrective exercises",
        "Brain Tap Therapy",
        "IV nutrition",
        "EMS training",
        "Diet and Nutrition",
        "VO2 max analysis",
      ],
    },
  ],
} as const;

// ── Testimonials ─────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Ramesh Sharma",
    role: "Knee Replacement Patient",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    text: "Dr. Suresh performed my knee replacement surgery with exceptional skill. Within weeks I was back on my feet. The entire team under Dr. Suresh Palsania was incredibly supportive throughout recovery.",
  },
  {
    id: 2,
    name: "Meena Gupta",
    role: "Hip Fracture Follow-up",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    text: "After my hip fracture I was terrified. Dr. Palsania explained everything clearly and the surgery went perfectly. The clinic facilities in Sikar are modern and the staff is very professional.",
  },
  {
    id: 3,
    name: "Anil Verma",
    role: "Sports Injury Rehabilitation",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150",
    text: "I came in with a severe ligament tear and was worried about my sporting career. The minimally invasive approach and rehab plan by Dr. Suresh Palsania got me back to full fitness faster than I imagined.",
  },
  {
    id: 4,
    name: "Sunita Bairwa",
    role: "Spine Pain Management",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    text: "Years of back pain finally resolved after consulting Dr. Suresh Palsania. The diagnosis was accurate, the treatment was precise, and the follow-up care was outstanding. Highly recommended in Sikar.",
  },
];

// ── Footer ───────────────────────────────────────────────────
export const footerContent = {
  ctaBanner: "WE'RE READY TO LISTEN AND HELP",
  ctaButton: "Schedule A Call",
  clinicDescription:
    "Expert orthopedic and joint replacement care — bridging advanced surgical techniques with compassionate patient support in Sikar, Rajasthan.",
  newsletterHeading: "Sign up to receive the latest\nnews and updates from us.",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "/blog" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  legalLinks: ["Privacy Policy", "Disclaimer", "Sitemap"],
  socialLinks: {
    twitter: "#",
    linkedin: "#",
    dribbble: "#",
    facebook: "#",
  },
};
