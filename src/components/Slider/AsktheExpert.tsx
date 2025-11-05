import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BookingModal from '@/components/BookingModal';

function AsktheExpert() {
  const { toast } = useToast();

  const [expertQuery, setExpertQuery] = useState({
    message: "",
    travelDate: "",
  });

  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; pkg: any }>({
    isOpen: false,
    pkg: null ,
  });

  const handleExploreClick = () => {
    // Always open modal (even if fields empty)
    setBookingModal({
      isOpen: true,
      pkg: {
        tour_title: "Plan Your Trip With Our Experts",
      //  currency : "AED",
      //   price: "0",
        prefillData: expertQuery,
      },
    });
  };

  return (
    <>
      <Card className="max-w-3xl mx-auto shadow-hover">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Message Field */}
            <div className="md:col-span-2">
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Any Special Requirement or questions..."
                  value={expertQuery.message}
                  onChange={(e) =>
                    setExpertQuery({ ...expertQuery, message: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date Field */}
            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="date"
                  className="pl-10"
                  value={expertQuery.travelDate}
                  onChange={(e) =>
                    setExpertQuery({ ...expertQuery, travelDate: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Explore Now Button */}
            <Button className="gradient-hero h-11" onClick={handleExploreClick}>
              Explore Now
            </Button>
          </div>
        </CardContent>
        
    <BookingModal
  isOpen={bookingModal.isOpen}
  onClose={() => setBookingModal({ isOpen: false, pkg: null })}
  itemType="service"
  itemName={bookingModal.pkg?.tour_title}
  prefillData={bookingModal.pkg?.prefillData} 
/>

      </Card>

       
    </>
  );
}

export default AsktheExpert;
