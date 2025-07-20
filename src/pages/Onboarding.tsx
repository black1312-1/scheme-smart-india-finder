import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, User, MapPin, IndianRupee } from "lucide-react";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const CLASS_LEVELS = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", 
  "Class 9", "Class 10", "Class 11", "Class 12", "Undergraduate", "Postgraduate"
];

const INCOME_RANGES = [
  "₹ < 1 Lakh", "₹ 1-2.5 Lakh", "₹ 2.5-5 Lakh", "₹ 5+ Lakh"
];

const CATEGORIES = ["General", "SC", "ST", "OBC", "EWS", "Minority"];
const INSTITUTIONS = ["Government", "Private", "Not enrolled"];

const Onboarding = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    classLevel: "",
    gender: "",
    familyIncome: "",
    category: "",
    state: "",
    institution: "",
    needBasedSupport: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.classLevel || !formData.gender || !formData.familyIncome || 
        !formData.category || !formData.state || !formData.institution) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Store eligibility data
    localStorage.setItem("eligibilityData", JSON.stringify(formData));
    
    toast({
      title: "Success",
      description: "Profile completed! Finding your opportunities...",
    });
    
    navigate("/scheme-finder");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white rounded-2xl shadow-elegant">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Tell Us About Yourself</h1>
            <p className="text-white/80">Help us find the best education opportunities for you</p>
          </div>

          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Eligibility Information</CardTitle>
              <CardDescription className="text-center">
                This information will help us personalize your recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (Optional)</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="classLevel">Class/Education Level *</Label>
                    <Select value={formData.classLevel} onValueChange={(value) => handleChange("classLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class/level" />
                      </SelectTrigger>
                      <SelectContent>
                        {CLASS_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familyIncome">Family Income *</Label>
                    <Select value={formData.familyIncome} onValueChange={(value) => handleChange("familyIncome", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        {INCOME_RANGES.map((income) => (
                          <SelectItem key={income} value={income}>{income}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Caste Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Type of Institution *</Label>
                  <Select value={formData.institution} onValueChange={(value) => handleChange("institution", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INSTITUTIONS.map((institution) => (
                        <SelectItem key={institution} value={institution}>{institution}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="needBasedSupport"
                    checked={formData.needBasedSupport}
                    onCheckedChange={(checked) => handleChange("needBasedSupport", checked as boolean)}
                  />
                  <Label htmlFor="needBasedSupport" className="text-sm">
                    I need financial assistance/support
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Finding Schemes..." : "Find My Schemes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;