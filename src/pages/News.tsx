import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Newspaper, Calendar, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  timestamp: string;
  category: "Scholarships" | "Exams" | "Government Updates" | "Policy Changes";
  region: "National" | "State";
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    headline: "New National Scholarship Portal 2.0 Launched",
    summary: "Ministry of Education launches revamped scholarship portal with enhanced features and streamlined application process.",
    source: "Ministry of Education",
    timestamp: "2024-01-15",
    category: "Scholarships",
    region: "National"
  },
  {
    id: "2",
    headline: "NEET 2024 Registration Begins",
    summary: "National Testing Agency opens registration for NEET 2024 with new exam pattern and syllabus updates.",
    source: "NTA",
    timestamp: "2024-01-10",
    category: "Exams",
    region: "National"
  },
  {
    id: "3",
    headline: "PM-YASASVI Scholarship Amount Increased",
    summary: "Government announces 25% increase in PM-YASASVI scholarship amount for OBC, EBC and DNT students.",
    source: "PIB",
    timestamp: "2024-01-08",
    category: "Government Updates",
    region: "National"
  }
];

const News = () => {
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(NEWS_ITEMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    region: "All"
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Newspaper className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Latest in Education
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest news on scholarships, exams, and government policies
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Search & Filter News</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {NEWS_ITEMS.map((item) => (
              <Card key={item.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-primary text-primary-foreground">
                          {item.category}
                        </Badge>
                        <Badge variant="outline">
                          {item.region}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{item.headline}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <span>{item.source}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;