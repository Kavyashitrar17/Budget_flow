
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, Lightbulb, TrendingUp } from 'lucide-react';

type SuggestionProps = {
  title: string;
  description: string;
  icon?: 'piggy' | 'bulb' | 'trend';
  gradientClass?: string;
};

const SuggestionCard = ({ 
  title, 
  description, 
  icon = 'bulb',
  gradientClass = 'from-blue-50 to-green-50' 
}: SuggestionProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'piggy':
        return <PiggyBank className="h-6 w-6 text-primary" />;
      case 'trend':
        return <TrendingUp className="h-6 w-6 text-primary" />;
      case 'bulb':
      default:
        return <Lightbulb className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className={`overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in bg-gradient-to-br ${gradientClass}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 p-2 rounded-full">
          {renderIcon()}
        </div>
        <CardTitle className="text-lg text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;
