import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, CheckCircle2, XCircle } from 'lucide-react';

export default function GamesSection() {
  return (
    <div className="space-y-6">
      <Card className="border-4 border-amber-300 bg-white p-8">
        <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full mb-4">
          Interactive Games
        </div>
        <h2 className="text-4xl font-bold text-amber-900 mb-4">Interactive Games</h2>
        <p className="text-amber-800 text-lg">
          Practice key topics with short game-based activities. Play, learn, and review concepts in a fun format.
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

  const people = [
    { clue: 'Arkiduke ng Austria-Hungary; pagkakapaslang niya noong 1914 ang mitsa ng WWI.', answer: 'Archduke Franz Ferdinand' },
    { clue: 'Diktador ng Alemanya na namuno sa Nazi Party.', answer: 'Adolf Hitler' },
    { clue: 'Pinuno ng Soviet Union noong WWII na may mahigpit na pamahalaan.', answer: 'Joseph Stalin' },
    { clue: 'Pangulo ng US sa panahon ng Great Depression at WWII.', answer: 'Franklin Roosevelt' },
    { clue: 'Pinuno ng Soviet Union noong Cold War at Cuban Missile Crisis.', answer: 'Nikita Khrushchev' },
    { clue: 'Diktador ng Italya at tagapagtatag ng pasismo.', answer: 'Benito Mussolini' }
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
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
          <Target className="h-6 w-6 text-orange-600" />
          History Unmasked
        </h3>
        <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          Score: {score}/{attempts}
        </Badge>
      </div>
      <p className="text-amber-800 mb-6">Guess the historical personality from the clue.</p>

      <div className="space-y-4">
        <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-4">
          <p className="text-amber-900 font-semibold">
            Question {currentIndex + 1} of {people.length}
          </p>
          <p className="text-amber-900 mt-2">{current.clue}</p>
        </div>

        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="border-2 border-amber-300 focus:border-amber-600"
          onKeyPress={(e) => e.key === 'Enter' && !result && checkAnswer()}
        />

        {result && (
          <div
            className={`flex items-center gap-2 p-4 rounded-lg ${
              result === 'correct'
                ? 'bg-green-100 border-2 border-green-400'
                : 'bg-red-100 border-2 border-red-400'
            }`}
          >
            {result === 'correct' ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <p className="text-green-900 font-bold">Correct! Well done!</p>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600" />
                <p className="text-red-900">
                  <strong>Not quite.</strong> Correct answer: {current.answer}
                </p>
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {!result ? (
            <Button
              onClick={checkAnswer}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Next Question
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
    'Philippines', 'United Kingdom', 'France', 'Argentina', 'Australia',
    'China', 'Estados Unidos', 'Thailand', 'South Korea', 'Japan'
  ];

  const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  const answer = countries[round];
  const choices = shuffle([answer, ...shuffle(countries.filter((x) => x !== answer)).slice(0, 3)]);

  const handleChoice = (choice: string) => {
    if (choice === answer) {
      setScore(score + 1);
      setResult('correct');
    } else {
      setResult(`incorrect-${answer}`);
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
    return (
      <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 shadow-xl">
        <div className="text-center space-y-4">
          <Trophy className="h-20 w-20 text-amber-600 mx-auto" />
          <h3 className="text-3xl font-bold text-amber-900">Game Complete!</h3>
          <p className="text-2xl text-amber-800">
            Final Score: <span className="font-bold text-amber-900">{score}/{countries.length}</span>
          </p>
          <Button
            onClick={restart}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
          <Zap className="h-6 w-6 text-orange-600" />
          Flag-tastic Game
        </h3>
        <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          Score: {score}/{round}
        </Badge>
      </div>
      <p className="text-amber-800 mb-6">Pick the correct country name for each clue.</p>

      <div className="space-y-4">
        <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-4">
          <p className="text-amber-900 font-semibold mb-2">
            Round {round + 1} of {countries.length}
          </p>
          <p className="text-xl font-bold text-amber-900">Which country is this?</p>
          <p className="text-2xl text-center my-4 font-bold text-orange-700">{answer}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice) => (
            <Button
              key={choice}
              onClick={() => handleChoice(choice)}
              disabled={!!result}
              className={`h-auto py-4 text-base ${
                result && result === 'correct' && choice === answer
                  ? 'bg-green-600 hover:bg-green-600'
                  : result && result.includes('incorrect') && choice === answer
                  ? 'bg-green-600 hover:bg-green-600'
                  : result && result.includes('incorrect') && choice !== answer
                  ? 'bg-red-600 hover:bg-red-600'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
              }`}
            >
              {choice}
            </Button>
          ))}
        </div>

        {result && (
          <div
            className={`text-center p-3 rounded-lg font-bold ${
              result === 'correct'
                ? 'bg-green-100 text-green-900 border-2 border-green-400'
                : 'bg-red-100 text-red-900 border-2 border-red-400'
            }`}
          >
            {result === 'correct' ? 'Correct!' : `Correct answer: ${answer}`}
          </div>
        )}
      </div>
    </Card>
  );
}

function DecodePastGame() {
  const items = [
    { title: 'Imperyalismo', desc: 'Patakaran kung saan pinalalawak ng makapangyarihang bansa ang teritoryo at impluwensya sa ibang bansa.' },
    { title: 'Cold War', desc: 'Panahon ng matinding tensyon ng US at USSR matapos ang WWII nang walang direktang digmaan.' },
    { title: 'World War', desc: 'Malalaking digmaang pandaigdig na kinasangkutan ng maraming bansa sa iba\'t ibang kontinente.' },
    { title: 'Kapitalismo', desc: 'Sistemang pang-ekonomiya na pagmamay-ari ng pribadong indibidwal ang negosyo at yaman.' },
    { title: 'Komunismo', desc: 'Sistemang pang-ekonomiya at pampulitika kung saan pagmamay-ari ng estado o komunidad ang ari-arian.' }
  ];

  const [revealed, setRevealed] = useState<boolean[]>(items.map(() => false));

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
        <Star className="h-6 w-6 text-orange-600" />
        Decode the Past: Concept Challenge
      </h3>
      <p className="text-amber-800 mb-6">Reveal each concept and read the explanation.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <Card
            key={idx}
            className={`border-2 p-4 transition-all ${
              revealed[idx]
                ? 'border-amber-400 bg-white shadow-lg'
                : 'border-amber-200 bg-amber-50'
            }`}
          >
            <h4 className="font-bold text-amber-900 mb-3">Concept {idx + 1}</h4>
            {!revealed[idx] ? (
              <Button
                onClick={() => {
                  const newRevealed = [...revealed];
                  newRevealed[idx] = true;
                  setRevealed(newRevealed);
                }}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                Reveal
              </Button>
            ) : (
              <div className="space-y-2 animate-in fade-in duration-500">
                <p className="font-bold text-orange-700 text-lg">{item.title}</p>
                <p className="text-amber-900 text-sm">{item.desc}</p>
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
    { term: 'WWI', definition: 'Started by assassination of Archduke Franz Ferdinand' },
    { term: 'WWII', definition: 'Ended with atomic bombs on Hiroshima and Nagasaki' },
    { term: 'Cold War', definition: 'Tension between US and USSR without direct war' },
    { term: 'Imperialism', definition: 'Policy of extending power over other territories' },
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const allItems = [...pairs.map(p => ({ text: p.term, type: 'term' })), ...pairs.map(p => ({ text: p.definition, type: 'definition' }))];
  const [shuffled] = useState(() => allItems.sort(() => Math.random() - 0.5));

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

  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
          <Target className="h-6 w-6 text-orange-600" />
          Matching Game
        </h3>
        <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          Matched: {score}/{pairs.length}
        </Badge>
      </div>
      <p className="text-amber-800 mb-6">Match the terms with their correct definitions!</p>

      {isComplete ? (
        <div className="text-center space-y-4">
          <Trophy className="h-16 w-16 text-amber-600 mx-auto" />
          <p className="text-2xl font-bold text-amber-900">Perfect! All matched!</p>
          <Button
            onClick={() => {
              setMatched([]);
              setSelected([]);
              setScore(0);
            }}
            className="bg-gradient-to-r from-amber-600 to-orange-600"
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
              className={`h-auto min-h-[100px] p-4 text-sm whitespace-normal ${
                matched.includes(item.text)
                  ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed'
                  : selected.includes(item.text)
                  ? 'bg-blue-600 hover:bg-blue-600'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
              }`}
            >
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
    { year: 1914, event: 'World War I begins' },
    { year: 1939, event: 'World War II starts' },
    { year: 1945, event: 'Atomic bombs dropped on Japan' },
    { year: 1947, event: 'Cold War begins' },
    { year: 1989, event: 'Berlin Wall falls' },
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
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
        <Trophy className="h-6 w-6 text-orange-600" />
        Timeline Challenge
      </h3>
      <p className="text-amber-800 mb-6">Arrange the historical events in chronological order!</p>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-amber-900 mb-3">Available Events:</h4>
          <div className="flex flex-wrap gap-2">
            {shuffledEvents
              .filter(e => !userOrder.includes(e))
              .map((event, idx) => (
                <Button
                  key={idx}
                  onClick={() => addToTimeline(event)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  disabled={!!result}
                >
                  {event.event}
                </Button>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-amber-900 mb-3">Your Timeline:</h4>
          <div className="space-y-2">
            {userOrder.map((event, idx) => (
              <div
                key={idx}
                className="bg-amber-100 border-2 border-amber-300 rounded-lg p-3 flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <span className="text-amber-900 font-semibold">{event.event}</span>
              </div>
            ))}
          </div>
        </div>

        {userOrder.length === events.length && !result && (
          <Button
            onClick={checkOrder}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Check My Timeline
          </Button>
        )}

        {result && (
          <div
            className={`p-4 rounded-lg text-center ${
              result === 'correct'
                ? 'bg-green-100 border-2 border-green-400'
                : 'bg-red-100 border-2 border-red-400'
            }`}
          >
            {result === 'correct' ? (
              <div className="space-y-2">
                <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
                <p className="text-2xl font-bold text-green-900">Perfect! Correct order!</p>
              </div>
            ) : (
              <div className="space-y-2">
                <XCircle className="h-12 w-12 text-red-600 mx-auto" />
                <p className="text-xl font-bold text-red-900">Not quite right. Try again!</p>
              </div>
            )}
            <Button onClick={reset} className="mt-4 bg-amber-600 hover:bg-amber-700">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
