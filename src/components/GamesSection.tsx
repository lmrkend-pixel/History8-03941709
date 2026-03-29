import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Trophy, Flag, Lightbulb, Shuffle, Clock, CheckCircle2, XCircle, X } from 'lucide-react';

// Game card data
const gameCards = [{
  id: 'history-unmasked',
  title: 'History Unmasked',
  description: 'Guess the historical figures!',
  icon: Trophy
}, {
  id: 'flag-tastic',
  title: 'Flag-tastic Game',
  description: 'Identify country flags!',
  icon: Flag
}, {
  id: 'decode-past',
  title: 'Decode the Past',
  description: '4 pics 1 word challenge!',
  icon: Lightbulb
}, {
  id: 'matching',
  title: 'Matching Game',
  description: 'Match terms with definitions!',
  icon: Shuffle
}, {
  id: 'timeline',
  title: 'Timeline Challenge',
  description: 'Arrange events in order!',
  icon: Clock
}];

// History Unmasked Game Component
function HistoryUnmaskedGame({
  onClose
}: {
  onClose: () => void;
}) {
  const questions = [{
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/fcad.png',
    question: 'Siya ang arkiduke ng Austria-Hungary na ang pagkakapaslang noong 1914 ang naging mitsa ng pagsisimula ng Unang Digmaang Pandaigdig.',
    options: ['Franz Ferdinand', 'Otto von Bismarck', 'Wilhelm II', 'Nicholas II'],
    answer: 0
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/e5c9.png',
    question: 'Isang diktador ng Alemanya na namuno sa Nazi Party at naging pangunahing dahilan ng Ikalawang Digmaang Pandaigdig at Holocaust.',
    options: ['Joseph Stalin', 'Adolf Hitler', 'Benito Mussolini', 'Winston Churchill'],
    answer: 1
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/766a.png',
    question: 'Pinuno ng Soviet Union na nagpatupad ng mahigpit na pamahalaan at naging mahalagang lider sa panahon ng Ikalawang Digmaang Pandaigdig.',
    options: ['Vladimir Lenin', 'Joseph Stalin', 'Nikita Khrushchev', 'Leon Trotsky'],
    answer: 1
  }];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const handleAnswer = (selected: number) => {
    const correct = selected === questions[currentQ].answer;
    setShowFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    setShowFeedback(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setGameComplete(true);
    }
  };
  if (gameComplete) {
    return <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/{questions.length}</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-6 py-3 rounded-full font-bold text-lg">
          Score: {score}/{questions.length}
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-[#8b5a2b] hover:bg-[#f5e6d3]">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center space-y-4">
        <img src={questions[currentQ].image} alt="Historical Figure" className="w-48 h-48 mx-auto rounded-2xl object-cover border-4 border-[#8b5a2b] shadow-2xl" crossOrigin="anonymous" />
        <p className="text-lg text-[#5a3618] font-medium">{questions[currentQ].question}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentQ].options.map((option, idx) => <Button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback !== null} className="p-6 text-lg font-semibold bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3] hover:scale-105 transition-all duration-300">
            {option}
          </Button>)}
      </div>

      {showFeedback && <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
            {showFeedback === 'correct' ? <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Correct Answer!</h3>
              </> : <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Answer!</h3>
                <p className="text-2xl text-white font-semibold">Correct: {questions[currentQ].options[questions[currentQ].answer]}</p>
              </>}
            <Button onClick={handleNext} className="bg-white text-[#8b5a2b] hover:bg-white/90 font-bold text-lg px-8 py-3 mt-4">
              Next
            </Button>
          </div>
        </div>}
    </div>;
}

// Flag-tastic Game Component
function FlagTasticGame({
  onClose
}: {
  onClose: () => void;
}) {
  const questions = [{
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/a83d.png',
    options: ['Philippines', 'Thailand', 'Vietnam', 'Indonesia'],
    answer: 0
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/b5ef.png',
    options: ['United States', 'United Kingdom', 'Australia', 'New Zealand'],
    answer: 1
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/4d8f.png',
    options: ['Italy', 'Ireland', 'France', 'Belgium'],
    answer: 2
  }];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const handleAnswer = (selected: number) => {
    const correct = selected === questions[currentQ].answer;
    setShowFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    setShowFeedback(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setGameComplete(true);
    }
  };
  if (gameComplete) {
    return <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/{questions.length}</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-6 py-3 rounded-full font-bold text-lg">
          Score: {score}/{questions.length}
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-[#8b5a2b] hover:bg-[#f5e6d3]">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center space-y-4">
        <p className="text-xl font-bold text-[#8b5a2b]">Which country is this?</p>
        <img src={questions[currentQ].image} alt="Flag" className="w-64 h-40 mx-auto rounded-xl border-4 border-[#8b5a2b] shadow-xl" crossOrigin="anonymous" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentQ].options.map((option, idx) => <Button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback !== null} className="p-6 text-lg font-semibold bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3] hover:scale-105 transition-all duration-300">
            {option}
          </Button>)}
      </div>

      {showFeedback && <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
            {showFeedback === 'correct' ? <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Correct Answer!</h3>
              </> : <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Answer!</h3>
                <p className="text-2xl text-white font-semibold">Correct: {questions[currentQ].options[questions[currentQ].answer]}</p>
              </>}
            <Button onClick={handleNext} className="bg-white text-[#8b5a2b] hover:bg-white/90 font-bold text-lg px-8 py-3 mt-4">
              Next
            </Button>
          </div>
        </div>}
    </div>;
}

