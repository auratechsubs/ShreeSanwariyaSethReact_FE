import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import Loader from '@/components/Helper/Loader';
import SectionLoader from '@/components/Helper/Section_loader';
import Faq from '@/components/Faq/Faq';
import Banner from '@/components/Banner/Banner';
import ContactForm from '@/components/Contactform/ContactForm';
import SEOHead from '@/components/SEOHead';
import { BASE_URL } from '@/components/Helper/Base_Url';

const Contact = () => {
  const {contactData , contactLoading , getBannerByPage} = useGlobalContext()
  
const banners = getBannerByPage("contact");
   const contactInfo = contactData
    ? [
      {
        title: contactData.ContactUs_Address1_head,
        icon: MapPin,
        details: [contactData.ContactUs_Address1],
      },
        {
          title: contactData.ContactUs_mobile_number_header,
          icon: Phone,
          details: [
            contactData.ContactUs_Mobile_Number_1,
            contactData.ContactUs_Mobile_Number_2,
          ],
        },
        {
          title: contactData.ContactUs_Emailid_header,
          icon: Mail,
          details: [contactData.ContactUs_EMAIL_ID],
        },
        {
          title: contactData.Working_Hours_header,
          icon: Mail,
          details: [contactData.Working_Hours_Time],
        },
      ]
    : [];

  return (
    <>
    <SEOHead
  title="Contact | Shree Sanwariya Seth World Tourism"
  description="Get in touch with Shree Sanwariya Seth World Tourism for personalized UAE travel assistance. Contact us for tour bookings, visa support, hotel reservations, and 24/7 customer service."
   canonical={`${BASE_URL}/contact`}
        url={`${BASE_URL}/contact`}
  
/>

    <div className="min-h-screen pt-20 bg-background">

      <Banner banners={banners} />
     
      {
        contactLoading ? (
          <SectionLoader text="Loading Contact data"/>
         ):(


      <section className="gradient-section py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">{contactData?.ContactUs_Name}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {contactData?.ContactUs_description}
          </p>
        </div>
      </section>
    )
 }
      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
  {contactLoading ? (
    <SectionLoader text="Loading Contact data..." height="250px" />
  ) : (
    contactInfo.map((info, index) => (
      <Card
        key={info.title}
        className="shadow-card hover:shadow-hover transition-all duration-300"
      >
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
            <info.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold mb-3">{info.title}</h3>
          {info.details.map((detail, idx) => (
            <p key={idx} className="text-sm text-muted-foreground mb-1">
              {detail}
            </p>
          ))}
        </CardContent>
      </Card>
    ))
  )}
</div>


          {/* Contact Form & Map */}
         <ContactForm/>
        </div>
      </section>
      

      {/* FAQ Section */}
       <Faq/>
      
    </div>
     </>
  );
};

export default Contact;
