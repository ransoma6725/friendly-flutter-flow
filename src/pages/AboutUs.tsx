
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  BusIcon,
  MessageCircle,
  Users,
  Award,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AboutUs = () => {
  const { toast } = useToast();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send the contact form data to a server
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll respond shortly!",
    });
    
    // Reset form
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div className="min-h-screen p-4 bg-hero-pattern">
      <div className="max-w-6xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <BusIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            CamBus <span className="text-primary">Ticketing</span>
          </h1>
        </div>

        {/* About Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">About CamBus</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Our Story
                </h3>
                <p className="text-muted-foreground mb-4">
                  Founded in 2012, CamBus began with a simple mission: to revolutionize bus transportation in Cameroon. 
                  Starting with just 5 buses connecting Douala and Yaoundé, we've grown to become the country's 
                  leading bus ticketing platform, now serving over 20 major destinations across Cameroon.
                </p>
                <p className="text-muted-foreground">
                  Our online platform was launched in 2018 to make bus travel more accessible, allowing 
                  passengers to book tickets from anywhere, anytime. Today, we partner with the most reliable 
                  bus companies to ensure our customers enjoy safe, comfortable, and convenient journeys.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground mb-4">
                  At CamBus, our mission is to connect Cameroon through safe, reliable, and affordable transportation. 
                  We believe that everyone deserves access to quality bus services, regardless of their destination.
                </p>
                <p className="text-muted-foreground">
                  We're committed to continuous improvement, embracing technology to enhance the customer experience, 
                  while maintaining the highest standards of safety and service. Through strategic partnerships with 
                  top bus operators, we offer the most comprehensive network of routes throughout the country.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/10 rounded-xl p-8 mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose CamBus?</h3>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Extensive Network</h4>
                  <p className="text-sm text-muted-foreground">Coverage across all major cities and towns in Cameroon</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Easy Booking</h4>
                  <p className="text-sm text-muted-foreground">Simple online platform for hassle-free ticket reservations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Multiple Operators</h4>
                  <p className="text-sm text-muted-foreground">Partner with top bus companies including AVENIR, VATICAN, and more</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Secure Payments</h4>
                  <p className="text-sm text-muted-foreground">Safe and secure online payment options</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">Customer service available round the clock</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Reliable Service</h4>
                  <p className="text-sm text-muted-foreground">Timely departures and comfortable journey experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@cambus.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+237 233 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Head Office</p>
                      <p className="text-sm text-muted-foreground">123 Deido Street, Douala, Cameroon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-sm text-muted-foreground">Monday - Saturday: 7AM - 7PM</p>
                      <p className="text-sm text-muted-foreground">Sunday: 8AM - 4PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Connect With Us</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="shadow-md transition-all hover:shadow-lg group-hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Facebook className="h-10 w-10 text-blue-600 mb-3" />
                  <p className="font-medium">Facebook</p>
                  <p className="text-sm text-muted-foreground">@CamBusOfficial</p>
                </CardContent>
              </Card>
            </a>
            
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="shadow-md transition-all hover:shadow-lg group-hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Twitter className="h-10 w-10 text-blue-500 mb-3" />
                  <p className="font-medium">Twitter</p>
                  <p className="text-sm text-muted-foreground">@CamBus</p>
                </CardContent>
              </Card>
            </a>
            
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="shadow-md transition-all hover:shadow-lg group-hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Instagram className="h-10 w-10 text-pink-500 mb-3" />
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-muted-foreground">@CamBusTickets</p>
                </CardContent>
              </Card>
            </a>
            
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="shadow-md transition-all hover:shadow-lg group-hover:border-primary/50">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Youtube className="h-10 w-10 text-red-600 mb-3" />
                  <p className="font-medium">YouTube</p>
                  <p className="text-sm text-muted-foreground">CamBus Channel</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center">
          <a href="/" className="text-primary hover:underline">
            Return to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