// Decode the Past (4 Pics 1 Word) Game Component
function DecodeThePastGame({
  onClose
}: {
  onClose: () => void;
}) {
  const puzzles = [{
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/ace8.png',
    answer: 'IMPERYALISMO',
    hint: 'Ano ang tawag sa patakaran na ito?',
    explanation: 'Ang imperyalismo ay isang patakaran kung saan pinalalawak ng isang makapangyarihang bansa ang kanyang teritoryo at impluwensya sa pamamagitan ng pananakop o kontrol sa ibang bansa.'
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/85b0.png',
    answer: 'COLD WAR',
    hint: 'Ano ang tawag sa panahong ito?',
    explanation: 'Ang Cold War ay panahon ng matinding tensyon sa pagitan ng Estados Unidos at Soviet Union matapos ang Ikalawang Digmaang Pandaigdig, ngunit hindi ito humantong sa direktang digmaan.'
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/ed62.png',
    answer: 'WORLD WAR',
    hint: 'Ano ang tawag sa digmaang ito?',
    explanation: 'Ang World War ay tumutukoy sa malalaking digmaang pandaigdig tulad ng Unang at Ikalawang Digmaang Pandaigdig na kinasangkutan ng maraming bansa sa iba\'t ibang kontinente.'
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/39dc.png',
    answer: 'KAPITALISMO',
    hint: 'Ano ang tawag sa sistemang ito?',
    explanation: 'Ang kapitalismo ay isang sistemang pang-ekonomiya kung saan ang mga negosyo at yaman ay pagmamay-ari ng pribadong indibidwal at pinapaandar ng kompetisyon sa merkado.'
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/d189.png',
    answer: 'KOMUNISMO',
    hint: 'Ano ang tawag sa sistemang ito?',
    explanation: 'Ang komunismo ay isang sistemang pang-ekonomiya at pampulitika kung saan ang mga ari-arian ay pagmamay-ari ng estado o ng buong komunidad, at layuning magkaroon ng pantay-pantay na pamumuhay.'
  }];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const handleSubmit = () => {
    const correct = userAnswer.toUpperCase() === puzzles[currentQ].answer;
    setShowFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    setShowFeedback(null);
    setUserAnswer('');
    if (currentQ < puzzles.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setGameComplete(true);
    }
  };
  if (gameComplete) {
    return <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/{puzzles.length}</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-6 py-3 rounded-full font-bold text-lg">
          Score: {score}/{puzzles.length}
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-[#8b5a2b] hover:bg-[#f5e6d3]">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#8b5a2b] mb-2">4 Pics 1 Word</h3>
        <p className="text-[#5a3618]">{puzzles[currentQ].hint}</p>
      </div>

      <div className="flex justify-center">
        <img src={puzzles[currentQ].image} alt="4 Pics 1 Word Clue" className="w-full max-w-md rounded-xl border-4 border-[#8b5a2b] shadow-2xl" crossOrigin="anonymous" />
      </div>

      <div className="space-y-4">
        <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} placeholder="Type your answer..." className="w-full p-4 text-xl text-center border-4 border-[#d49240] rounded-xl font-bold text-[#8b5a2b] uppercase focus:outline-none focus:border-[#8b5a2b]" disabled={showFeedback !== null} />
        <Button onClick={handleSubmit} disabled={!userAnswer.trim() || showFeedback !== null} className="w-full bg-[#d49240] hover:bg-[#c77d3a] text-white py-6 text-lg font-bold">
          Submit Answer
        </Button>
      </div>

      {showFeedback && <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-8 rounded-3xl shadow-2xl text-center space-y-4 max-w-2xl ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
            {showFeedback === 'correct' ? <>
                <CheckCircle2 className="w-20 h-20 mx-auto text-white animate-bounce" />
                <h3 className="text-3xl font-bold text-white">Correct Answer!</h3>
                <div className="bg-white/20 p-4 rounded-xl">
                  <p className="text-lg text-white font-medium leading-relaxed">{puzzles[currentQ].explanation}</p>
                </div>
              </> : <>
                <XCircle className="w-20 h-20 mx-auto text-white animate-bounce" />
                <h3 className="text-3xl font-bold text-white">Wrong Answer!</h3>
                <p className="text-2xl text-white font-semibold">Correct: {puzzles[currentQ].answer}</p>
                <div className="bg-white/20 p-4 rounded-xl">
                  <p className="text-lg text-white font-medium leading-relaxed">{puzzles[currentQ].explanation}</p>
                </div>
              </>}
            <Button onClick={handleNext} className="bg-white text-[#8b5a2b] hover:bg-white/90 font-bold text-lg px-8 py-3 mt-4">
              Next
            </Button>
          </div>
        </div>}
    </div>;
}

// Matching Game Component
function MatchingGameComponent({
  onClose
}: {
  onClose: () => void;
}) {
  const pairs = [{
    term: 'Imperyalismo',
    definition: 'Patakaran ng pagkontrol sa ibang bansa'
  }, {
    term: 'Kolonyalismo',
    definition: 'Pag-aangkin ng lupain at pag-settle'
  }, {
    term: 'Nasyonalismo',
    definition: 'Pagmamahal sa sariling bansa'
  }, {
    term: 'Triple Alliance',
    definition: 'Alemanya, Austria-Hungary, Italy'
  }, {
    term: 'Triple Entente',
    definition: 'France, Russia, Great Britain'
  }, {
    term: 'Treaty of Versailles',
    definition: 'Kasunduan na nagtapos sa WWI'
  }, {
    term: 'Holocaust',
    definition: 'Genocide ng mga Hudyo'
  }, {
    term: 'United Nations',
    definition: 'Organisasyong pandaigdig para sa kapayapaan'
  }];
  const [terms] = useState(pairs.map(p => p.term).sort(() => Math.random() - 0.5));
  const [definitions] = useState(pairs.map(p => ({
    text: p.definition,
    matched: false
  })));
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const handleTermClick = (idx: number) => {
    if (matches.includes(idx)) return;
    setSelectedTerm(idx);
  };
  const handleDefClick = (idx: number) => {
    if (definitions[idx].matched) return;
    setSelectedDef(idx);
    if (selectedTerm !== null) {
      const term = terms[selectedTerm];
      const def = definitions[idx].text;
      const correctPair = pairs.find(p => p.term === term && p.definition === def);
      if (correctPair) {
        setShowFeedback('correct');
        setScore(score + 1);
        setMatches([...matches, selectedTerm]);
        const newDefs = [...definitions];
        newDefs[idx].matched = true;
        setTimeout(() => {
          setShowFeedback(null);
          setSelectedTerm(null);
          setSelectedDef(null);
          if (matches.length + 1 === pairs.length) {
            setGameComplete(true);
          }
        }, 1000);
      } else {
        setShowFeedback('wrong');
        setTimeout(() => {
          setShowFeedback(null);
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 1500);
      }
    }
  };
  if (gameComplete) {
    return <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/{pairs.length}</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-6 py-3 rounded-full font-bold text-lg">
          Score: {score}/{pairs.length}
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-[#8b5a2b] hover:bg-[#f5e6d3]">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#8b5a2b] mb-2">Match the Terms!</h3>
        <p className="text-[#5a3618]">Select a term then its matching definition</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-bold text-[#8b5a2b] text-center">Terms</h4>
          {terms.map((term, idx) => <Button key={idx} onClick={() => handleTermClick(idx)} disabled={matches.includes(idx)} className={`w-full p-4 text-base font-semibold transition-all ${matches.includes(idx) ? 'bg-green-200 border-2 border-green-500 text-green-800' : selectedTerm === idx ? 'bg-[#d49240] border-2 border-[#8b5a2b] text-white' : 'bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3]'}`}>
              {term}
            </Button>)}
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-[#8b5a2b] text-center">Definitions</h4>
          {definitions.map((def, idx) => <Button key={idx} onClick={() => handleDefClick(idx)} disabled={def.matched} className={`w-full p-4 text-base font-semibold transition-all ${def.matched ? 'bg-green-200 border-2 border-green-500 text-green-800' : selectedDef === idx ? 'bg-[#d49240] border-2 border-[#8b5a2b] text-white' : 'bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3]'}`}>
              {def.text}
            </Button>)}
        </div>
      </div>

      {showFeedback && <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
            {showFeedback === 'correct' ? <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Correct Match!</h3>
              </> : <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Match!</h3>
              </>}
          </div>
        </div>}
    </div>;
}

// Timeline Challenge Game Component
function TimelineChallengeGame({
  onClose
}: {
  onClose: () => void;
}) {
  const events = [{
    event: 'Unang Digmaang Pandaigdig',
    year: 1914
  }, {
    event: 'Treaty of Versailles',
    year: 1919
  }, {
    event: 'Great Depression',
    year: 1929
  }, {
    event: 'Ikalawang Digmaang Pandaigdig nagsimula',
    year: 1939
  }, {
    event: 'Pearl Harbor Attack',
    year: 1941
  }, {
    event: 'D-Day Invasion',
    year: 1944
  }, {
    event: 'Ikalawang Digmaang Pandaigdig nagtapos',
    year: 1945
  }, {
    event: 'United Nations itinatag',
    year: 1945
  }];
  const [shuffledEvents] = useState([...events].sort(() => Math.random() - 0.5).slice(0, 5));
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const handleEventClick = (idx: number) => {
    if (userOrder.includes(idx)) {
      setUserOrder(userOrder.filter(i => i !== idx));
    } else {
      setUserOrder([...userOrder, idx]);
    }
  };
  const handleSubmit = () => {
    const correctOrder = shuffledEvents.map((e, idx) => ({
      ...e,
      idx
    })).sort((a, b) => a.year - b.year).map(e => e.idx);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    if (!isCorrect) {
      const correctSequence = correctOrder.map(idx => shuffledEvents[idx].event).join(' → ');
      setCorrectAnswer(correctSequence);
    }
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(1);
  };

  const handleNext = () => {
    setShowFeedback(null);
    setGameComplete(true);
  };
  if (gameComplete) {
    return <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="text-6xl">🏆</div>
        <h3 className="text-3xl font-bold text-[#8b5a2b]">Game Complete!</h3>
        <p className="text-5xl font-bold text-[#d49240]">{score}/1</p>
        <Button onClick={onClose} className="bg-gradient-to-r from-[#d49240] to-[#c77d3a] text-white px-8 py-6 text-lg">
          Close Game
        </Button>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-[#8b5a2b] text-white px-6 py-3 rounded-full font-bold text-lg">
          Score: {score}/1
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-[#8b5a2b] hover:bg-[#f5e6d3]">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-[#8b5a2b]">Timeline Challenge</h3>
        <p className="text-[#5a3618]">Arrange the events from earliest to latest</p>
      </div>

      <div className="space-y-3">
        {shuffledEvents.map((event, idx) => {
        const position = userOrder.indexOf(idx);
        return <Button key={idx} onClick={() => handleEventClick(idx)} className={`w-full p-6 text-left transition-all ${position >= 0 ? 'bg-[#d49240] border-2 border-[#8b5a2b] text-white' : 'bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3]'}`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{event.event}</span>
                {position >= 0 && <span className="bg-white text-[#8b5a2b] px-3 py-1 rounded-full font-bold">
                    #{position + 1}
                  </span>}
              </div>
            </Button>;
      })}
      </div>

      <Button onClick={handleSubmit} disabled={userOrder.length !== shuffledEvents.length || showFeedback !== null} className="w-full bg-[#8b5a2b] hover:bg-[#6d4522] text-white py-6 text-lg font-bold">
        Submit Timeline
      </Button>

      {showFeedback && <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 max-w-2xl ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
            {showFeedback === 'correct' ? <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Perfect Timeline!</h3>
              </> : <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Order!</h3>
                <p className="text-lg text-white font-semibold">Correct Order:</p>
                <p className="text-base text-white">{correctAnswer}</p>
              </>}
            <Button onClick={handleNext} className="bg-white text-[#8b5a2b] hover:bg-white/90 font-bold text-lg px-8 py-3 mt-4">
              Next
            </Button>
          </div>
        </div>}
    </div>;
}

// Main Games Section
export default function GamesSection() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  return <div className="space-y-8">
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
        {gameCards.map(game => {
        const Icon = game.icon;
        return <Card key={game.id} onClick={() => setSelectedGame(game.id)} className="group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-[#c77d3a] bg-white">
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
            </Card>;
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DecodeThePastGame onClose={() => setSelectedGame(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedGame === 'matching'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <MatchingGameComponent onClose={() => setSelectedGame(null)} />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedGame === 'timeline'} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <TimelineChallengeGame onClose={() => setSelectedGame(null)} />
        </DialogContent>
      </Dialog>
    </div>;
}