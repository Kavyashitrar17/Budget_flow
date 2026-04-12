
export type AgeRange = '18-25' | '26-35' | '36-45' | '46-55' | '56+';
export type Profession = 'Student' | 'Freelancer' | 'Engineer' | 'Doctor' | 'Business Owner' | 'Salaried Employee' | 'Retired';

export type Suggestion = {
  title: string;
  description: string;
  icon: 'piggy' | 'bulb' | 'trend';
  gradientClass: string;
};

const gradients = [
  'from-blue-50 to-green-50',
  'from-purple-50 to-pink-50',
  'from-green-50 to-teal-50',
  'from-orange-50 to-yellow-50',
  'from-pink-50 to-indigo-50'
];

export const getSuggestionsByAgeAndProfession = (age: AgeRange, profession: Profession): Suggestion[] => {
  // Base suggestions everyone should follow
  const baseSuggestions: Suggestion[] = [
    {
      title: 'Emergency Fund',
      description: 'Keep 6 months of your monthly expenses as an emergency fund in a high-yield savings account.',
      icon: 'piggy',
      gradientClass: gradients[0]
    }
  ];

  // Age-specific suggestions
  let ageSuggestions: Suggestion[] = [];
  
  if (age === '18-25') {
    ageSuggestions = [
      {
        title: 'Start Small SIPs',
        description: 'Begin with ₹500-1000 monthly SIPs in equity mutual funds to develop a saving habit early.',
        icon: 'trend',
        gradientClass: gradients[1]
      },
      {
        title: 'Digital Banking',
        description: 'Use digital banks that offer higher interest rates on savings and zero maintenance fees.',
        icon: 'bulb',
        gradientClass: gradients[2]
      }
    ];
  } else if (age === '26-35') {
    ageSuggestions = [
      {
        title: 'Increase SIP Amount',
        description: 'Aim to invest 20-30% of your income through SIPs in a mix of equity and debt funds.',
        icon: 'trend',
        gradientClass: gradients[1]
      },
      {
        title: 'Tax-Saving Investments',
        description: 'Maximize tax benefits through ELSS funds, PPF, and NPS to reduce your tax liability.',
        icon: 'bulb',
        gradientClass: gradients[3]
      }
    ];
  } else if (age === '36-45') {
    ageSuggestions = [
      {
        title: 'Diversify Investments',
        description: 'Spread investments across mutual funds, stocks, real estate, and gold for balanced risk.',
        icon: 'trend',
        gradientClass: gradients[2]
      },
      {
        title: 'Health Insurance',
        description: 'Get comprehensive health insurance with adequate coverage for yourself and family.',
        icon: 'bulb',
        gradientClass: gradients[4]
      }
    ];
  } else if (age === '46-55') {
    ageSuggestions = [
      {
        title: 'Retirement Planning',
        description: 'Increase contributions to retirement funds and gradually shift towards safer investments.',
        icon: 'trend',
        gradientClass: gradients[3]
      },
      {
        title: 'Review Insurance',
        description: 'Reassess life and health insurance needs and ensure adequate coverage.',
        icon: 'piggy',
        gradientClass: gradients[0]
      }
    ];
  } else {
    ageSuggestions = [
      {
        title: 'Preserve Capital',
        description: 'Focus on capital preservation with fixed deposits, government bonds, and senior citizen schemes.',
        icon: 'piggy',
        gradientClass: gradients[4]
      },
      {
        title: 'Estate Planning',
        description: 'Create a will and plan the transfer of assets to heirs with minimal tax implications.',
        icon: 'bulb',
        gradientClass: gradients[1]
      }
    ];
  }
  
  // Profession-specific suggestions
  let professionSuggestions: Suggestion[] = [];
  
  if (profession === 'Student') {
    professionSuggestions = [
      {
        title: 'Education Loan Planning',
        description: 'If you have education loans, create a repayment strategy that begins with small amounts even during studies.',
        icon: 'bulb',
        gradientClass: gradients[3]
      }
    ];
  } else if (profession === 'Freelancer') {
    professionSuggestions = [
      {
        title: 'Irregular Income Planning',
        description: 'Create a buffer fund that covers 9-12 months of expenses due to income volatility.',
        icon: 'piggy',
        gradientClass: gradients[2]
      }
    ];
  } else if (profession === 'Engineer' || profession === 'Salaried Employee') {
    professionSuggestions = [
      {
        title: 'Maximize ESOP Benefits',
        description: 'If your company offers ESOPs or stock purchase plans, take full advantage of them.',
        icon: 'trend',
        gradientClass: gradients[0]
      }
    ];
  } else if (profession === 'Doctor') {
    professionSuggestions = [
      {
        title: 'Professional Indemnity',
        description: 'Invest in comprehensive professional indemnity insurance to protect against legal liabilities.',
        icon: 'bulb',
        gradientClass: gradients[4]
      }
    ];
  } else if (profession === 'Business Owner') {
    professionSuggestions = [
      {
        title: 'Business-Personal Separation',
        description: 'Maintain strict separation between business and personal finances with dedicated accounts.',
        icon: 'bulb',
        gradientClass: gradients[1]
      }
    ];
  } else if (profession === 'Retired') {
    professionSuggestions = [
      {
        title: 'Regular Income Stream',
        description: 'Set up systematic withdrawal plans (SWPs) from mutual funds for monthly income needs.',
        icon: 'trend',
        gradientClass: gradients[3]
      }
    ];
  }
  
  // Combine and limit to 5 suggestions
  return [...baseSuggestions, ...ageSuggestions, ...professionSuggestions].slice(0, 5);
};

export const getRandomNotification = (): {title: string, description: string} => {
  const notifications = [
    {
      title: 'New Opportunity',
      description: 'High-interest FD rates updated! Check latest bank offers.'
    },
    {
      title: 'Emergency Fund Progress',
      description: 'You\'ve reached 70% of your emergency fund goal!'
    },
    {
      title: 'Market Update',
      description: 'Market dip alert: Good time to increase your SIP investments.'
    },
    {
      title: 'Tax Saving',
      description: 'Only 2 months left in the financial year. Plan your tax-saving investments.'
    },
    {
      title: 'New Government Scheme',
      description: 'New Sukanya Samriddhi Yojana interest rates announced.'
    }
  ];
  
  return notifications[Math.floor(Math.random() * notifications.length)];
};
