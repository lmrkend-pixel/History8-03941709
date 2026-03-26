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
        <Badge className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] text-white px-6 py-2 text-lg mb-4">
          Interactive Games
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b] mb-4">
          Interactive Games
        </h2>
        <p className="text-xl text-[#5a3618]">
          Learn through fun activities! Practice key topics with short game-based activities.
        </p>
        <div className="mt-4 flex items-center gap-6 justify-center text-6xl">
          <span>🗺️</span>
          <span>🔍</span>
          <span>🎯</span>
        </div>
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

  const people = [
    { 
      clue: 'Arkiduke ng Austria-Hungary; pagkakapaslang niya noong 1914 ang mitsa ng WWI.', 
      answer: 'Archduke Franz Ferdinand',
      hint: 'Archduke'
    },
    { 
      clue: 'Diktador ng Alemanya na namuno sa Nazi Party.', 
      answer: 'Adolf Hitler',
      hint: 'Führer'
    },
    { 
      clue: 'Pinuno ng Soviet Union noong WWII na may mahigpit na pamahalaan.', 
      answer: 'Joseph Stalin',
      hint: 'Man of Steel'
    },
    { 
      clue: 'Pangulo ng US sa panahon ng Great Depression at WWII.', 
      answer: 'Franklin Roosevelt',
      hint: 'FDR'
    },
    { 
      clue: 'Pinuno ng Soviet Union noong Cold War at Cuban Missile Crisis.', 
      answer: 'Nikita Khrushchev',
      hint: 'Shoe incident UN'
    },
    { 
      clue: 'Diktador ng Italya at tagapagtatag ng pasismo.', 
      answer: 'Benito Mussolini',
      hint: 'Il Duce'
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
    setCurrentIndex((currentIndex + 1) % people.length);
    setAnswer('');
    setResult('');
  };

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
        <Badge className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] text-white px-4 py-2">
          {score}/{attempts}
        </Badge>
      </div>

      <div className="text-center mb-6">
        <div className="text-7xl mb-4">🎭</div>
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
                  <p className="text-red-700">Correct answer: <strong>{current.answer}</strong></p>
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
    { name: 'Philippines', emoji: '🇵🇭' },
    { name: 'United Kingdom', emoji: '🇬🇧' },
    { name: 'France', emoji: '🇫🇷' },
    { name: 'Argentina', emoji: '🇦🇷' },
    { name: 'Australia', emoji: '🇦🇺' },
    { name: 'China', emoji: '🇨🇳' },
    { name: 'United States', emoji: '🇺🇸' },
    { name: 'Thailand', emoji: '🇹🇭' },
    { name: 'South Korea', emoji: '🇰🇷' },
    { name: 'Japan', emoji: '🇯🇵' },
  ];

  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const answer = countries[round];
  const choices = shuffle([answer, ...shuffle(countries.filter((x) => x.name !== answer.name)).slice(0, 3)]);

  const handleChoice = (choice: typeof countries[0]) => {
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
      }
    }, 1500);
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
        <Badge className="bg-gradient-to-r from-[#c77d3a] to-[#a0642e] text-white px-4 py-2">
          {score}/{round}
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="bg-[#f5e6d3] border-4 border-[#c77d3a] rounded-xl p-6 text-center">
          <p className="text-sm text-[#8b5a2b] font-semibold mb-4">
            Round {round + 1} of {countries.length}
          </p>
          <div className="text-8xl mb-4">{answer.emoji}</div>
          <p className="text-xl font-bold text-[#8b5a2b]">Which country is this?</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice) => (
            <Button
              key={choice.name}
              onClick={() => handleChoice(choice)}
              disabled={!!result}
              className={`h-auto py-6 text-lg font-bold rounded-xl ${
                result && result === 'correct' && choice.name === answer.name
                  ? 'bg-green-600 hover:bg-green-600 text-white'
                  : result && choice.name === answer.name
                  ? 'bg-green-600 hover:bg-green-600 text-white'
                  : result && choice.name !== answer.name
                  ? 'bg-gray-400 hover:bg-gray-400 text-gray-600'
                  : 'bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white'
              }`}
            >
              {choice.name}
            </Button>
          ))}
        </div>

        {result && (
          <div
            className={`text-center p-5 rounded-xl font-bold text-xl border-4 ${
              result === 'correct'
                ? 'bg-green-50 border-green-500 text-green-900'
                : 'bg-yellow-50 border-yellow-500 text-yellow-900'
            }`}
          >
            {result === 'correct' ? '✅ Correct!' : `📍 Correct: ${answer.name}`}
          </div>
        )}
      </div>
    </Card>
  );
}

function DecodePastGame() {
  const items = [
    { title: 'Imperyalismo', desc: 'Patakaran kung saan pinalalawak ng makapangyarihang bansa ang teritoryo at impluwensya sa ibang bansa.', icon: '👑' },
    { title: 'Cold War', desc: 'Panahon ng matinding tensyon ng US at USSR matapos ang WWII nang walang direktang digmaan.', icon: '❄️' },
    { title: 'World War', desc: 'Malalaking digmaang pandaigdig na kinasangkutan ng maraming bansa sa iba\'t ibang kontinente.', icon: '⚔️' },
    { title: 'Kapitalismo', desc: 'Sistemang pang-ekonomiya na pagmamay-ari ng pribadong indibidwal ang negosyo at yaman.', icon: '💰' },
    { title: 'Komunismo', desc: 'Sistemang pang-ekonomiya at pampulitika kung saan pagmamay-ari ng estado o komunidad ang ari-arian.', icon: '⚒️' }
  ];

  const [revealed, setRevealed] = useState<boolean[]>(items.map(() => false));

  const revealAll = () => {
    setRevealed(items.map(() => true));
  };

  const resetAll = () => {
    setRevealed(items.map(() => false));
  };

  return (
    <Card className="border-4 border-[#c77d3a] bg-gradient-to-br from-white to-[#f5e6d3] p-8 shadow-2xl rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#c77d3a] to-[#a0642e] flex items-center justify-center shadow-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#8b5a2b]">Decode the Past</h3>
            <p className="text-sm text-[#8b5a2b]">Reveal historical concepts!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={revealAll} size="sm" variant="outline" className="border-[#c77d3a] text-[#c77d3a]">
            Reveal All
          </Button>
          <Button onClick={resetAll} size="sm" variant="outline" className="border-[#8b5a2b] text-[#8b5a2b]">
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <Card
            key={idx}
            className={`border-4 p-6 transition-all ${
              revealed[idx]
                ? 'border-[#c77d3a] bg-white shadow-lg'
                : 'border-[#d4a574] bg-[#f5e6d3]'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{item.icon}</div>
              <h4 className="font-bold text-[#8b5a2b] text-lg">Concept {idx + 1}</h4>
            </div>
            {!revealed[idx] ? (
              <Button
                onClick={() => {
                  const newRevealed = [...revealed];
                  newRevealed[idx] = true;
                  setRevealed(newRevealed);
                }}
                className="w-full bg-gradient-to-r from-[#c77d3a] to-[#a0642e] hover:from-[#b36e31] hover:to-[#8f5626] text-white font-bold py-4 rounded-xl shadow-lg"
              >
                Reveal 🔓
              </Button>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-500">
                <p className="font-bold text-[#c77d3a] text-xl">{item.title}</p>
                <p className="text-[#5a3618] leading-relaxed">{item.desc}</p>
              </div>
            )}
          </Card>
        ))}
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
