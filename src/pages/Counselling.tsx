import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  Monitor,
  Users,
  Clock
} from "lucide-react";
import Layout from "@/components/Layout";

interface CounsellingEvent {
  id: string;
  eventName: string;
  institution: string;
  startingDate: string;
  endingDate: string;
  mode: "Online" | "Offline" | "Hybrid";
  location?: string;
  status: "Upcoming" | "Ongoing" | "Closed";
  registrationLink?: string;
  category: "Engineering" | "Medical" | "Law" | "General" | "Management";
}

const COUNSELLING_EVENTS: CounsellingEvent[] = [
  {
    id: "1",
    eventName: "JEE Main Counselling 2024",
    institution: "JoSAA",
    startingDate: "2024-06-15",
    endingDate: "2024-07-31",
    mode: "Online",
    status: "Upcoming",
    category: "Engineering"
  },
  {
    id: "2",
    eventName: "NEET UG Counselling 2024",
    institution: "MCC",
    startingDate: "2024-07-01",
    endingDate: "2024-08-15",
    mode: "Online",
    status: "Upcoming",
    category: "Medical"
  },
  {
    id: "3",
    eventName: "CLAT Counselling 2024",
    institution: "CLAT Consortium",
    startingDate: "2024-05-20",
    endingDate: "2024-06-30",
    mode: "Online",
    status: "Ongoing",
    category: "Law"
  },
  {
    id: "4",
    eventName: "COMEDK Counselling 2024",
    institution: "COMEDK",
    startingDate: "2024-06-01",
    endingDate: "2024-07-15",
    mode: "Online",
    status: "Upcoming",
    category: "Engineering"
  },
  {
    id: "5",
    eventName: "AIIMS MBBS Counselling 2024",
    institution: "AIIMS Delhi",
    startingDate: "2024-06-10",
    endingDate: "2024-07-05",
    mode: "Online",
    status: "Upcoming",
    category: "Medical"
  },
  {
    id: "6",
    eventName: "CAT Counselling 2024",
    institution: "IIM Consortium",
    startingDate: "2024-01-15",
    endingDate: "2024-04-30",
    mode: "Online",
    status: "Ongoing",
    category: "Management"
  },
  {
    id: "7",
    eventName: "KVPY Fellowship Counselling",
    institution: "IISc Bangalore",
    startingDate: "2024-05-01",
    endingDate: "2024-05-31",
    mode: "Hybrid",
    location: "Bangalore",
    status: "Ongoing",
    category: "General"
  },
  {
    id: "8",
    eventName: "State Engineering Counselling - TN",
    institution: "TNEA",
    startingDate: "2024-07-01",
    endingDate: "2024-08-15",
    mode: "Online",
    status: "Upcoming",
    category: "Engineering"
  },
  {
    id: "9",
    eventName: "Delhi University Counselling",
    institution: "University of Delhi",
    startingDate: "2024-06-20",
    endingDate: "2024-08-10",
    mode: "Online",
    status: "Upcoming",
    category: "General"
  },
  {
    id: "10",
    eventName: "BITSAT Counselling 2024",
    institution: "BITS Pilani",
    startingDate: "2024-06-25",
    endingDate: "2024-07-20",
    mode: "Online",
    status: "Upcoming",
    category: "Engineering"
  }
];

const STATUS_OPTIONS = ["All", "Upcoming", "Ongoing", "Closed"];
const MODE_OPTIONS = ["All", "Online", "Offline", "Hybrid"];
const CATEGORY_OPTIONS = ["All", "Engineering", "Medical", "Law", "General", "Management"];

const Counselling = () => {
  const [events, setEvents] = useState<CounsellingEvent[]>(COUNSELLING_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState<CounsellingEvent[]>(COUNSELLING_EVENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "All",
    mode: "All",
    category: "All"
  });

  useState(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.institution.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "All") {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    if (filters.mode !== "All") {
      filtered = filtered.filter(event => event.mode === filters.mode);
    }

    if (filters.category !== "All") {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    setFilteredEvents(filtered);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-info text-info-foreground";
      case "Ongoing":
        return "bg-success text-success-foreground";
      case "Closed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Online":
        return <Monitor className="h-4 w-4" />;
      case "Offline":
        return <MapPin className="h-4 w-4" />;
      case "Hybrid":
        return <Users className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Upcoming Counselling Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with counselling schedules for scholarships and entrance exams
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Search & Filter Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events or institutions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Mode</label>
                  <Select value={filters.mode} onValueChange={(value) => setFilters(prev => ({ ...prev, mode: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MODE_OPTIONS.map((mode) => (
                        <SelectItem key={mode} value={mode}>{mode}</SelectItem>
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
                      {CATEGORY_OPTIONS.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Counselling Schedule ({filteredEvents.length} events)</CardTitle>
              <CardDescription>
                Complete list of counselling events with dates and registration details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="space-y-1">
                            <div>{event.eventName}</div>
                            <Badge variant="outline" className="text-xs">
                              {event.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{event.institution}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(event.startingDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(event.endingDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getModeIcon(event.mode)}
                            <span>{event.mode}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {event.location ? (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-info">
                  {events.filter(e => e.status === "Upcoming").length}
                </div>
                <p className="text-xs text-muted-foreground">Starting soon</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ongoing Events</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {events.filter(e => e.status === "Ongoing").length}
                </div>
                <p className="text-xs text-muted-foreground">Active now</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Events</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {events.filter(e => e.mode === "Online").length}
                </div>
                <p className="text-xs text-muted-foreground">Virtual counselling</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Counselling;