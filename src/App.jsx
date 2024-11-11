import React, { useState, useCallback } from 'react';
import { 
  Home, Gift, History, User, Search, Filter,
  TrendingUp, Coffee, Utensils, Cookie, Leaf,
  Heart, HeartOff, Star, Navigation, Share2,
  ThumbsUp, MapPin, Clock, Sparkles, Award, 
  Flame, ChevronRight, Settings, Bell, 
  ShoppingCart, Calendar, Trophy, Tag,
  Menu, X, Plus, Minus, Map, MessageCircle,
  Crown, Zap, CheckCircle2, Circle, QrCode,
  Camera, Users
} from 'lucide-react';

// Sample Data Structure
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
      }
    ],
    membershipTier: {
      current: "Gold",
      next: "Platinum",
      progress: 75,
      benefits: [
        "1.5x Points on all orders",
        "Priority support",
        "Exclusive events access"
      ]
    }
  },
  combinations: [
    {
      id: 1,
      mainDish: {
        name: "Spicy Hotpot Set",
        restaurant: "Happy Hotpot",
        image: "/api/placeholder/400/300"
      },
      pairedDish: {
        name: "Mango Boba Tea",
        restaurant: "Boba Palace",
        image: "/api/placeholder/400/300"
      },
      rating: 4.8,
      timing: "Perfect for dinner",
      popularity: 92,
      bonusPoints: 200
    }
  ],
  trending: [
    {
      id: 1,
      name: "Truffle Ramen",
      restaurant: "Ramen House",
      rating: 4.7,
      points: 100,
      image: "/api/placeholder/400/300"
    }
  ],
  reviews: [
    {
      id: 1,
      user: "John Doe",
      rating: 4,
      date: "2024-03-15",
      content: "Amazing experience! The food was delicious.",
      photos: ["/api/placeholder/200/200"],
      likes: 12,
      replies: []
    }
  ],
  categories: [
    { id: 'japanese', name: 'Japanese', icon: '🍱' },
    { id: 'chinese', name: 'Chinese', icon: '🥘' },
    { id: 'italian', name: 'Italian', icon: '🍝' }
  ],
  rewards: [
    {
      id: 1,
      title: "Free Dessert",
      description: "Get any dessert free with main course",
      points: 500,
      expires: "2024-04-01",
      image: "/api/placeholder/200/200",
      qrCode: "DESSERT500"
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
    }
  ]
};

// Component for Perfect Combinations card from original design
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

// Home Tab Component
const HomeTab = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        <p className="text-sm mt-2">150 points to next reward</p>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 pt-4 pb-2 bg-gradient-to-b from-purple-50 to-transparent z-40 px-4">
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
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

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { icon: MapPin, label: 'Nearby' },
            { icon: Heart, label: 'Favorites' },
            { icon: Clock, label: 'Recent' },
            { icon: Star, label: 'Offers' }
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>

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
      <div className="px-4">
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

// Rewards Tab Component
const RewardsTab = () => {
  const [activeSection, setActiveSection] = useState('available');
  const [showScanner, setShowScanner] = useState(false);

  const RewardCard = ({ reward }) => (
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
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center space-x-1 text-purple-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold">{reward.points}</span>
            <span className="text-sm">pts</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowScanner(true)}
              className="p-2 bg-purple-100 text-purple-600 rounded-full"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm">
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

  const TierProgress = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">{SAMPLE_DATA.user.membershipTier.current}</h3>
          <p className="text-sm text-gray-500">
            {SAMPLE_DATA.user.membershipTier.progress}% to {SAMPLE_DATA.user.membershipTier.next}
          </p>
        </div>
        <Crown className="w-6 h-6 text-purple-500" />
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          style={{ width: `${SAMPLE_DATA.user.membershipTier.progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {SAMPLE_DATA.user.membershipTier.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const AchievementsSection = () => (
    <div className="space-y-4">
      {SAMPLE_DATA.user.achievements.map(achievement => (
        <div key={achievement.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              {achievement.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{achievement.title}</h3>
              <p className="text-sm text-gray-500">{achievement.description}</p>
            </div>
            {achievement.completed && (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

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
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        )}

        {activeSection === 'achievements' && <AchievementsSection />}
        
        {activeSection === 'tiers' && <TierProgress />}
      </div>

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

// Social Tab Component
const SocialTab = () => {
  const ReviewCard = ({ review }) => (
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
      </div>

      <p className="mt-3 text-gray-600">{review.content}</p>

      {review.photos?.length > 0 && (
        <div className="mt-3 flex space-x-2 overflow-x-auto">
          {review.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Review photo ${idx + 1}`}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center space-x-4 text-sm">
        <button className="flex items-center space-x-1 text-gray-500">
          <ThumbsUp className="w-4 h-4" />
          <span>{review.likes} Helpful</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500">
          <MessageCircle className="w-4 h-4" />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Recent Reviews</h2>
        {SAMPLE_DATA.reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

// History Tab Component
const HistoryTab = () => {
  const [activeSection, setActiveSection] = useState('points');

  return (
    <div className="pb-16">
      <div className="px-4 py-2 flex space-x-2">
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
      </div>

      <div className="p-4">
        {activeSection === 'points' && (
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">Sushi Palace</h3>
                  <p className="text-sm text-gray-500">Order #1234</p>
                </div>
                <span className="text-green-500">+150 pts</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'orders' && (
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">Sushi Palace</h3>
                  <p className="text-sm text-gray-500">3 items • $45.99</p>
                </div>
                <button className="text-purple-500 text-sm">Reorder</button>
              </div>
              <div className="text-xs text-gray-400">Yesterday, 2:30 PM</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = () => (
  <div className="p-4 space-y-6">
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl">
        {SAMPLE_DATA.user.name.charAt(0)}
      </div>
      <div>
        <h2 className="text-xl font-bold">{SAMPLE_DATA.user.name}</h2>
        <p className="text-gray-500">{SAMPLE_DATA.user.membershipTier.current} Member</p>
      </div>
    </div>

    <div className="space-y-4">
      {[
        { icon: Settings, label: 'Settings' },
        { icon: Heart, label: 'Favorites' },
        { icon: Tag, label: 'Preferences' }
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="flex items-center justify-between w-full p-4 bg-white rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-gray-400" />
            <span>{label}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      ))}
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main>
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
                className={`w-5 h-5 ${activeTab === id ? 'text-purple-600' : 'text-gray-400'}`} 
              />
              <span 
                className={`text-xs ${activeTab === id ? 'text-purple-600' : 'text-gray-400'}`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;