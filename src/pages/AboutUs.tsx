
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowLeft } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen p-4 bg-hero-pattern">
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">About CamBus</h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                CamBus was established in 2025 with the mission to revolutionize intercity 
                transportation in Cameroon. What started as a small ticketing agency in Buea 
                has now grown to become Cameroon's leading digital platform for bus ticket 
                reservations, connecting passengers to major cities across the country.
              </p>
              <p className="text-muted-foreground">
                Our platform partners with Cameroon's most reliable bus operators including AVENIR, 
                VATICAN, NSO BOYS, and MUSANGO to offer convenient, safe and affordable transportation 
                options. We pride ourselves on providing an easy-to-use interface that allows passengers 
                to book their journey with just a few clicks.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Head Office</h3>
                      <p className="text-muted-foreground">123 Central Avenue, Buea, Cameroon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+237659942442</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@cambus.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Business Hours</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
              <div className="flex flex-wrap gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
                
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
                
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
