import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react"; // ✅ Import all Lucide icons dynamically
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SectionLoader from "@/components/Helper/Section_loader";
import { BASE_URL } from "@/components/Helper/Base_Url";
import { useGlobalContext } from "@/Contaxt/UseGlobelcontaxt";
import Banner from "@/components/Banner/Banner";

// ✅ Helper function to safely fetch icon component dynamically
const getIcon = (iconName: string): React.ElementType => {
  if (!iconName) return Icons.ShieldCheck; // fallback if no icon provided

  // Normalize name (e.g., "plane" or "Plane" → "Plane")
  const formatted = iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();

  // Return icon component if exists, else default ShieldCheck
  return (Icons as any)[formatted] || Icons.ShieldCheck;
};

const Services = () => {
  // ✅ Fetch function for backend data
  const {getBannerByPage} = useGlobalContext();
    const banners = getBannerByPage("service");

  const fetchServices = async () => {
    const res = await fetch(`${BASE_URL}/services/`);
    if (!res.ok) throw new Error("Failed to fetch services");
    const data = await res.json();
    return data.data; // backend should return { message, data: [...] }
  };

  // ✅ React Query for fetching services
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load services. Please try again later.
      </p>
    );

  // ✅ Additional static services
  const additionalServices = [
    "Customized tour itineraries",
    "Event & MICE bookings",
    "Travel documentation support",
    "Currency exchange guidance",
    "Local SIM card arrangements",
    "Restaurant reservations",
  ];

  return (
    <>
      <SEOHead
        title="Services |"
        description="Complete travel services for UAE - flight booking, visa assistance, car rentals, hotels, and more."
        canonical={`${BASE_URL}/services`}
        url={`${BASE_URL}/services`}
     />

      <div className="min-h-screen pt-20 bg-background">
        <Banner banners={banners}/>
        {/* 🟣 Hero Section */}
        <section className="gradient-section py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Our Travel Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete travel solutions for your UAE journey - from visa to vehicles, we've got you covered
            </p>
          </div>
        </section>

        {/* 🟢 Dynamic Services Section */}
        <section className="py-16">

          <div className="container mx-auto px-4">
            {
              isLoading ? (<SectionLoader text="Loading Sevices"/> ) : (

             
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => {
                const Icon = getIcon(service.icon);

                const features = [
                  service.service_home_feature_1,
                  service.service_home_feature_2,
                  service.service_home_feature_3,
                  service.service_home_feature_4,
                ].filter(Boolean);

                return (
                  <Card
                    key={service.Service_id}
                    className="shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-full gradient-hero mb-6 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3">
                        {service.service_title}
                      </h3>

                      <p
                        className="text-muted-foreground mb-6"
                        dangerouslySetInnerHTML={{
                          __html: service.short_description || "",
                        }}
                      />

                      <div className="space-y-2 mb-6">
                        {features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link to={`/services/${service.slug}`}>
                        <Button className="w-full gradient-hero btn-hover">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

             )
            }
          </div>

        </section>

        {/* 🔵 Additional Services */}
        <section className="py-16 gradient-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Extra conveniences to make your trip smoother
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <Card key={service} className="shadow-card">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">{service}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 🟣 Why Choose Us Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Services?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-card">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <Icons.ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trusted & Reliable</h3>
                  <p className="text-muted-foreground">
                    8+ years of excellence in UAE travel services
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-card">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <Icons.Headphones className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Round-the-clock assistance in your language
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-card">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <Icons.Hotel className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                  <p className="text-muted-foreground">
                    Competitive rates with no hidden charges
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 🟢 CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Need a Custom Service Package?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Contact our travel experts to create a personalized service package tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Contact Us Now
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Request Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
