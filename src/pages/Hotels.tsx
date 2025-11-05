import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPin, Star, Wifi, Utensils, Car, Phone } from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import ContactButtons from '@/components/ContactButtons';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BASE_URL } from '@/components/Helper/Base_Url';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import SectionLoader from '@/components/Helper/Section_loader';
import { getCurrencySymbol } from '@/components/Helper/currencyUtils';
import Banner from '@/components/Banner/Banner';

const fetchHotels = async () => {
  const res = await fetch(`${BASE_URL}/hotel/`);
  if (!res.ok) throw new Error('Failed to fetch hotels');
  const data = await res.json();
  return data.data;
};

const Hotels = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedRating, setSelectedRating] = useState('all');

  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; hotel: any }>({
    isOpen: false,
    hotel: null,
  });
  const { cities, isLoading , contactData , getBannerByPage } = useGlobalContext();
  const banners = getBannerByPage("hotel");
  // const cities = ['all', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah'];
  const allCities = [{ City_id: 0, city_titile: 'All' }, ...cities || []];

  const ratings = ['all', '5', '4', '3' , '2','1'];


  // ✅ React Query hook
  const { data: hotels = [], isLoading: ishotelLoading, isError } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
  });

  const filteredHotels = hotels.filter((hotel: any) => {
    const cityMatch = selectedCity === 'All' || hotel.city?.city_titile === selectedCity;
    const ratingMatch =
      selectedRating === 'all' || hotel.star_rating === parseInt(selectedRating);
    return cityMatch && ratingMatch;
  });

  // ✅ Map amenity name to icon
  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('WiFi')) return <Wifi className="w-4 h-4" />;
    if (amenity.includes('Restaurant') || amenity.includes('Breakfast'))
      return <Utensils className="w-4 h-4" />;
    if (amenity.includes('Parking') || amenity.includes('Transfer'))
      return <Car className="w-4 h-4" />;
    return null;
  };

  return (
    <>
      <SEOHead
        title="Hotels |"
        description="Book the best hotels in UAE. From luxury resorts to budget stays across Dubai, Abu Dhabi, and more."
        canonical={`${BASE_URL}/hotels`}
        url={`${BASE_URL}/hotels`}
      />
      <div className="min-h-screen pt-20 bg-background">
        <Banner banners={banners}/>
        {/* Hero Section */}
        <section className="gradient-section py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                UAE Hotels & Accommodations
              </h1>
              <p className="text-xl text-muted-foreground">
                From luxury resorts to budget-friendly stays across UAE
              </p>
            </div>

            {/* Filters */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-center">Filter by City</h3>

                {isLoading ? (
                  <SectionLoader text="City loading..." />
                ) : (
                  <div className="flex flex-wrap justify-center gap-3">
                    {allCities.map((city) => (
                      <Button
                        key={city.City_id}
                        variant={selectedCity === city.city_titile ? 'default' : 'outline'}
                        onClick={() => setSelectedCity(city.city_titile)}
                        className={`${selectedCity === city.city_titile ? 'gradient-hero' : ''}`}
                      >
                        {city.city_titile}
                      </Button>
                    ))}
                  </div>
                )}
              </div>


              <div>
                <h3 className="text-sm font-semibold mb-3 text-center">Filter by Rating</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {ratings.map((rating) => (
                    <Button
                      key={rating}
                      variant={selectedRating === rating ? 'default' : 'outline'}
                      onClick={() => setSelectedRating(rating)}
                      className={selectedRating === rating ? 'gradient-hero' : ''}
                    >
                      {rating === 'all' ? 'All Ratings' : `${rating} Star`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* {ishotelLoading && (
              <SectionLoader text="hotel Loading.." />
            )} */}
            {/* {isError && (
              <p className="text-center text-red-500 text-lg">
                Failed to load hotels. Please try again.
              </p>
            )} */}

              {ishotelLoading  ? (
                <SectionLoader text='hotel Loading...'/>
              ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {

    
                filteredHotels.map((hotel: any) => (
                  <Card
                    key={hotel.hotel_id}
                    className="overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`${BASE_URL}${hotel.thumbnail}`}
                        alt={hotel.hotel_title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-foreground font-semibold">
                          {'⭐'.repeat(hotel.star_rating)} {hotel.star_rating}-Star
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                        {getCurrencySymbol(hotel?.currency)}{hotel.price}
                          /{hotel?.on_basis}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{hotel.address}</span>
                        </div>
                        <Badge variant="secondary">{hotel.city?.city_titile}</Badge>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{hotel.hotel_title}</h3>

                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex">
                          {[...Array(hotel.star_rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({hotel.total_reviews} reviews)
                        </span>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-sm mb-3">Amenities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.HotelAmenitys?.map((amenity: any) => (
                            <Badge
                              key={amenity.amenity_id}
                              variant="secondary"
                              className="flex items-center gap-2"
                            >
                              {getAmenityIcon(amenity.name)}
                              <span>{amenity.name}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Link to={`/hotels/${hotel.slug}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            className="flex-1 gradient-hero btn-hover"
                            onClick={() =>
                              setBookingModal({ isOpen: true, hotel:{
                                ...hotel,
                                prefillData: {
                                message: `I'm interested in the ${hotel.hotel_title} hotel.`,
                                travelDate: '',
                              },
                              } 
                            })
                            }
                          >
                            Book Now
                          </Button>
                        </div>
                    <ContactButtons className="mt-2" callLink={contactData?.call_link_1}  whatsappLink={contactData?.whatsapp_link}/>
                      </div>
                    </CardContent>
                  </Card>
          

                ))

                 }
                   </div>
              )
              }

            {!ishotelLoading && filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No hotels found matching your filters. Please try different options.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {bookingModal.hotel && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false, hotel: null })}
          itemType="hotel"
          itemName={bookingModal.hotel.hotel_title}
          itemPrice={bookingModal.hotel.price}
           prefillData={bookingModal.hotel?.prefillData}

        />
      )}
    </>
  );
};

export default Hotels;
