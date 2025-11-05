import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const  {contactData} = useGlobalContext();
  const phoneNumber = contactData?.whatsapp_link; // UAE number format
  const message = 'Hello! ';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={contactData?.whatsapp_link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero shadow-hover flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 px-4 py-2 bg-card rounded-lg shadow-card text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
