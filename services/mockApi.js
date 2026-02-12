// Mock API Service - Simulates Google Shopping, Places, and Financial APIs
// Ready to replace with real API calls

// Simulates network delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Add slight randomness to prices to simulate real-time data
const addVariation = (basePrice, variation = 0.1) => {
  const variance = basePrice * variation;
  return basePrice + (Math.random() * variance * 2 - variance);
};

// Google Shopping API Mock - Real-time grocery prices
export const fetchStorePrices = async () => {
  await delay(600);
  
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  
  // Prices vary by day (Wednesday markdowns) and time
  const weekdayDiscount = dayOfWeek === 3 ? 0.15 : 0;
  const morningDiscount = hour >= 6 && hour <= 10 ? 0.05 : 0;
  const totalDiscount = 1 - weekdayDiscount - morningDiscount;
  
  return {
    timestamp: now.toISOString(),
    stores: {
      'Walmart': {
        grocery: addVariation(8.2 * totalDiscount, 0.08).toFixed(2),
        produce: addVariation(9.1 * totalDiscount, 0.12).toFixed(2),
        meat: addVariation(7.8 * totalDiscount, 0.15).toFixed(2),
        dairy: addVariation(8.5 * totalDiscount, 0.08).toFixed(2),
        savings: 15 + (weekdayDiscount > 0 ? 5 : 0)
      },
      'Target': {
        grocery: addVariation(8.8 * totalDiscount, 0.08).toFixed(2),
        produce: addVariation(9.3 * totalDiscount, 0.12).toFixed(2),
        meat: addVariation(8.2 * totalDiscount, 0.15).toFixed(2),
        dairy: addVariation(8.9 * totalDiscount, 0.08).toFixed(2),
        savings: 10 + (weekdayDiscount > 0 ? 3 : 0)
      },
      'Aldi': {
        grocery: addVariation(7.5 * totalDiscount, 0.08).toFixed(2),
        produce: addVariation(8.2 * totalDiscount, 0.12).toFixed(2),
        meat: addVariation(7.1 * totalDiscount, 0.15).toFixed(2),
        dairy: addVariation(7.8 * totalDiscount, 0.08).toFixed(2),
        savings: 22 + (weekdayDiscount > 0 ? 7 : 0)
      },
      'Whole Foods': {
        grocery: addVariation(10.5 * totalDiscount, 0.08).toFixed(2),
        produce: addVariation(11.2 * totalDiscount, 0.12).toFixed(2),
        meat: addVariation(11.8 * totalDiscount, 0.15).toFixed(2),
        dairy: addVariation(10.9 * totalDiscount, 0.08).toFixed(2),
        savings: -8
      },
      'Kroger': {
        grocery: addVariation(8.4 * totalDiscount, 0.08).toFixed(2),
        produce: addVariation(9.0 * totalDiscount, 0.12).toFixed(2),
        meat: addVariation(7.9 * totalDiscount, 0.15).toFixed(2),
        dairy: addVariation(8.6 * totalDiscount, 0.08).toFixed(2),
        savings: 12 + (weekdayDiscount > 0 ? 4 : 0)
      }
    },
    specialDeals: dayOfWeek === 3 ? [
      'Wednesday Special: 15% off produce at all stores',
      'Morning deals: Extra 5% off before 10 AM'
    ] : []
  };
};

// Google Places API Mock - Store locations and details
export const fetchNearbyStores = async (latitude = 40.7128, longitude = -74.0060) => {
  await delay(500);
  
  return {
    stores: [
      {
        name: 'Walmart Supercenter',
        distance: '1.2 miles',
        rating: 4.2,
        address: '123 Main St',
        hours: 'Open until 11:00 PM',
        busyNow: Math.random() > 0.5
      },
      {
        name: 'Aldi',
        distance: '0.8 miles',
        rating: 4.5,
        address: '456 Oak Ave',
        hours: 'Open until 9:00 PM',
        busyNow: Math.random() > 0.5
      },
      {
        name: 'Target',
        distance: '1.5 miles',
        rating: 4.3,
        address: '789 Elm St',
        hours: 'Open until 10:00 PM',
        busyNow: Math.random() > 0.5
      }
    ]
  };
};

