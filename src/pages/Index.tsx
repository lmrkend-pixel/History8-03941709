import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Gamepad2, Video, Brain, Trophy, Users } from 'lucide-react';
import GamesSection from '@/components/GamesSection';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = {
    home: <HomeSection onNavigate={setActiveSection} />,
    games: <GamesSection />,
    videos: <VideosSection />,
    quizzes: <QuizzesSection />,
    trivia: <TriviaSection />,
    about: <AboutSection />
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      <header className="sticky top-0 z-50 border-b-4 border-amber-800 bg-gradient-to-r from-amber-100 to-orange-100 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🌍</div>
              <div>
                <h1 className="text-2xl font-bold text-amber-900 md:text-3xl">
                  SOCIAL STUDIES EXPLORERS <span className="text-orange-700">HUB</span>
                </h1>
                <p className="text-sm text-amber-800">Explore History & Society</p>
              </div>
            </div>
          </div>
          <nav className="mt-4 flex flex-wrap gap-2">
            {Object.keys(sections).map((key) => (
              <Button
                key={key}
                onClick={() => setActiveSection(key)}
                variant={activeSection === key ? "default" : "outline"}
                className={`capitalize ${
                  activeSection === key
                    ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white'
                    : 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {key}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {sections[activeSection as keyof typeof sections]}
      </main>

      <footer className="border-t-4 border-amber-800 bg-gradient-to-r from-amber-200 to-orange-200 py-6 text-center">
        <p className="text-amber-900 font-semibold">
          Social Studies Explorers Hub — Grade 8 World History · For educational use
        </p>
      </footer>
    </div>
  );
}

function HomeSection({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div className="space-y-6">
      <Card className="border-4 border-amber-300 bg-gradient-to-br from-amber-900 to-orange-900 p-8 text-white shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">Video Discussions</h2>
        <p className="text-xl mb-6">Explore History & Society</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Ancient Civilizations',
            'American Revolution',
            'World War II',
            'Civics & Government'
          ].map((title) => (
            <div
              key={title}
              className="group relative h-40 cursor-pointer overflow-hidden rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-600 to-orange-700 transition-transform hover:scale-105"
              onClick={() => onNavigate('videos')}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-white bg-black/70 flex items-center justify-center text-3xl">
                  ▶
                </div>
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center font-bold">
                {title}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="border-4 border-orange-400 bg-gradient-to-br from-orange-50 to-amber-100 p-6 text-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => onNavigate('games')}
        >
          <div className="mb-4 flex justify-center">
            <Gamepad2 className="h-16 w-16 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Interactive Games</h3>
          <p className="text-amber-800 mb-4">Learn through fun activities!</p>
          <Button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700">
            Play Now
          </Button>
        </Card>

        <Card
          className="border-4 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-100 p-6 text-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => onNavigate('quizzes')}
        >
          <div className="mb-4 flex justify-center">
            <Brain className="h-16 w-16 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Quizzes</h3>
          <p className="text-amber-800 mb-4">Test your Social Studies Knowledge!</p>
          <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:from-amber-700 hover:to-yellow-700">
            Take a Quiz
          </Button>
        </Card>

        <Card
          className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-emerald-100 p-6 text-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => onNavigate('trivia')}
        >
          <div className="mb-4 flex justify-center">
            <Trophy className="h-16 w-16 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Trivia Corner</h3>
          <p className="text-amber-800 mb-4">Fun Facts & History Challenges!</p>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700">
            Explore Trivia
          </Button>
        </Card>
      </div>

      <Card className="border-4 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
        <div className="flex items-center gap-4">
          <BookOpen className="h-12 w-12 text-amber-700" />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-amber-900">About Us</h3>
            <p className="text-amber-800">Learn More About Our Mission</p>
          </div>
          <Button
            onClick={() => onNavigate('about')}
            className="bg-gradient-to-r from-amber-600 to-orange-600"
          >
            Read More
          </Button>
        </div>
      </Card>
    </div>
  );
}

function VideosSection() {
  const videos = [
    { topic: 'Imperialism and Colonialism', description: 'Understand causes, methods of control, and effects on colonies.' },
    { topic: 'World War I', description: 'Learn MAIN causes, trench warfare, and Treaty of Versailles impacts.' },
    { topic: 'World War II', description: 'Explore totalitarianism, major battles, and post-war world order.' },
    { topic: 'Cold War', description: 'Study proxy wars, nuclear tension, and the fall of the Soviet Union.' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold text-center text-amber-900">Video Lessons</h2>
      <p className="text-center text-amber-800 text-lg">
        Select a topic to explore short learning videos and key focus areas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <Card key={video.topic} className="border-2 border-amber-300 bg-white p-6 hover:shadow-xl transition-shadow">
            <div className="h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4 flex items-center justify-center">
              <Video className="h-16 w-16 text-white" />
            </div>
            <h3 className="font-bold text-amber-900 mb-2">{video.topic}</h3>
            <span className="inline-block bg-amber-200 text-amber-900 text-xs px-2 py-1 rounded-full mb-2">
              Lesson Topic
            </span>
            <p className="text-sm text-amber-800">{video.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QuizzesSection() {
  return (
    <div className="space-y-6">
      <Card className="border-4 border-amber-300 bg-white p-8">
        <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full mb-4">
          Quizzes
        </div>
        <h2 className="text-4xl font-bold text-amber-900 mb-4">Test Your Knowledge</h2>
        <p className="text-amber-800 text-lg">
          Answer topic-based quizzes with instant feedback and clear explanations.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          'Imperyalismo at Kolonyalismo',
          'Unang Digmaang Pandaigdig',
          'Ikalawang Digmaang Pandaigdig',
          'Cold War',
          'Globalisasyon'
        ].map((topic, index) => (
          <Card
            key={topic}
            className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 text-white flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              <span className="bg-amber-200 text-amber-900 text-xs px-3 py-1 rounded-full font-bold">
                AVAILABLE
              </span>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">{topic}</h3>
            <p className="text-amber-700 text-sm mb-4">Start this module</p>
            <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white">
              Start Quiz
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TriviaSection() {
  const trivia = [
    {
      topic: 'Christmas Truce (1914)',
      fact: 'Noong Unang Digmaang Pandaigdig, nagkaroon ng pansamantalang tigil-putukan na kilala bilang Christmas Truce noong 1914.'
    },
    {
      topic: 'Messenger Pigeons sa WWI',
      fact: 'Gumamit ng mga kalapati bilang tagapagdala ng mensahe noong WWI dahil mas maaasahan sila kaysa sa ibang paraan ng komunikasyon.'
    },
    {
      topic: 'Berlin Wall',
      fact: 'Ang Berlin Wall ay simbolo ng paghahati ng mundo sa panahon ng Cold War. Pinaghiwalay nito ang East at West Germany hanggang sa ito ay bumagsak noong 1989.'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-4 border-amber-300 bg-white p-8 text-center">
        <div className="inline-block h-16 w-16 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 text-white flex items-center justify-center text-3xl mb-4">
          📚
        </div>
        <h2 className="text-4xl font-bold text-amber-900 mb-4">Trivia Corner</h2>
        <p className="text-amber-800 text-lg">
          <strong>Trivia</strong> means interesting facts that make you curious.
        </p>
      </Card>

      <h3 className="text-3xl font-bold text-amber-900">Did you know?</h3>

      <div className="grid gap-6">
        {trivia.map((item) => (
          <Card key={item.topic} className="border-2 border-amber-300 bg-white p-6 hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-bold text-orange-700 mb-2">{item.topic}</h4>
            <p className="text-amber-900">{item.fact}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-6">
      <Card className="border-4 border-amber-300 bg-white p-8">
        <div className="inline-block h-16 w-16 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 text-white flex items-center justify-center text-3xl mb-4">
          📘
        </div>
        <h2 className="text-4xl font-bold text-amber-900 mb-4">About Us</h2>
        <p className="text-xl text-amber-800">
          This page summarizes the <strong>research background</strong>, <strong>purpose</strong>, and{' '}
          <strong>researcher profiles</strong> for the Social Studies Explorers Hub.
        </p>
      </Card>

      <Card className="border-2 border-amber-300 bg-white p-8">
        <h3 className="text-3xl font-bold text-teal-700 mb-4">Researcher's Background</h3>
        <p className="text-xl text-amber-900 mb-4">
          Hi! We are third-year students from Batangas State University ARASOF Nasugbu Campus, majoring in Social
          Studies. We created this website as part of our research about how social media can help improve students'
          learning in Social Studies.
        </p>
        <p className="text-xl text-amber-900">
          Based on our study, we discovered that platforms like videos and online content can make learning more fun,
          engaging, and easier to understand.
        </p>
      </Card>

      <Card className="border-2 border-amber-300 bg-white p-8">
        <h3 className="text-3xl font-bold text-teal-700 mb-4">Purpose</h3>
        <p className="text-xl text-amber-900 mb-4">The Social Studies Explorers Hub was built as a space where learners can:</p>
        <ul className="list-disc list-inside space-y-2 text-xl text-amber-900">
          <li>Watch video lessons</li>
          <li>Play interactive games</li>
          <li>Answer quizzes</li>
          <li>Explore fun history trivia</li>
        </ul>
      </Card>

      <Card className="border-2 border-amber-300 bg-white p-8">
        <h3 className="text-3xl font-bold text-teal-700 mb-4">Our Mission</h3>
        <p className="text-2xl font-bold text-amber-900 mb-4">
          "Explore the Past, Engage the Present, Learn for the Future"
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 rounded-full font-bold">
            Future Educators
          </span>
          <span className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 rounded-full font-bold">
            Interactive Learning
          </span>
          <span className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 rounded-full font-bold">
            Technology-Driven
          </span>
        </div>
        <p className="text-xl text-amber-900">
          We hope this platform helps learners enjoy World History while improving their knowledge. As future
          educators, our goal is to transform traditional learning into a more interactive, engaging, and
          technology-driven experience that supports better academic performance.
        </p>
      </Card>
    </div>
  );
}
