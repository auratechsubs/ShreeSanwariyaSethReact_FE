import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/components/Helper/Base_Url";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, MapPin, Calendar , Search  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "../Helper/Loader";
import AsktheExpert from "./AsktheExpert";

function Slider() {
  const [expertQuery, setExpertQuery] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  // ✅ Fetch slider data
  const fetchSlider = async () => {
    const res = await fetch(`${BASE_URL}/slider/`);
    if (!res.ok) throw new Error("Failed to fetch slider data");
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  };

  const {
    data: sliderData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["slider"],
    queryFn: fetchSlider,
    staleTime: 1000 * 60 * 10,
  });

  // ✅ Auto change image every 5 sec
  useEffect(() => {
    if (!sliderData.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData]);



  const currentSlide = sliderData[currentIndex];

//   const handleAskExpert = () => {
//     const message = `*Ask the Expert Query*

// 📍 Destination: ${expertQuery.destination}
// 📅 Date: ${expertQuery.date}
// 💬 Message: ${expertQuery.message}`;

//     const whatsappUrl = `https://wa.me/971123456789?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappUrl, "_blank");

//     toast({
//       title: "Query Sent!",
//       description: "Our expert will contact you shortly on WhatsApp.",
//     });

//     setExpertQuery({ destination: "", date: "", message: "" });
//   };

   if (isLoading) {
    return  <Loader text="Loading slider..."/>
  }

  return (
    <section className="relative h-screen overflow-hidden transition-all duration-1000 ease-in-out">
      {/* Background Image with Fade Animation */}
      {sliderData.map((item, index) => (
        <img
          key={index}
          src={`${BASE_URL}${item.Slider_image1}`}
          alt={`Slider ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Text and Form */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white h-full flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
           {currentSlide?.Slider_topline}
          <br />
          <span className="text-primary">{currentSlide?.Slider_maintext}</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          {currentSlide?.Slider_lastline}
        </p>

        {/* Ask the Expert Form */}
       {/* <Card className="max-w-4xl mx-auto shadow-hover"> 
        <CardContent className="p-6"> 
          <h3 className="text-lg font-bold mb-4 text-center">
             Ask the Expert </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="relative">
                   <MapPin className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                    <Input type="text" placeholder="Destination" value={expertQuery.destination} onChange={(e) => setExpertQuery({ ...expertQuery, destination: e.target.value, }) } className="pl-10" /> </div> 
                    <div className="relative"> 
                      <Calendar className="absolute left-3 top-3 text-muted-foreground w-5 h-5" /> 
                      <Input type="date" className="pl-10" value={expertQuery.date} onChange={(e) => setExpertQuery({ ...expertQuery, date: e.target.value, }) } /> </div>
                       <div> <Textarea placeholder="Your questions..." value={expertQuery.message} onChange={(e) => setExpertQuery({ ...expertQuery, message: e.target.value, }) } className="h-10 resize-none" /> </div> </div> <Button className="gradient-hero w-full mt-4 btn-hover" onClick={handleAskExpert} > <MessageCircle className="w-5 h-5 mr-2" /> Ask the Expert </Button>
                     </CardContent> </Card> */}

                <AsktheExpert/>

    <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-white scale-125 shadow-md"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Slider;
