
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import FilterTags from "@/components/FilterTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

// Sample data for demonstration
const availableTagsData = [
  "JavaScript", "React", "CSS", "HTML", "TypeScript", 
  "Node.js", "Python", "Design", "Productivity", "Tools",
  "API", "Backend", "Frontend", "Mobile", "Web", "UI/UX",
  "Database", "Performance", "Security", "DevOps"
];

// Generate events for the calendar
const generateEvents = () => {
  const today = new Date();
  const events = [];
  
  for (let i = -15; i < 15; i++) {
    const date = addDays(today, i);
    
    // Add 0-3 events per day
    const numEvents = Math.floor(Math.random() * 4);
    
    for (let j = 0; j < numEvents; j++) {
      const tagIndex = Math.floor(Math.random() * availableTagsData.length);
      
      events.push({
        id: `event-${i}-${j}`,
        title: `${availableTagsData[tagIndex]} Update`,
        date,
        tag: availableTagsData[tagIndex]
      });
    }
  }
  
  return events;
};

const events = generateEvents();

const CalendarPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Filter events for the selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];
  
  // Filter events by selected tags
  const filteredEvents = selectedTags.length > 0
    ? selectedDateEvents.filter(event => selectedTags.includes(event.tag))
    : selectedDateEvents;
  
  return (
    <div className="space-y-6">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full pointer-events-auto"
              modifiers={{
                hasEvent: (date) =>
                  events.some(
                    (event) =>
                      event.date.getDate() === date.getDate() &&
                      event.date.getMonth() === date.getMonth() &&
                      event.date.getFullYear() === date.getFullYear()
                  ),
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--accent))",
                  color: "hsl(var(--accent-foreground))",
                },
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate 
                ? `Events for ${format(selectedDate, "MMMM d, yyyy")}` 
                : "Select a date to view events"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="p-4 border rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="outline">{event.tag}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {format(event.date, "hh:mm a")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No events found for this date.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map(event => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-4 border rounded-md hover:bg-muted transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(event.date, "MMMM d, yyyy 'at' hh:mm a")}
                    </p>
                  </div>
                  <Badge variant="outline">{event.tag}</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
