import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactButtonsProps {
  className?: string;
  whatsappLink?: string;
  callLink?: string;
  showLabels?: boolean;
}

const ContactButtons = ({ 
  className = '', 
  callLink = '+971123456789',
  whatsappLink = 'https://wa.me/971123456789',
  showLabels = false 
}: ContactButtonsProps) => {

// const handleCall = () => {
//   let link = phoneNumber.startsWith('tel:') ? phoneNumber : `tel:${phoneNumber}`;
//   window.location.href = link;
// };

// const handleWhatsApp = () => {
//   const number = phoneNumber.replace(/[^\d]/g, '');
//   const message = 'Hello! ';
//   window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
// };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={() => window.location.href = callLink}
        variant="outline"
        size={showLabels ? 'default' : 'icon'}
        className="hover-lift"
        title="Call Us"
      >
        <Phone className="w-4 h-4" />
        {showLabels && <span className="ml-2">Call</span>}
      </Button>

      <Button
        onClick={() => window.open(whatsappLink, '_blank')}
        variant="outline"
        size={showLabels ? 'default' : 'icon'}
        className="hover-lift "
          title="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        {showLabels && <span className="ml-2">WhatsApp</span>}
      </Button>
    </div>
  );
};

export default ContactButtons;
