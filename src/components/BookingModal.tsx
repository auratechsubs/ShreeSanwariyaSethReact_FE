import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import ContactButtons from './ContactButtons';
import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt';
import { BASE_URL } from './Helper/Base_Url';

interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  itemType?: 'package' | 'hotel' | 'service';
  itemName?: string;
  itemPrice?: string;
  prefillData?: {
    message?: string;
    travelDate?: string;
  };
}

const BookingModal = ({
  isOpen,
  onClose,
  itemType = 'package',
  itemName = '',
  itemPrice = '',
  prefillData = {},
}: BookingModalProps) => {
  const { toast } = useToast();
  const { contactData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  // Prefill logic
 useEffect(() => {
  if (isOpen) {
    setFormData((prev) => ({
      ...prev,
      date: prefillData?.travelDate || '',
      message: prefillData?.message || '',
    }));
  }
}, [isOpen, prefillData]);

useEffect(() => {
  if (!isOpen) {
    setFormData({ name: '', email: '', phone: '', date: '', message: '' });
  }
}, [isOpen]);

  // Validation
  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return 'Please enter a valid email address.';
    if (!formData.phone.trim() || formData.phone.length < 8)
      return 'Please enter a valid phone number.';
    if (!formData.date) return 'Please select a travel date.';
    return null;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: 'Validation Error',
        description: validationError,
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);

    const payload = {
      ContectUs_name: formData.name,
      ContectUs_email: formData.email,
      ContectUs_cono: formData.phone,
      ContectUs_Destination: itemName || 'Ask The Expert',
      ContectUs_message: formData.message,
      ContectUs_Travel_Date: formData.date || null,
    };
console.log(payload)
    try {
      const response = await fetch(`${BASE_URL}/contactsubmit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log("res",response)
      const data = await response.json();
     console.log(data);
      if (response.ok) {
        toast({
          title: data?.message || 'Inquiry Sent!',
          description: "We'll contact you shortly via WhatsApp and Email.",
          //  variant : 'success',
        });

        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
        onClose?.();
      } else {
        toast({
          title: 'Submission Failed',
          description: data?.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Network Error',
        description: 'Unable to submit your inquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-card rounded-lg shadow-hover max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {itemName ? ` ${itemName}` : 'Book Now'}
            </h2>
            {itemPrice && <p className="text-primary font-semibold">{itemPrice}</p>}
          </div>

          <ContactButtons
            className="mt-2"
            callLink={contactData?.call_link_1}
            whatsappLink={contactData?.whatsapp_link}
          />

          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Phone & Travel Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div>
              <Label htmlFor="date">Travel Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Special Requests (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any special requirements or questions..."
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 gradient-hero" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Inquiry
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your inquiry will be sent via WhatsApp and Email. We'll respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
