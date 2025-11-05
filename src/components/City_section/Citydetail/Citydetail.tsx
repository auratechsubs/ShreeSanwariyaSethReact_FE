import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import { BASE_URL } from "@/components/Helper/Base_Url";
import { useParams, Link } from "react-router-dom";
import SectionLoader from "@/components/Helper/Section_loader";
import ContactButtons from "@/components/ContactButtons";

interface City {
  City_id: number;
  thumb_img: string;
  city_titile: string;
  city_description_1: string;
  city_description_2: string;
  city_description_3: string;
  city_description_4: string;
  slug?: string;
}

const Citydetail = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log("slug:", slug);

  // ✅ Fetch function
  const fetchCityDetail = async (): Promise<City | null> => {
    if (!slug) return null;

    const res = await fetch(`${BASE_URL}/city/?slug=${slug}`);
    if (!res.ok) throw new Error("Failed to fetch city detail");

    const data = await res.json();
    console.log("API Response:", data);
     return data
    // if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    //   return data.data[0];
    // } else if (data?.data) {
    //   return data.data;
    // } else if (data?.city) {
    //   return data.city;
    // } else {
    //   return null;
    // }
  };

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<City | null>({
    queryKey: ["city", slug],
    queryFn: fetchCityDetail,
    enabled: !!slug,
  });

  // ✅ Handle loading or error
  if (isLoading) return <SectionLoader text="Loading city details..." />;
  if (error) return <div className="text-center py-20 text-red-500">Error loading city details.</div>;
  if (!post) return <div className="text-center py-20 text-gray-500">City details not found.</div>;

  return (
    <>
      <SEOHead
        title={post.city_titile}
        description={post.city_description_1 || ""}
        canonical={`${BASE_URL}/citydetail/${slug}`}
        url={`${BASE_URL}/citydetail/${slug}`}
      />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={`${BASE_URL}${post.thumb_img || "/img/default.jpg"}`}
          alt={post.city_titile}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-hover mb-8">
            <CardContent className="p-8 md:p-12">
              <Link
                to="/"
                className="inline-flex items-center text-muted-foreground mb-6 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {post.city_titile}
              </h1>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: `
                    ${post.city_description_1 || ""}
                    ${post.city_description_2 || ""}
                    ${post.city_description_3 || ""}
                    ${post.city_description_4 || ""}
                  `,
                }}
              />
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="shadow-hover mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Dubai?</h3>
              <p className="text-muted-foreground mb-6">
                Let our travel experts help you plan the perfect UAE vacation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ContactButtons showLabels />
                <Link to="/packages">
                  <Button className="gradient-hero">Browse Packages</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Citydetail;