// Recipe/Meal Cost API Mock
export const fetchMealData = async (familySize = 4) => {
  await delay(700);
  
  const costMultiplier = familySize / 4;
  
  return {
    weeklyPlan: [
      {
        day: 'Sunday',
        meal: 'Batch Cook Day',
        items: ['Slow cooker chicken (3 lbs)', 'Pasta sauce base', 'Soup vegetables'],
        cost: (35 * costMultiplier).toFixed(2),
        prep_time: '3 hours',
        calories: 450
      },
      {
        day: 'Monday',
        meal: 'Chicken Stir-Fry',
        items: ['Sunday chicken', 'Fresh vegetables', 'Rice'],
        cost: (8 * costMultiplier).toFixed(2),
        prep_time: '15 min',
        calories: 520
      },
      {
        day: 'Tuesday',
        meal: 'Pasta Night',
        items: ['Sunday sauce', 'Pasta', 'Garden salad'],
        cost: (6 * costMultiplier).toFixed(2),
        prep_time: '20 min',
        calories: 480
      },
      {
        day: 'Wednesday',
        meal: 'Chicken Tacos',
        items: ['Sunday chicken', 'Tortillas', 'Fresh toppings'],
        cost: (7 * costMultiplier).toFixed(2),
        prep_time: '15 min',
        calories: 440
      },
      {
        day: 'Thursday',
        meal: 'Veggie Soup',
        items: ['Sunday soup base', 'Fresh bread', 'Cheese'],
        cost: (5 * costMultiplier).toFixed(2),
        prep_time: '10 min',
        calories: 380
      },
      {
        day: 'Friday',
        meal: 'Homemade Pizza',
        items: ['Pizza dough', 'Toppings', 'Mozzarella'],
        cost: (9 * costMultiplier).toFixed(2),
        prep_time: '25 min',
        calories: 550
      },
      {
        day: 'Saturday',
        meal: 'Leftover Remix',
        items: ['Creative use of week\'s leftovers'],
        cost: (3 * costMultiplier).toFixed(2),
        prep_time: '10 min',
        calories: 420
      }
    ],
    totalCost: (73 * costMultiplier).toFixed(2),
    takeoutEquivalent: (240 * costMultiplier).toFixed(2),
    savings: (167 * costMultiplier).toFixed(2)
  };
};

// Financial Data API Mock - Investment returns, interest rates
export const fetchFinancialData = async () => {
  await delay(400);
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Simulates slightly fluctuating market data
  const marketVariation = Math.sin(month) * 0.005;
  
  return {
    marketData: {
      sp500Return: (0.07 + marketVariation).toFixed(4),
      savingsRate: (0.045 + addVariation(0, 0.002)).toFixed(3),
      inflationRate: (0.032).toFixed(3),
      year: year
    },
    recommendations: {
      emergencyFundMonths: 3,
      stockAllocation: 0.8,
      bondAllocation: 0.2
    }
  };
};

// Home DIY Cost API Mock
export const fetchDIYPrices = async () => {
  await delay(600);
  
  // Prices vary slightly by season and demand
  const season = new Date().getMonth();
  const seasonMultiplier = season >= 3 && season <= 8 ? 1.1 : 0.95; // Higher in spring/summer
  
  return {
    projects: [
      {
        name: 'Interior Painting',
        difficulty: 'Easy',
        diy_cost: (120 * seasonMultiplier).toFixed(0),
        pro_cost: (850 * seasonMultiplier).toFixed(0),
        time: '1 weekend',
        savings: (730 * seasonMultiplier).toFixed(0),
        materials: ['Paint ($45)', 'Rollers ($15)', 'Tape ($8)', 'Drop cloths ($12)', 'Brushes ($25)', 'Primer ($15)'],
        steps: [
          'Clear and cover furniture',
          'Apply painter\'s tape to edges',
          'Prime walls if needed',
          'Apply first coat with roller',
          'Wait 4 hours, apply second coat',
          'Remove tape while paint is slightly wet'
        ]
      },
      {
        name: 'Install Light Fixtures',
        difficulty: 'Medium',
        diy_cost: (45 * seasonMultiplier).toFixed(0),
        pro_cost: (280 * seasonMultiplier).toFixed(0),
        time: '2-3 hours',
        savings: (235 * seasonMultiplier).toFixed(0),
        materials: ['Light fixture ($30)', 'Wire nuts ($3)', 'Wire stripper ($8)', 'Voltage tester ($4)'],
        steps: [
          'Turn off circuit breaker',
          'Test wires with voltage tester',
          'Remove old fixture',
          'Match wire colors (black-black, white-white, ground-ground)',
          'Secure new fixture',
          'Test and restore power'
        ]
      }
    ],
    averageSavings: 320,
    seasonalNote: season >= 3 && season <= 8 
      ? 'Spring/Summer: Higher demand means higher pro costs - great time to DIY!'
      : 'Fall/Winter: Lower demand means better deals on materials!'
  };
};

