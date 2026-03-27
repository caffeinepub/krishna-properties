import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  HardHat,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddQuery } from "../hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
  { label: "Query", href: "#query" },
];

const SERVICES = [
  {
    icon: Building2,
    title: "Property Dealing",
    desc: "Expert assistance in buying, selling, and renting residential and commercial properties across Delhi & Ghaziabad.",
  },
  {
    icon: HardHat,
    title: "Home Construction",
    desc: "End-to-end home construction services with quality materials and skilled craftsmen delivering your dream home.",
  },
  {
    icon: Wrench,
    title: "Renovation",
    desc: "Modern renovation and interior upgrades for homes and offices, breathing new life into existing spaces.",
  },
  {
    icon: Briefcase,
    title: "Property Consultation",
    desc: "Professional property advice on market trends, investment opportunities, legal guidance, and documentation.",
  },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    desc: "Transparent dealings with no hidden charges. Your trust is our foundation.",
  },
  {
    icon: Star,
    title: "Expert Knowledge",
    desc: "Deep market expertise across Delhi and Ghaziabad property landscape.",
  },
  {
    icon: Clock,
    title: "12+ Years Experience",
    desc: "Over a decade of delivering exceptional real estate solutions.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    desc: "500+ happy clients and 1000+ successful property transactions.",
  },
];

