import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, CheckCircle2, XCircle, MapPin, Flag, Eye, Clock } from 'lucide-react';

export default function GamesSection() {
  return (
    <div className="space-y-8">
      <Card className="border-4 border-[#c77d3a] bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b] mb-4">
          🎮 Interactive Games
        </h2>
        <p className="text-xl text-[#5a3618]">
          Learn through fun activities! Practice key topics with short game-based activities.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HistoryUnmaskedGame />
        <FlagGameCard />
      </div>

      <DecodePastGame />
      
      <MatchingGame />
      
      <TimelineGame />
    </div>
  );
}

function HistoryUnmaskedGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const people = [
    { 
      clue: 'Siya ang arkiduke ng Austria-Hungary na ang pagkakapaslang noong 1914 ang naging mitsa ng pagsisimula ng Unang Digmaang Pandaigdig.', 
      answer: 'Archduke Franz Ferdinand',
      hint: 'Archduke',
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/fcad.png'
    },
    { 
      clue: 'Isang diktador ng Alemanya na namuno sa Nazi Party at naging pangunahing dahilan ng Ikalawang Digmaang Pandaigdig at Holocaust.', 
      answer: 'Adolf Hitler',
      hint: 'Führer',
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/e5c9.png'
    },
    { 
      clue: 'Pinuno ng Soviet Union na nagpatupad ng mahigpit na pamahalaan at naging mahalagang lider sa panahon ng Ikalawang Digmaang Pandaigdig.', 
      answer: 'Joseph Stalin',
      hint: 'Man of Steel',
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/766a.png'
    },
    { 
      clue: 'Pangulo ng Estados Unidos na namuno sa bansa sa panahon ng Great Depression at Ikalawang Digmaang Pandaigdig.', 
      answer: 'Franklin Roosevelt',
      hint: 'FDR',
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/24a1.png'
    },
    { 
      clue: 'Pinuno ng Soviet Union noong Cold War na kilala sa Cuban Missile Crisis at sa paglayo sa istilo ni Stalin.', 
      answer: 'Nikita Khrushchev',
      hint: 'Shoe incident UN',
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/89b9.png'
    },
    { 
      clue: 'Diktador ng Italya na nagtatag ng pasismo at nakipag-alyansa kay Hitler noong Ikalawang Digmaang Pandaigdig.', 
      answer: 'Benito Mussolini',
      hint: 'Il Duce',
      image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/d402.png'
    }
  ];

  const current = people[currentIndex];

  const checkAnswer = () => {
    const isCorrect = answer.toLowerCase().trim() === current.answer.toLowerCase();
    setAttempts(attempts + 1);
    if (isCorrect) {
      setResult('correct');
      setScore(score + 1);
    } else {
      setResult('incorrect');
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= people.length) {
      setGameOver(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
      setResult('');
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswer('');
    setResult('');
    setScore(0);
    setAttempts(0);
    setGameOver(false);
  };

  if (gameOver) {
    const percentage = Math.round((score / people.length) * 100);
    return (
      <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
        <div className="text-center space-y-6">
          <div className="text-8xl">🏆</div>
          <h3 className="text-4xl font-bold text-[#8b5a2b]">Game Complete!</h3>
          <div>
            <p className="text-6xl font-bold text-[#c77d3a] mb-2">{score}/{people.length}</p>
            <p className="text-2xl text-[#8b5a2b]">{percentage}% Correct!</p>
            <p className="text-xl text-[#8b5a2b] mt-2">Total Attempts: {attempts}</p>
          </div>
          <Button
            onClick={restart}
            className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
          >
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-6 shadow-2xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c77d3a] to-[#a0642e] flex items-center justify-center shadow-lg">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">History Unmasked</h3>
            <p className="text-sm text-[#8b5a2b]">Guess the personality!</p>
          </div>
        </div>
        <div className="bg-[#c77d3a] text-white px-4 py-1.5 rounded-full text-sm font-bold">
          {score}/{attempts}
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <img 
            src={current.image} 
            alt="Historical Figure" 
            className="w-48 h-48 object-cover rounded-xl border-4 border-[#c77d3a] shadow-lg"
            crossOrigin="anonymous"
          />
        </div>
        <p className="text-sm text-[#8b5a2b] font-semibold">
          Question {currentIndex + 1} of {people.length}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-[#f5e6d3] border-4 border-[#c77d3a] rounded-xl p-5">
          <p className="text-lg text-[#5a3618] font-semibold">
            {current.clue}
          </p>
          <p className="text-sm text-[#8b5a2b] mt-2">💡 Hint: {current.hint}</p>
        </div>

        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="border-4 border-[#d4a574] focus:border-[#c77d3a] text-lg p-6 rounded-xl"
          onKeyPress={(e) => e.key === 'Enter' && !result && checkAnswer()}
        />

        {result && (
          <div
            className={`flex items-center gap-3 p-5 rounded-xl border-4 ${
              result === 'correct'
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            {result === 'correct' ? (
              <>
                <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-900 font-bold text-lg">Correct! Well done! 🎉</p>
                  <p className="text-green-700">You guessed it right!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-900 font-bold text-lg">Not quite!</p>
                  <p className="text-red-700">
                    Your answer: <span className="font-bold text-red-900">{answer}</span>
                  </p>
                  <p className="text-green-700 font-semibold">
                    Correct answer: <span className="font-bold text-green-900">{current.answer}</span>
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {!result ? (
            <Button
              onClick={checkAnswer}
              className="flex-1 bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg py-6 rounded-xl shadow-lg"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-6 rounded-xl shadow-lg"
            >
              Next Question →
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function FlagGameCard() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const countries = [
    { name: 'Philippines', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/a83d.png' },
    { name: 'United Kingdom', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/b5ef.png' },
    { name: 'France', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4d8f.png' },
    { name: 'Argentina', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/082b.png' },
    { name: 'Australia', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/1b03.png' },
    { name: 'China', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/993c.png' },
    { name: 'Estados Unidos', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4e74.png' },
    { name: 'Thailand', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/3fbb.png' },
    { name: 'South Korea', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/f893.png' },
    { name: 'Japan', image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/1ad9.png' },
  ];

  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const answer = countries[round];
  const choices = shuffle([answer, ...shuffle(countries.filter((x) => x.name !== answer.name)).slice(0, 3)]);

  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleChoice = (choice: typeof countries[0]) => {
    setSelectedAnswer(choice.name);
    if (choice.name === answer.name) {
      setScore(score + 1);
      setResult('correct');
    } else {
      setResult(`incorrect`);
    }
    
    setTimeout(() => {
      if (round + 1 >= countries.length) {
        setGameOver(true);
      } else {
        setRound(round + 1);
        setResult('');
        setSelectedAnswer('');
      }
    }, 2000);
  };

  const restart = () => {
    setScore(0);
    setRound(0);
    setResult('');
    setGameOver(false);
  };

  if (gameOver) {
    const percentage = Math.round((score / countries.length) * 100);
    return (
      <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
        <div className="text-center space-y-6">
          <div className="text-8xl">🏆</div>
          <h3 className="text-4xl font-bold text-[#8b5a2b]">Game Complete!</h3>
          <div>
            <p className="text-6xl font-bold text-[#c77d3a] mb-2">{score}/{countries.length}</p>
            <p className="text-2xl text-[#8b5a2b]">{percentage}% Correct!</p>
          </div>
          <Button
            onClick={restart}
            className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
          >
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-6 shadow-2xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c77d3a] to-[#a0642e] flex items-center justify-center shadow-lg">
            <Flag className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Flag-tastic Game</h3>
            <p className="text-sm text-[#8b5a2b]">Guess the country!</p>
          </div>
        </div>
        <div className="bg-[#c77d3a] text-white px-4 py-1.5 rounded-full text-sm font-bold">
          {score}/{round}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#f5e6d3] border-4 border-[#c77d3a] rounded-xl p-6 text-center">
          <p className="text-sm text-[#8b5a2b] font-semibold mb-4">
            Round {round + 1} of {countries.length}
          </p>
          <div className="flex justify-center mb-4">
            <img 
              src={answer.image} 
              alt="Country Flag" 
              className="w-64 h-40 object-cover rounded-lg border-4 border-[#8b5a2b] shadow-lg"
              crossOrigin="anonymous"
            />
          </div>
          <p className="text-xl font-bold text-[#8b5a2b]">Which country is this?</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice) => (
            <Button
              key={choice.name}
              onClick={() => handleChoice(choice)}
              disabled={!!result}
              className={`h-auto py-6 text-lg font-bold rounded-xl ${
                result && choice.name === answer.name
                  ? 'bg-green-600 hover:bg-green-600 text-white border-4 border-green-700'
                  : result && choice.name === selectedAnswer && choice.name !== answer.name
                  ? 'bg-red-600 hover:bg-red-600 text-white border-4 border-red-700'
                  : result
                  ? 'bg-gray-300 hover:bg-gray-300 text-gray-500'
                  : 'bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white'
              }`}
            >
              {choice.name}
            </Button>
          ))}
        </div>

        {result && (
          <div className="space-y-2">
            {result === 'incorrect' && (
              <div className="bg-red-50 border-4 border-red-500 p-4 rounded-xl">
                <p className="text-red-900 font-bold text-center">
                  ❌ Your answer: <span className="text-red-700">{selectedAnswer}</span>
                </p>
              </div>
            )}
            <div
              className={`text-center p-5 rounded-xl font-bold text-xl border-4 ${
                result === 'correct'
                  ? 'bg-green-50 border-green-500 text-green-900'
                  : 'bg-green-50 border-green-500 text-green-900'
              }`}
            >
              {result === 'correct' ? '✅ Correct! Well done!' : `✅ Correct answer: ${answer.name}`}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function DecodePastGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const puzzles = [
    { 
      images: [
        'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/dcd4.png'
      ],
      answer: 'Imperyalismo',
      explanation: 'Ang imperyalismo ay isang patakaran kung saan pinalalawak ng isang makapangyarihang bansa ang kanyang teritoryo at impluwensya sa pamamagitan ng pananakop o kontrol sa ibang bansa.'
    },
    { 
      images: [
        'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/f0e5.png'
      ],
      answer: 'Cold War',
      explanation: 'Ang Cold War ay panahon ng matinding tensyon sa pagitan ng Estados Unidos at Soviet Union matapos ang Ikalawang Digmaang Pandaigdig, ngunit hindi ito humantong sa direktang digmaan.'
    },
    { 
      images: [
        'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/0e1b.png'
      ],
      answer: 'World War',
      explanation: 'Ang World War ay tumutukoy sa malalaking digmaang pandaigdig tulad ng Unang at Ikalawang Digmaang Pandaigdig na kinasangkutan ng maraming bansa sa iba\'t ibang kontinente.'
    },
    { 
      images: [
        'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/1137.png'
      ],
      answer: 'Kapitalismo',
      explanation: 'Ang kapitalismo ay isang sistemang pang-ekonomiya kung saan ang mga negosyo at yaman ay pagmamay-ari ng pribadong indibidwal at pinapaandar ng kompetisyon sa merkado.'
    },
    { 
      images: [
        'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/91bf.png'
      ],
      answer: 'Komunismo',
      explanation: 'Ang komunismo ay isang sistemang pang-ekonomiya at pampulitika kung saan ang mga ari-arian ay pagmamay-ari ng estado o ng buong komunidad, at layuning magkaroon ng pantay-pantay na pamumuhay.'
    }
  ];

  const current = puzzles[currentIndex];

  const checkAnswer = () => {
    const isCorrect = answer.toLowerCase().trim() === current.answer.toLowerCase().trim();
    if (isCorrect) {
      setResult('correct');
      setScore(score + 1);
      setShowExplanation(true);
    } else {
      setResult('incorrect');
      setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < puzzles.length) {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
      setResult('');
      setShowExplanation(false);
    } else {
      // Game complete
      setGameOver(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswer('');
    setResult('');
    setShowExplanation(false);
    setScore(0);
    setGameOver(false);
  };

  if (gameOver) {
    const percentage = Math.round((score / puzzles.length) * 100);
    return (
      <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
        <div className="text-center space-y-6">
          <div className="text-8xl">🏆</div>
          <h3 className="text-4xl font-bold text-[#8b5a2b]">Game Complete!</h3>
          <div>
            <p className="text-6xl font-bold text-[#c77d3a] mb-2">{score}/{puzzles.length}</p>
            <p className="text-2xl text-[#8b5a2b]">{percentage}% Correct!</p>
          </div>
          <Button
            onClick={restart}
            className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
          >
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c77d3a] to-[#a0642e] flex items-center justify-center shadow-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Decode the Past</h3>
            <p className="text-sm text-[#8b5a2b]">4 Pics 1 Word Challenge!</p>
          </div>
        </div>
        <div className="bg-[#c77d3a] text-white px-4 py-1.5 rounded-full text-sm font-bold">
          {currentIndex + 1}/{puzzles.length}
        </div>
      </div>

      <div className="space-y-6">
        {/* Image Grid - Show as 2x2 grid */}
        <div className="bg-[#f5e6d3] border-4 border-[#c77d3a] rounded-xl p-6">
          <p className="text-center text-[#8b5a2b] font-bold mb-4">Ano ang sagot? (What's the answer?)</p>
          <div className="flex justify-center">
            <img 
              src={current.images[0]} 
              alt="Puzzle" 
              className="w-full max-w-2xl rounded-lg border-4 border-[#8b5a2b] shadow-lg"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Input */}
        {!showExplanation && (
          <>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="I-type ang iyong sagot... (Type your answer...)"
              className="border-4 border-[#d4a574] focus:border-[#c77d3a] text-lg p-6 rounded-xl text-center font-bold"
              onKeyPress={(e) => e.key === 'Enter' && !result && checkAnswer()}
            />

            <Button
              onClick={checkAnswer}
              className="w-full bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg py-6 rounded-xl shadow-lg"
            >
              Check Answer
            </Button>
          </>
        )}

        {/* Result and Explanation */}
        {result && showExplanation && (
          <div className="space-y-4">
            <div
              className={`flex items-center gap-3 p-5 rounded-xl border-4 ${
                result === 'correct'
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              {result === 'correct' ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-green-900 font-bold text-lg">Tama! (Correct!) 🎉</p>
                    <p className="text-green-700">Ang sagot ay: <strong>{current.answer}</strong></p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-red-900 font-bold text-lg">Hindi tama (Not quite!)</p>
                    <p className="text-red-700">
                      Iyong sagot: <span className="font-bold text-red-900">{answer}</span>
                    </p>
                    <p className="text-green-700 font-semibold">
                      Tamang sagot: <span className="font-bold text-green-900">{current.answer}</span>
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 border-4 border-blue-500 rounded-xl p-5">
              <p className="text-blue-900 font-bold text-lg mb-2">📖 Paliwanag (Explanation):</p>
              <p className="text-blue-800 leading-relaxed">{current.explanation}</p>
            </div>

            <Button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-6 rounded-xl shadow-lg"
            >
              {currentIndex + 1 < puzzles.length ? 'Next Puzzle →' : 'Play Again'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function MatchingGame() {
  const pairs = [
    { term: 'WWI', definition: 'Started by assassination of Archduke Franz Ferdinand', icon: '⚔️' },
    { term: 'WWII', definition: 'Ended with atomic bombs on Japan', icon: '💣' },
    { term: 'Cold War', definition: 'Tension between US and USSR', icon: '❄️' },
    { term: 'Imperialism', definition: 'Policy of extending power over territories', icon: '👑' },
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const allItems = [...pairs.map(p => ({ text: p.term, type: 'term', icon: p.icon })), ...pairs.map(p => ({ text: p.definition, type: 'definition', icon: '' }))];
  const [shuffled] = useState<typeof allItems>(() => allItems.sort(() => Math.random() - 0.5));

  const handleClick = (text: string) => {
    if (matched.includes(text) || selected.includes(text)) return;

    const newSelected = [...selected, text];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const pair = pairs.find(
        p => (p.term === first && p.definition === second) || (p.term === second && p.definition === first)
      );

      if (pair) {
        setMatched([...matched, first, second]);
        setScore(score + 1);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const isComplete = matched.length === allItems.length;
  const reset = () => {
    setMatched([]);
    setSelected([]);
    setScore(0);
  };

  return (
    <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c77d3a] to-[#a0642e] flex items-center justify-center shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Matching Game</h3>
            <p className="text-sm text-[#8b5a2b]">Match terms with definitions!</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] text-white px-4 py-2">
          {score}/{pairs.length}
        </Badge>
      </div>

      {isComplete ? (
        <div className="text-center space-y-6 py-8">
          <div className="text-8xl">🎯</div>
          <p className="text-3xl font-bold text-[#8b5a2b]">Perfect! All Matched!</p>
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shuffled.map((item, idx) => (
            <Button
              key={idx}
              onClick={() => handleClick(item.text)}
              disabled={matched.includes(item.text)}
              className={`h-auto min-h-[120px] p-4 text-base whitespace-normal rounded-xl font-bold flex flex-col items-center justify-center gap-2 ${
                matched.includes(item.text)
                  ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed text-white'
                  : selected.includes(item.text)
                  ? 'bg-blue-600 hover:bg-blue-600 text-white'
                  : 'bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white'
              }`}
            >
              {item.icon && <span className="text-3xl">{item.icon}</span>}
              {item.text}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}

function TimelineGame() {
  const events = [
    { year: 1914, event: 'World War I begins', icon: '⚔️' },
    { year: 1939, event: 'World War II starts', icon: '💣' },
    { year: 1945, event: 'Atomic bombs dropped on Japan', icon: '☢️' },
    { year: 1947, event: 'Cold War begins', icon: '❄️' },
    { year: 1989, event: 'Berlin Wall falls', icon: '🧱' },
  ];

  const [shuffledEvents] = useState(() => [...events].sort(() => Math.random() - 0.5));
  const [userOrder, setUserOrder] = useState<typeof events>([]);
  const [result, setResult] = useState<string>('');

  const addToTimeline = (event: typeof events[0]) => {
    setUserOrder([...userOrder, event]);
  };

  const checkOrder = () => {
    const isCorrect = userOrder.every((e, i) => e.year === events[i].year);
    setResult(isCorrect ? 'correct' : 'incorrect');
  };

  const reset = () => {
    setUserOrder([]);
    setResult('');
  };

  return (
    <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c77d3a] to-[#a0642e] flex items-center justify-center shadow-lg">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#8b5a2b]">Timeline Challenge</h3>
          <p className="text-sm text-[#8b5a2b]">Arrange events in order!</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-[#8b5a2b] mb-4 text-lg">📚 Available Events:</h4>
          <div className="flex flex-wrap gap-3">
            {shuffledEvents
              .filter(e => !userOrder.includes(e))
              .map((event, idx) => (
                <Button
                  key={idx}
                  onClick={() => addToTimeline(event)}
                  className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold px-6 py-4 rounded-xl shadow-lg flex items-center gap-2"
                  disabled={!!result}
                >
                  <span className="text-2xl">{event.icon}</span>
                  {event.event}
                </Button>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[#8b5a2b] mb-4 text-lg">📅 Your Timeline:</h4>
          <div className="space-y-3">
            {userOrder.map((event, idx) => (
              <div
                key={idx}
                className="bg-[#f5e6d3] border-4 border-[#c77d3a] rounded-xl p-5 flex items-center gap-4"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#c77d3a] to-[#a0642e] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg">
                  {idx + 1}
                </div>
                <span className="text-3xl">{event.icon}</span>
                <span className="text-[#5a3618] font-bold text-lg flex-1">{event.event}</span>
                <Badge className="bg-[#8b5a2b] text-white">{event.year}</Badge>
              </div>
            ))}
            {userOrder.length === 0 && (
              <div className="text-center py-12 text-[#8b5a2b] opacity-50">
                <Clock className="h-16 w-16 mx-auto mb-3" />
                <p className="text-lg font-semibold">Click events above to build your timeline</p>
              </div>
            )}
          </div>
        </div>

        {userOrder.length === events.length && !result && (
          <Button
            onClick={checkOrder}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl py-8 rounded-xl shadow-lg"
          >
            ✅ Check My Timeline
          </Button>
        )}

        {result && (
          <div
            className={`p-8 rounded-xl border-4 text-center ${
              result === 'correct'
                ? 'bg-green-50 border-green-500'
                : 'bg-yellow-50 border-yellow-500'
            }`}
          >
            {result === 'correct' ? (
              <div className="space-y-4">
                <div className="text-7xl">🏆</div>
                <p className="text-3xl font-bold text-green-900">Perfect! Correct Order!</p>
                <p className="text-xl text-green-700">You know your history!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-7xl">📚</div>
                <p className="text-2xl font-bold text-yellow-900">Not quite right. Try again!</p>
                <p className="text-lg text-yellow-700">Review the dates and try once more!</p>
              </div>
            )}
            <Button 
              onClick={reset} 
              className="mt-6 bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
