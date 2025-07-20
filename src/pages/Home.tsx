import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Search, Award, BookOpen, Calendar, Newspaper, CheckCircle, ArrowRight } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Smart Scheme Finder",
      description: "Get personalized recommendations for scholarships and schemes based on your eligibility"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Entrance Exams",
      description: "Discover entrance exams for top institutions across India"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Government Exams",
      description: "Comprehensive list of central and state government examinations"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Counselling Schedule",
      description: "Stay updated with counselling dates and registration deadlines"
    },
    {
      icon: <Newspaper className="h-8 w-8" />,
      title: "Latest News",
      description: "Get real-time updates on education policies and new opportunities"
    }
  ];

  const benefits = [
    "Personalized recommendations based on your profile",
    "Track and save opportunities for later",
    "Filter by state, category, and eligibility",
    "Real-time updates on deadlines and news",
    "Mobile-friendly responsive design"
  ];

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
                <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-white/80">Comprehensive tools to discover and track education opportunities</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-elegant border-0 bg-white/95 backdrop-blur">
                <CardHeader>
                  <div className="p-3 bg-gradient-primary rounded-lg w-fit text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant border-0 bg-white/95 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Why Choose Smart Education Finder?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of students discovering their perfect education opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8">
            Create your free account and discover opportunities tailored just for you
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/20">
        <div className="text-center text-white/60">
          <p>&copy; 2024 Smart Education Finder. Empowering students across India.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;