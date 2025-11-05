import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin , Linkedin , Youtube} from 'lucide-react';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import { BASE_URL } from './Helper/Base_Url';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {contactData} = useGlobalContext();
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            {/* <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Loveble Tours</h3>
                <p className="text-xs text-muted-foreground">& Travels</p>
              </div>
            </div> */}
            <div className="flex items-center space-x-2 mb-4">
  {/* ✅ Logo container */}
  <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-md">
    <img
      src={`${BASE_URL}${contactData?.brand_logo}`} 
      alt="Shree Sanwariya Seth World Tourism Company Tours Logo"
      className="w-full h-full object-contain"
    />
  </div>

  {/* ✅ Brand text */}
  <div>
    <h3 className="text-lg font-bold">Shree Sanwariya Seth</h3>
    <p className="text-xs text-muted-foreground"> World Tourism</p>
  </div>
</div>
            <p className="text-sm text-muted-foreground mb-4">
             {contactData?.footer_description}
            </p>

           <div className="flex space-x-3 mt-4 justify-center">
  {contactData?.Facebook && (
    <a
      href={contactData.Facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      <Facebook className="w-4 h-4" />
    </a>
  )}

  {contactData?.Instagram && (
    <a
      href={contactData.Instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      <Instagram className="w-4 h-4" />
    </a>
  )}

  {contactData?.Linkedin && (
    <a
      href={contactData.Linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      <Linkedin className="w-4 h-4" />
    </a>
  )}

  {contactData?.Youtube && (
    <a
      href={contactData.Youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      <Youtube className="w-4 h-4" />
    </a>
  )}
</div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tour Packages</Link></li>
              <li><Link to="/hotels" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hotels</Link></li>
              <li><Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* UAE Cities */}
          <div>
            <h4 className="font-semibold mb-4">UAE Destinations</h4>
            <ul className="space-y-2">
              <li><Link to="/packages?city=dubai" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dubai</Link></li>
              <li><Link to="/packages?city=abudhabi" className="text-sm text-muted-foreground hover:text-primary transition-colors">Abu Dhabi</Link></li>
              <li><Link to="/packages?city=sharjah" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sharjah</Link></li>
              <li><Link to="/packages?city=ajman" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ajman</Link></li>
              <li><Link to="/packages?city=fujairah" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fujairah</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {
                contactData?.ContactUs_Address1 && (

                  <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{contactData?.ContactUs_Address1}</span>
              </li>
              )
            }
            {
              contactData?.ContactUs_Mobile_Number_1 && (

                <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={contactData?.call_link_1} className="text-sm text-muted-foreground hover:text-primary transition-colors">{contactData?.ContactUs_Mobile_Number_1}</a>
              </li>
              )
            }
            {
              contactData?.ContactUs_EMAIL_ID && (

                <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${contactData?.ContactUs_EMAIL_ID}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{contactData?.ContactUs_EMAIL_ID}</a>
              </li>
              )
            }
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear}  Shree Sanwariya Seth All Rights Reserved | Designed & Developed by  <a
  href="https://auratechindia.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary hover:underline"
>
  Auratech India
</a>

          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
