import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Trophy, Flag, Lightbulb, Shuffle, Clock, X, CheckCircle2, XCircle } from 'lucide-react';

// Game card data
const gameCards = [
  {
    id: 'history-unmasked',
    title: 'History Unmasked',
    description: 'Guess the historical figures!',
    icon: Trophy
  },
  {
    id: 'flag-tastic',
    title: 'Flag-tastic Game',
    description: 'Identify country flags!',
    icon: Flag
  },
  {
    id: 'decode-past',
    title: 'Decode the Past',
    description: '4 pics 1 word challenge!',
    icon: Lightbulb
  },
  {
    id: 'matching',
    title: 'Matching Game',
    description: 'Match terms with definitions!',
    icon: Shuffle
  },
  {
    id: 'timeline',
    title: 'Timeline Challenge',
    description: 'Arrange events in order!',
    icon: Clock
  }
];

// History Unmasked Game Component
function HistoryUnmaskedGame({ onClose }: { onClose: () => void }) {
  const questions = [
    {
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/fcad.png',
      question: 'Siya ang arkiduke ng Austria-Hungary na ang pagkakapaslang noong 1914 ang naging mitsa ng pagsisimula ng Unang Digmaang Pandaigdig.',
      options: ['Franz Ferdinand', 'Otto von Bismarck', 'Wilhelm II', 'Nicholas II'],
      answer: 0
    },
    {
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/e5c9.png',
      question: 'Isang diktador ng Alemanya na namuno sa Nazi Party at naging pangunahing dahilan ng Ikalawang Digmaang Pandaigdig at Holocaust.',
      options: ['Joseph Stalin', 'Adolf Hitler', 'Benito Mussolini', 'Winston Churchill'],
      answer: 1
    },
    {
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/766a.png',
      question: 'Pinuno ng Soviet Union na nagpatupad ng mahigpit na pamahalaan at naging mahalagang lider sa panahon ng Ikalawang Digmaang Pandaigdig.',
      options: ['Vladimir Lenin', 'Joseph Stalin', 'Nikita Khrushchev', 'Leon Trotsky'],
      answer: 1
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswer = (selected: number) => {
    const correct = selected === questions[currentQ].answer;
    setShowFeedback(correct ? 'correct' : 'wrong');
    
    if (correct) setScore(score + 1);

    setTimeout(() => {
      setShowFeedback(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  if (gameComplete) {
    return (
      <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/{questions.length}</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-4 py-2 rounded-full font-bold">
          Score: {score}/{currentQ + 1}
        </div>
        <Button onClick={onClose} variant="ghost" size="icon">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center space-y-4">
        <img 
          src={questions[currentQ].image} 
          alt="Historical Figure"
          className="w-48 h-48 mx-auto rounded-2xl object-cover border-4 border-[#8b5a2b] shadow-2xl"
          crossOrigin="anonymous"
        />
        <p className="text-lg text-[#5a3618] font-medium">{questions[currentQ].question}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentQ].options.map((option, idx) => (
          <Button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={showFeedback !== null}
            className="p-6 text-lg font-semibold bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3] hover:scale-105 transition-all duration-300"
          >
            {option}
          </Button>
        ))}
      </div>

      {showFeedback && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 ${
            showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {showFeedback === 'correct' ? (
              <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Correct Answer!</h3>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Answer!</h3>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Flag-tastic Game Component
function FlagTasticGame({ onClose }: { onClose: () => void }) {
  const questions = [
    {
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/a83d.png',
      options: ['Philippines', 'Thailand', 'Vietnam', 'Indonesia'],
      answer: 0
    },
    {
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/b5ef.png',
      options: ['United States', 'United Kingdom', 'Australia', 'New Zealand'],
      answer: 1
    },
    {
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4d8f.png',
      options: ['Italy', 'Ireland', 'France', 'Belgium'],
      answer: 2
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswer = (selected: number) => {
    const correct = selected === questions[currentQ].answer;
    setShowFeedback(correct ? 'correct' : 'wrong');
    
    if (correct) setScore(score + 1);

    setTimeout(() => {
      setShowFeedback(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  if (gameComplete) {
    return (
      <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/{questions.length}</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-4 py-2 rounded-full font-bold">
          Score: {score}/{currentQ + 1}
        </div>
        <Button onClick={onClose} variant="ghost" size="icon">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center space-y-4">
        <p className="text-xl font-bold text-[#8b5a2b]">Which country is this?</p>
        <img 
          src={questions[currentQ].image} 
          alt="Flag"
          className="w-64 h-40 mx-auto rounded-xl border-4 border-[#8b5a2b] shadow-xl"
          crossOrigin="anonymous"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentQ].options.map((option, idx) => (
          <Button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={showFeedback !== null}
            className="p-6 text-lg font-semibold bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3] hover:scale-105 transition-all duration-300"
          >
            {option}
          </Button>
        ))}
      </div>

      {showFeedback && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 ${
            showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {showFeedback === 'correct' ? (
              <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Correct Answer!</h3>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Answer!</h3>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Main Games Section
export default function GamesSection() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <Card className="border-4 border-[#c77d3a] bg-[#f5e6d3] p-8 shadow-xl rounded-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">🎮</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b]">
            Interactive Games
          </h2>
        </div>
        <p className="text-xl text-[#5a3618]">
          Choose a game and start learning!
        </p>
      </Card>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameCards.map((game) => {
          const Icon = game.icon;
          return (
            <Card
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-[#c77d3a] bg-white"
            >
              <div className="absolute inset-0 bg-[#f5e6d3] opacity-0 group-hover:opacity-20 transition-opacity" />
              
              <div className="relative p-8 space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#8b5a2b] flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-[#8b5a2b] group-hover:text-[#d49240] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-[#5a3618]">{game.description}</p>
                </div>

                <Button className="w-full bg-[#d49240] hover:bg-[#c77d3a] text-white py-6 text-lg font-bold transition-all">
                  Play Now!
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Game Modals */}
      <Dialog open={selectedGame === 'history-unmasked'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <HistoryUnmaskedGame onClose={() => setSelectedGame(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedGame === 'flag-tastic'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <FlagTasticGame onClose={() => setSelectedGame(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedGame === 'decode-past'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl">
          <div className="text-center space-y-4 py-12">
            <div className="text-6xl">🚧</div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Coming Soon!</h3>
            <p className="text-[#5a3618]">This game is under development.</p>
            <Button onClick={() => setSelectedGame(null)} className="bg-[#d49240] hover:bg-[#c77d3a]">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedGame === 'matching'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl">
          <div className="text-center space-y-4 py-12">
            <div className="text-6xl">🚧</div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Coming Soon!</h3>
            <p className="text-[#5a3618]">This game is under development.</p>
            <Button onClick={() => setSelectedGame(null)} className="bg-[#d49240] hover:bg-[#c77d3a]">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedGame === 'timeline'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl">
          <div className="text-center space-y-4 py-12">
            <div className="text-6xl">🚧</div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Coming Soon!</h3>
            <p className="text-[#5a3618]">This game is under development.</p>
            <Button onClick={() => setSelectedGame(null)} className="bg-[#d49240] hover:bg-[#c77d3a]">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
