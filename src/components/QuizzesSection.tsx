import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

// Quiz data from the original site
const quizTopics = [
  { id: 'imp', title: 'Imperyalismo at Kolonyalismo', index: 1 },
  { id: 'ww1', title: 'Unang Digmaang Pandaigdig', index: 2 },
  { id: 'ww2', title: 'Ikalawang Digmaang Pandaigdig', index: 3 },
  { id: 'cold', title: 'Cold War', index: 4 },
  { id: 'glob', title: 'Globalisasyon', index: 5 },
];

const mcqData = {
  imp: [
    {
      q: 'Ano ang pinakamahalagang dahilan ng paghangad ng kolonya ng mga bansang Europeo?',
      options: ['Upang palaganapin ang wika', 'Upang makakuha ng hilaw na materyales at bagong pamilihan', 'Upang maiwasan ang digmaan', 'Upang magpalawak ng turismo'],
      answer: 1,
    },
    {
      q: 'Pangunahing pagkakaiba ng kolonyalismo at imperyalismo:',
      options: ['Pareho lang ang kahulugan', 'Kolonyalismo ay direktang pamamahala; imperyalismo ay maaaring impluwensya', 'Imperyalismo ay walang kontrol', 'Kolonyalismo ay pansamantala'],
      answer: 1,
    },
  ],
  ww1: [
    {
      q: 'Bakit lumawak sa pandaigdigang digmaan ang lokal na alitan?',
      options: ['Teknolohiya', 'Alyansa ng mga bansa', 'Relihiyon', 'Kalakalan'],
      answer: 1,
    },
  ],
  ww2: [
    {
      q: 'Ano ang nagpalakas ng suporta kay Hitler?',
      options: ['Pag-unlad ng ekonomiya', 'Pagkakaisa ng Allied Powers', 'Kahirapan at kahihiyang dulot ng Treaty of Versailles', 'Pagkatalo ng Japan'],
      answer: 2,
    },
  ],
  cold: [
    {
      q: 'Bakit iniwasan ng US at USSR ang direktang digmaan?',
      options: ['Kakulangan sa sundalo', 'Takot sa mutual destruction ng nuclear weapons', 'Kawalan ng interes', 'Pagkakaibigan ng lider'],
      answer: 1,
    },
  ],
  glob: [
    {
      q: 'Ano ang pinakamalapit na kahulugan ng globalisasyon?',
      options: ['Pagkakahiwalay ng mga bansa', 'Pagsasama-sama ng ekonomiya, kultura, at politika ng mga bansa', 'Pagkontrol ng isang bansa sa lahat', 'Pagbawas ng teknolohiya'],
      answer: 1,
      explanation: 'Ang globalisasyon ay proseso ng pag-uugnay ng mga bansa sa aspeto ng ekonomiya, kultura, at politika.'
    },
  ],
};

const tfData = {
  imp: [
    { q: 'Ang kolonyalismo ay direktang pananakop at pamamahala sa ibang lupain.', answer: true },
    { q: 'Ang Treaty of Tordesillas ay kasunduan ng Germany at Russia.', answer: false },
  ],
  ww1: [
    { q: 'Ang assassination ni Archduke Franz Ferdinand ay may kaugnayan sa pagsiklab ng WWI.', answer: true },
  ],
  ww2: [
    { q: 'Nagsimula ang WWII sa Europe matapos salakayin ng Germany ang Poland.', answer: true },
  ],
  cold: [
    { q: 'Direktang naglaban sa malaking digmaan ang US at USSR sa Cold War.', answer: false },
  ],
  glob: [
    { q: 'Ang globalisasyon ay nag-uugnay sa mga bansa sa pamamagitan ng teknolohiya at kalakalan.', answer: true },
  ],
};

