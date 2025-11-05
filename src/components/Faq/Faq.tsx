import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import SectionLoader from "../Helper/Section_loader";
import { BASE_URL } from "../Helper/Base_Url";

// Your backend base URL

// ✅ API call function
const fetchFaq = async () => {
  const res = await fetch(`${BASE_URL}/faq/`);
  if (!res.ok) {
    throw new Error("Failed to fetch FAQ data");
  }
  const json = await res.json();
  return json.data; // since your data is inside 'data'
};

function Faq() {
  // ✅ useQuery hook to call API
  const {
    data: faqData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: fetchFaq,
  });

  if (isError) {
    return (
      <section className="py-16 gradient-section text-center">
        <h2 className="text-2xl font-bold text-red-500">
          {(error as Error).message}
        </h2>
      </section>
    );
  }

  // ✅ Success state
  return (
    <section className="py-16 gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {
                isLoading ? (
                     <SectionLoader text="Loading Faq..."/>
                ):(
            faqData.map((faq: any) => (
              <Card key={faq.id} className="shadow-card">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-2">{faq.Qus}</h4>
                  <p className="text-sm text-muted-foreground">{faq.Ans}</p>
                </CardContent>
              </Card>
            ))
            )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
