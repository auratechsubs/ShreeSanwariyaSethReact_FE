import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/components/Helper/Base_Url";
import { useGlobalContext } from "@/Contaxt/UseGlobelcontaxt";
import { Link } from "react-router-dom";

const ContactForm = () => {
    const { toast } = useToast();
    const { contactData } = useGlobalContext();
    const Iframe_link = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56952.963550627224!2d75.72138148238713!3d26.853936607414614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db500273e196d%3A0x918a37842bf2bb43!2sMansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1762161041853!5m2!1sen!2sin";
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // ✅ Validate form before submit
    const validate = () => {
        const err: Record<string, string> = {};
        if (!formData.name.trim()) err.name = "Full name is required";
        if (!formData.email.trim()) err.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = "Invalid email format";
        if (!formData.phone.trim()) err.phone = "Phone number is required";
        else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) err.phone = "Invalid phone number";
        if (!formData.message.trim()) err.message = "Message cannot be empty";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/contactsubmit/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ContectUs_name: formData.name,
                    ContectUs_email: formData.email,
                    ContectUs_cono: formData.phone,
                    ContectUs_Destination: formData.destination,
                    ContectUs_message: formData.message,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast({
                    title: data.message ? "✅ Success" : "⚠️ Failed",
                    description: data.message || "Form submitted.",
                    //   variant: data.success ? "success" : "error",
                });

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    destination: "",
                    message: "",
                });

            } else {
                toast({
                    title: "⚠️ Failed",
                    description: data.message || "An error occurred while submitting.",

                });
            }
        } catch (err) {
            toast({
                title: "❌ Network Error",
                description: "Unable to reach the server. Please try again later.",

            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-card">
                <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {["name", "email", "phone", "destination", "message"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium mb-2 capitalize">
                                    {field === "destination"
                                        ? "Preferred Destination"
                                        : field === "message"
                                            ? "Your Message *"
                                            : `${field} *`}
                                </label>

                                {field === "message" ? (
                                    <Textarea
                                        name={field}
                                        value={formData[field as keyof typeof formData]}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Tell us about your travel plans..."
                                    />
                                ) : (
                                    <Input
                                        name={field}
                                        value={formData[field as keyof typeof formData]}
                                        onChange={handleChange}
                                        placeholder={
                                            field === "email"
                                                ? "your.email@example.com"
                                                : field === "phone"
                                                    ? "+91 98765 43210"
                                                    : field === "destination"
                                                        ? "e.g., Dubai, Abu Dhabi"
                                                        : "Enter your full name"
                                        }
                                        type={field === "email" ? "email" : "text"}
                                    />
                                )}

                                {errors[field] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-hero"
                        >
                            {loading ? "Sending..." : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-6"> <Card className="shadow-card overflow-hidden">
                <CardContent className="p-0"> <div className="w-full h-80 bg-secondary">
                    <iframe src={`${Iframe_link}`}
                     width="100%"
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade" >
                        </iframe>
                         </div> </CardContent> </Card> <Card className="shadow-card gradient-hero"> <CardContent className="p-8 text-white"> <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3> <ul className="space-y-3"> <li className="flex items-start"> <div className="w-1.5 h-1.5 rounded-full bg-white mr-3 mt-2" /> <span>Free consultation for UAE travel planning</span> </li> <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mr-3 mt-2" />
                        <span>Customized packages based on your budget</span> </li>
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-white mr-3 mt-2" />
                            <span>Expert guidance in Hindi, English & more</span> </li>
                        <li className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-white mr-3 mt-2" />
                            <span>24/7 customer support throughout your trip</span>
                        </li>
                    </ul> </CardContent> </Card> <Card className="shadow-card">
                    <CardContent className="p-6"> <h3 className="font-bold mb-3">Quick Response Guaranteed</h3> <p className="text-sm text-muted-foreground mb-4"> We typically respond to all inquiries within 2–4 hours during business hours. For urgent matters, please call our hotline directly. </p>
                        <Link to={contactData?.call_link_1 ? contactData?.call_link_1 : contactData?.call_link_2}>
                            <Button className="w-full gradient-hero">
                                <Phone className="w-4 h-4 mr-2" /> Call Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
};

export default ContactForm;
