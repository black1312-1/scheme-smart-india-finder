import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Search, Award, BookOpen, Calendar, Newspaper, BarChart3, User, LogOut } from "lucide-react";
import Layout from "@/components/Layout";

const Home = () => {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = user.isAuthenticated;
  const userName = user.email?.split("@")[0] || "Guest";

  const quickLinks = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Scheme Finder",
      description: "Get personalized recommendations",
      path: "/scheme-finder",
      color: "bg-primary"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Dashboard",
      description: "View all opportunities",
      path: "/dashboard",
      color: "bg-secondary"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Entrance Exams",
      description: "Top institution exams",
      path: "/entrance-exams",
      color: "bg-accent"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Government Exams",
      description: "Central & state exams",
      path: "/government-exams",
      color: "bg-success"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Counselling",
      description: "Upcoming events",
      path: "/counselling",
      color: "bg-warning"
    },
    {
      icon: <Newspaper className="h-6 w-6" />,
      title: "Latest News",
      description: "Education updates",
      path: "/news",
      color: "bg-info"
    }
  ];

  const highlights = [
    {
      title: "PM-YASASVI Scholarship 2024",
      description: "Applications open till March 15, 2024",
      type: "Urgent",
      variant: "destructive" as const
    },
    {
      title: "NEET Registration Started",
      description: "Last date: February 28, 2024",
      type: "New",
      variant: "secondary" as const
    },
    {
      title: "JEE Main Session 2 Dates",
      description: "April examination dates announced",
      type: "Update",
      variant: "default" as const
    }
  ];

  if (!isLoggedIn) {
    // Show landing page for non-logged in users
    return (
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl text-white">Smart Education Finder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Your Perfect
              <span className="block text-accent-light">Education Opportunity</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Find government scholarships, schemes, and entrance exams tailored to your eligibility. 
              Your gateway to educational opportunities across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show authenticated home page
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Greeting Section */}
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your central hub for education opportunities and updates
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Access</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.path}>
                  <Card className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${link.color} rounded-lg text-white`}>
                          {link.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{link.title}</CardTitle>
                          <CardDescription className="text-sm">{link.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Highlights Bar */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Important Updates</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((highlight, index) => (
                <Card key={index} className="shadow-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{highlight.title}</CardTitle>
                        <CardDescription className="text-sm">{highlight.description}</CardDescription>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full bg-${highlight.variant} text-${highlight.variant}-foreground`}>
                        {highlight.type}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <Card className="shadow-card bg-gradient-subtle">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Our Mission</CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Empowering every student in India to discover and access education opportunities through 
                personalized recommendations and comprehensive information about scholarships, schemes, and examinations.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Home;