// Utility Savings API Mock - Real-time utility rates
export const fetchUtilityRates = async () => {
  await delay(500);
  
  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth();
  
  // Peak hours: 4 PM - 9 PM cost more
  const isPeak = hour >= 16 && hour <= 21;
  const isWinter = month >= 11 || month <= 2;
  
  return {
    electricity: {
      current_rate: isPeak ? 0.18 : 0.12,
      unit: '$/kWh',
      peak_hours: '4 PM - 9 PM',
      offpeak_hours: '9 PM - 4 PM',
      monthly_average: isWinter ? 145 : 98
    },
    gas: {
      current_rate: 0.95,
      unit: '$/therm',
      monthly_average: isWinter ? 85 : 32
    },
    water: {
      current_rate: 4.50,
      unit: '$/1000 gallons',
      monthly_average: 45
    },
    tips: [
      isPeak ? '⚡ Peak hours now - avoid heavy appliances' : '✅ Off-peak - good time for laundry/dishes',
      isWinter ? '🌡️ Keep thermostat at 68°F to save $30-50/month' : '🌡️ AC at 78°F saves $30-50/month',
      'LED bulbs save $15-20/month instantly'
    ]
  };
};

// Quick Wins/Tips API Mock
export const fetchDailyTips = async (category = 'all') => {
  await delay(300);
  
  const allTips = {
    groceries: [
      { tip: 'Shop Aldi or Walmart for basics', savings: '$40-60/week', impact: 'high', verified: true },
      { tip: 'Buy store brands instead of name brands', savings: '$25-35/week', impact: 'high', verified: true },
      { tip: 'Meal plan before shopping', savings: '$30-50/week', impact: 'high', verified: true },
      { tip: 'Use cashback apps (Ibotta, Fetch)', savings: '$10-20/week', impact: 'medium', verified: true },
      { tip: 'Buy frozen fruits/veggies', savings: '$15-25/week', impact: 'medium', verified: true }
    ],
    utilities: [
      { tip: 'LED bulbs in every socket', savings: '$15-20/month', impact: 'high', verified: true },
      { tip: 'Programmable thermostat', savings: '$30-50/month', impact: 'high', verified: true },
      { tip: 'Unplug devices when not in use', savings: '$10-15/month', impact: 'medium', verified: true },
      { tip: 'Wash clothes in cold water', savings: '$8-12/month', impact: 'medium', verified: true }
    ],
    subscriptions: [
      { tip: 'Cancel unused streaming services', savings: '$15-30/month', impact: 'high', verified: true },
      { tip: 'Share family plans', savings: '$20-40/month', impact: 'high', verified: true },
      { tip: 'Switch to free checking account', savings: '$12-25/month', impact: 'medium', verified: true }
    ]
  };
  
  if (category === 'all') {
    return {
      daily_tip: allTips.groceries[Math.floor(Math.random() * allTips.groceries.length)],
      categories: allTips,
      total_tips: Object.values(allTips).flat().length
    };
  }
  
  return {
    tips: allTips[category] || [],
    category: category
  };
};

// Investment platforms comparison API Mock
export const fetchInvestmentPlatforms = async () => {
  await delay(500);
  
  return {
    platforms: [
      {
        name: 'Vanguard',
        min_investment: 0,
        fees: '0.04%',
        rating: 4.8,
        best_for: 'Long-term index investing',
        features: ['Low fees', 'Index funds', 'Retirement focus'],
        signup_bonus: null
      },
      {
        name: 'Fidelity',
        min_investment: 0,
        fees: '0%',
        rating: 4.9,
        best_for: 'Beginner friendly with great tools',
        features: ['Zero fees', 'Great research tools', '24/7 support'],
        signup_bonus: '$100 (deposit $50+)'
      },
      {
        name: 'Schwab',
        min_investment: 0,
        fees: '0%',
        rating: 4.8,
        best_for: 'Excellent customer service',
        features: ['No fees', 'Great customer support', 'Banking integration'],
        signup_bonus: null
      },
      {
        name: 'Robinhood',
        min_investment: 1,
        fees: '0%',
        rating: 4.2,
        best_for: 'Simple app, fractional shares',
        features: ['Easy mobile app', 'Fractional shares', 'Crypto trading'],
        signup_bonus: 'Free stock'
      }
    ],
    last_updated: new Date().toISOString()
  };
};

// Progress Tracking API Mock
export const fetchUserProgress = async () => {
  await delay(400);
  
  const now = new Date();
  const dayOfMonth = now.getDate();
  const monthProgress = dayOfMonth / 30;
  
  // Simulate user's growing savings over the month
  return {
    monthly: {
      groceries_saved: Math.round(240 * monthProgress),
      emergency_fund: Math.round(1200 + (dayOfMonth * 15)),
      investment_balance: Math.round(850 + (dayOfMonth * 8)),
      total_saved: Math.round(520 * monthProgress),
      goal: 520,
      progress: Math.min(monthProgress, 1)
    },
    yearly: {
      total_saved: Math.round(520 * monthProgress * 12),
      projected_year_end: 6240
    },
    streak_days: dayOfMonth,
    achievements: [
      dayOfMonth >= 7 ? 'Week Warrior - 7 days of tracking' : null,
      monthProgress >= 0.5 ? 'Half Month Hero - 50% to goal' : null,
      dayOfMonth >= 30 ? 'Month Master - Full month completed!' : null
    ].filter(Boolean)
  };
};
