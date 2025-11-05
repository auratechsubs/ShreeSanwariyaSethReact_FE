import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/components/Helper/Base_Url";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "../Helper/Loader";
import { useGlobalContext } from "@/Contaxt/UseGlobelcontaxt";
import {Link} from "react-router-dom"
import SectionLoader from "../Helper/Section_loader";
function City_Section() {
  
const {isLoading , cities} = useGlobalContext();

  if (isLoading) return <SectionLoader text="Loading Cities..." />;

  return (
    <section className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* <h2 className="text-4xl font-bold mb-4">Explore 7 UAE Emirates</h2> */}
          <h1 className="text-4xl font-bold mb-4">Explore 7 UAE Emirates</h1>
          <p className="text-lg text-muted-foreground">
            Discover the beauty and diversity of the United Arab Emirates
          </p>
        </div>

        {/* ✅ Dynamic Grid from API */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities?.map((city , index) => (
            <> 
            <Card
              key={city.City_id}
              className="group overflow-hidden hover:shadow-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
           <Link to={`/citydetail/${city?.slug}`}>        
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`${BASE_URL}${city.thumb_img}`}
                  alt={city.city_titile}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{city.city_titile}</h3>
                  {/* <p
                    className="text-sm text-white/80"
                    dangerouslySetInnerHTML={{ __html: city.city_description_1 }}
                  /> */}
                  <p className="text-sm text-white/80">{city?.city_sort_description}</p>
                </div>
              </div>
               </Link>  
            </Card>
              </>
          ))}
        </div>
      </div>
    </section>
  );
}

export default City_Section;
