import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, Bookmark, BookmarkCheck, Award, Building2, Calendar, Search } from "lucide-react";
import Layout from "@/components/Layout";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: "scholarship" | "scheme" | "exam";
  eligibility: "eligible" | "may-qualify";
  department: string;
  amount?: string;
  deadline: string;
  tags: string[];
}

// Mock data based on eligibility
const generateRecommendations = (eligibilityData: any): Opportunity[] => {
  const baseOpportunities: Opportunity[] = [
    {
      id: "1",
      title: "National Scholarship Portal - Merit cum Means",
      description: "Central sector scholarship for students from economically weaker sections with good academic performance.",
      type: "scholarship",
      eligibility: "eligible",
      department: "Ministry of Education",
      amount: "₹12,000 - ₹20,000",
      deadline: "2024-02-15",
      tags: ["Merit", "Need-based"]
    },
    {
      id: "2",
      title: "Pre-Matric Scholarship for SC Students",
      description: "Financial assistance for SC students studying in classes IX and X.",
      type: "scholarship",
      eligibility: eligibilityData?.category === "SC" ? "eligible" : "may-qualify",
      department: "Ministry of Social Justice",
      amount: "₹350 - ₹750",
      deadline: "2024-01-30",
      tags: ["SC", "Pre-matric"]
    },
    {
      id: "3",
      title: "JEE Main 2024",
      description: "Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges.",
      type: "exam",
      eligibility: eligibilityData?.classLevel === "Class 12" ? "eligible" : "may-qualify",
      department: "National Testing Agency",
      deadline: "2024-01-12",
      tags: ["Engineering", "National"]
    },
    {
      id: "4",
      title: "PM-YASASVI Scheme",
      description: "Scholarship for OBC, EBC and DNT students for higher secondary and higher education.",
      type: "scholarship",
      eligibility: eligibilityData?.category === "OBC" ? "eligible" : "may-qualify",
      department: "Ministry of Social Justice",
      amount: "₹1,25,000",
      deadline: "2024-02-28",
      tags: ["OBC", "Higher Education"]
    },
    {
      id: "5",
      title: "National Means-cum-Merit Scholarship",
      description: "Scholarship to meritorious students of economically weaker sections.",
      type: "scholarship",
      eligibility: "eligible",
      department: "Ministry of Education",
      amount: "₹12,000",
      deadline: "2024-01-25",
      tags: ["Merit", "Class VIII"]
    },
    {
      id: "6",
      title: "NEET 2024",
      description: "National Eligibility cum Entrance Test for medical courses.",
      type: "exam",
      eligibility: eligibilityData?.classLevel === "Class 12" ? "eligible" : "may-qualify",
      department: "National Testing Agency",
      deadline: "2024-01-15",
      tags: ["Medical", "National"]
    }
  ];

  return baseOpportunities;
};

const SchemeFinder = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get eligibility data from localStorage
    const eligibilityData = localStorage.getItem("eligibilityData");
    if (eligibilityData) {
      const parsedData = JSON.parse(eligibilityData);
      const recommendations = generateRecommendations(parsedData);
      setOpportunities(recommendations);
    }

    // Load saved items
    const saved = localStorage.getItem("savedOpportunities");
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  const handleSave = (opportunityId: string) => {
    const updatedSaved = savedItems.includes(opportunityId)
      ? savedItems.filter(id => id !== opportunityId)
      : [...savedItems, opportunityId];
    
    setSavedItems(updatedSaved);
    localStorage.setItem("savedOpportunities", JSON.stringify(updatedSaved));
    
    toast({
      title: savedItems.includes(opportunityId) ? "Removed from tracker" : "Saved to tracker",
      description: savedItems.includes(opportunityId) 
        ? "Opportunity removed from your tracker"
        : "Opportunity saved to your tracker",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "scholarship":
        return <Award className="h-5 w-5" />;
      case "exam":
        return <BookmarkCheck className="h-5 w-5" />;
      case "scheme":
        return <Building2 className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "scholarship":
        return "bg-success text-success-foreground";
      case "exam":
        return "bg-info text-info-foreground";
      case "scheme":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Recommended Opportunities
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your profile, here are the scholarships, schemes, and exams you may be eligible for
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(opportunity.type)}`}>
                        {getTypeIcon(opportunity.type)}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          opportunity.eligibility === "eligible" 
                            ? "border-success text-success" 
                            : "border-warning text-warning"
                        }`}
                      >
                        {opportunity.eligibility === "eligible" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Eligible
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            May Qualify
                          </>
                        )}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(opportunity.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {savedItems.includes(opportunity.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div>
                    <CardTitle className="text-lg leading-tight">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {opportunity.department}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  {opportunity.amount && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium text-success">Amount:</span>
                      <span className="text-foreground">{opportunity.amount}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Deadline:</span>
                    <span className="text-foreground">{opportunity.deadline}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {opportunity.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90 text-white"
                    onClick={() => handleSave(opportunity.id)}
                  >
                    {savedItems.includes(opportunity.id) ? "Remove from Tracker" : "Save to Tracker"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {opportunities.length === 0 && (
            <div className="text-center py-12">
              <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No recommendations yet</h3>
              <p className="text-muted-foreground">
                Complete your profile to get personalized recommendations
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SchemeFinder;