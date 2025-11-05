import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Star, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingModal from '@/components/BookingModal';
import ContactButtons from '@/components/ContactButtons';
import SEOHead from '@/components/SEOHead';
import heroImage from '@/assets/hero-dubai.jpg';
import abuDhabiImg from '@/assets/abu-dhabi.jpg';
import desertSafariImg from '@/assets/desert-safari.jpg';
import { BASE_URL } from '@/components/Helper/Base_Url';
import SectionLoader from '@/components/Helper/Section_loader';
import { getCurrencySymbol } from '@/components/Helper/currencyUtils';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';

const PackageDetail = () => {
  const { slug } = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const {contactData} = useGlobalContext();
  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tour/?slug=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch tour details");

        const data = await res.json();
        setPkg(data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchTour();
  }, [slug]);


  // Mock data - in real app, fetch from API
  // const packages: Record<string, any> = {
  //   '1': {
  //     title: 'Dubai Ultimate Luxury Experience',
  //     city: 'Dubai',
  //     image: heroImage,
  //     price: '₹45,999',
  //     duration: '5 Days / 4 Nights',
  //     rating: 4.9,
  //     reviews: 248,
  //     highlights: ['Burj Khalifa At The Top', 'Desert Safari with BBQ', 'Dubai Marina Cruise', 'Dubai Mall Shopping'],
  //     includes: ['4-Star Hotel', 'Daily Breakfast', 'Airport Transfer', 'City Tours', 'Entry Tickets'],
  //     itinerary: [
  //       { day: 1, title: 'Arrival & Dubai Marina', description: 'Airport pickup, hotel check-in, evening Dubai Marina cruise with dinner' },
  //       { day: 2, title: 'Dubai City Tour', description: 'Visit Burj Khalifa, Dubai Mall, Dubai Fountain, and traditional souks' },
  //       { day: 3, title: 'Desert Safari Adventure', description: 'Dune bashing, camel riding, BBQ dinner with cultural show' },
  //       { day: 4, title: 'Theme Park or Beach Day', description: 'Optional visit to IMG Worlds or relax at JBR Beach' },
  //       { day: 5, title: 'Departure', description: 'Check-out and airport transfer' },
  //     ],
  //     exclusions: ['International flights', 'Personal expenses', 'Optional activities', 'Travel insurance'],
  //   },
  // };

  // const pkg = packages[slug || '1'] || packages['1'];

  if (loading) {
    return <SectionLoader text="Loading tour details..." />;
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Tour not found.</p>
      </div>
    );
  }


  return (
    <>
      <SEOHead
        title={pkg?.tour_title}
        description={`Book ${pkg?.tour_title} - ${pkg?.duration}. Best prices guaranteed.`}
        keywords={`${pkg.city?.city_titile} tour, ${pkg?.tour_title}, UAE packages, ${pkg.city?.city_titile}`}
         canonical={`${BASE_URL}/packages/${pkg.slug}`}
        url={`${BASE_URL}/packages/${pkg.slug}`}
      />

      <div className="min-h-screen pt-20 bg-background">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <img src={`${BASE_URL}${pkg.banner_img}`} alt={pkg?.tour_title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
            <Link to="/packages" className="inline-flex items-center text-white mb-4 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Link>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-primary">{pkg.city?.city_titile}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{pkg?.tour_title}</h1>
                <div className="flex items-center gap-4 text-white">
                  {/* <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{pkg.rating}</span>
                    <span className="ml-1">({pkg.reviews} reviews)</span>
                  </div> */}
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {pkg.duration}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                {
                  pkg?.price && (
                <p className="text-2xl font-bold text-primary">
                  {getCurrencySymbol(pkg?.currency)} {pkg?.price}
                </p>

                  )
                }
                
                <p className="text-xs text-muted-foreground">
                  {pkg?.on_basis}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Package Highlights */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Package Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pkg?.specifications?.map((highlight: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{highlight?.specification_name}</span>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-6">
                    {pkg.itineraries.map((day: any , index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-bold">
                            {day?.day_number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{day?.day_heading}</h3>
                          <p className="text-muted-foreground">{day?.day_detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-green-600">✓ Included</h3>
                      <ul className="space-y-2">
                        {pkg.included_facilities.map((item: any , index : number) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            {item?.facility_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4 text-red-600">✗ Excluded</h3>
                      <ul className="space-y-2">
                        {pkg.excluded_facilities.map((item: any , index : number) => (
                          <li key={item} className="flex items-start text-sm text-muted-foreground">
                            <span className="mr-2">•</span>
                            {item?.facility_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-hover">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center pb-4 border-b border-border">
                    <p className="text-3xl font-bold text-primary mb-1">{getCurrencySymbol(pkg?.currency)} {pkg?.price}
             </p>
                    <p className="text-sm text-muted-foreground">{pkg?.on_basis}</p>
                  </div>

                  <Button
                    className="w-full gradient-hero btn-hover"
                    size="lg"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Book Now
                  </Button>

                  <ContactButtons className="w-full" showLabels callLink={contactData?.call_link_1}  whatsappLink={contactData?.whatsapp_link} />

                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>Best Price Guarantee</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>Flexible Cancellation</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>Instant Confirmation</span>
                    </div>
                       {/* {
                        pkg?.specifications.map((highlight:any , index:number)=>(
                          <>                      
                    <div className="flex items-center text-sm" key={index}>
                          <CheckCircle className="w-4 h-4 text-primary mr-2" />
                          <span>{highlight?.specification_name}</span>
                    </div>
                          </>
                        ))
                      } */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemType="package"
        itemName={pkg.tour_title}
        itemPrice= {`${getCurrencySymbol(pkg?.currency)} ${pkg?.price} `}
      />
    </>
  );
};

export default PackageDetail;
