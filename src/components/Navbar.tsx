import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import BookingModal from './BookingModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
  const {contactData} = useGlobalContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-card' : 'bg-transparent lg:bg-transparent bg-white/95'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Shree Sanwariya Seth World Tourism Company" className="h-14 sm:h-16 md:h-20 lg:h-22 w-auto transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                      ? 'bg-primary text-primary-foreground'
                    // : 'text-foreground hover:bg-secondary'
                 : 'text-foreground hover:bg-warning hover:text-primary transition-all duration-300'                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a href={contactData?.call_link_1} className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-medium">{contactData?.ContactUs_Mobile_Number_1}</span>
            </a>
            <Button className="bg-primary hover:bg-primary/90"  onClick={() => setIsBookingOpen(true)} >Book Now</Button>
          </div>
        <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)} 
        prefillData={{
            message : `I'm interested in the Hotel , package , services`,
            travelDate: '',
      }} 
        // itemType="package"
        // itemName="Dubai Adventure Package"
        // itemPrice="AED 499"
      />
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-foreground hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-4 space-y-3">
              <a href={contactData?.call_link_1} className="flex items-center space-x-2 text-foreground">
                <Phone className="w-5 h-5" />
                <span>{contactData?.ContactUs_Mobile_Number_1}</span>
              </a>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() =>{ setIsBookingOpen(true) , setIsOpen(false)}}>Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
