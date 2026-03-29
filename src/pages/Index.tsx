import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GamesSection from '@/components/GamesSection';
import QuizzesSection from '@/components/QuizzesSection';
import TriviaSection from '@/components/TriviaSection';
import AboutSection from '@/components/AboutSection';
import { BookOpen, GraduationCap, Video, Play } from 'lucide-react';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onNavigate={setActiveSection} />;
      case 'videos':
        return <VideosSection />;
      case 'games':
        return <GamesSection />;
      case 'quizzes':
        return <QuizzesSection />;
      case 'trivia':
        return <TriviaSection />;
      case 'about':
        return <AboutSection />;
      default:
        return <HomeSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5e6d3] via-[#ead5bb] to-[#e8d4ba]">
      {/* Header with Logo */}
      <header className="sticky top-0 z-50 bg-[#f7ead5] border-b-4 border-[#d4a574] shadow-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Logo and Title */}
            <div className="flex items-center gap-3">
              {/* Logo - Custom Image */}
              <img 
                src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4abf.png" 
                alt="Social Studies Explorers Hub Logo" 
                className="h-16 w-auto md:h-20 object-contain"
                crossOrigin="anonymous"
              />
              <div>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#8b5a2b] tracking-wide whitespace-nowrap">
                  SOCIAL STUDIES EXPLORERS <span className="text-[#c77d3a]">HUB</span>
                </h1>
              </div>
            </div>
            
            {/* Right side - Navigation */}
            <nav className="hidden lg:flex gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'videos', label: 'Videos' },
                { id: 'games', label: 'Games' },
                { id: 'quizzes', label: 'Quizzes' },
                { id: 'trivia', label: 'Trivia Corner' },
                { id: 'about', label: 'About Us' },
              ].map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  variant="ghost"
                  className={`text-sm font-bold px-3 py-2 ${
                    activeSection === item.id
                      ? 'bg-[#8b5a2b] text-white hover:bg-[#7a4d26]'
                      : 'text-[#8b5a2b] hover:bg-[#e8d4ba]'
                  } rounded-md border-b-4 ${
                    activeSection === item.id ? 'border-[#5a3618]' : 'border-transparent'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Navigation - Below on small screens */}
            <nav className="lg:hidden absolute left-0 right-0 top-full bg-[#f7ead5] border-t-2 border-[#d4a574] px-4 py-2 flex flex-wrap gap-2 shadow-lg">
              {[
                { id: 'home', label: 'Home' },
                { id: 'videos', label: 'Videos' },
                { id: 'games', label: 'Games' },
                { id: 'quizzes', label: 'Quizzes' },
                { id: 'trivia', label: 'Trivia Corner' },
                { id: 'about', label: 'About Us' },
              ].map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  variant="ghost"
                  className={`text-sm font-bold ${
                    activeSection === item.id
                      ? 'bg-[#8b5a2b] text-white hover:bg-[#7a4d26]'
                      : 'text-[#8b5a2b] hover:bg-[#e8d4ba]'
                  } rounded-md border-b-4 ${
                    activeSection === item.id ? 'border-[#5a3618]' : 'border-transparent'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>

      <footer className="border-t-4 border-[#8b5a2b] bg-[#d4a574] py-6 text-center mt-12">
        <p className="text-[#5a3618] font-bold text-lg">
          Social Studies Explorers Hub — Grade 8 World History · For educational use
        </p>
      </footer>
    </div>
  );
}

function HomeSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div className="space-y-8">
      {/* Video Discussions Section */}
      <Card className="border-4 border-[#8b5a2b] bg-gradient-to-b from-[#8b5a2b] to-[#6b4423] p-8 shadow-2xl rounded-xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f5e6d3] mb-2 border-b-2 border-[#d4a574] pb-4 inline-block px-8">
            Video Discussions
          </h2>
          <p className="text-2xl text-[#f5e6d3] mt-4">Explore History & Society</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Imperyalismo at Kolonyalismo', thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/8204.jpg', link: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5M1ts6gNSL2dLtdiyvulul&si=rxg0iz1VMmoaWPv0' },
            { title: 'Unang Digmaang Pandaigdig', thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/f9cd.jpg', link: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5XL10eNOxLIM69zxAL-ev6&si=p0wV6K_rZV_Lw-aF' },
            { title: 'Ikalawang Digmaang Pandaigdig', thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/761e.jpg', link: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5XL10eNOxLIM69zxAL-ev6&si=p0wV6K_rZV_Lw-aF' },
            { title: 'Cold War', thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4ff0.jpg', link: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5FL-qFuaS6HktVD_LLkDzI&si=U09XqlzIl3j8Nd1Q' },
            { title: 'Globalisasyon', thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/27e2.jpg', link: 'https://youtube.com/playlist?list=PLVqSLMJqMNY4VLTEZg_MDjOOfLy6Nf8BQ&si=32Iknoip44Mub6cO' },
          ].map((video) => (
            <div
              key={video.title}
              onClick={() => window.open(video.link, '_blank')}
              className="group relative h-52 overflow-hidden rounded-xl border-4 border-[#f5e6d3] shadow-lg cursor-pointer transition-transform hover:scale-105"
            >
              <img 
                src={video.thumbnail} 
                alt={video.title}
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-black/70 border-4 border-white flex items-center justify-center text-4xl text-white group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
                <p className="text-white font-bold text-center text-lg">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Interactive Games */}
        <Card
          onClick={() => onNavigate('games')}
          className="group border-4 border-[#c77d3a] bg-gradient-to-b from-white to-[#f5e6d3] cursor-pointer transition-transform hover:scale-105 shadow-xl rounded-xl flex flex-col h-full"
        >
          <div className="border-b-4 border-[#c77d3a] pb-3 mb-4 p-6">
            <h3 className="text-2xl font-bold text-[#c77d3a] text-center">Interactive Games</h3>
          </div>
          <div className="flex-1 flex flex-col justify-between p-6 pt-0">
            <div>
              <p className="text-center text-[#5a3618] font-semibold mb-6 text-lg">
                Learn through fun activities!
              </p>
              <div className="flex justify-center mb-6">
                <div className="text-8xl">🗺️</div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg py-6 rounded-xl shadow-lg border-2 border-[#8b5a2b]">
              Play Now
            </Button>
          </div>
        </Card>

        {/* Quizzes */}
        <Card
          onClick={() => onNavigate('quizzes')}
          className="group border-4 border-[#d49240] bg-gradient-to-b from-white to-[#f5e6d3] cursor-pointer transition-transform hover:scale-105 shadow-xl rounded-xl flex flex-col h-full"
        >
          <div className="border-b-4 border-[#d49240] pb-3 mb-4 p-6">
            <h3 className="text-2xl font-bold text-[#d49240] text-center">Quizzes & Challenges</h3>
          </div>
          <div className="flex-1 flex flex-col justify-between p-6 pt-0">
            <div>
              <p className="text-center text-[#5a3618] font-semibold mb-6 text-lg">
                Test Your Social Studies Knowledge!
              </p>
              <div className="flex justify-center mb-6">
                <div className="text-8xl">📋</div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#d49240] to-[#b87835] hover:from-[#c28437] hover:to-[#a66c2f] text-white font-bold text-lg py-6 rounded-xl shadow-lg border-2 border-[#8b5a2b]">
              Take a Quiz
            </Button>
          </div>
        </Card>

        {/* Trivia Corner */}
        <Card
          onClick={() => onNavigate('trivia')}
          className="group border-4 border-[#7e9f4d] bg-gradient-to-b from-white to-[#f5e6d3] cursor-pointer transition-transform hover:scale-105 shadow-xl rounded-xl flex flex-col h-full"
        >
          <div className="border-b-4 border-[#7e9f4d] pb-3 mb-4 p-6">
            <h3 className="text-2xl font-bold text-[#7e9f4d] text-center">Trivia Corner</h3>
          </div>
          <div className="flex-1 flex flex-col justify-between p-6 pt-0">
            <div>
              <p className="text-center text-[#5a3618] font-semibold mb-6 text-lg">
                Fun Facts & History Challenges!
              </p>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="text-7xl">🌍</div>
                  <GraduationCap className="absolute -top-2 -right-2 h-10 w-10 text-[#7e9f4d]" />
                </div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#7e9f4d] to-[#6a8742] hover:from-[#708f44] hover:to-[#5d7639] text-white font-bold text-lg py-6 rounded-xl shadow-lg border-2 border-[#5a7036]">
              Explore Trivia
            </Button>
          </div>
        </Card>
      </div>

      {/* About Us Section */}
      <Card className="border-4 border-[#8b5a2b] bg-gradient-to-r from-[#f5e6d3] to-[#ead5bb] p-8 shadow-xl rounded-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-8xl">🏫</div>
          <div className="flex-1 text-center md:text-left">
            <div className="border-b-4 border-[#8b5a2b] inline-block pb-2 mb-3">
              <h3 className="text-3xl font-bold text-[#8b5a2b]">About Us</h3>
            </div>
            <p className="text-xl text-[#5a3618] font-semibold">Learn More About Our Mission</p>
          </div>
          <Button
            onClick={() => onNavigate('about')}
            className="bg-gradient-to-r from-[#8b5a2b] to-[#6b4423] hover:from-[#7a4d26] hover:to-[#5a3618] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
          >
            Read More
          </Button>
          <div className="text-8xl">🚌</div>
        </div>
      </Card>
    </div>
  );
}

