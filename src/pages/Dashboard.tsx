import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck, 
  Award, 
  Building2, 
  Calendar,
  TrendingUp,
  Users,
  BookOpen
} from "lucide-react";
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
  state?: string;
  classLevel?: string;
}

const STATES = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const CLASS_LEVELS = [
  "All Classes", "Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "Undergraduate", "Postgraduate"
];

// Comprehensive opportunities data
const ALL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    title: "National Scholarship Portal - Merit cum Means",
    description: "Central sector scholarship for students from economically weaker sections with good academic performance.",
    type: "scholarship",
    eligibility: "eligible",
    department: "Ministry of Education",
    amount: "₹12,000 - ₹20,000",
    deadline: "2024-02-15",
    tags: ["Merit", "Need-based"],
    state: "All States",
    classLevel: "Class 11-12"
  },
  {
    id: "2",
    title: "Pre-Matric Scholarship for SC Students",
    description: "Financial assistance for SC students studying in classes IX and X.",
    type: "scholarship",
    eligibility: "eligible",
    department: "Ministry of Social Justice",
    amount: "₹350 - ₹750",
    deadline: "2024-01-30",
    tags: ["SC", "Pre-matric", "Girls"],
    state: "All States",
    classLevel: "Class 9-10"
  },
  {
    id: "3",
    title: "JEE Main 2024",
    description: "Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges.",
    type: "exam",
    eligibility: "eligible",
    department: "National Testing Agency",
    deadline: "2024-01-12",
    tags: ["Engineering", "National"],
    state: "All States",
    classLevel: "Class 12"
  },
  {
    id: "4",
    title: "PM-YASASVI Scheme",
    description: "Scholarship for OBC, EBC and DNT students for higher secondary and higher education.",
    type: "scholarship",
    eligibility: "may-qualify",
    department: "Ministry of Social Justice",
    amount: "₹1,25,000",
    deadline: "2024-02-28",
    tags: ["OBC", "Higher Education"],
    state: "All States",
    classLevel: "Class 11-12"
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
    tags: ["Merit", "Class VIII"],
    state: "All States",
    classLevel: "Class 6-8"
  },
  {
    id: "6",
    title: "NEET 2024",
    description: "National Eligibility cum Entrance Test for medical courses.",
    type: "exam",
    eligibility: "eligible",
    department: "National Testing Agency",
    deadline: "2024-01-15",
    tags: ["Medical", "National"],
    state: "All States",
    classLevel: "Class 12"
  },
  {
    id: "7",
    title: "Begum Hazrat Mahal National Scholarship",
    description: "Scholarship for girl students of minority communities.",
    type: "scholarship",
    eligibility: "may-qualify",
    department: "Maulana Azad Education Foundation",
    amount: "₹5,000 - ₹12,000",
    deadline: "2024-02-10",
    tags: ["Minority", "Girls"],
    state: "All States",
    classLevel: "Class 6-8"
  },
  {
    id: "8",
    title: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    description: "Fellowship for students interested in research careers in science.",
    type: "scholarship",
    eligibility: "eligible",
    department: "Indian Institute of Science",
    amount: "₹5,000 - ₹7,000",
    deadline: "2024-01-20",
    tags: ["Science", "Research"],
    state: "All States",
    classLevel: "Class 11-12"
  }
];

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(ALL_OPPORTUNITIES);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(ALL_OPPORTUNITIES);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    state: "All States",
    classLevel: "All Classes",
    girlsOnly: false,
    scSt: false,
    minority: false,
    scholarshipsOnly: false,
    schemesOnly: false,
    examsOnly: false
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
    let filtered = opportunities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // State filter
    if (filters.state !== "All States") {
      filtered = filtered.filter(opp => opp.state === filters.state || opp.state === "All States");
    }

    // Class level filter
    if (filters.classLevel !== "All Classes") {
      filtered = filtered.filter(opp => opp.classLevel === filters.classLevel || opp.classLevel === "All Classes");
    }

    // Tag-based filters
    if (filters.girlsOnly) {
      filtered = filtered.filter(opp => opp.tags.includes("Girls"));
    }
    if (filters.scSt) {
      filtered = filtered.filter(opp => opp.tags.includes("SC") || opp.tags.includes("ST"));
    }
    if (filters.minority) {
      filtered = filtered.filter(opp => opp.tags.includes("Minority"));
    }

    // Type filters
    if (filters.scholarshipsOnly) {
      filtered = filtered.filter(opp => opp.type === "scholarship");
    }
    if (filters.schemesOnly) {
      filtered = filtered.filter(opp => opp.type === "scheme");
    }
    if (filters.examsOnly) {
      filtered = filtered.filter(opp => opp.type === "exam");
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, filters, opportunities]);

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
        return <BookOpen className="h-5 w-5" />;
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

  const stats = {
    totalOpportunities: opportunities.length,
    savedOpportunities: savedItems.length,
    eligibleOpportunities: opportunities.filter(opp => opp.eligibility === "eligible").length
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Education Opportunities Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover scholarships, schemes, and exams tailored to your eligibility
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3 animate-slide-up">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stats.totalOpportunities}</div>
                <p className="text-xs text-muted-foreground">Available for you</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Opportunities</CardTitle>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{stats.savedOpportunities}</div>
                <p className="text-xs text-muted-foreground">In your tracker</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eligible Now</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{stats.eligibleOpportunities}</div>
                <p className="text-xs text-muted-foreground">Ready to apply</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Search & Filter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

                <div>
                  <label className="text-sm font-medium mb-2 block">Class Level</label>
                  <Select value={filters.classLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, classLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASS_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium block">Categories</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="girls"
                        checked={filters.girlsOnly}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, girlsOnly: checked as boolean }))}
                      />
                      <label htmlFor="girls" className="text-sm">Girls Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="scst"
                        checked={filters.scSt}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, scSt: checked as boolean }))}
                      />
                      <label htmlFor="scst" className="text-sm">SC/ST</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="minority"
                        checked={filters.minority}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, minority: checked as boolean }))}
                      />
                      <label htmlFor="minority" className="text-sm">Minority</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium block">Type</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="scholarships"
                        checked={filters.scholarshipsOnly}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, scholarshipsOnly: checked as boolean }))}
                      />
                      <label htmlFor="scholarships" className="text-sm">Scholarships</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="schemes"
                        checked={filters.schemesOnly}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, schemesOnly: checked as boolean }))}
                      />
                      <label htmlFor="schemes" className="text-sm">Schemes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="exams"
                        checked={filters.examsOnly}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, examsOnly: checked as boolean }))}
                      />
                      <label htmlFor="exams" className="text-sm">Exams</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Available Opportunities ({filteredOpportunities.length})
              </h2>
            </div>

            {/* Opportunities Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opportunity) => (
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

            {filteredOpportunities.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
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

export default Dashboard;