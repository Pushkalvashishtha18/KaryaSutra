import React from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import ProjectSection from "../components/ProjectSection.jsx";
import ClientSection from "../components/ClientSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import ContactForm from "../components/ContactForm.jsx";
import NewsletterBox from "../components/NewsletterBox.jsx";
import CtaSection from "../components/CtaSection.jsx";

const Home = () => (
  <div className="min-h-screen bg-slate-50">
    <Header />
    <Hero />
    <ProjectSection />
    <ClientSection />
    <AboutSection />
    <CtaSection />
    <ContactForm />
    <NewsletterBox />
  </div>
);

export default Home;

