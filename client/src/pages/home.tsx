import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu, X, ChevronRight, CheckCircle, Star, Building2, Factory, Layers,
  Wrench, ShieldCheck, Zap, Award, Phone, Mail, MapPin, Clock,
  Facebook, Twitter, Instagram, Linkedin,
  Building, Store, Warehouse, Landmark,
  HelpCircle, ChevronDown, ChevronUp,
  Hammer, Ruler, Box, UserCog
} from "lucide-react";


import skfManLogoImage from "@assets/logo/skf-man-logo-white.svg";
import skfLogoImage from "@assets/logo/skf-krishna-logo.png";
import skfLogoImage2 from "@assets/logo/skf-krishna-logo-2.png";
import jayShreeKrishnaImage from "@assets/logo/jayshreekrishnalogo.png";
import jayShreeKrishnaImage2 from "@assets/logo/jayshreekrishnalogo2.png";
import heroImage from "@assets/generated_images/Fabrication_workshop_hero_image_d82fb0be.png";
import craftsmanImage from "@assets/generated_images/Craftsman_welding_detail_shot_21d2c981.png";
import gateImage from "@assets/generated_images/Custom_metal_gate_installation_65679786.png";
import structuralImage from "@assets/generated_images/Structural_steel_construction_53ff1f48.png";
import railingImage from "@assets/generated_images/Ornamental_staircase_railing_3422cd38.png";
import componentsImage from "@assets/generated_images/Industrial_metal_components_efca3178.png";
import canopyImage from "@assets/generated_images/Decorative_metal_canopy_b4c48ac3.png";
import laserImage from "@assets/generated_images/Laser_cutting_process_ab527ce9.png";
import furnitureImage from "@assets/generated_images/Custom_metal_furniture_169c4ae9.png";
import facadeImage from "@assets/generated_images/Metal_facade_panels_8bd6d2d7.png";
import rackImage from "@assets/generated_images/rack.png";
import gazeboImage from "@assets/generated_images/gazebo.png";
import shutterImage from "@assets/generated_images/shutter.png";
import parkingShedImage from "@assets/generated_images/parking-shed.png";

const services = [
  {
    icon: Building,
    title: "Residential & Architectural Fabrication",
    description: "Premium MS & SS fabrication for homes and buildings. We craft grills, gates, windows, shutters, balcony railings, gazebos, pergolas, metal beds, racks, and all kinds of custom architectural metalwork with exceptional finishing, durability, and long-lasting quality."
  },
  {
    icon: Factory,
    title: "Industrial & Commercial Fabrication",
    description: "Heavy-duty fabrication for industries and commercial spaces. Our services include industrial sheds, roofing and parking sheds, structural steel work, commercial shutters, storage racks, platforms, and all custom MS/SS components required for machinery and infrastructure."
  },
  {
    icon: Layers,
    title: "Custom Metal Structures & Special Fabrication",
    description: "Tailor-made MS & SS structures for unique requirements. From canopy frames, kata-tar fencing, and special racks to decorative installations, gazebo frames, and all custom-designed metal fabrication—crafted with precision and high-quality workmanship."
  }
];

const portfolioItems = [
  { image: gateImage, title: "Custom Metal Gate", category: "Architectural" },
  { image: structuralImage, title: "Structural Steel Beams", category: "Industrial" },
  { image: railingImage, title: "Ornamental Railings", category: "Architectural" },
  { image: componentsImage, title: "Industrial Components", category: "Manufacturing" },
  { image: canopyImage, title: "Decorative Canopy", category: "Architectural" },
  { image: laserImage, title: "Precision Laser Cutting", category: "Manufacturing" },
  { image: furnitureImage, title: "Custom Furniture", category: "Specialty" },
  { image: facadeImage, title: "Metal Facade Panels", category: "Architectural" },
  { image: rackImage, title: "Rack", category: "Specialty" },
  { image: gazeboImage, title: "Gazebo", category: "Architectural" },
  { image: parkingShedImage, title: "Parking Shed", category: "Specialty" },
  { image: shutterImage, title: "Shutter", category: "Manufacturing" },
];

