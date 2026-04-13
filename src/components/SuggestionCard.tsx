import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  gradientClass = 'from-blue-50 to-green-50',
}: SuggestionProps) => {

  const renderIcon = () => {
    switch (icon) {
      case 'piggy':
        return <PiggyBank className="h-5 w-5 text-green-600" />;
      case 'trend':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default:
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Card className={`group border shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${gradientClass}`}>
      
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        
        {/* ICON */}
        <div className="p-2 rounded-full bg-white shadow-sm group-hover:scale-110 transition">
          {renderIcon()}
        </div>

        {/* TITLE */}
        <CardTitle className="text-base font-semibold">
          {title}
        </CardTitle>

      </CardHeader>

      <CardContent>
        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

    </Card>
  );
};

export default SuggestionCard;