import React, { useState, createContext, useContext, useEffect } from 'react';
import { 
  Home, Gift, History, User, Search, Filter,
  TrendingUp, Coffee, Utensils, Cookie, Leaf,
  Heart, HeartOff, Star, Navigation, Share2,
  ThumbsUp, MapPin, Clock, Sparkles, Award, 
  Flame, ChevronRight, Settings, Bell, 
  ShoppingCart, Calendar, Trophy, Tag,
  Menu, X, Plus, Minus, Map, MessageCircle,
  Crown, Zap, CheckCircle2, Circle, QrCode,
  Camera, Users, DollarSign, ChevronLeft,
  ChevronDown, ArrowLeft
} from 'lucide-react';

const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Define SAMPLE_DATA 
const SAMPLE_DATA = {
  user: {
    id: 1,
    name: "John Doe",
    points: 2850,
    level: 4,
    pointsToNextLevel: 150,
    notifications: [
      {
        id: 1,
        type: 'achievement',
        title: 'New Achievement!',
        message: 'You\'ve unlocked "Food Explorer"',
        timestamp: '2m ago',
        unread: true
      }
    ],
    achievements: [
      { 
        id: 1, 
        title: "First Order", 
        description: "Place your first order", 
        completed: true, 
        icon: "🎉" 
      },
      { 
        id: 2, 
        title: "Social Butterfly", 
        description: "Share 5 reviews", 
        completed: true, 
        icon: "🦋" 
      },
      {
        id: 3,
        title: "Gourmet Explorer",
        description: "Try 10 different cuisines",
        progress: 7,
        total: 10,
        icon: "🌎"
      }
    ],
    pointsHistory: [
      {
        id: 1,
        amount: 150,
        type: "earned",
        description: "Order at Sushi Palace",
        date: "2024-03-15"
      },
      {
        id: 2,
        amount: 500,
        type: "earned",
        description: "Monthly Challenge Completed",
        date: "2024-03-14"
      }
    ],
    membershipTier: {
      current: "Gold",
      next: "Platinum",
      progress: 75,
      benefits: [
        "1.5x Points on all orders",
        "Priority support",
        "Exclusive events access",
        "Special birthday rewards"
      ]
    }
  },
  promotions: [
    {
      id: 1,
      title: "Weekend Special",
      description: "2X points on all orders",
      period: "Sat-Sun",
      image: "/api/placeholder/400/200",
      backgroundColor: "from-purple-500 to-blue-500"
    },
    {
      id: 2,
      title: "Happy Hour",
      description: "3X points on drinks",
      period: "4PM-7PM Daily",
      image: "/api/placeholder/400/200",
      backgroundColor: "from-orange-500 to-red-500"
    }
  ],
  combinations: [
    {
      id: 1,
      mainDish: {
        name: "Spicy Hotpot Set",
        restaurant: "Happy Hotpot",
        image: "https://www.yireservation.com/wp-content/uploads/2016/11/IMG_7638.jpg"
      },
      pairedDish: {
        name: "Mango Boba Tea",
        restaurant: "Boba Palace",
        image: "https://plantbasedjess.com/wp-content/uploads/2024/04/IMG_0385-500x375.jpg"
      },
      rating: 4.8,
      timing: "Perfect for dinner",
      popularity: 92,
      bonusPoints: 200
    },
    {
      id: 2,
      mainDish: {
        name: "Signature Sushi Platter",
        restaurant: "Sakura Sushi",
        image: "https://s3-media0.fl.yelpcdn.com/bphoto/Au6Y2-J8LD9yvpMUmelJRg/1000s.jpg"
      },
      pairedDish: {
        name: "Matcha Ice Cream",
        restaurant: "Sweet Dreams",
        image: "https://www.siftandsimmer.com/wp-content/uploads/2020/07/matcha-mochi-ice-cream1.jpg"
      },
      rating: 4.9,
      timing: "Lunch special",
      popularity: 88,
      bonusPoints: 150
    }
  ],
  trending: [
    {
      id: 1,
      name: "Truffle Ramen",
      restaurant: "Ramen House",
      rating: 4.7,
      points: 100,
      image: "https://132980698.cdn6.editmysite.com/uploads/1/3/2/9/132980698/s816077337330137836_p231_i1_w5184.jpeg"
    },
    {
      id: 2,
      name: "Dragon Roll Set",
      restaurant: "Sakura Sushi",
      rating: 4.9,
      points: 150,
      image: "https://www.justonecookbook.com/wp-content/uploads/2020/06/Dragon-Roll-0286-I.jpg"
    }
  ],
  reviews: [
    {
      id: 1,
      user: "John Doe",
      rating: 4,
      date: "2024-03-15",
      content: "Amazing experience! The food was delicious and service was great.",
      photos: ["/api/placeholder/200/200", "/api/placeholder/200/200"],
      likes: 12,
      replies: [
        {
          user: "Restaurant Team",
          content: "Thank you for your kind words! We're glad you enjoyed your visit."
        }
      ]
    }
  ],
  categories: [
    { id: 'japanese', name: 'Japanese', icon: '🍱' },
    { id: 'chinese', name: 'Chinese', icon: '🥘' },
    { id: 'italian', name: 'Italian', icon: '🍝' },
    { id: 'thai', name: 'Thai', icon: '🍜' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🍹' }
  ],
  rewards: [
    {
      id: 1,
      title: "Free Dessert",
      description: "Get any dessert free with main course",
      points: 500,
      expires: "2024-04-01",
      image: "https://therecipecritic.com/wp-content/uploads/2021/11/cremebrulee-1.jpg",
      qrCode: "DESSERT500",
      terms: [
        "Cannot be combined with other offers",
        "Valid for dine-in only",
        "One reward per table"
      ],
      howToUse: [
        "Show this reward at the restaurant",
        "Valid at all participating locations",
        "Must be redeemed before expiration"
      ],
      popular: true
    },
    {
      id: 2,
      title: "$10 Off Next Order",
      description: "Valid on orders above $30",
      points: 1000,
      expires: "2024-04-15",
      image: "https://d1mqafote9yg5m.cloudfront.net/sites/files/beautyfresh/REFER%20A%20FRIEND.jpg",
      qrCode: "OFF10",
      terms: [
        "Minimum order value $30",
        "Valid once per account",
        "Cannot be combined with other discounts"
      ],
      howToUse: [
        "Apply code at checkout",
        "Valid for both delivery and pickup",
        "Automatically applied to eligible orders"
      ],
      popular: true
    }
  ],
  tiers: [
    {
      name: "Bronze",
      minPoints: 0,
      perks: ["Basic rewards", "Points on orders"]
    },
    {
      name: "Silver",
      minPoints: 1000,
      perks: ["1.2x points multiplier", "Free delivery"]
    },
    {
      name: "Gold",
      minPoints: 2500,
      perks: ["1.5x points multiplier", "Priority support", "Exclusive events"]
    },
    {
      name: "Platinum",
      minPoints: 5000,
      perks: ["2x points multiplier", "VIP support", "Special gifts"]
    }
  ],
  events: [
    {
      id: 1,
      title: "Weekend Double Points",
      description: "Earn 2x points on all orders this weekend",
      period: "Sat-Sun, 11 AM - 10 PM",
      multiplier: 2,
      image: "https://pbs.twimg.com/media/EGiXROSWwAA3NvC.jpg",
      backgroundColor: "from-purple-500 to-blue-500"
    },
    {
      id: 2,
      title: "Happy Hour Boost",
      description: "3x points on all drinks during happy hour",
      period: "Mon-Fri, 4 PM - 7 PM",
      multiplier: 3,
      image: "https://thesocialsetters.com/wp-content/uploads/2020/08/happy-hour-cocktails.jpg",
      backgroundColor: "from-orange-500 to-red-500"
    }
  ]
};

// Define the AppProvider
const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(SAMPLE_DATA.user);
    const [cart, setCart] = useState([]);
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);
  
    const updatePoints = (amount) => {
      setUser(prev => ({
        ...prev,
        points: prev.points + amount
      }));
    };
  
    const addToCart = (item) => {
      setCart(prev => [...prev, item]);
    };
  
    const removeFromCart = (itemId) => {
      setCart(prev => prev.filter(item => item.id !== itemId));
    };
  
    const clearCart = () => {
      setCart([]);
    };
  
    const addNotification = (notification) => {
      setNotifications(prev => [notification, ...prev]);
    };
  
    const markNotificationAsRead = (notificationId) => {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, unread: false }
            : notif
        )
      );
    };
  
    const value = {
      user,
      updatePoints,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      notifications,
      addNotification,
      markNotificationAsRead
    };
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };

