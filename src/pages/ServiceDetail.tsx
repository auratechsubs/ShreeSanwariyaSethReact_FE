import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingModal from "@/components/BookingModal";
import ContactButtons from "@/components/ContactButtons";
import SEOHead from "@/components/SEOHead";
import SectionLoader from "@/components/Helper/Section_loader";
import { BASE_URL } from "@/components/Helper/Base_Url";

// ✅ helper for dynamic icon
const getIcon = (iconName: string): React.ElementType => {
  if (!iconName) return Icons.ShieldCheck;
  const formatted = iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();
  return (Icons as any)[formatted] || Icons.ShieldCheck;
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // ✅ Fetch data by slug
  const fetchServiceDetail = async () => {
    const res = await fetch(`${BASE_URL}/services/?slug=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch service details");
    const data = await res.json();
    return data.data; // your backend returns { message, data: {...} }
  };

  // ✅ React Query for fetching
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service-detail", slug],
    queryFn: fetchServiceDetail,
    enabled: !!slug,
  });

  if (isLoading) return <SectionLoader text="Loading Service Details..." />;
  if (isError || !service)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load service. Please try again later.
      </p>
    );

  // ✅ Extract backend data safely
  const ServiceIcon = getIcon(service.icon);
  const features = service.ServiceFeatures || [];
  const processSteps = service.ServiceDetailMasters || [];
  const highlights = service.ServiceHighlightMasters || [];

  return (
    <>
      <SEOHead
        title={service.service_title}
        description={service.short_description?.replace(/<[^>]+>/g, "")}
        keywords={`${service.service_title}, UAE services, Dubai ${service.service_title}`}
        canonical={`${BASE_URL}/services/${slug}`}
        url={`${BASE_URL}/services/${slug}`}
     />

      <div className="min-h-screen pt-20 bg-background">
        {/* 🟣 Hero */}
        <section className="gradient-section py-16">
          <div className="container mx-auto px-4">
            <Link
              to="/services"
              className="inline-flex items-center text-foreground mb-6 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <div className="max-w-4xl">
              <div className="w-20 h-20 rounded-full gradient-hero mb-6 flex items-center justify-center">
                <ServiceIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {service.service_title}
              </h1>
              <div
                className="text-xl text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: service.short_description }}
              />
            </div>
          </div>
        </section>

        {/* 🟢 Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* ✅ Features */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Service Features</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((item: any) => (
                      <div key={item.feature_id} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>{item.feature_name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ✅ Process */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                  <div className="space-y-6">
                    {processSteps.map((step: any, index: number) => (
                      <div key={step.detail_id} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div
                            dangerouslySetInnerHTML={{ __html: step.detail_text }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ✅ Highlights (Why Choose Us) */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Why Choose Our Services?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {highlights.map((h: any) => (
                      <div key={h.highlight_id} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold mb-1">
                            {h.service_highlight}
                          </h3>
                          <div
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html: h.service_highlight_description,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ✅ Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-hover">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-center">
                    Get Started Today
                  </h3>

                  <Button
                    className="w-full gradient-hero btn-hover"
                    size="lg"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Request Service
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    or
                  </div>

                  <ContactButtons className="w-full" showLabels />

                  <div className="pt-4 border-t border-border space-y-3 text-sm">
                    <p className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Free consultation</span>
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>No hidden charges</span>
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Expert guidance</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemType="service"
        itemName={service.service_title}
        prefillData={{
            message : `I'm interested in the ${service?.service_title} service.`,
            travelDate: '',
      }}
      />
    </>
  );
};

export default ServiceDetail;
