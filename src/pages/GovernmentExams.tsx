import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Calendar,
  Building2,
  User
} from "lucide-react";
import Layout from "@/components/Layout";

interface GovernmentExam {
  id: string;
  name: string;
  description: string;
  type: "Central" | "State";
  category: "Teaching" | "Polytechnic" | "Higher Ed" | "Competitive";
  conductingAuthority: string;
  eligibility: string;
  examDate: string;
  applicationWindow: string;
  syllabusHighlights: string[];
  state?: string;
}

const GOVERNMENT_EXAMS: GovernmentExam[] = [
  {
    id: "1",
    name: "CTET (Central Teacher Eligibility Test)",
    description: "Central Teacher Eligibility Test for teaching positions in government schools.",
    type: "Central",
    category: "Teaching",
    conductingAuthority: "CBSE",
    eligibility: "Bachelor's degree with at least 50% marks and B.Ed degree",
    examDate: "December 2024",
    applicationWindow: "October - November 2024",
    syllabusHighlights: ["Child Development", "Language I & II", "Mathematics", "Environmental Studies"],
    state: "All States"
  },
  {
    id: "2",
    name: "UGC NET",
    description: "National Eligibility Test for determining eligibility for Assistant Professor and JRF.",
    type: "Central",
    category: "Higher Ed",
    conductingAuthority: "NTA",
    eligibility: "Master's degree with 55% marks",
    examDate: "Multiple sessions throughout the year",
    applicationWindow: "January, June, December",
    syllabusHighlights: ["Teaching Aptitude", "Research Aptitude", "Subject-specific topics"],
    state: "All States"
  },
  {
    id: "3",
    name: "SSC CGL",
    description: "Staff Selection Commission Combined Graduate Level Examination.",
    type: "Central",
    category: "Competitive",
    conductingAuthority: "SSC",
    eligibility: "Bachelor's degree from recognized university",
    examDate: "July 2024",
    applicationWindow: "May - June 2024",
    syllabusHighlights: ["General Intelligence", "General Awareness", "Quantitative Aptitude", "English"],
    state: "All States"
  },
  {
    id: "4",
    name: "UPSC CSE",
    description: "Civil Services Examination for IAS, IPS, IFS and other Group A services.",
    type: "Central",
    category: "Competitive",
    conductingAuthority: "UPSC",
    eligibility: "Bachelor's degree from recognized university",
    examDate: "June 2024 (Prelims)",
    applicationWindow: "February - March 2024",
    syllabusHighlights: ["General Studies", "CSAT", "Optional Subject", "Essay"],
    state: "All States"
  },
  {
    id: "5",
    name: "TN TET",
    description: "Tamil Nadu Teacher Eligibility Test for teaching positions in TN schools.",
    type: "State",
    category: "Teaching",
    conductingAuthority: "TN-TRB",
    eligibility: "Bachelor's degree with B.Ed or D.Ed",
    examDate: "September 2024",
    applicationWindow: "July - August 2024",
    syllabusHighlights: ["Child Development", "Tamil", "English", "Mathematics", "Science"],
    state: "Tamil Nadu"
  },
  {
    id: "6",
    name: "Maharashtra Polytechnic",
    description: "Common Entrance Test for Diploma courses in Maharashtra.",
    type: "State",
    category: "Polytechnic",
    conductingAuthority: "DTE Maharashtra",
    eligibility: "10th pass with Mathematics and Science",
    examDate: "May 2024",
    applicationWindow: "March - April 2024",
    syllabusHighlights: ["Mathematics", "Physics", "Chemistry"],
    state: "Maharashtra"
  },
  {
    id: "7",
    name: "KPSC KAS",
    description: "Karnataka Administrative Service Examination.",
    type: "State",
    category: "Competitive",
    conductingAuthority: "KPSC",
    eligibility: "Bachelor's degree with knowledge of Kannada",
    examDate: "August 2024",
    applicationWindow: "May - June 2024",
    syllabusHighlights: ["General Studies", "Kannada Language", "English", "Current Affairs"],
    state: "Karnataka"
  },
  {
    id: "8",
    name: "Railway Group D",
    description: "Railway Recruitment Board Group D examination for various posts.",
    type: "Central",
    category: "Competitive",
    conductingAuthority: "RRB",
    eligibility: "10th pass or ITI from recognized institution",
    examDate: "September 2024",
    applicationWindow: "July - August 2024",
    syllabusHighlights: ["Mathematics", "General Intelligence", "General Science", "General Awareness"],
    state: "All States"
  }
];

const TYPES = ["All", "Central", "State"];
const CATEGORIES = ["All", "Teaching", "Polytechnic", "Higher Ed", "Competitive"];
const STATES = ["All States", "Tamil Nadu", "Maharashtra", "Karnataka", "Delhi", "West Bengal", "Gujarat"];

const GovernmentExams = () => {
  const [exams, setExams] = useState<GovernmentExam[]>(GOVERNMENT_EXAMS);
  const [filteredExams, setFilteredExams] = useState<GovernmentExam[]>(GOVERNMENT_EXAMS);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    state: "All States"
  });
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("savedOpportunities");
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    let filtered = exams;

    if (searchTerm) {
      filtered = filtered.filter(exam => 
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.conductingAuthority.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.type !== "All") {
      filtered = filtered.filter(exam => exam.type === filters.type);
    }

    if (filters.category !== "All") {
      filtered = filtered.filter(exam => exam.category === filters.category);
    }

    if (filters.state !== "All States") {
      filtered = filtered.filter(exam => exam.state === filters.state || exam.state === "All States");
    }

    setFilteredExams(filtered);
  }, [searchTerm, filters, exams]);

  const handleSave = (examId: string) => {
    const updatedSaved = savedItems.includes(examId)
      ? savedItems.filter(id => id !== examId)
      : [...savedItems, examId];
    
    setSavedItems(updatedSaved);
    localStorage.setItem("savedOpportunities", JSON.stringify(updatedSaved));
    
    toast({
      title: savedItems.includes(examId) ? "Removed from tracker" : "Saved to tracker",
      description: savedItems.includes(examId) 
        ? "Exam removed from your tracker"
        : "Exam saved to your tracker",
    });
  };

  const getTypeColor = (type: string) => {
    return type === "Central" 
      ? "bg-primary text-primary-foreground" 
      : "bg-accent text-accent-foreground";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Teaching":
        return "bg-success text-success-foreground";
      case "Polytechnic":
        return "bg-info text-info-foreground";
      case "Higher Ed":
        return "bg-warning text-warning-foreground";
      case "Competitive":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Important Government Exams
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive list of central and state government examinations for various career opportunities
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Search & Filter Exams</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exams, authorities, or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">State</label>
                  <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Exams ({filteredExams.length})
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams.map((exam) => (
                <Card key={exam.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(exam.type)}>
                            {exam.type}
                          </Badge>
                          <Badge className={getCategoryColor(exam.category)}>
                            {exam.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(exam.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {savedItems.includes(exam.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div>
                      <CardTitle className="text-lg leading-tight">
                        {exam.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        {exam.conductingAuthority}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">
                      {exam.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Eligibility:</span>
                      </div>
                      <p className="text-sm text-foreground">{exam.eligibility}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Exam Date:</span>
                        <span className="text-foreground">{exam.examDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Application:</span>
                        <span className="text-foreground">{exam.applicationWindow}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Syllabus:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exam.syllabusHighlights.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-primary hover:opacity-90 text-white"
                      onClick={() => handleSave(exam.id)}
                    >
                      {savedItems.includes(exam.id) ? "Remove from Tracker" : "Save to Tracker"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredExams.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No exams found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GovernmentExams;