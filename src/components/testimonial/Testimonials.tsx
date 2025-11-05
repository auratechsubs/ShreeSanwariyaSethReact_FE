import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../Helper/Base_Url';
import SectionLoader from '../Helper/Section_loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Testimonials() {
  // ✅ Fetch Testimonials
  const fetchTestimonials = async () => {
    const response = await fetch(`${BASE_URL}/testimonial/`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    const data = await response.json();
    return data.data;
  };

  const { data: testimonials = [], isLoading, isError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  if (isError)
    return (
      <section className="py-20 text-center">
        <p className="text-lg text-red-500">Failed to load testimonials 😢</p>
      </section>
    );

  // ✅ Custom Arrows
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

  // ✅ Slick Slider Settings
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
    <section className="py-20 gradient-section relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">What Our Travelers Say</h1>
          <p className="text-lg text-muted-foreground">
            Trusted by thousands of happy Indian travelers
          </p>
        </motion.div>

        {/* Loader */}
        {isLoading ? (
          <SectionLoader />
        ) : (
          <Slider {...settings}>
            {testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={testimonial.testimonial_id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="px-3"
              >
                <Card className="shadow-lg border border-gray-200/70 rounded-2xl bg-white/90 backdrop-blur-md hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Message */}
                    <p className="text-muted-foreground mb-4 italic leading-relaxed">
                      “{testimonial.message.replace(/^"|"$/g, '')}”
                    </p>

                    {/* Name & City */}
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
