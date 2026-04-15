import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TrustBanner from './components/TrustBanner';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import AppDetails from './components/AppDetails';
import Download from './components/Download';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import AnimatedBackground from './components/AnimatedBackground';
import BackToTop from './components/BackToTop';

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <TrustBanner />
      <Features />
      <HowItWorks />
      <Pricing />
      <AppDetails />
      <Download />
      <AboutUs />
      <ContactUs />
      <Footer />
      <BackToTop />
    </main>
  );
}
