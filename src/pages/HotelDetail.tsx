import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Star, Wifi, Utensils, Car, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingModal from '@/components/BookingModal';
import ContactButtons from '@/components/ContactButtons';
import SEOHead from '@/components/SEOHead';
import { BASE_URL } from '@/components/Helper/Base_Url';
import SectionLoader from '@/components/Helper/Section_loader';
import { getCurrencySymbol } from '@/components/Helper/currencyUtils';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';

const fetchHotelBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/hotel/?slug=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch hotel data');
  const data = await res.json();
  return data.data;
};

const HotelDetail = () => {
  const { slug } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const {contactData} = useGlobalContext();

  const {
    data: hotel,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['hotel', slug],
    queryFn: () => fetchHotelBySlug(slug || ''),
    enabled: !!slug, // run only if slug exists
  });

  if (isLoading) {
    return <SectionLoader text="Loading hotel details..." />;
  }

  if (isError || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl text-red-500">Failed to load hotel details. Please try again.</p>
      </div>
    );
  }

  const {
    hotel_title,
    city,
    address,
    star_rating,
    total_reviews,
    price,
    currency,
    on_basis,
    thumbnail,
    banner_image,
    short_description,
    about_hotel,
    HotelHighlights = [],
    HotelAmenitys = [],
    HotelRoomTypes = [],
  } = hotel;

  return (
    <>
      <SEOHead
        title={`${hotel_title} - ${city?.city_titile}`}
        description={`Book ${hotel_title} in ${city?.city_titile}. ${star_rating}-star hotel with luxury amenities. Starting from ${price} ${currency} ${on_basis}.`}
        keywords={`${city?.city_titile} hotels, ${hotel_title}, UAE accommodation, luxury hotels`}
        canonical={`${BASE_URL}/hotels/${slug}`}
        url={`${BASE_URL}/hotels/${slug}`}
      />

      <div className="min-h-screen pt-20 bg-background">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={`${BASE_URL}${banner_image}`}
            alt={hotel_title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
            <Link
              to="/hotels"
              className="inline-flex items-center text-white mb-4 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-white text-foreground">
                  {'⭐'.repeat(star_rating)} {star_rating}-Star
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {hotel_title}
                </h1>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {address}, {city?.city_titile}
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>
                      {star_rating} ({total_reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="text-3xl font-bold text-primary">
                   { getCurrencySymbol(currency)} {price}
                </p>
                <p className="text-xs text-muted-foreground">{on_basis}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
                  <div
                    className="text-muted-foreground mb-6"
                    dangerouslySetInnerHTML={{ __html: short_description }}
                  />
                  <div className="grid md:grid-cols-2 gap-3">
                    {HotelHighlights.map((h: any) => (
                      <div key={h.highlight_id} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5" />
                        <span>{h.highlight_title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Hotel Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {HotelAmenitys.map((amenity: any) => (
                      <div key={amenity.amenity_id} className="flex items-center gap-2">
                        {amenity.icon_class === 'Wifi' && <Wifi className="w-5 h-5 text-primary" />}
                        {amenity.icon_class === 'Utensils' && (
                          <Utensils className="w-5 h-5 text-primary" />
                        )}
                        {amenity.icon_class === 'Car' && <Car className="w-5 h-5 text-primary" />}

                        {!['Wifi', 'Utensils', 'Car'].includes(amenity.icon_class) && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                        <span className="text-sm">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Room Types */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Room Types & Rates</h2>
                  <div className="space-y-4">
                    {HotelRoomTypes.map((room: any) => (
                      <div
                        key={room.room_id}
                        className="border border-border rounded-lg p-4 hover-lift"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg">{room.room_name}</h3>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {getCurrencySymbol(room?.currency)} {room.price}
                            </p>
                            <p className="text-xs text-muted-foreground">{room.on_basis}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.RoomTypefeature?.map((feature: any, i: number) => (
                            <Badge key={i} variant="secondary">
                                 {feature.features}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-hover">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center pb-4 border-b border-border">
                    <p className="text-3xl font-bold text-primary mb-1">
                     { getCurrencySymbol(currency)} {price}

                    </p>
                    <p className="text-sm text-muted-foreground">{on_basis}</p>
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
                      <span>Free Cancellation</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      <span>No Booking Fees</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemType="hotel"
        itemName={hotel_title}
        itemPrice= {`${getCurrencySymbol(currency)} ${price} `}
        prefillData={{
            message : `I'm interested in the ${hotel.hotel_title} hotel.`,
            travelDate: '',
      }}

      />
    </>
  );
};

export default HotelDetail;
