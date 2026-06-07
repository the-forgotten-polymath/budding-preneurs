export interface SkillItem {
  name: string;
  description: string;
}

export interface WorkshopFormat {
  name: string;
  description: string;
}

export interface PricingTier {
  name: string;
  idealFor: string;
  price: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface TabData {
  id: string;
  label: string;
  badge: string;
  heading: string;
  subheading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  fallbackImage: string;
  skills?: SkillItem[];
  formats?: WorkshopFormat[];
  plans?: PricingTier[];
  testimonial?: Testimonial;
}

export const tabsData: TabData[] = [
  {
    id: "platform",
    label: "🏠 Platform Overview",
    badge: "Fostering Self-Reliance & Sisterhood",
    heading: "Welcome to Buddingpreneurs Celebrating Women-Led Businesses.",
    subheading: "Start Small, Dream Big — Women Entrepreneurs Rise Here",
    description: "Buddingpreneurs is a vibrant community dedicated to empowering Indian women through skill development, collaboration, and support, fostering independence and economic growth in their entrepreneurial journeys. We believe in the power of community. Through hands-on training, digital tools, and peer support, we help women turn ideas into income. Whether it’s starting a home business, learning new skills, or building a personal brand — we grow stronger, together.",
    ctaText: "Connect. Collaborate. Grow.",
    ctaLink: "#contact",
    image: "/images/home/photo-1590650423710-ffa6e7f63440",
    fallbackImage: "https://images.unsplash.com/photo-1590650423710-ffa6e7f63440?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "programs",
    label: "🎯 Our Programs",
    badge: "Startup & Skill Programs",
    heading: "\"The Startup for women: Powering Women to Rise and Thrive\"",
    subheading: "Practical Skills to Achieve Financial Independence",
    description: "Our skill training programs are designed to equip women with practical, income-generating skills tailored for today's digital and creative industries. We tailor strategies for homemakers, beginners, and small sellers who may be starting without any followers or digital background.",
    ctaText: "Explore Our Curriculum",
    ctaLink: "#programs",
    image: "/images/our-programs/photo-1590650046871-92c887180603",
    fallbackImage: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=800&q=80",
    skills: [
      { name: "🎨 Crafts & Creative", description: "Handmade decor, jewelry making, mehndi, gift wrapping." },
      { name: "💻 Digital & Design", description: "Content creation, Canva design, photo/video editing, e-commerce basics." },
      { name: "📣 Brand & Marketing", description: "Facebook/Instagram promotion, WhatsApp catalog setup, personal branding." },
      { name: "💼 Soft Business Skills", description: "Customer handling, pricing products, time management, scaling." }
    ]
  },
  {
    id: "workshops",
    label: "🎓 Workshops",
    badge: "Interactive Training",
    heading: "Enable Women to Lead and Launch",
    subheading: "Grow Her Ideas into Impact",
    description: "Join our skill development workshops to boost your business and connect with like-minded women. We also offer engaging Online Workshops tailored for children to learn and grow, keeping them active with Vedic Math, Abacus, and Arts.",
    ctaText: "View Formats & Schedules",
    ctaLink: "#workshops",
    image: "/images/workshops/photo-1623683704451-ca4299bb3c99",
    fallbackImage: "https://images.unsplash.com/photo-1623683704451-ca4299bb3c99?auto=format&fit=crop&w=800&q=80",
    formats: [
      { name: "🎥 Live Interactive Sessions", description: "Conducted over Zoom/Google Meet with hands-on exercises." },
      { name: "📼 Watch at Your Own Pace", description: "Recorded sessions and downloadable guides available 24/7." },
      { name: "💬 Ongoing Practice Support", description: "Post-workshop WhatsApp & private Facebook support groups." }
    ]
  },
  {
    id: "membership",
    label: "💼 Business Plans",
    badge: "Membership Tiers",
    heading: "Ideal Membership Structure for Entrepreneur Community.",
    subheading: "Choose the plan that's right for your Business",
    description: "Unlock full community support, mentoring, networking, and platform visibility to turn your ideas into a sustainable venture. Early bird benefits available for early sign-ups.",
    ctaText: "Select Your Plan",
    ctaLink: "#pricing",
    image: "/images/business-plan/photo-1496449903678-68ddcb189a24",
    fallbackImage: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&w=800&q=80",
    plans: [
      {
        name: "Free Membership",
        idealFor: "Beginners & curious minds",
        price: "₹0",
        features: ["Lifetime access to free WhatsApp/FB groups", "Monthly curated business newsletter", "Weekend promotional opportunities"]
      },
      {
        name: "Startup Plan",
        idealFor: "Early-stage founders",
        price: "₹999/mo",
        features: ["Showcase venture on FB, Insta & WhatsApp", "Coaching meetups & workshops access", "Spotlight feature video interview"]
      },
      {
        name: "Premium Plan",
        idealFor: "Scaling small businesses",
        price: "₹1,999/mo",
        features: ["All Startup benefits + Spotlights", "Pitch feedback & coaching sessions", "E-Certificate & Directory Listing"]
      },
      {
        name: "VIP / Pro Plan",
        idealFor: "Funded & mature startups",
        price: "₹4,999/mo",
        features: ["1-on-1 monthly mentoring & mastermind", "Live interview on 'Coffee Tales'", "Investor introductions & speaking slots"]
      }
    ]
  },
  {
    id: "community",
    label: "🤝 Our Community",
    badge: "Social Proof & Sisterhood",
    heading: "A Platform for Her to Start, Share, and Shine",
    subheading: "Let’s Build Your Dream Together",
    description: "At Buddingpreneurs, we are committed to uplifting Indian women by turning skills into self-reliance. Whether she’s starting from scratch or looking to grow her small venture, we provide hands-on training, digital promotion guidance, and a supportive sisterhood to help her thrive.",
    ctaText: "Join the Sisterhood",
    ctaLink: "#community",
    image: "/images/community/whatsapp-image-2025-05-18-at-8.28.51-am-m5KM9kNZVMsOW363.jpeg",
    fallbackImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    testimonial: {
      quote: "The buddingpreneurs has been an invaluable resource for learning, networking, and refining entrepreneurial skills. We trust buddingpreneurs. Must try... see the difference.",
      author: "Nirmla Chib",
      role: "Entrepreneur & Brand MD, TVAREETAZ",
      rating: 5
    }
  }
];

export const siteMetadata = {
  title: "Buddingpreneurs – Startup Training & Empowerment Platform for Indian Women",
  description: "Fostering economic independence and digital branding for women-led startups in India. Connect, collaborate, and grow with our supportive sisterhood.",
  contactEmail: "buddingpreneursinfo@gmail.com",
  contactPhone: "8534027633",
  location: "Dehradun, Uttarakhand & Pune, Maharashtra, India",
  channels: ["WhatsApp Business", "Facebook Group", "Instagram"],
  socialLinks: {
    whatsappCommunity: "https://chat.whatsapp.com/H9hwJNJF35u4LKG2tkhRtJ",
    whatsappDirect: "https://wa.me/918534027633", 
    facebookGroup: "https://www.facebook.com/groups/543871825820662/",
    facebookPage: "https://www.facebook.com/share/g/1BJQE9DGxw/",
    instagram: "https://www.instagram.com/buddingpreneurs?igsh=MTZwN3RhbjIyOWQ0aQ==",
    linkedin: "https://www.linkedin.com/in/sasmita-b-4945a8232/"
  }
};
