import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  BriefcaseBusiness,
  MessageSquare,
  FileText,
  User,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  HelpCircle,
  Info,
} from 'lucide-react';
import { Button, AppBar, Toolbar, Box, useScrollTrigger, Stack } from '@mui/material';
import { Carousel } from '../components/ui/carousel';
import { VoiceService } from '../utils/voiceService';

interface ElevationScrollProps {
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const LandingDashboard = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  useEffect(() => {
    // Initialize voice service when component mounts
    VoiceService.initialize();
  }, []);

  const navItems = [
    { label: 'Home', icon: <Home className="h-4 w-4" />, action: () => navigate('/') },
    { label: 'Services', icon: <FileText className="h-4 w-4" />, action: () => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'About', icon: <Info className="h-4 w-4" />, action: () => navigate('/about') },
    { label: 'Contact', icon: <Phone className="h-4 w-4" />, action: () => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const carouselImages = [
    {
      url: "/images/gramsansad/banner1.jpg",
      alt: "Digital Gram Panchayat Services",
    },
    {
      url: "/images/gramsansad/banner2.jpg",
      alt: "Empowering Rural Development",
    },
    {
      url: "/images/gramsansad/banner3.jpg",
      alt: "Community Engagement & Support",
    },
  ];

  const services = [
    {
      title: "Property Certificate",
      description: "Apply for property-related certificates and documents",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20",
      path: "/user/login",
    },
    {
      title: "Resident Certificate",
      description: "Get your residence proof and documentation",
      icon: <Home className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20",
      path: "/user/login",
    },
    {
      title: "Job Card Maagni",
      description: "Apply for employment opportunities and job cards",
      icon: <BriefcaseBusiness className="h-5 w-5" />,
      color: "bg-green-100 text-green-600 dark:bg-green-900/20",
      path: "/user/login",
    },
    {
      title: "Water Supply Issue",
      description: "Report water-related problems and track resolution",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20",
      path: "/user/login",
    },
  ];

  const features = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Easy Registration",
      description: "Simple and quick account creation process",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Digital Documents",
      description: "Paperless application and document management",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries",
    },
  ];

  const contactInfo = {
    phone: "+91 1800-123-4567",
    email: "support@zp-gramin.gov.in",
    address: "Zilla Parisad Office, Maharashtra",
    timings: "Mon-Sat: 9:00 AM - 6:00 PM",
  };

  return (
    <>
      <ElevationScroll>
        <AppBar 
          position="sticky" 
          sx={{ 
            backgroundColor: '#f97316', // orange-500
            boxShadow: 'none',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>ZP</span>
              </Box>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
              Zila Parishad Gramin Vibhag
              </span>
            </Stack>

            {/* Desktop Navigation */}
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center'
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={item.action}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                    },
                    textTransform: 'none',
                    minWidth: 'auto',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="outlined"
                startIcon={<User className="h-4 w-4" />}
                onClick={() => navigate('/login')}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                  },
                  textTransform: 'none',
                  ml: 1,
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                startIcon={<UserPlus className="h-4 w-4" />}
                onClick={() => navigate('/register')}
                sx={{
                  backgroundColor: 'white',
                  color: '#f97316',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  textTransform: 'none',
                }}
              >
                Register
              </Button>
            </Stack>

            {/* Mobile Menu Button */}
            <Button
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: 'white',
                borderColor: 'white',
                minWidth: 'auto',
                p: 1,
              }}
              variant="outlined"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <div className="animate-fade-in space-y-8 py-8">
        {loading ? (
          <div className="h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        ) : (
          <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-6">
            {/* Hero Section with Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Carousel 
                images={carouselImages}
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center">
                <div className="text-white p-8 md:p-12 space-y-4 max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold">Welcome to Zilla Parisad Gramin Vibhag</h1>
                  <p className="text-lg md:text-xl text-white/90">Your one-stop portal for all rural development services</p>
                  <Button
                    variant="contained"
                    className="mt-6 bg-orange-600 hover:bg-orange-700 text-white shadow-xl"
                    size="large"
                    onClick={() => navigate('/user/login')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div id="services-section" className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-orange-200"
                    onClick={() => navigate(service.path)}
                  >
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl inline-block mb-4">
                      {React.cloneElement(service.icon, {
                        className: "h-6 w-6 text-orange-600 dark:text-orange-400"
                      })}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-orange-600">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
                    <ChevronRight className="h-5 w-5 text-orange-500 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center space-y-4 bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                      <div className="bg-white/20 p-4 rounded-xl inline-block">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-white/80">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact-section" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: <Phone />, label: "Phone", value: contactInfo.phone },
                  { icon: <Mail />, label: "Email", value: contactInfo.email },
                  { icon: <MapPin />, label: "Address", value: contactInfo.address },
                  { icon: <HelpCircle />, label: "Office Hours", value: contactInfo.timings }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                      {React.cloneElement(item.icon, {
                        className: "h-6 w-6 text-orange-600 dark:text-orange-400"
                      })}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingDashboard;