const SERVICE_TYPES = [
  "Property Buying",
  "Property Selling",
  "Property Rental",
  "Home Construction",
  "Renovation",
  "Other",
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const addQuery = useAddQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.serviceType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await addQuery.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceType: "",
        message: "",
      });
      toast.success("Your query has been submitted! We'll contact you soon.");
    } catch {
      toast.error("Failed to submit query. Please try again.");
    }
  };

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-poppins">
      {/* Utility Bar */}
      <div className="bg-kp-footer text-kp-footer-accent py-2 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 flex justify-end gap-6 text-sm">
          <a
            href="tel:9654778171"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            9654778171
          </a>
          <a
            href="tel:9217470656"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            9217470656
          </a>
          <a
            href="mailto:liladharmishra55@gmail.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            liladharmishra55@gmail.com
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-kp-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 text-kp-brown font-bold text-lg"
            data-ocid="nav.link"
          >
            <span className="text-2xl">🏠</span>
            <div>
              <div className="text-kp-gold font-bold text-base leading-tight uppercase tracking-wide">
                Krishna Properties
              </div>
              <div className="text-xs text-muted-foreground font-normal">
                Est. 2012 · Delhi & Ghaziabad
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-kp-gold transition-colors rounded-sm"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => scrollTo("#query")}
              className="bg-kp-gold hover:bg-kp-gold-dark text-white font-semibold px-5 text-sm"
              data-ocid="nav.primary_button"
            >
              Submit Query
            </Button>
            <button
              type="button"
              onClick={() => {
                window.location.hash = "/admin";
              }}
              className="text-xs text-muted-foreground hover:text-kp-gold transition-colors"
              data-ocid="nav.link"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-kp-border px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="py-2 text-sm font-medium text-foreground hover:text-kp-gold"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => scrollTo("#query")}
              className="mt-2 bg-kp-gold hover:bg-kp-gold-dark text-white"
              data-ocid="nav.primary_button"
            >
              Submit Query
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-krishna-properties.dim_1600x900.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-kp-gold border border-kp-gold/40 rounded-full bg-kp-gold/10">
              12+ Years of Trusted Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white uppercase leading-tight mb-6">
              Your Trusted Property Partner
              <br />
              <span className="text-kp-gold">in Delhi & Ghaziabad</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Buying, selling, renting, or building your dream home — Krishna
              Properties is your one-stop solution for all real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollTo("#query")}
                className="bg-kp-gold hover:bg-kp-gold-dark text-white font-semibold px-8 py-3 text-base"
                data-ocid="hero.primary_button"
              >
                Submit Your Query <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#services")}
                className="border-white text-white hover:bg-white hover:text-kp-brown font-semibold px-8 py-3 text-base"
                data-ocid="hero.secondary_button"
              >
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-kp-gold py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-6 text-center text-white">
          <div>
            <div className="text-3xl font-bold">12+</div>
            <div className="text-sm font-medium opacity-90">
              Years Experience
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm font-medium opacity-90">
              Properties Dealt
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-sm font-medium opacity-90">Happy Clients</div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-kp-gold font-semibold text-sm uppercase tracking-widest mb-2">
              What We Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-kp-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-kp-border rounded-lg p-6 hover:border-kp-gold hover:shadow-card transition-all duration-300"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-lg bg-kp-beige flex items-center justify-center mb-4 group-hover:bg-kp-gold/10 transition-colors">
                  <service.icon className="w-6 h-6 text-kp-gold" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-kp-beige">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="w-full h-80 lg:h-96 rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url('/assets/generated/hero-krishna-properties.dim_1600x900.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-kp-brown/20 rounded-xl" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-kp-gold text-white rounded-lg px-6 py-4 shadow-card">
                <div className="text-3xl font-bold">12+</div>
                <div className="text-xs font-medium">Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-kp-gold font-semibold text-sm uppercase tracking-widest mb-2">
                Who We Are
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase mb-6">
                About Krishna Properties
              </h2>
              <div className="w-16 h-1 bg-kp-gold mb-6 rounded-full" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded by{" "}
                <strong className="text-foreground">Leeladhar Mishra</strong>,
                Krishna Properties has been a trusted name in Delhi's real
                estate market for over 12 years. We specialize in property
                buying, selling, renting, and complete home construction
                solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Serving families and investors across{" "}
                <strong className="text-foreground">Delhi and Ghaziabad</strong>
                , we bring deep local market knowledge, honest dealings, and
                personalized service to every client. Our commitment to
                transparency and quality has earned us 1000+ satisfied clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-kp-gold/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-kp-gold" />
                  </div>
                  <span className="text-muted-foreground">
                    Bihari Colony, Shahdara, Delhi
                  </span>
                </div>
              </div>
              <Button
                onClick={() => scrollTo("#contact")}
                className="mt-6 bg-kp-gold hover:bg-kp-gold-dark text-white"
                data-ocid="about.primary_button"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="areas" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-kp-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Where We Operate
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              Service Areas
            </h2>
            <div className="w-16 h-1 bg-kp-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-xl border border-kp-border p-8 hover:shadow-card transition-shadow"
              data-ocid="areas.item.1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-kp-gold/5 rounded-bl-full" />
              <div className="text-5xl mb-4">🏙️</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Delhi</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We operate extensively across Delhi including Shahdara, Laxmi
                Nagar, Preet Vihar, Geeta Colony, Pandav Nagar, and surrounding
                localities. Whether you're looking for residential plots, flats,
                or commercial spaces — Delhi is our home ground.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Shahdara",
                  "Laxmi Nagar",
                  "Preet Vihar",
                  "Geeta Colony",
                  "Pandav Nagar",
                ].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-kp-beige text-kp-brown text-xs font-medium rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-xl border border-kp-border p-8 hover:shadow-card transition-shadow"
              data-ocid="areas.item.2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-kp-gold/5 rounded-bl-full" />
              <div className="text-5xl mb-4">🌆</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ghaziabad
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Rapidly developing Ghaziabad offers excellent investment
                opportunities. We cover Vasundhara, Vaishali, Indirapuram, Raj
                Nagar Extension, and more — helping you find the best property
                deals in this growing NCR hub.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Vasundhara",
                  "Vaishali",
                  "Indirapuram",
                  "Raj Nagar Ext.",
                  "Kaushambi",
                ].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-kp-beige text-kp-brown text-xs font-medium rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-kp-footer">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-kp-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Our Promise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase">
              Why Choose Us
            </h2>
            <div className="w-16 h-1 bg-kp-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-kp-gold/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-kp-gold" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-kp-footer-accent text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Query Form + Contact */}
      <section id="query" className="py-20 bg-kp-beige">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-kp-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              Submit Your Query
            </h2>
            <div className="w-16 h-1 bg-kp-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div
              className="lg:col-span-3 bg-white rounded-xl border border-kp-border p-8 shadow-card"
              data-ocid="query.panel"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                  data-ocid="query.success_state"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Query Submitted!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Leeladhar Mishra will contact
                    you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-kp-gold hover:bg-kp-gold-dark text-white"
                  >
                    Submit Another Query
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground mb-1.5 block"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        data-ocid="query.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-foreground mb-1.5 block"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Your mobile number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, phone: e.target.value }))
                        }
                        required
                        data-ocid="query.input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="query.input"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="serviceType"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Service Type *
                    </Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(val) =>
                        setFormData((p) => ({ ...p, serviceType: val }))
                      }
                    >
                      <SelectTrigger id="serviceType" data-ocid="query.select">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Message / Query
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your requirement in detail..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      data-ocid="query.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={addQuery.isPending}
                    className="w-full bg-kp-gold hover:bg-kp-gold-dark text-white font-semibold py-3"
                    data-ocid="query.submit_button"
                  >
                    {addQuery.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      "Submit Query"
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div id="contact" className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-kp-border p-6 shadow-card">
                <h3 className="font-bold text-foreground text-lg mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:9654778171"
                    className="flex items-start gap-3 group"
                    data-ocid="contact.link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-kp-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-kp-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-kp-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Primary Contact
                      </div>
                      <div className="font-semibold text-foreground">
                        +91 9654778171
                      </div>
                    </div>
                  </a>
                  <a
                    href="tel:9217470656"
                    className="flex items-start gap-3 group"
                    data-ocid="contact.link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-kp-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-kp-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-kp-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Secondary Contact
                      </div>
                      <div className="font-semibold text-foreground">
                        +91 9217470656
                      </div>
                    </div>
                  </a>
                  <a
                    href="mailto:liladharmishra55@gmail.com"
                    className="flex items-start gap-3 group"
                    data-ocid="contact.link"
                  >
                    <div className="w-10 h-10 rounded-lg bg-kp-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-kp-gold/20 transition-colors">
                      <Mail className="w-5 h-5 text-kp-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Email Address
                      </div>
                      <div className="font-medium text-foreground text-sm">
                        liladharmishra55@gmail.com
                      </div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-kp-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-kp-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Office Address
                      </div>
                      <div className="font-medium text-foreground text-sm">
                        Bihari Colony, Street No. 4,
                        <br />
                        Shahdara, Delhi – 110032
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-kp-gold rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Leeladhar Mishra</h3>
                <p className="text-sm opacity-90 mb-3">
                  Founder & Property Expert
                </p>
                <div className="text-sm opacity-80">
                  With 12+ years of experience in Delhi's real estate market,
                  Leeladhar personally ensures every client gets the best
                  property solutions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kp-footer text-kp-footer-accent py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏠</span>
                <div className="text-kp-gold font-bold text-base uppercase tracking-wide">
                  Krishna Properties
                </div>
              </div>
              <p className="text-sm leading-relaxed opacity-80">
                Trusted property dealers and home construction experts serving
                Delhi and Ghaziabad since 2012.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="hover:text-kp-gold transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
                Contact
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                <div>📞 9654778171</div>
                <div>📞 9217470656</div>
                <div>✉️ liladharmishra55@gmail.com</div>
                <div>📍 Bihari Colony, Shahdara, Delhi – 110032</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="opacity-70">
              © {new Date().getFullYear()} Krishna Properties. All rights
              reserved.
            </div>
            <div className="opacity-70">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kp-gold transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
