import { Award, Users, Heart, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-dubai.jpg";
import { BASE_URL } from "@/components/Helper/Base_Url";
import Banner from "@/components/Banner/Banner";
import Whychoose from "@/components/Whychoose/Whychoose";
import SEOHead from "@/components/SEOHead";
import { useGlobalContext } from "@/Contaxt/UseGlobelcontaxt";

const About = () => {
  // ✅ 1️⃣ Fetch Function
  const { getBannerByPage} = useGlobalContext();
  const banners = getBannerByPage("about");

  const fetchAboutData = async () => {
    const res = await fetch(`${BASE_URL}/aboutus/`);
    if (!res.ok) throw new Error("Failed to fetch about data");
    const data = await res.json();
    return data.data[0]; // only one object in your response
  };

  // ✅ 2️⃣ React Query
  const { data: aboutData, isLoading, isError } = useQuery({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
  });

  // ✅ 3️⃣ Loader State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
        <p className="text-muted-foreground">Loading About Info...</p>
      </div>
    );
  }

  if (isError || !aboutData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 font-semibold">Failed to load About Us data.</p>
      </div>
    );
  }

  // ✅ 4️⃣ Destructure dynamic fields
  const {
    title,
    full_description,
    happy_travelers,
    years_experience,
    uae_branches,
    customer_satisfaction,
    mission_title,
    mission_description,
    vision_title,
    vision_description,
    core_values_title,
    short_description,
    value_1_title,
    value_1_description,
    value_2_title,
    value_2_description,
    value_3_title,
    value_3_description,
    value_4_title,
    value_4_description,
  } = aboutData;

  // ✅ 5️⃣ Prepare arrays for reuse
  const values = [
    { icon: Heart, title: value_1_title, description: value_1_description },
    { icon: Shield, title: value_2_title, description: value_2_description },
    { icon: Award, title: value_3_title, description: value_3_description },
    { icon: Users, title: value_4_title, description: value_4_description },
  ];

  const stats = [
    { number: happy_travelers, label: "Happy Travelers" },
    { number: years_experience, label: "Years Experience" },
    { number: uae_branches, label: "UAE Emirates Covered" },
    { number: customer_satisfaction, label: "Customer Satisfaction" },
  ];

  return (
    <>
 <SEOHead
  title="About |"
  description="Discover Shree Sanwariya Seth World Tourism — your trusted partner for unforgettable UAE travel experiences. Learn about our mission, values, and commitment to providing the best tours, hotel bookings, and visa assistance across Dubai, Abu Dhabi, and beyond."
  canonical={`${BASE_URL}/about`}
  url={`${BASE_URL}/about`}
/>
 
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <Banner banners={banners} />
     

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: full_description }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{core_values_title}</h2>
            <div
              className="text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: short_description }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card
                key={value.title}
                className="text-center shadow-card hover:shadow-hover transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{mission_title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mission_description}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{vision_title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {vision_description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Note */}
    <Whychoose/>
    </div>
    </>
  );
};

export default About;
