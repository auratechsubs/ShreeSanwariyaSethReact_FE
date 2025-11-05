import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/components/Helper/Base_Url"; // adjust if needed
import SectionLoader from "@/components/Helper/Section_loader";

const Whychoose: React.FC = () => {
  // ✅ Fetch function
  const fetchWhyChoose = async () => {
    const response = await fetch(`${BASE_URL}/whyChooseUs/`);
    if (!response.ok) throw new Error("Failed to fetch Why Choose Us data");
    const data = await response.json();
    return data.data?.[0]; // since your API returns an array with one object
  };

  // ✅ useQuery hook
  const { data, isLoading, isError } = useQuery({
    queryKey: ["whyChooseUs"],
    queryFn: fetchWhyChoose,
  });

  // ✅ Loading and Error states
  if (isError)
    return (
      <section className="py-20 text-center">
        <p className="text-lg text-red-500">
          Failed to load “Why Choose Us” section 😢
        </p>
      </section>
    );

  // ✅ Destructure API data
  const { title, description, features } = data || {};

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        {
          isLoading ? (
            <SectionLoader text="laoding why choose ...."/>
          ):(     
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">{title || "Why Choose Us?"}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {description ||
              "With years of experience, local expertise, and a passion for creating memorable journeys, we're more than just a travel agency — we're your trusted travel companions."}
          </p>

          {/* ✅ Dynamic feature list */}
          <div className="flex flex-wrap justify-center gap-4">
            {features?.length > 0 ? (
              features.map((feature: any) => (
                <div
                  key={feature.id}
                  className="bg-secondary text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:scale-105 transition-transform duration-300"
                >
                  {feature.name}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No features available.</p>
            )}
          </div>
        </div>
        )
        }
      </div>
    </section>
  );
};

export default Whychoose;
