import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

import Slider from '@/components/Slider/Slider';
import City_Section from '@/components/City_section/City_Section';
import TourPackage from '@/components/Tourpackage/TourPackage';
import Testimonials from '@/components/testimonial/Testimonials';
import { BASE_URL } from '@/components/Helper/Base_Url';

const Home = () => {
  


  return (
    <>
      <SEOHead
        description="Your trusted UAE travel partner. Explore 7 Emirates with India's most trusted UAE travel partner. Book Dubai packages, Abu Dhabi tours, desert safaris and more."
        keywords="UAE tours, Dubai packages, Abu Dhabi travel, UAE tourism, India to UAE travel, UAE tour packages"
          canonical={`${BASE_URL}`}
          url={`${BASE_URL}`}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}

         <Slider/>
         
      {/* Cities Section */}
        
        <City_Section/>
      {/* Featured Packages */}


     <TourPackage/>

      {/* Testimonials */}
    <Testimonials/>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Ready to Start Your UAE Journey?</h1>
          <p className="text-xl mb-8 text-white/90">
            Let us plan your perfect UAE vacation with personalized service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Get Free Quote
              </Button>
            </Link>
            <Link to="/packages">
              <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-primary">
                Browse Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