function VideosSection() {
  const videos = [
    { 
      topic: 'Imperyalismo at Kolonyalismo', 
      description: 'Understand causes, methods of control, and effects on colonies.',
      thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/8204.jpg',
      videoUrl: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5M1ts6gNSL2dLtdiyvulul&si=rxg0iz1VMmoaWPv0'
    },
    { 
      topic: 'Unang Digmaang Pandaigdig', 
      description: 'Learn MAIN causes, trench warfare, and Treaty of Versailles impacts.',
      thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/f9cd.jpg',
      videoUrl: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5XL10eNOxLIM69zxAL-ev6&si=p0wV6K_rZV_Lw-aF'
    },
    { 
      topic: 'Ikalawang Digmaang Pandaigdig', 
      description: 'Explore totalitarianism, major battles, and post-war world order.',
      thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/761e.jpg',
      videoUrl: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5XL10eNOxLIM69zxAL-ev6&si=p0wV6K_rZV_Lw-aF'
    },
    { 
      topic: 'Cold War', 
      description: 'Study proxy wars, nuclear tension, and the fall of the Soviet Union.',
      thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4ff0.jpg',
      videoUrl: 'https://youtube.com/playlist?list=PLVqSLMJqMNY5FL-qFuaS6HktVD_LLkDzI&si=U09XqlzIl3j8Nd1Q'
    },
    { 
      topic: 'Globalisasyon', 
      description: 'Discover the foundations of interconnected global trade and cultures.',
      thumbnail: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/27e2.jpg',
      videoUrl: 'https://youtube.com/playlist?list=PLVqSLMJqMNY4VLTEZg_MDjOOfLy6Nf8BQ&si=32Iknoip44Mub6cO'
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="border-4 border-[#8b5a2b] bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b] mb-4">
          📹 Video Lessons
        </h2>
        <p className="text-xl text-[#5a3618]">
          Select a topic to explore short learning videos and key focus areas.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {videos.map((video) => (
          <Card 
            key={video.topic} 
            onClick={() => video.videoUrl && window.open(video.videoUrl, '_blank')}
            className={`group border-4 border-[#8b5a2b] bg-white overflow-hidden hover:shadow-2xl transition-all hover:scale-105 rounded-xl ${video.videoUrl ? 'cursor-pointer' : ''}`}
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.topic}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-black/70 border-4 border-white flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="h-10 w-10 ml-1" fill="white" />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-[#8b5a2b] text-xl group-hover:text-[#c77d3a] transition-colors">
                {video.topic}
              </h3>
              <Badge className="bg-[#f5e6d3] text-[#8b5a2b] border border-[#d4a574]">
                {video.videoUrl ? 'Watch Now' : 'Coming Soon'}
              </Badge>
              <p className="text-[#5a3618] leading-relaxed">{video.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Video Categories */}
      <Card className="border-4 border-[#d49240] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-xl rounded-xl">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-3xl font-bold text-[#8b5a2b] mb-4">More Topics Coming Soon!</h3>
          <p className="text-xl text-[#5a3618] max-w-2xl mx-auto">
            We're continuously adding more video lessons to help you explore World History. 
            Stay tuned for Geography, Economics, and Culture lessons!
          </p>
        </div>
      </Card>
    </div>
  );
}