// Home Tab Components
const CombinationCard = ({ combo }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex relative">
        <div className="w-1/2 relative">
          <img 
            src={combo.mainDish.image} 
            alt={combo.mainDish.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <div className="text-white">
              <div className="font-bold text-sm">{combo.mainDish.name}</div>
              <div className="text-xs">{combo.mainDish.restaurant}</div>
            </div>
          </div>
        </div>
        
        <div className="absolute left-1/2 top-24 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-lg">
            +
          </div>
        </div>

        <div className="w-1/2 relative">
          <img 
            src={combo.pairedDish.image} 
            alt={combo.pairedDish.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <div className="text-white">
              <div className="font-bold text-sm">{combo.pairedDish.name}</div>
              <div className="text-xs">{combo.pairedDish.restaurant}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Perfect Pairing</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{combo.rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{combo.timing}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600">{combo.popularity}% Popular</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-purple-600">Earn {combo.bonusPoints} bonus points</span>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg mt-2 transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Order Combo
          </button>
        </div>
      </div>
    </div>
  );
};

const PromotionCard = ({ promotion }) => (
  <div className={`bg-gradient-to-r ${promotion.backgroundColor} rounded-lg p-4 text-white`}>
    <h3 className="font-bold text-lg mb-1">{promotion.title}</h3>
    <p className="text-sm opacity-90 mb-2">{promotion.description}</p>
    <div className="flex items-center space-x-2 text-sm">
      <Clock className="w-4 h-4" />
      <span>{promotion.period}</span>
    </div>
  </div>
);

const HomeTab = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Actions Component
  const QuickActions = () => (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { icon: MapPin, label: 'Nearby', action: 'nearby' },
        { icon: Heart, label: 'Favorites', action: 'favorites' },
        { icon: Clock, label: 'Recent', action: 'recent' },
        { icon: Star, label: 'Offers', action: 'offers' }
      ].map(({ icon: Icon, label, action }) => (
        <button
          key={action}
          className="flex flex-col items-center space-y-1"
        >
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Icon className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="pb-16">
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-2xl font-bold">{SAMPLE_DATA.user.points}</h2>
            <p className="text-sm opacity-90">Available Points</p>
          </div>
          <Trophy className="w-8 h-8" />
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white"
            style={{ width: '75%' }}
          />
        </div>
        <p className="text-sm mt-2">{SAMPLE_DATA.user.pointsToNextLevel} points to next reward</p>
      </div>

      {/* Search and Filters */}
      <div className="pt-4 pb-2 bg-gradient-to-b from-purple-50 to-transparent z-40 px-4">
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or restaurants..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full ${showFilters ? 'bg-purple-500 text-white' : 'bg-white'}`}
          >
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {['Vegetarian 🥬', 'Vegan 🌱', 'Gluten Free 🌾', 'Spicy 🌶️', 'Halal 🍖'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1 rounded-full text-sm bg-white text-gray-600 border border-gray-200"
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        <QuickActions />

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {SAMPLE_DATA.categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-1 p-3 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-white text-gray-600'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Promotions */}
      <div className="px-4 my-6 space-y-4">
        <h2 className="text-lg font-bold">Current Promotions</h2>
        {SAMPLE_DATA.promotions.map(promotion => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </div>

      {/* Perfect Combinations */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-4">Perfect Combinations</h2>
        <div className="space-y-4">
          {SAMPLE_DATA.combinations.map(combo => (
            <CombinationCard key={combo.id} combo={combo} />
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Trending Now 🔥</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {SAMPLE_DATA.trending.map(item => (
            <div key={item.id} className="flex-shrink-0 w-64">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.restaurant}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-600">{item.points} pts</span>
                    <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Rewards Tab Components
const RewardCard = ({ reward, onRedeem, onShowQR }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <img
      src={reward.image}
      alt={reward.title}
      className="w-full h-32 object-cover"
    />
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{reward.title}</h3>
          <p className="text-sm text-gray-500">{reward.description}</p>
        </div>
        {reward.popular && (
          <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center space-x-1 text-purple-600">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold">{reward.points}</span>
          <span className="text-sm">pts</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onShowQR(reward)}
            className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200"
          >
            <QrCode className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onRedeem(reward)}
            className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm hover:bg-purple-600"
          >
            Redeem
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Expires: {reward.expires}
      </div>
    </div>
  </div>
);

const TierProgress = ({ currentPoints, tiers }) => {
  const currentTier = tiers.reduceRight((acc, tier) => 
    currentPoints >= tier.minPoints ? tier : acc
  );
  
  const nextTier = tiers.find(tier => tier.minPoints > currentPoints);
  const progress = nextTier 
    ? ((currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">{currentTier.name}</h3>
          {nextTier && (
            <p className="text-sm text-gray-500">
              {nextTier.minPoints - currentPoints} points to {nextTier.name}
            </p>
          )}
        </div>
        <Crown className="w-6 h-6 text-purple-500" />
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentTier.perks.map((perk, index) => (
          <div 
            key={index}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{perk}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
        {achievement.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold">{achievement.title}</h3>
        <p className="text-sm text-gray-500">{achievement.description}</p>
        {achievement.progress !== undefined && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {achievement.progress} / {achievement.total}
            </div>
          </div>
        )}
      </div>
      {achievement.completed && (
        <CheckCircle2 className="w-6 h-6 text-green-500" />
      )}
    </div>
  </div>
);

const RewardDetailModal = ({ reward, onClose, onRedeem }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
      <div className="relative">
        <img
          src={reward.image}
          alt={reward.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">{reward.title}</h2>
            <p className="text-gray-500">{reward.description}</p>
          </div>
          <div className="flex items-center space-x-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold">{reward.points}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold mb-2">How to use</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {reward.howToUse.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-bold mb-2">Terms & Conditions</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {reward.terms.map((term, index) => (
                <li key={index}>• {term}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onRedeem(reward)}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600"
          >
            Redeem {reward.points} Points
          </button>
        </div>
      </div>
    </div>
  </div>
);

const QRCodeModal = ({ reward, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-sm mx-4">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{reward.title}</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col items-center">
        <div className="w-48 h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          {/* Placeholder for actual QR code */}
          <div className="text-center text-gray-500">
            <QrCode className="w-12 h-12 mx-auto mb-2" />
            <div className="text-sm font-medium">{reward.qrCode}</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Show this QR code at the restaurant to redeem your reward
        </p>
      </div>
    </div>
  </div>
);

const RedeemConfirmationModal = ({ reward, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6">
      <h3 className="text-lg font-bold mb-2">Confirm Redemption</h3>
      <p className="text-gray-600 mb-4">
        Are you sure you want to redeem {reward.title} for {reward.points} points?
      </p>
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(reward)}
          className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

const RewardsTab = () => {
  const [activeSection, setActiveSection] = useState('available');
  const [selectedReward, setSelectedReward] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showRedeemConfirmation, setShowRedeemConfirmation] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setShowRedeemConfirmation(true);
  };

  const handleConfirmRedeem = (reward) => {
    // Handle the redemption logic here
    console.log('Redeeming reward:', reward);
    setShowRedeemConfirmation(false);
    setSelectedReward(null);
    // You would typically make an API call here
  };

  const handleShowQR = (reward) => {
    setSelectedReward(reward);
    setShowQRCode(true);
  };

  return (
    <div className="pb-16">
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{SAMPLE_DATA.user.points}</h2>
            <p className="text-sm opacity-90">Available Points</p>
          </div>
          <Trophy className="w-8 h-8" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto">
        {['available', 'achievements', 'tiers'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeSection === section
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeSection === 'available' && (
          <div className="space-y-4">
            {SAMPLE_DATA.rewards.map(reward => (
              <RewardCard 
                key={reward.id} 
                reward={reward}
                onRedeem={handleRedeem}
                onShowQR={handleShowQR}
              />
            ))}
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="space-y-4">
            {SAMPLE_DATA.user.achievements.map(achievement => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
              />
            ))}
          </div>
        )}
        
        {activeSection === 'tiers' && (
          <TierProgress 
            currentPoints={SAMPLE_DATA.user.points}
            tiers={SAMPLE_DATA.tiers}
          />
        )}
      </div>

      {/* Modals */}
      {selectedReward && showRedeemConfirmation && (
        <RedeemConfirmationModal
          reward={selectedReward}
          onConfirm={handleConfirmRedeem}
          onCancel={() => {
            setShowRedeemConfirmation(false);
            setSelectedReward(null);
          }}
        />
      )}

      {selectedReward && showQRCode && (
        <QRCodeModal
          reward={selectedReward}
          onClose={() => {
            setShowQRCode(false);
            setSelectedReward(null);
          }}
        />
      )}

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-sm mx-4">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">Scan QR Code</h3>
              <button onClick={() => setShowScanner(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                Position the QR code within the frame to scan
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Social Tab Components
const EventCard = ({ event }) => (
  <div className={`bg-gradient-to-r ${event.backgroundColor} rounded-lg overflow-hidden shadow-md`}>
    <img
      src={event.image}
      alt={event.title}
      className="w-full h-32 object-cover"
    />
    <div className="p-4 text-white">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold text-lg">{event.title}</h3>
      </div>
      <p className="text-sm opacity-90 mb-3">{event.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>{event.period}</span>
        </div>
        <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-sm">
          <Star className="w-4 h-4" />
          <span>{event.multiplier}x Points</span>
        </div>
      </div>
    </div>
  </div>
);

const ReviewCard = ({ review, onLike, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(review.id, replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white">
            {review.user.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold">{review.user}</h4>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <p className="mt-3 text-gray-600">{review.content}</p>

      {review.photos?.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {review.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Review photo ${idx + 1}`}
              className="w-full h-24 rounded-lg object-cover"
              onClick={() => {/* Handle photo preview */}}
            />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center space-x-4 text-sm">
        <button 
          onClick={() => onLike(review.id)}
          className="flex items-center space-x-1 text-gray-500 hover:text-purple-500"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{review.likes} Helpful</span>
        </button>
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center space-x-1 text-gray-500 hover:text-purple-500"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Reply</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-500">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {showReplyForm && (
        <div className="mt-3 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowReplyForm(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReply}
              className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full hover:bg-purple-600"
            >
              Post Reply
            </button>
          </div>
        </div>
      )}

      {review.replies?.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-2">
          {review.replies.map((reply, idx) => (
            <div key={idx} className="text-sm">
              <div className="font-medium">{reply.user}</div>
              <p className="text-gray-600">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WriteReviewModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = () => {
    // In a real app, this would open a file picker
    const newPhoto = "/api/placeholder/200/200";
    setPhotos([...photos, newPhoto]);
  };

  const handleSubmit = () => {
    if (rating === 0 || !review.trim()) {
      // Show validation error
      return;
    }

    onSubmit({
      rating,
      content: review,
      photos
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Write a Review</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Rate your experience</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    value <= rating
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Add photos</p>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddPhoto}
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600"
          >
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

const SocialTab = () => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [activeSection, setActiveSection] = useState('events');

  const handleLike = (reviewId) => {
    // Handle like functionality
    console.log('Liked review:', reviewId);
  };

  const handleReply = (reviewId, content) => {
    // Handle reply functionality
    console.log('Reply to review:', reviewId, content);
  };

  const handleSubmitReview = (reviewData) => {
    // Handle review submission
    console.log('Submitted review:', reviewData);
    setShowWriteReview(false);
  };

  return (
    <div className="pb-16">
      {/* Navigation Tabs */}
      <div className="px-4 py-2 flex space-x-2 sticky top-0 bg-gray-50 z-10">
        {['events', 'reviews'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeSection === section
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeSection === 'events' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Current Events</h2>
            {SAMPLE_DATA.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Reviews</h2>
              <button
                onClick={() => setShowWriteReview(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Write Review</span>
              </button>
            </div>

            {SAMPLE_DATA.reviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onLike={handleLike}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <WriteReviewModal
          onClose={() => setShowWriteReview(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

// History Tab Components
const PointsHistoryCard = ({ transaction }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold">{transaction.description}</h3>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
      <div className={`font-bold ${
        transaction.type === 'earned' 
          ? 'text-green-500' 
          : 'text-red-500'
      }`}>
        {transaction.type === 'earned' ? '+' : '-'}
        {transaction.amount}
      </div>
    </div>
  </div>
);

const OrderHistoryCard = ({ order }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-bold">{order.restaurant}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{order.items.length} items</span>
          <span>•</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs ${
          order.status === 'Delivered' 
            ? 'bg-green-100 text-green-600'
            : 'bg-yellow-100 text-yellow-600'
        }`}>
          {order.status}
        </span>
      </div>
    </div>
    <div className="text-sm text-gray-400">{order.date}</div>
    <div className="mt-3 border-t pt-3">
      <div className="flex justify-between text-sm">
        <button className="text-purple-600 flex items-center space-x-1">
          <Star className="w-4 h-4" />
          <span>Rate Order</span>
        </button>
        <button className="text-gray-600 flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Reorder</span>
        </button>
      </div>
    </div>
  </div>
);

const HistoryTab = () => {
  const [activeSection, setActiveSection] = useState('points');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const FilterModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Filter History</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Date Range</h4>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Time' },
                { value: 'month', label: 'This Month' },
                { value: 'week', label: 'This Week' },
                { value: 'today', label: 'Today' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setDateRange(option.value)}
                  className={`w-full p-2 rounded-lg text-left ${
                    dateRange === option.value
                      ? 'bg-purple-100 text-purple-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sort By</h4>
            <div className="space-y-2">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'highest', label: 'Highest Amount' },
                { value: 'lowest', label: 'Lowest Amount' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortOrder(option.value)}
                  className={`w-full p-2 rounded-lg text-left ${
                    sortOrder === option.value
                      ? 'bg-purple-100 text-purple-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-purple-500 text-white py-2 rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
      {/* Navigation Tabs */}
      <div className="px-4 py-2 flex space-x-2 bg-gray-50 sticky top-0 z-10">
        {['points', 'orders'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-full ${
              activeSection === section
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setFilterModalOpen(true)}
          className="ml-auto p-2 rounded-full bg-white border border-gray-200"
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        {activeSection === 'points' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 text-white">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-2xl font-bold">{SAMPLE_DATA.user.points}</h2>
                  <p className="text-sm opacity-90">Current Balance</p>
                </div>
                <DollarSign className="w-8 h-8 opacity-80" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-lg font-bold">1,250</div>
                  <div className="text-sm opacity-90">Earned this month</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-lg font-bold">500</div>
                  <div className="text-sm opacity-90">Redeemed this month</div>
                </div>
              </div>
            </div>

            {SAMPLE_DATA.user.pointsHistory.map(transaction => (
              <PointsHistoryCard 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="space-y-4">
            {SAMPLE_DATA.user.recentOrders.map(order => (
              <OrderHistoryCard 
                key={order.id} 
                order={order} 
              />
            ))}
          </div>
        )}
      </div>

      {filterModalOpen && (
        <FilterModal onClose={() => setFilterModalOpen(false)} />
      )}
    </div>
  );
};

// Profile Tab Component
const ProfileTab = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const ProfileSection = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <h3 className="font-bold px-4 py-3 border-b">{title}</h3>
      {children}
    </div>
  );

  const MenuItem = ({ icon: Icon, label, action, showAlert }) => (
    <button
      onClick={action}
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <span>{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {showAlert && (
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        )}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );

  const LogoutConfirmModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6">
        <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to log out of your account?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log('Logging out...');
              setShowLogoutConfirm(false);
            }}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {SAMPLE_DATA.user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{SAMPLE_DATA.user.name}</h2>
            <p className="opacity-90">{SAMPLE_DATA.user.membershipTier.current} Member</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4" />
              <span className="text-sm">{SAMPLE_DATA.user.points} points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <ProfileSection title="Account">
          <MenuItem icon={User} label="Personal Information" action={() => {}} />
          <MenuItem icon={Bell} label="Notifications" action={() => {}} showAlert={true} />
          <MenuItem icon={Settings} label="Preferences" action={() => {}} />
        </ProfileSection>

        <ProfileSection title="Rewards">
          <MenuItem icon={Heart} label="Favorite Restaurants" action={() => {}} />
          <MenuItem icon={Gift} label="Available Rewards" action={() => {}} />
          <MenuItem icon={Star} label="Points History" action={() => {}} />
        </ProfileSection>

        <ProfileSection title="Support">
          <MenuItem icon={MessageCircle} label="Help Center" action={() => {}} />
          <MenuItem icon={Share2} label="Share App" action={() => {}} />
          <MenuItem icon={Tag} label="Terms & Privacy" action={() => {}} />
        </ProfileSection>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full px-4 py-3 text-red-500 bg-white rounded-lg shadow-sm font-medium"
        >
          Logout
        </button>
      </div>

      {showLogoutConfirm && <LogoutConfirmModal />}
    </div>
  );
};

// Header Component
const Header = ({ showBackButton, title }) => {
    const { notifications } = useAppContext();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
  
    const unreadCount = notifications.filter(n => n.unread).length;
  
    return (
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          {showBackButton ? (
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={() => setShowMenu(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <span className="font-bold text-lg">{title || 'FoodieRewards'}</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <CartButton />
          </div>
        </div>
  
        {/* Notifications Drawer */}
        {showNotifications && (
          <NotificationsDrawer 
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
  
        {/* Menu Drawer */}
        {showMenu && (
          <MenuDrawer onClose={() => setShowMenu(false)} />
        )}
      </header>
    );
  };
  
  // Cart Button Component
  const CartButton = () => {
    const { cart } = useAppContext();
    const [showCart, setShowCart] = useState(false);
  
    return (
      <>
        <button 
          onClick={() => setShowCart(true)}
          className="p-2 hover:bg-gray-100 rounded-full relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
  
        {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
      </>
    );
  };
  
  // Main App Component
  const App = () => {
    const [activeTab, setActiveTab] = useState('home');
  
    const getTabTitle = () => {
      switch (activeTab) {
        case 'home':
          return 'Home';
        case 'rewards':
          return 'Rewards';
        case 'social':
          return 'Social';
        case 'history':
          return 'History';
        case 'profile':
          return 'Profile';
        default:
          return 'FoodieRewards';
      }
    };
  
    return (
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            title={getTabTitle()}
            showBackButton={false}
          />
  
          <main className="pb-16">
            {activeTab === 'home' && <HomeTab />}
            {activeTab === 'rewards' && <RewardsTab />}
            {activeTab === 'social' && <SocialTab />}
            {activeTab === 'history' && <HistoryTab />}
            {activeTab === 'profile' && <ProfileTab />}
          </main>
  
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="flex justify-around items-center h-16">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'rewards', icon: Gift, label: 'Rewards' },
                { id: 'social', icon: Users, label: 'Social' },
                { id: 'history', icon: History, label: 'History' },
                { id: 'profile', icon: User, label: 'Profile' }
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <Icon 
                    className={`w-5 h-5 ${
                      activeTab === id ? 'text-purple-600' : 'text-gray-400'
                    }`} 
                  />
                  <span 
                    className={`text-xs ${
                      activeTab === id ? 'text-purple-600' : 'text-gray-400'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </AppProvider>
    );
  };
  
  // Helper Components
  const NotificationsDrawer = ({ notifications, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-full pb-16">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b ${notification.unread ? 'bg-purple-50' : ''}`}
            >
              <h4 className="font-bold">{notification.title}</h4>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <span className="text-xs text-gray-400 mt-1">{notification.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const MenuDrawer = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-white">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Menu</h3>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
              {SAMPLE_DATA.user.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold">{SAMPLE_DATA.user.name}</div>
              <div className="text-sm opacity-90">{SAMPLE_DATA.user.membershipTier.current} Member</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          {/* Add menu items here */}
        </div>
      </div>
    </div>
  );
  
  const CartDrawer = ({ onClose }) => {
    const { cart, removeFromCart, clearCart } = useAppContext();
  
    return (
      <div className="fixed inset-0 bg-black/50 z-50">
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg">Cart</h3>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto h-full pb-32">
            {cart.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Your cart is empty
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="p-4 border-b">
                  {/* Cart item content */}
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <button
                className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium"
                onClick={() => {/* Handle checkout */}}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
// // Main App component
// const App = () => {
//     const [activeTab, setActiveTab] = useState('home');
  
//     return (
//       <AppProvider>
//         <div className="min-h-screen bg-gray-50">
//           {/* Your app content */}
//         </div>
//       </AppProvider>
//     );
//   };
  
  export default App;
