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
  BookOpen, 
  Calendar,
  Building2,
  GraduationCap
} from "lucide-react";
import Layout from "@/components/Layout";

interface Exam {
  id: string;
  name: string;
  description: string;
  level: "National" | "State";
  category: "School" | "College" | "ITI";
  institutions: string[];
  subjects: string[];
  deadline: string;
  examDate?: string;
  state?: string;
}

const ENTRANCE_EXAMS: Exam[] = [
  {
    id: "1",
    name: "JEE Main 2024",
    description: "Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges.",
    level: "National",
    category: "College",
    institutions: ["NITs", "IIITs", "CFTIs"],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    deadline: "2024-01-12",
    examDate: "January & April 2024",
    state: "All States"
  },
  {
    id: "2",
    name: "NEET 2024",
    description: "National Eligibility cum Entrance Test for medical courses.",
    level: "National",
    category: "College",
    institutions: ["AIIMS", "Government Medical Colleges", "Private Medical Colleges"],
    subjects: ["Physics", "Chemistry", "Biology"],
    deadline: "2024-01-15",
    examDate: "May 2024",
    state: "All States"
  },
  {
    id: "3",
    name: "CLAT 2024",
    description: "Common Law Admission Test for admission to National Law Universities.",
    level: "National",
    category: "College",
    institutions: ["NLUs", "Other Law Colleges"],
    subjects: ["English", "General Knowledge", "Legal Reasoning", "Logical Reasoning", "Mathematics"],
    deadline: "2024-01-31",
    examDate: "December 2024",
    state: "All States"
  },
  {
    id: "4",
    name: "BITSAT 2024",
    description: "Birla Institute of Technology and Science Admission Test.",
    level: "National",
    category: "College",
    institutions: ["BITS Pilani", "BITS Goa", "BITS Hyderabad"],
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
    deadline: "2024-02-20",
    examDate: "May-June 2024",
    state: "All States"
  },
  {
    id: "5",
    name: "COMEDK UGET 2024",
    description: "Consortium of Medical, Engineering and Dental Colleges of Karnataka Undergraduate Entrance Test.",
    level: "State",
    category: "College",
    institutions: ["Karnataka Engineering Colleges"],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    deadline: "2024-02-15",
    examDate: "May 2024",
    state: "Karnataka"
  },
  {
    id: "6",
    name: "KVPY 2024",
    description: "Kishore Vaigyanik Protsahan Yojana for students interested in research careers.",
    level: "National",
    category: "School",
    institutions: ["IISc", "IISERs", "Other Research Institutes"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
    deadline: "2024-01-25",
    examDate: "November 2024",
    state: "All States"
  },
  {
    id: "7",
    name: "NTSE 2024",
    description: "National Talent Search Examination for Class X students.",
    level: "National",
    category: "School",
    institutions: ["Scholarship Program"],
    subjects: ["Mathematics", "Science", "Social Science", "Mental Ability"],
    deadline: "2024-11-30",
    examDate: "February 2024",
    state: "All States"
  },
  {
    id: "8",
    name: "AIIMS MBBS 2024",
    description: "All Institute of Medical Sciences entrance exam for MBBS admission.",
    level: "National",
    category: "College",
    institutions: ["AIIMS Delhi", "AIIMS Bhopal", "AIIMS Jodhpur"],
    subjects: ["Physics", "Chemistry", "Biology", "General Knowledge"],
    deadline: "2024-01-10",
    examDate: "May 2024",
    state: "All States"
  }
];

const STATES = ["All States", "Karnataka", "Tamil Nadu", "Maharashtra", "Delhi", "Gujarat", "Rajasthan", "West Bengal"];
const CATEGORIES = ["All", "School", "College", "ITI"];
const LEVELS = ["All", "National", "State"];

const EntranceExams = () => {
  const [exams, setExams] = useState<Exam[]>(ENTRANCE_EXAMS);
  const [filteredExams, setFilteredExams] = useState<Exam[]>(ENTRANCE_EXAMS);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    level: "All",
    state: "All States"
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load saved items
    const saved = localStorage.getItem("savedOpportunities");
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = exams;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(exam => 
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.institutions.some(inst => inst.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category !== "All") {
      filtered = filtered.filter(exam => exam.category === filters.category);
    }

    // Level filter
    if (filters.level !== "All") {
      filtered = filtered.filter(exam => exam.level === filters.level);
    }

    // State filter
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

  const getLevelColor = (level: string) => {
    return level === "National" 
      ? "bg-primary text-primary-foreground" 
      : "bg-accent text-accent-foreground";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "School":
        return "bg-success text-success-foreground";
      case "College":
        return "bg-info text-info-foreground";
      case "ITI":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Entrance Exams for Top Institutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover entrance exams for premium educational institutions across India
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Search & Filter Exams</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exams, institutions, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid gap-4 md:grid-cols-3">
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
                  <label className="text-sm font-medium mb-2 block">Level</label>
                  <Select value={filters.level} onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
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

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Exams ({filteredExams.length})
              </h2>
            </div>

            {/* Exams Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams.map((exam) => (
                <Card key={exam.id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getLevelColor(exam.level)}>
                            {exam.level}
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
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">
                      {exam.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Institutions:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exam.institutions.slice(0, 3).map((institution) => (
                          <Badge key={institution} variant="outline" className="text-xs">
                            {institution}
                          </Badge>
                        ))}
                        {exam.institutions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{exam.institutions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Subjects:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {exam.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-muted-foreground">Deadline:</span>
                        <span className="text-foreground">{exam.deadline}</span>
                      </div>
                      {exam.examDate && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-muted-foreground">Exam Date:</span>
                          <span className="text-foreground">{exam.examDate}</span>
                        </div>
                      )}
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

export default EntranceExams;