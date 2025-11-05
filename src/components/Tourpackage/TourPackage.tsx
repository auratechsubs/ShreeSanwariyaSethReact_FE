import React ,{useState}from 'react'
import Slider from 'react-slick';
import { MessageCircle, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import { BASE_URL } from '../Helper/Base_Url';
import SectionLoader from '../Helper/Section_loader';
import BookingModal from '../BookingModal';
import ContactButtons from '../ContactButtons';
import { getCurrencySymbol } from '../Helper/currencyUtils';
import {  ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';


function TourPackage() {
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; pkg: any }>({ isOpen: false, pkg: null });
    const {tourData , tourLoading , contactData} = useGlobalContext();

//       const featuredPackages = [
//     {
//       title: 'Dubai Luxury Experience',
//       image: heroImage,
//       price: '₹45,999',
//       duration: '5 Days / 4 Nights',
//       highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall'],
//     },
//     {
//       title: 'Abu Dhabi Grand Tour',
//       image: abuDhabiImg,
//       price: '₹38,999',
//       duration: '4 Days / 3 Nights',
//       highlights: ['Sheikh Zayed Mosque', 'Louvre Museum', 'Ferrari World'],
//     },
//     {
//       title: 'Desert Adventure Package',
//       image: desertSafariImg,
//       price: '₹32,999',
//       duration: '3 Days / 2 Nights',
//       highlights: ['Dune Bashing', 'Camel Ride', 'BBQ Dinner'],
//     },
//   ];
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-primary text-primary hover:text-white rounded-full shadow-lg p-2 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-primary text-primary hover:text-white rounded-full shadow-lg p-2 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    );
  };

 const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div>
        <ul className="mt-8 flex justify-center space-x-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary transition-all duration-300"></div>
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <>
     <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl font-bold mb-4">Featured Tour Packages</h1>
            <p className="text-lg text-muted-foreground">
              Handpicked experiences designed for Indian travelers
            </p>
            </motion.div>
          </div>


    <div className="py-10 relative">
  {tourLoading ? (
    <SectionLoader text="Tour Loading..." />
  ) : tourData && tourData.length > 0 ? (
    <Slider {...settings}>
      {tourData.map((pkg , index) => (
        <div key={pkg.tour_title} className="px-3">
           <motion.div
                          key={ index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="px-3"
                        >
          <Card className="overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-2 rounded-2xl border border-gray-200/60">
            {/* ✅ Image + Price */}
            <div className="relative h-56">
              <img
                src={`${BASE_URL}${pkg.thumb_img}`}
                alt={pkg.tour_title}
                className="w-full h-full object-cover"
              />
              {
                pkg.price && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-md">
                    {getCurrencySymbol( pkg?.currency)}{pkg.price}
              </div>
                )
              }
            </div>

            {/* ✅ Content */}
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{pkg.tour_title}</h3>
              <p className="text-muted-foreground mb-4 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {pkg.duration}
              </p>

              <ul className="space-y-2 mb-6">
                {pkg.specifications?.slice(0, 3).map((highlight) => (
                  <li
                    key={highlight?.specification_name}
                    className="text-sm flex items-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    {highlight?.specification_name}
                  </li>
                ))}
              </ul>

              {/* ✅ Buttons */}
              <div className="flex gap-2">
                <Link to={`/packages/${pkg.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button
                  className="flex-1 gradient-hero btn-hover"
                  onClick={() =>
                    setBookingModal({
                      isOpen: true,
                      pkg: {
                        ...pkg,
                        prefillData: {
                          message: `I'm interested in the ${pkg.tour_title} package.`,
                          travelDate: '',
                        },
                      },
                    })
                  }
                >
                  Book Now
                </Button>
              </div>

              <ContactButtons
                className="mt-3"
                callLink={contactData?.call_link_1}
                whatsappLink={contactData?.whatsapp_link}
              />
            </CardContent>
          </Card>
          </motion.div>
        </div>
      ))}
    </Slider>
  ) : (
    <div className="text-center text-muted-foreground py-10">
      No tours available.
    </div>
  )}
</div>



          <div className="text-center mt-10">
            <Link to="/packages">
              <Button variant="outline" size="lg">
                View All Packages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    

    {bookingModal.pkg && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false, pkg: null })}
          itemType="package"
          itemName={bookingModal.pkg.tour_title}
          itemPrice={`${getCurrencySymbol(bookingModal?.pkg.currency)} ${bookingModal?.pkg.price} `}
          prefillData={bookingModal.pkg?.prefillData}

        />
      )}

    </>
  )
}

export default TourPackage
