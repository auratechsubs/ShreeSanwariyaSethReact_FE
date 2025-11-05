import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingModal from '@/components/BookingModal';
import ContactButtons from '@/components/ContactButtons';
import SEOHead from '@/components/SEOHead';
import heroImage from '@/assets/hero-dubai.jpg';
import abuDhabiImg from '@/assets/abu-dhabi.jpg';
import sharjahImg from '@/assets/sharjah.jpg';
import desertSafariImg from '@/assets/desert-safari.jpg';
import fujairahImg from '@/assets/fujairah.jpg';
import luxuryHotelImg from '@/assets/luxury-hotel.jpg';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import SectionLoader from '@/components/Helper/Section_loader';
import { BASE_URL } from '@/components/Helper/Base_Url';
import { getCurrencySymbol } from '@/components/Helper/currencyUtils';
import Banner from '@/components/Banner/Banner';

const Packages = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; pkg: any }>({ isOpen: false, pkg: null });

  // const cities = ['all', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah'];

  const { isLoading, cities, tourData = [], tourLoading, contactData , getBannerByPage} = useGlobalContext();
  const allCities = [{ City_id: 0, city_titile: 'All' }, ...cities || []];
  const banners = getBannerByPage("package");





  const filteredPackages = selectedCity === 'All'
    ? tourData
    : tourData.filter(pkg => pkg.city?.city_titile === selectedCity);

  return (
    <>
      <SEOHead title="Tour Packages |"
       description="Explore our handpicked UAE tour packages covering all 7 emirates. Best prices, expert guides, and unforgettable experiences."
        canonical={`${BASE_URL}/packages`}
        url={`${BASE_URL}/packages`}
       />
   
      <div className="min-h-screen pt-20 bg-background">

      <Banner banners={banners}/>

        {/* Hero Section */}
        <section className="gradient-section py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">UAE Tour Packages</h1>
              <p className="text-xl text-muted-foreground">
                Carefully curated experiences across all seven emirates
              </p>
            </div>

            {/* City Filter */}
            {/* City Filter */}
            <div className="flex flex-wrap justify-center gap-3 ">
              {
                isLoading ? (
                  <SectionLoader />
                ) : (
                  allCities.map((city) => (
                    <Button
                      key={city.City_id}
                      variant={selectedCity === city.city_titile ? 'default' : 'outline'}
                      onClick={() => setSelectedCity(city.city_titile)}
                      className={`${selectedCity === city.city_titile ? 'gradient-hero' : ''}`}
                    >
                      {city.city_titile}
                    </Button>
                  ))
                )
              }
            </div>

          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">

            {
              tourLoading ? (
                <SectionLoader text="tour package loading" />
              ) : (


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPackages.map((pkg) => (
                    <Card
                      key={pkg.Tour_id}
                      className="overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-2 group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={`${BASE_URL}${pkg.thumb_img}`}
                          alt={pkg.tour_title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-primary-foreground">{pkg?.category}</Badge>
                        </div>
                        {
                          pkg.price && (
                        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full">
                          <span className="font-bold text-primary">{getCurrencySymbol(pkg?.currency)}{pkg.price}</span>
                        </div>

                          )
                        }
                        <div className="absolute bottom-4 left-4 right-4">
                          {/* <div className="flex items-center space-x-2 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{pkg.ratings}</span>
                        <span>({pkg.reviews} reviews)</span>
                      </div> */}
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{pkg?.city?.city_titile}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-3">{pkg.tour_title}</h3>

                        <div className="flex items-center text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{pkg.duration}</span>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-2">Package Highlights:</h4>
                          <ul className="space-y-1">
                            {pkg.specifications.slice(0, 3).map((highlight, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1.5 flex-shrink-0" />
                                {highlight?.specification_name}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-sm mb-2">Includes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {pkg.included_facilities.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item?.facility_name}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link to={`/packages/${pkg.slug}`} className="flex-1">
                            <Button variant="outline" className="w-full">View Details</Button>
                          </Link>
                          <Button className="flex-1 gradient-hero btn-hover" onClick={() => setBookingModal({
                            isOpen: true, pkg: {
                              ...pkg,
                              prefillData: {
                                message: `I'm interested in the ${pkg.tour_title} package.`,
                                travelDate: '',
                              },
                            },
                          })}>
                            Book Now
                          </Button>
                        </div>
                        <ContactButtons className="mt-2" callLink={contactData?.call_link_1} whatsappLink={contactData?.whatsapp_link} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            }
            {filteredPackages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No packages found for the selected city. Please try another filter.
                </p>
              </div>
            )}


          </div>
        </section>

        {/* Custom Package CTA */}
        <section className="py-16 gradient-section">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Package?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Can't find the perfect package? Let us create a personalized itinerary just for you.
                Contact our travel experts to design your dream UAE vacation.
              </p>
              <Button size="lg" className="gradient-hero"  onClick={() =>
    setBookingModal({
      isOpen: true,
      pkg: {
        tour_title: "Custom Package Request",
        price: "",
        currency: "",
        prefillData: {
          message: "I'm interested in creating a custom UAE tour package.",
          travelDate: "",
        },
      },
    })
  } >
                Request Custom Package
              </Button>
            </div>
          </div>
        </section>
      </div>

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
  );
};

export default Packages;
