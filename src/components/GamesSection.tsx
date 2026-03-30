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
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/7c2f.png',
    question: 'Pangulo ng Estados Unidos na namuno sa bansa sa panahon ng Ikalawang Digmaang Pandaigdig at naglunsad ng New Deal programs.',
    options: ['Harry Truman', 'Franklin D. Roosevelt', 'Dwight Eisenhower', 'Woodrow Wilson'],
    answer: 1
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/95c6.png',
    question: 'Lider ng Soviet Union pagkatapos ni Stalin na kilala sa panahon ng Cuban Missile Crisis.',
    options: ['Mikhail Gorbachev', 'Leonid Brezhnev', 'Nikita Khrushchev', 'Yuri Andropov'],
    answer: 2
  }, {
    image: 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/c30e.png',
    question: 'Diktador ng Italya na nag-alyado sa Nazi Germany sa panahon ng Ikalawang Digmaang Pandaigdig.',
    options: ['Victor Emmanuel III', 'Benito Mussolini', 'Umberto II', 'Giuseppe Garibaldi'],
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
        <img src={questions[currentQ].image} alt="Historical Figure" className="w-48 h-48 mx-auto rounded-2xl object-cover border-4 border-[#8b5a2b] shadow-2xl" />
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
  }, {
    image: 'https://flagcdn.com/w320/jp.png',
    options: ['China', 'Japan', 'South Korea', 'North Korea'],
    answer: 1
  }, {
    image: 'https://flagcdn.com/w320/pl.png',
    options: ['Poland', 'Austria', 'Netherlands', 'Czech Republic'],
    answer: 0
  }, {
    image: 'https://flagcdn.com/w320/br.png',
    options: ['Brazil', 'Argentina', 'Chile', 'Uruguay'],
    answer: 0
  }, {
    image: 'https://flagcdn.com/w320/eg.png',
    options: ['Egypt', 'Saudi Arabia', 'UAE', 'Jordan'],
    answer: 0
  }, {
    image: 'https://flagcdn.com/w320/ca.png',
    options: ['Canada', 'Australia', 'New Zealand', 'United States'],
    answer: 0
  }, {
    image: 'https://flagcdn.com/w320/mx.png',
    options: ['Spain', 'Portugal', 'Mexico', 'Colombia'],
    answer: 2
  }, {
    image: 'https://flagcdn.com/w320/za.png',
    options: ['South Africa', 'Kenya', 'Nigeria', 'Ghana'],
    answer: 0
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
        <p className="text-xl font-bold text-[#8b5a2b]">Question {currentQ + 1} of {questions.length}</p>
        <p className="text-lg font-semibold text-[#6d4522]">Which country does this flag belong to?</p>
        <div className="relative w-full max-w-md mx-auto bg-white rounded-xl border-4 border-[#8b5a2b] shadow-xl p-4">
          <img 
            src={questions[currentQ].image} 
            alt="Country Flag"
            className="w-full h-48 object-contain mx-auto" 
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentQ].options.map((option, idx) => <Button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback !== null} className="p-6 text-lg font-semibold bg-white border-2 border-[#d49240] text-[#8b5a2b] hover:bg-[#f5e6d3] hover:scale-105 transition-all duration-300 disabled:opacity-50">
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
        <img src={puzzles[currentQ].image} alt="4 Pics 1 Word Clue" className="w-full max-w-md rounded-xl border-4 border-[#8b5a2b] shadow-2xl" />
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
    term: 'Nasyonalismo',
    definition: 'Pagmamahal sa sariling bansa'
  }, {
    term: 'Kolonyalismo',
    definition: 'Pag-aangkin ng lupain at pag-settle'
  }, {
    term: 'Imperyalismo',
    definition: 'Patakaran ng pagkontrol sa ibang bansa'
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
  
  const [terms] = useState(pairs.map(p => p.term));
  const [definitions] = useState(pairs.map(p => p.definition));
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [connections, setConnections] = useState<Array<{term: number, def: number}>>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  
  const handleTermClick = (idx: number) => {
    const alreadyConnected = connections.find(c => c.term === idx);
    if (alreadyConnected) return;
    setSelectedTerm(idx);
  };
  
  const handleDefClick = (idx: number) => {
    const alreadyConnected = connections.find(c => c.def === idx);
    if (alreadyConnected) return;
    
    if (selectedTerm !== null) {
      const term = terms[selectedTerm];
      const def = definitions[idx];
      const correctPair = pairs.find(p => p.term === term && p.definition === def);
      
      setConnections([...connections, { term: selectedTerm, def: idx }]);
      
      if (correctPair) {
        setShowFeedback('correct');
        setScore(score + 1);
      } else {
        setShowFeedback('wrong');
      }
      
      setTimeout(() => {
        setShowFeedback(null);
        setSelectedTerm(null);
        if (connections.length + 1 === pairs.length) {
          setGameComplete(true);
        }
      }, 1000);
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

      <div className="text-center bg-[#e8f5e9] p-4 rounded-xl border-2 border-[#81c784]">
        <h3 className="text-xl font-bold text-[#2e7d32]">🎯 Match each term with its definition.</h3>
      </div>

      <div className="relative">
        <div className="grid grid-cols-[1fr_60px_1fr] gap-4 items-start">
          {/* Terms Column */}
          <div className="space-y-3">
            {terms.map((term, idx) => {
              const connection = connections.find(c => c.term === idx);
              const isConnected = !!connection;
              const isSelected = selectedTerm === idx;
              return <div key={idx} className="flex items-center gap-2">
                  <button
                    id={`term-${idx}`}
                    onClick={() => handleTermClick(idx)}
                    disabled={isConnected}
                    className={`flex-1 px-4 py-3 rounded-full text-sm font-semibold transition-all text-left ${
                      isConnected 
                        ? 'bg-[#c8e6c9] text-[#2e7d32] cursor-not-allowed' 
                        : isSelected 
                          ? 'bg-[#81c784] text-white shadow-lg scale-105' 
                          : 'bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#c8e6c9] hover:shadow-md'
                    }`}
                  >
                    {term}
                  </button>
                  <div className="w-3 h-3 rounded-full bg-black flex-shrink-0"></div>
                </div>;
            })}
          </div>

          {/* Arrow SVG Column */}
          <div className="relative h-full">
            <svg className="absolute inset-0 w-full h-full" style={{overflow: 'visible', pointerEvents: 'none'}}>
              {connections.map((conn) => {
                const termEl = document.getElementById(`term-${conn.term}`);
                const defEl = document.getElementById(`def-${conn.def}`);
                if (!termEl || !defEl) return null;
                
                const container = termEl.closest('.relative');
                if (!container) return null;
                
                const containerRect = container.getBoundingClientRect();
                const termRect = termEl.getBoundingClientRect();
                const defRect = defEl.getBoundingClientRect();
                
                const x1 = termRect.right - containerRect.left - 4;
                const y1 = termRect.top + termRect.height / 2 - containerRect.top;
                const x2 = defRect.left - containerRect.left + 4;
                const y2 = defRect.top + defRect.height / 2 - containerRect.top;
                
                const midX = (x1 + x2) / 2;
                const curve = Math.abs(y2 - y1) * 0.3;
                
                return <path
                    key={`arrow-${conn.term}-${conn.def}`}
                    d={`M ${x1} ${y1} Q ${midX} ${y1 - curve}, ${x2} ${y2}`}
                    stroke="#2e7d32"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-in fade-in duration-300"
                  />;
              })}
            </svg>
          </div>

          {/* Definitions Column */}
          <div className="space-y-3">
            {definitions.map((def, idx) => {
              const connection = connections.find(c => c.def === idx);
              const isConnected = !!connection;
              return <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black flex-shrink-0"></div>
                  <button
                    id={`def-${idx}`}
                    onClick={() => handleDefClick(idx)}
                    disabled={isConnected}
                    className={`flex-1 px-4 py-3 rounded-full text-sm font-semibold transition-all text-left ${
                      isConnected 
                        ? 'bg-[#c8e6c9] text-[#2e7d32] cursor-not-allowed' 
                        : 'bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#c8e6c9] hover:shadow-md'
                    }`}
                  >
                    {def}
                  </button>
                </div>;
            })}
          </div>
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
  }];
  
  const [shuffledEvents] = useState([...events].sort(() => Math.random() - 0.5));
  const [timelineSlots, setTimelineSlots] = useState<Array<number | null>>([null, null, null, null, null]);
  const [draggedEvent, setDraggedEvent] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  
  const handleDragStart = (eventIdx: number) => {
    setDraggedEvent(eventIdx);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (slotIdx: number) => {
    if (draggedEvent !== null) {
      const newSlots = [...timelineSlots];
      // Remove event from any existing slot
      const existingSlotIdx = newSlots.indexOf(draggedEvent);
      if (existingSlotIdx !== -1) {
        newSlots[existingSlotIdx] = null;
      }
      // Place in new slot
      newSlots[slotIdx] = draggedEvent;
      setTimelineSlots(newSlots);
      setDraggedEvent(null);
    }
  };
  
  const handleRemoveFromSlot = (slotIdx: number) => {
    const newSlots = [...timelineSlots];
    newSlots[slotIdx] = null;
    setTimelineSlots(newSlots);
  };
  
  const handleSubmit = () => {
    const correctOrder = shuffledEvents
      .map((e, idx) => ({ ...e, idx }))
      .sort((a, b) => a.year - b.year)
      .map(e => e.idx);
    
    const userOrder = timelineSlots.filter(slot => slot !== null) as number[];
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    
    if (!isCorrect) {
      const correctSequence = correctOrder.map(idx => `${shuffledEvents[idx].event} (${shuffledEvents[idx].year})`).join(' → ');
      setCorrectAnswer(correctSequence);
    }
    
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(1);
  };

  const handleNext = () => {
    setShowFeedback(null);
    setGameComplete(true);
  };
  
  const usedEvents = timelineSlots.filter(slot => slot !== null);
  
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
        <p className="text-[#5a3618]">Drag events to arrange them from earliest to latest</p>
      </div>

      {/* Available Events Pool */}
      <div className="bg-[#f5e6d3] p-4 rounded-xl border-2 border-[#d49240]">
        <h4 className="font-bold text-[#8b5a2b] mb-3 text-center">Available Events (Drag to Timeline)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {shuffledEvents.map((event, idx) => {
            const isUsed = usedEvents.includes(idx);
            if (isUsed) return <div key={idx} className="h-16"></div>;
            
            return <div key={idx} draggable onDragStart={() => handleDragStart(idx)} className="p-4 bg-white border-2 border-[#d49240] rounded-lg font-semibold text-[#8b5a2b] cursor-move hover:bg-[#f5e6d3] hover:scale-105 transition-all text-center">
                {event.event}
              </div>;
          })}
        </div>
      </div>

      {/* Timeline Slots */}
      <div className="space-y-3">
        <h4 className="font-bold text-[#8b5a2b] text-center">Your Timeline (Earliest → Latest)</h4>
        {timelineSlots.map((slot, idx) => <div key={idx} onDragOver={handleDragOver} onDrop={() => handleDrop(idx)} className={`min-h-[80px] p-4 border-4 border-dashed rounded-xl transition-all ${slot !== null ? 'bg-[#d49240] border-[#8b5a2b]' : 'bg-white border-[#d49240] hover:border-[#8b5a2b] hover:bg-[#f5e6d3]'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-[#8b5a2b] text-white px-4 py-2 rounded-full font-bold text-lg">
                  #{idx + 1}
                </span>
                {slot !== null ? <span className="font-bold text-white text-lg">{shuffledEvents[slot].event}</span> : <span className="text-[#a0826d] italic">Drop event here</span>}
              </div>
              {slot !== null && <Button onClick={() => handleRemoveFromSlot(idx)} variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  Remove
                </Button>}
            </div>
          </div>)}
      </div>

      <Button onClick={handleSubmit} disabled={timelineSlots.some(slot => slot === null) || showFeedback !== null} className="w-full bg-[#8b5a2b] hover:bg-[#6d4522] text-white py-6 text-lg font-bold">
        Submit Timeline
      </Button>

      {showFeedback && <div className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-in fade-in zoom-in duration-300`}>
          <div className={`p-12 rounded-3xl shadow-2xl text-center space-y-4 max-w-3xl ${showFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
            {showFeedback === 'correct' ? <>
                <CheckCircle2 className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Perfect Timeline!</h3>
              </> : <>
                <XCircle className="w-24 h-24 mx-auto text-white animate-bounce" />
                <h3 className="text-4xl font-bold text-white">Wrong Order!</h3>
                <p className="text-lg text-white font-semibold">Correct Order:</p>
                <p className="text-base text-white leading-relaxed">{correctAnswer}</p>
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
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Educational Brown Theme Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d3] via-[#faf3e8] to-[#f5e6d3]" />
      
      {/* Floating Game Elements - Brown Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20" style={{ animationDelay: '0s', animationDuration: '3s', color: '#8b5a2b' }}>🎮</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce opacity-20" style={{ animationDelay: '1s', animationDuration: '2.5s', color: '#d49240' }}>🎯</div>
        <div className="absolute bottom-20 left-20 text-6xl animate-bounce opacity-20" style={{ animationDelay: '0.5s', animationDuration: '2.8s', color: '#c77d3a' }}>🏆</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce opacity-20" style={{ animationDelay: '1.5s', animationDuration: '3.2s', color: '#b87835' }}>⭐</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-spin opacity-15" style={{ animationDuration: '10s', color: '#8b5a2b' }}>🎪</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-spin opacity-15" style={{ animationDuration: '8s', color: '#d49240' }}>🎨</div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Epic Header Card - Brown Theme */}
        <div className="relative">
          {/* Decorative corner patterns */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-[#c77d3a] opacity-50 rounded-tl-2xl -translate-x-4 -translate-y-4" />
          <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-[#c77d3a] opacity-50 rounded-tr-2xl translate-x-4 -translate-y-4" />
          
          <Card className="border-4 border-[#c77d3a] bg-gradient-to-r from-[#8b5a2b] to-[#b87835] p-8 shadow-2xl rounded-3xl animate-in slide-in-from-top duration-700 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-6xl animate-bounce">🎮</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#f5e6d3] text-center drop-shadow-xl animate-pulse">
                INTERACTIVE GAMES
              </h2>
              <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎯</span>
            </div>
            <p className="text-2xl font-bold text-center text-[#f5e6d3] drop-shadow-lg">
              🌟 Flip the cards and start your adventure! 🌟
            </p>
          </Card>
        </div>

        {/* Flashcard Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {gameCards.map((game, index) => {
            const Icon = game.icon;
            const isFlipped = flippedCard === game.id;
            
            return (
              <div
                key={game.id}
                className="perspective-1000 h-80 animate-in zoom-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setFlippedCard(game.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front of Card - Brown Theme */}
                  <Card className={`absolute inset-0 backface-hidden border-4 shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    index % 5 === 0 ? 'border-[#c77d3a] bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8]' :
                    index % 5 === 1 ? 'border-[#d49240] bg-gradient-to-br from-[#faf3e8] to-[#f5e6d3]' :
                    index % 5 === 2 ? 'border-[#b87835] bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8]' :
                    index % 5 === 3 ? 'border-[#c77d3a] bg-gradient-to-br from-[#faf3e8] to-[#f5e6d3]' :
                    'border-[#d49240] bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8]'
                  }`}>
                    <div className="h-full flex flex-col items-center justify-center p-6 space-y-4">
                      {/* Animated Icon - Brown Theme */}
                      <div className="relative">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl animate-bounce ${
                          index % 5 === 0 ? 'bg-gradient-to-br from-[#8b5a2b] to-[#6d4522]' :
                          index % 5 === 1 ? 'bg-gradient-to-br from-[#c77d3a] to-[#b87835]' :
                          index % 5 === 2 ? 'bg-gradient-to-br from-[#d49240] to-[#c28437]' :
                          index % 5 === 3 ? 'bg-gradient-to-br from-[#8b5a2b] to-[#6d4522]' :
                          'bg-gradient-to-br from-[#c77d3a] to-[#b87835]'
                        }`}>
                          <Icon className="w-12 h-12 text-[#f5e6d3]" />
                        </div>
                        <div className="absolute -top-2 -right-2 text-3xl animate-spin" style={{ animationDuration: '3s' }}>⭐</div>
                      </div>
                      
                      <h3 className="text-3xl font-black text-center text-[#8b5a2b]">
                        {game.title}
                      </h3>
                      
                      <div className="text-5xl animate-pulse">🎲</div>
                      
                      <p className="text-center text-[#6d4522] font-semibold text-sm">
                        Hover to flip! 🔄
                      </p>
                    </div>
                  </Card>

                  {/* Back of Card - Brown Theme */}
                  <Card className={`absolute inset-0 backface-hidden rotate-y-180 border-4 shadow-2xl ${
                    index % 5 === 0 ? 'border-[#c77d3a] bg-gradient-to-br from-[#8b5a2b] to-[#6d4522]' :
                    index % 5 === 1 ? 'border-[#d49240] bg-gradient-to-br from-[#c77d3a] to-[#b87835]' :
                    index % 5 === 2 ? 'border-[#b87835] bg-gradient-to-br from-[#d49240] to-[#c28437]' :
                    index % 5 === 3 ? 'border-[#c77d3a] bg-gradient-to-br from-[#8b5a2b] to-[#6d4522]' :
                    'border-[#d49240] bg-gradient-to-br from-[#c77d3a] to-[#b87835]'
                  }`}>
                    <div className="h-full flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="text-5xl mb-2">🎯</div>
                      <p className="text-[#f5e6d3] text-center text-lg font-bold leading-relaxed">
                        {game.description}
                      </p>
                      
                      <Button 
                        onClick={() => setSelectedGame(game.id)}
                        className="w-full bg-[#f5e6d3] hover:bg-white text-[#8b5a2b] py-6 text-xl font-black shadow-xl transform hover:scale-110 transition-all animate-pulse border-2 border-[#c77d3a]"
                      >
                        🎮 PLAY NOW! 🎮
                      </Button>
                      
                      <div className="flex gap-2 text-2xl">
                        <span className="animate-bounce">🏆</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fun Footer Banner - Brown Theme */}
        <Card className="border-4 border-[#c77d3a] bg-gradient-to-r from-[#8b5a2b] via-[#c77d3a] to-[#d49240] p-6 shadow-2xl rounded-3xl">
          <div className="flex items-center justify-center gap-4 text-2xl font-black text-[#f5e6d3]">
            <span className="animate-spin text-4xl">🎪</span>
            <span>READY TO BECOME A HISTORY CHAMPION?</span>
            <span className="animate-spin text-4xl" style={{ animationDirection: 'reverse' }}>🎪</span>
          </div>
        </Card>
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
    </div>
  );
}