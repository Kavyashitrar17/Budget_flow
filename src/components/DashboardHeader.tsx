
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2 } from 'lucide-react';
import { toast } from 'sonner';

const DashboardHeader = () => {
  const [userName, setUserName] = useState<string>('User');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>('');
  
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
      setEditedName(savedUserName);
    }
  }, []);
  
  const handleSaveName = () => {
    if (editedName.trim()) {
      localStorage.setItem('userName', editedName.trim());
      setUserName(editedName.trim());
      setIsEditing(false);
      toast.success('Name updated successfully!');
    } else {
      toast.error('Name cannot be empty.');
    }
  };
  
  const currentDate = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <Card className="border border-border shadow-sm bg-gradient-to-r from-primary/10 to-secondary/10">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex gap-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="h-8 w-48"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleSaveName}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">
                    Welcome back, {userName}!
                  </h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                    className="h-7 w-7"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
            <p className="text-muted-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()} Budget Overview
            </p>
          </div>
          
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Track your financial goals and spending habits
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