export default function QuizzesSection() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<'mcq' | 'tf'>('mcq');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuizData = selectedTopic
    ? quizType === 'mcq'
      ? mcqData[selectedTopic as keyof typeof mcqData] || []
      : tfData[selectedTopic as keyof typeof tfData] || []
    : [];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const question = currentQuizData[currentQuestion];
    const isCorrect = selectedAnswer === question.answer;

    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= currentQuizData.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  if (!selectedTopic) {
    return (
      <div className="space-y-8">
        <Card className="border-4 border-[#d49240] bg-white p-8 shadow-xl rounded-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b] mb-4">
            📝 Test Your Knowledge
          </h2>
          <p className="text-xl text-[#5a3618]">
            Answer topic-based quizzes with instant feedback and clear explanations.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizTopics.map((topic) => (
            <Card
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              className="group border-4 border-[#d49240] bg-gradient-to-b from-white to-[#f5e6d3] p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl rounded-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#d49240] to-[#b87835] text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                  {topic.index}
                </div>
                <Badge className="bg-[#f5e6d3] text-[#8b5a2b] border-2 border-[#d49240] font-bold">
                  AVAILABLE
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-[#5a3618] mb-3 group-hover:text-[#d49240] transition-colors">
                {topic.title}
              </h3>
              <p className="text-[#8b5a2b] mb-6">Start this module</p>
              <Button className="w-full bg-gradient-to-r from-[#d49240] to-[#b87835] hover:from-[#c28437] hover:to-[#a66c2f] text-white font-bold text-lg py-6 rounded-xl shadow-lg">
                Start Quiz
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const topic = quizTopics.find((t) => t.id === selectedTopic);

  if (quizComplete) {
    const percentage = Math.round((score / currentQuizData.length) * 100);
    return (
      <div className="space-y-6">
        <Button
          onClick={() => setSelectedTopic(null)}
          variant="outline"
          className="border-2 border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#f5e6d3]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>

        <Card className="border-4 border-[#d49240] bg-white p-12 text-center shadow-xl rounded-xl">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-[#8b5a2b] mb-6">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-[#d49240] mb-6">
            {score}/{currentQuizData.length}
          </div>
          <p className="text-2xl text-[#5a3618] mb-8">
            You scored {percentage}%!
            {percentage >= 80 ? ' Excellent work!' : ' Keep practicing!'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleRestart}
              className="bg-gradient-to-r from-[#d49240] to-[#b87835] hover:from-[#c28437] hover:to-[#a66c2f] text-white font-bold text-lg px-8 py-6"
            >
              Try Again
            </Button>
            <Button
              onClick={() => setSelectedTopic(null)}
              variant="outline"
              className="border-2 border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#f5e6d3] font-bold text-lg px-8 py-6"
            >
              Choose Another Topic
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const question = currentQuizData[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuizData.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setSelectedTopic(null)}
          variant="outline"
          className="border-2 border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#f5e6d3]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>
        <Badge className="bg-gradient-to-r from-[#d49240] to-[#b87835] text-white px-4 py-2">
          Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
        </Badge>
      </div>

      <Card className="border-4 border-[#d49240] bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-[#8b5a2b] mb-6">{topic?.title}</h2>

        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setQuizType('mcq')}
            className={`flex-1 ${
              quizType === 'mcq'
                ? 'bg-gradient-to-r from-[#d49240] to-[#b87835] text-white'
                : 'bg-[#f5e6d3] text-[#8b5a2b] hover:bg-[#ead5bb]'
            }`}
          >
            Multiple Choice
          </Button>
          <Button
            onClick={() => setQuizType('tf')}
            className={`flex-1 ${
              quizType === 'tf'
                ? 'bg-gradient-to-r from-[#d49240] to-[#b87835] text-white'
                : 'bg-[#f5e6d3] text-[#8b5a2b] hover:bg-[#ead5bb]'
            }`}
          >
            Tama o Mali
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-[#8b5a2b] mb-2">
            <span>Question {currentQuestion + 1} of {currentQuizData.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="bg-[#f5e6d3] border-4 border-[#d49240] rounded-xl p-6 mb-6">
          <p className="text-xl text-[#5a3618] font-semibold">{question.q}</p>
        </div>

        {quizType === 'mcq' ? (
          <div className="space-y-3">
            {('options' in question ? question.options : []).map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => !showResult && setSelectedAnswer(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${
                  selectedAnswer === idx
                    ? 'border-[#d49240] bg-[#f5e6d3] text-[#8b5a2b]'
                    : 'border-[#d4a574] bg-white text-[#5a3618] hover:border-[#d49240] hover:bg-[#f5e6d3]'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Tama', value: true },
              { label: 'Mali', value: false },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => !showResult && setSelectedAnswer(option.value)}
                disabled={showResult}
                className={`p-6 rounded-xl border-2 font-bold text-xl transition-all ${
                  selectedAnswer === option.value
                    ? 'border-[#d49240] bg-[#f5e6d3] text-[#8b5a2b]'
                    : 'border-[#d4a574] bg-white text-[#5a3618] hover:border-[#d49240] hover:bg-[#f5e6d3]'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {showResult && (
          <div
            className={`mt-6 p-6 rounded-xl border-4 flex items-start gap-4 ${
              selectedAnswer === question.answer
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            {selectedAnswer === question.answer ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold text-lg mb-2">
                {selectedAnswer === question.answer ? 'Correct!' : 'Incorrect'}
              </p>
              {selectedAnswer !== question.answer && (
                <p className="text-gray-700">
                  Correct answer: {quizType === 'mcq' ? ('options' in question ? question.options[question.answer as number] : '') : question.answer ? 'Tama' : 'Mali'}
                </p>
              )}
              {'explanation' in question && question.explanation && (
                <p className="mt-2 text-gray-700">{question.explanation}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {!showResult ? (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 bg-gradient-to-r from-[#d49240] to-[#b87835] hover:from-[#c28437] hover:to-[#a66c2f] text-white font-bold text-lg py-6"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-6"
            >
              {currentQuestion + 1 >= currentQuizData.length ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
