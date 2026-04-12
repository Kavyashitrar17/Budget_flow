
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import SuggestionCard from '@/components/SuggestionCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BrainCircuit, MoonStar, Sun } from 'lucide-react';
import { AgeRange, Profession, getSuggestionsByAgeAndProfession, getRandomNotification } from '@/utils/savingsSuggestions';

const SmartSavingSuggestions = () => {
  const [ageRange, setAgeRange] = useState<AgeRange>('26-35');
  const [profession, setProfession] = useState<Profession>('Salaried Employee');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const { toast } = useToast();

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('savingsPreferences', JSON.stringify({ ageRange, profession }));
  }, [ageRange, profession]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('savingsPreferences');
    if (savedPreferences) {
      const { ageRange: savedAge, profession: savedProfession } = JSON.parse(savedPreferences);
      setAgeRange(savedAge);
      setProfession(savedProfession);
    }
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Show random notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const notification = getRandomNotification();
      toast({
        title: notification.title,
        description: notification.description,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleGetSuggestions = () => {
    setIsLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      const newSuggestions = getSuggestionsByAgeAndProfession(ageRange, profession);
      setSuggestions(newSuggestions);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center">
              <BrainCircuit className="mr-2 h-8 w-8" />
              Smart Saving Suggestions
            </h1>
            <p className="text-muted-foreground">
              Personalized financial advice based on your age and profession
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center"
          >
            {darkMode ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <MoonStar className="h-4 w-4 mr-2" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
        
        <Card className="mb-8 shadow-md animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">
              Tell us about yourself
            </CardTitle>
            <CardDescription>
              We'll provide tailored savings recommendations based on your profile
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age Range</label>
                <Select value={ageRange} onValueChange={(value) => setAgeRange(value as AgeRange)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25 years</SelectItem>
                    <SelectItem value="26-35">26-35 years</SelectItem>
                    <SelectItem value="36-45">36-45 years</SelectItem>
                    <SelectItem value="46-55">46-55 years</SelectItem>
                    <SelectItem value="56+">56+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Profession</label>
                <Select value={profession} onValueChange={(value) => setProfession(value as Profession)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                    <SelectItem value="Salaried Employee">Salaried Employee</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6"
              onClick={handleGetSuggestions}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Analyzing your profile...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get Smart Suggestions
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {suggestions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center text-primary">
              <Lightbulb className="mr-2 h-6 w-6" />
              Your Personalized Saving Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className={`animate-slide-up delay-${index * 100}`}
                >
                  <SuggestionCard 
                    title={suggestion.title}
                    description={suggestion.description}
                    icon={suggestion.icon}
                    gradientClass={suggestion.gradientClass}
                  />
                </div>
              ))}
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg mt-8">
              <p className="text-sm text-accent-foreground">
                <strong>Note:</strong> These suggestions are based on general financial wisdom for your age group and profession. 
                For personalized financial advice, please consult with a certified financial advisor.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SmartSavingSuggestions;