const testimonials = [
  {
    name: "Rajesh Patel",
    company: "Patel Industries Ltd.",
    quote: "Outstanding craftsmanship and attention to detail. Their structural steel work transformed our facility. Highly professional team that delivers on time.",
    rating: 5
  },
  {
    name: "Priya Desai",
    company: "Desai Constructions",
    quote: "We've partnered with them for over 5 years. Consistently excellent quality and innovative solutions. They're our go-to fabrication experts.",
    rating: 5
  },
  {
    name: "Amit Shah",
    company: "Shah Enterprises",
    quote: "Precision and quality at its finest. The custom metalwork exceeded our expectations. Their expertise in complex projects is unmatched.",
    rating: 5
  },
  {
    name: "Meera Sharma",
    company: "Sharma Architects",
    quote: "Beautiful architectural metalwork that brings our designs to life. Professional, reliable, and creative problem solvers.",
    rating: 5
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Header brand block — responsive and keeps full name */}
            <div className="flex items-center gap-3 min-w-0">
              {/* logo container (won't grow/shrink and won't push text) */}
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-primary flex items-center justify-center overflow-hidden">
                <img
                  src={skfManLogoImage}
                  alt="Shree Krishna Fabrication logo"
                  className="w-8 h-8 text-primary-foreground"
                />
              </div>

              {/* text area — allow wrapping on small screens (no truncate) */}
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl font-display font-bold tracking-tight leading-tight">
                  SHREE KRISHNA FABRICATION
                </h1>
                <p className="text-xs text-muted-foreground font-accent">Premium Fabrication</p>
              </div>
            </div>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                data-testid="link-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                data-testid="link-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                data-testid="link-portfolio"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("clients")}
                className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                data-testid="link-portfolio"
              >
                Clients
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                data-testid="link-testimonials"
              >
                Testimonials
              </button>
              <ThemeToggle />
              <Button
                onClick={() => scrollToSection("contact")}
                size="default"
                data-testid="button-contact-header"
              >
                Get Quote
              </Button>
            </nav>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col gap-2 p-6">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left px-4 py-3 hover-elevate active-elevate-2 rounded-md"
                data-testid="mobile-link-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left px-4 py-3 hover-elevate active-elevate-2 rounded-md"
                data-testid="mobile-link-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-left px-4 py-3 hover-elevate active-elevate-2 rounded-md"
                data-testid="mobile-link-portfolio"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("clients")}
                className="text-left px-4 py-3 hover-elevate active-elevate-2 rounded-md"
                data-testid="mobile-link-portfolio"
              >
                Clients
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left px-4 py-3 hover-elevate active-elevate-2 rounded-md"
                data-testid="mobile-link-testimonials"
              >
                Testimonials
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="mt-2"
                data-testid="mobile-button-contact"
              >
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern fabrication workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-accent tracking-wide text-primary">15+ Years of Excellence</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-tight">
            The Best Metal Fabrication{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              in Surat
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your vision into reality with expert craftsmanship, cutting-edge technology, and unwavering commitment to quality. From custom metalwork to industrial-scale projects.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="text-base px-8"
              data-testid="button-hero-cta"
            >
              Start Your Project
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("portfolio")}
              className="text-base px-8 backdrop-blur-sm bg-background/20"
              data-testid="button-hero-secondary"
            >
              View Our Work
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="font-accent">Trusted by 500+ businesses across Gujarat</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-3">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-sm font-accent tracking-wide text-primary uppercase">About Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
                Crafting Metal Excellence Since 2010
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Based in Surat, Gujarat, we are a trusted MS & SS fabrication company specializing in custom metalwork for residential, commercial, and industrial needs. From designer grills and gates to roofing sheds, balcony railings, shutters, racks, gazebos, and structural metal installations, we deliver craftsmanship you can rely on.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed mb-12">
                Our facility combines skilled workmanship with modern tools to ensure superior finishing, long-lasting durability, and precision across every project. Whether it’s intricate architectural fabrication or large industrial sheds, our experienced fabricators bring unmatched expertise and attention to detail.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed mb-12">
                We are committed to delivering quality that exceeds expectations — on time, within budget, and built to last.
              </p>

              <div className="grid sm:grid-cols-3 gap-8">
                <div className="text-center sm:text-left" data-testid="stat-projects">
                  <div className="text-4xl font-display font-bold text-primary mb-2" data-testid="stat-projects-value">500+</div>
                  <div className="text-sm text-muted-foreground font-accent uppercase tracking-wide">Projects Completed</div>
                </div>
                <div className="text-center sm:text-left" data-testid="stat-experience">
                  <div className="text-4xl font-display font-bold text-primary mb-2" data-testid="stat-experience-value">15+</div>
                  <div className="text-sm text-muted-foreground font-accent uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="text-center sm:text-left" data-testid="stat-satisfaction">
                  <div className="text-4xl font-display font-bold text-primary mb-2" data-testid="stat-satisfaction-value">98%</div>
                  <div className="text-sm text-muted-foreground font-accent uppercase tracking-wide">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                <div className="relative overflow-hidden rounded-md aspect-[3/4]">
                  <img
                    src={craftsmanImage}
                    alt="Skilled craftsman welding"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative overflow-hidden rounded-md aspect-[3/4]">
                  <img
                    src={gateImage}
                    alt="Custom metal gate installation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-accent tracking-wide text-primary uppercase">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              Comprehensive Fabrication Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From concept to completion, we provide complete metal fabrication services using modern technology and skilled craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                //             <div className="bg-card border border-border/60 rounded-2xl p-6 
                //  hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

                className="p-8 hover-elevate active-elevate-2 transition-all duration-300 border-card-border hover:-translate-y-1"
                data-testid={`card-service-${index}`}
              >
                <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center text-primary font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md -ml-3"
                  data-testid={`button-learn-more-${index}`}
                >
                  Learn More
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-us"
        className="py-20 md:py-32 border-t border-border"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs md:text-sm font-accent tracking-[0.25em] text-primary uppercase">
                Why Choose Us
              </span>
            </div>
          </div>

          {/* heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-6 text-center">
            Built for Reliability & Long-Term Use
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-center mb-10">
            We combine experience, engineering sense, and attention to detail to deliver
            MS &amp; SS fabrication that performs in real-world conditions&mdash;not just on paper.
          </p>

          {/* cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* <div className="bg-card border border-border/60 rounded-2xl p-6 hover-elevate transition"> */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">
              {/* "w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-6 */}
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Clock /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                On-Time Delivery
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Clear timelines, realistic commitments, and disciplined execution so your
                site work, installation, and handover stay on schedule.
              </p>
            </div>

            {/* <div className="bg-card border border-border/60 rounded-2xl p-6 hover-elevate transition"> */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Ruler /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Custom Design Support
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From site measurements to final drawings, we help you shape grills, gates,
                sheds, and railings exactly to your design and space requirements.
              </p>
            </div>

            {/* <div className="bg-card border border-border/60 rounded-2xl p-6 hover-elevate transition"> */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Box /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Heavy-Duty MS &amp; SS Materials
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We work with strong sections, proper thickness, and quality hardware so
                your fabrication stands up to weather, usage, and time.
              </p>
            </div>

            {/* <div className="bg-card border border-border/60 rounded-2xl p-6 hover-elevate transition"> */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><UserCog /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Experienced Fabrication Team
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                15+ years of hands-on fabrication and installation experience&mdash;from
                small residential jobs to large industrial and commercial projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="industries"
        className="py-20 md:py-32 border-t border-border"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs md:text-sm font-accent tracking-[0.25em] text-primary uppercase">
                Industries We Serve
              </span>
            </div>
          </div>

          {/* heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-6 text-center">
            Fabrication for Every Space
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-center mb-10">
            From homes and showrooms to factories and institutions, we design and install
            metal work that matches the use-case, safety needs, and aesthetics of each site.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* <div className="bg-card border border-border/60 rounded-2xl p-6"> */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Building /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Residential &amp; Housing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Main gates, grills, balcony railings, windows, stair railings, gazebos,
                sheds, and custom home metal furniture for independent homes and apartments.
              </p>
            </div>

            {/* <div className="bg-card border border-border/60 rounded-2xl p-6">
             */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Store /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Commercial &amp; Showrooms
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Shutters, façades, display grills, racks, security gates, and parking sheds
                for shops, showrooms, offices, and commercial complexes.
              </p>
            </div>

            {/* <div className="bg-card border border-border/60 rounded-2xl p-6">
             */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Factory /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Industrial &amp; Warehouses
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Industrial sheds, trusses, heavy gates, fencing, platforms, safety railings,
                and storage racks for factories and godowns.
              </p>
            </div>

            {/* <div className="bg-card border border-border/60 rounded-2xl p-6"> */}
            <div className="bg-card border border-border/60 rounded-2xl p-6 
     hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">

              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-lg text-primary"><Landmark /></span>
              </div>
              <h3 className="font-display font-semibold mb-2 text-lg">
                Institutional Projects
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fabrication for schools, colleges, hospitals, and public spaces&mdash;gates,
                fencing, sheds, railings, and functional metal structures.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-accent tracking-wide text-primary uppercase">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              Our Latest Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our diverse portfolio showcasing precision, innovation, and craftsmanship across various industries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-md aspect-square hover-elevate active-elevate-2 cursor-pointer"
                onClick={() => setLightboxImage(item.image)}
                data-testid={`portfolio-item-${index}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-accent uppercase tracking-wide mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-xl font-display font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Section */}
      <section className="pt-16 md:pt-32 border-t border-border" id="clients">
        <div className="max-w-7xl mx-auto px-6">
          {/* badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <span className="text-xs md:text-sm font-accent tracking-[0.25em] text-primary uppercase">
                Our Clients
              </span>
            </div>
          </div>

          {/* heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-8 text-center">
            Trusted by Leading Businesses
          </h2>

          <div className="bg-card rounded-2xl py-10 md:py-14 relative overflow-hidden">
            {/* MOBILE: vertical scroll */}
            <div className="block md:hidden h-64 overflow-hidden">
              <div className="flex flex-col items-center gap-6 animate-verticalMarquee">
                {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((i, idx) => (
                  <img
                    key={`m-${idx}`}
                    src={`/clients/client${i}.png`}
                    alt={`Client ${i}`}
                    className="h-8 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition"
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP: horizontal marquee */}
            <div className="hidden md:block">
              {/* gradient fades only on desktop */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />

              <div className="flex items-center gap-12 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
                {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((i, idx) => (
                  <img
                    key={`d-${idx}`}
                    src={`/clients/client${i}.png`}
                    alt={`Client ${i}`}
                    className="h-10 md:h-12 lg:h-14 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-accent tracking-wide text-primary uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our valued clients have to say about working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border-card-border"
                data-testid={`testimonial-${index}`}
              >
                <div className="flex gap-1 mb-6" data-testid={`testimonial-rating-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 italic" data-testid={`testimonial-quote-${index}`}>"{testimonial.quote}"</p>
                <div>
                  <div className="font-display font-semibold text-lg" data-testid={`testimonial-name-${index}`}>{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground font-accent" data-testid={`testimonial-company-${index}`}>{testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="py-20 md:py-32 border-t border-border"
      >
        <div className="max-w-3xl mx-auto px-6">
          {/* badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs md:text-sm font-accent tracking-[0.25em] text-primary uppercase">
                FAQ
              </span>
            </div>
          </div>

          {/* heading */}
          <h2 className="text-2xl md:text-4xl font-display font-semibold tracking-tight mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-muted-foreground text-center mb-8">
            A few common questions clients ask us before starting their fabrication work.
          </p>

          <div className="space-y-4">
            <details className="group bg-card border border-border/60 rounded-2xl p-4 md:p-5 hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm md:text-base">
                    Do you provide only labour, or material + labour both?
                  </span>
                </div>

                {/* right arrow: rotates when open */}
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                We work in both ways. We can execute on a labour-only basis if you are
                providing material, or we can handle complete fabrication with material
                + labour included. We&apos;ll suggest the best option based on your project.
              </p>
            </details>

            <details className="group bg-card border border-border/60 rounded-2xl p-4 md:p-5 hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm md:text-base">
                    Do you work only in Surat, or outside Surat also?
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Most of our projects are in Surat and nearby areas, but for suitable
                projects we can also take up work in surrounding cities. Share your
                site location and we&apos;ll confirm feasibility.
              </p>
            </details>

            <details className="group bg-card border border-border/60 rounded-2xl p-4 md:p-5 hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm md:text-base">
                    How do I get a quotation for my work?
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                You can call us, WhatsApp us, or fill the contact form on this website.
                Share basic details like site location, type of work (grill, gate, shed,
                railing etc.), approximate sizes, and any reference photos. We&apos;ll guide
                you and provide an estimate.
              </p>
            </details>

            <details className="group bg-card border border-border/60 rounded-2xl p-4 md:p-5 hover-elevate active-elevate-2 transition duration-300 hover:-translate-y-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm md:text-base">
                    Do you handle installation also?
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Yes, we handle complete installation of our fabrication work&mdash;including
                fitting, alignment, welding on site where required, and final finishing.
              </p>
            </details>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-accent tracking-wide text-primary uppercase">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight mb-6">
              Let's Build Something Great
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to start your project? Get in touch with our team for a free consultation and quote.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Krishna Tiwari"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="krishna@example.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+91 9327120122"
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="custom-fabrication">Custom Fabrication</SelectItem>
                            <SelectItem value="structural-steel">Structural Steel</SelectItem>
                            <SelectItem value="precision-manufacturing">Precision Manufacturing</SelectItem>
                            <SelectItem value="architectural-metalwork">Architectural Metalwork</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-32"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4" data-testid="contact-phone">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground" data-testid="phone-1">+91 261 227 0122</p>
                    <p className="text-muted-foreground" data-testid="phone-2">+91 93271 20122</p>
                    <p className="text-muted-foreground" data-testid="phone-2">+91 94271 20122</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-email">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground" data-testid="email-1">skf.6716@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-address">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">Address</h3>
                    <p className="text-muted-foreground" data-testid="address-line-1">2 J.P.Chambers B/s Khatri Nagar,</p>
                    <p className="text-muted-foreground" data-testid="address-line-2">Near Udhna Railway Station,</p>
                    <p className="text-muted-foreground" data-testid="address-line-2">Road no.0, Udhna Udhyog Nagar, Udhna,</p>
                    <p className="text-muted-foreground" data-testid="address-line-3"> Surat, Gujarat, India - 394210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-hours">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-muted-foreground" data-testid="hours-weekday">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-muted-foreground" data-testid="hours-sunday">Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-md overflow-hidden border border-border aspect-video" data-testid="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.6912504990846!2d72.84959947503532!3d21.1646819805189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fb25d2f724b%3A0x4e51f7a2f6924ca2!2sShree%20Krishna%20Fabrication!5e0!3m2!1sen!2sin!4v1763734144977!5m2!1sen!2sin"                  // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59334.77094857894!2d72.78954824863281!3d21.11433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be054c70c4a2fd7%3A0x1c1c1c1c1c1c1c1c!2sSachin%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SHREE KRISHNA FABRICATION Location"
                  data-testid="map-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* GRID */}
          <div className="grid md:grid-cols-9 gap-12 mb-12 items-start text-center md:text-left">

            {/* KRISHNA + SKF LOGO */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              {/* SKF Logo */}
              <img
                src={skfLogoImage}
                alt="SKF logo"
                className="h-[200px] dark:hidden mx-auto md:mx-0"
              />
              <img
                src={skfLogoImage2}
                alt="SKF logo dark"
                className="h-[200px] hidden dark:block mx-auto md:mx-0"
              />

              {/* Jay Shree Krishna */}
              <img
                src={jayShreeKrishnaImage}
                alt="Jay Shree Krishna"
                className="w-32 mt-3 dark:hidden mx-auto md:mx-0"
              />
              <img
                src={jayShreeKrishnaImage2}
                alt="Jay Shree Krishna dark"
                className="w-32 mt-3 hidden dark:block mx-auto md:mx-0"
              />
            </div>

            {/* COMPANY INFO */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                  <img
                    src={skfManLogoImage}
                    alt="SKF man logo"
                    className="w-8 h-8 text-primary-foreground"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold whitespace-nowrap">
                    SHREE KRISHNA FABRICATION
                  </h3>
                  <p className="text-xs text-muted-foreground font-accent">
                    Premium Fabrication
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Leading metal fabrication specialist in Surat, delivering precision engineering
                and craftsmanship for over one decade.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
              <nav className="space-y-3">
                <button onClick={() => scrollToSection('about')} className="block text-muted-foreground hover:text-foreground transition text-sm">
                  About Us
                </button>
                <button onClick={() => scrollToSection('services')} className="block text-muted-foreground hover:text-foreground transition text-sm">
                  Our Services
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="block text-muted-foreground hover:text-foreground transition text-sm">
                  Portfolio
                </button>
                <button onClick={() => scrollToSection('clients')} className="block text-muted-foreground hover:text-foreground transition text-sm">
                  Our Clients
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-muted-foreground hover:text-foreground transition text-sm">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection('contact')} className="block text-muted-foreground hover:text-foreground transition text-sm">
                  Contact Us
                </button>
              </nav>
            </div>

            {/* SOCIAL */}
            <div className="md:col-span-2 flex flex-col items-center md:items-start">
              <h4 className="font-display font-semibold text-lg mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} SHREE KRISHNA FABRICATION. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition">Terms of Service</a>
              </div>
            </div>
          </div>

        </div>
      </footer>


      {/* Lightbox */}
      {
        lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
            data-testid="lightbox-overlay"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary hover-elevate active-elevate-2 flex items-center justify-center"
              data-testid="button-close-lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Portfolio item"
              className="max-w-full max-h-full rounded-md"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )
      }
    </div >
  );
}
