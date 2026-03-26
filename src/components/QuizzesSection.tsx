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
      q: 'Ano ang pinakamahalagang dahilan kung bakit naghangad ang mga bansang Europeo ng kolonya noong panahon ng imperyalismo?',
      options: ['Upang palaganapin ang wika', 'Upang makakuha ng hilaw na materyales at bagong pamilihan', 'Upang maiwasan ang digmaan', 'Upang magpalawak ng turismo'],
      answer: 1,
      explanation: 'Malaki ang pangangailangan ng industriya sa Europa sa mga hilaw na materyales at merkado, kaya sinakop nila ang ibang lupain upang suportahan ang kanilang ekonomiya.'
    },
    {
      q: 'Ano ang pangunahing pagkakaiba ng kolonyalismo sa imperyalismo?',
      options: ['Pareho lamang ang kahulugan nito', 'Ang kolonyalismo ay direktang pamamahala habang ang imperyalismo ay maaaring impluwensya lamang', 'Ang imperyalismo ay walang kontrol sa ibang bansa', 'Ang kolonyalismo ay pansamantala lamang'],
      answer: 1,
      explanation: 'Sa kolonyalismo, direktang pinamamahalaan ang kolonya; sa imperyalismo, maaaring kontrol lamang sa ekonomiya o politika.'
    },
    {
      q: 'Ano ang naging epekto ng Treaty of Tordesillas noong 1494?',
      options: ['Pinag-isa ang Europe', 'Hinati ang mundo sa Spain at Portugal', 'Pinatigil ang eksplorasyon', 'Pinabagsak ang mga imperyo sa Asya'],
      answer: 1,
      explanation: 'Ang kasunduang ito ang nagtakda kung aling bahagi ng mundo ang maaaring sakupin ng dalawang bansa.'
    },
    {
      q: 'Bakit naging mahalaga ang Dutch East India Company sa imperyalismo?',
      options: ['Ito ay simbahan', 'Ito ay samahang pang-edukasyon', 'Ito ay kompanyang kumontrol sa kalakalan sa Asya', 'Ito ay hukbo ng Netherlands'],
      answer: 2,
      explanation: 'Ang kompanyang ito ang nagpalakas sa kontrol ng Netherlands sa kalakalan lalo na sa rekado.'
    },
    {
      q: 'Ano ang ipinapakita ng pagkatalo ng Russia sa Japan noong 1905?',
      options: ['Mahina ang Japan', 'Walang impluwensya ang Europa', 'Kayang talunin ng bansang Asyano ang kapangyarihang Europeo', 'Natapos ang imperyalismo'],
      answer: 2,
      explanation: 'Ito ay nagpakita na kaya ng isang bansang Asyano na maging makapangyarihan din.'
    },
    {
      q: 'Ano ang layunin ng "civilizing mission" ng mga Europeo?',
      options: ['Palaganapin ang kanilang kultura at relihiyon', 'Magtayo ng negosyo lamang', 'Mag-aral ng wika', 'Magtayo ng pamahalaan ng Asya'],
      answer: 0,
      explanation: 'Ginamit ito bilang dahilan upang bigyang-katwiran ang pananakop sa ibang bansa.'
    },
    {
      q: 'Paano pinamahalaan ng Britain ang ilang bahagi ng India?',
      options: ['Direktang pamamahala lamang', 'Di-direktang pamamahala gamit ang lokal na pinuno', 'Walang pamamahala', 'Militar lamang ang namahala'],
      answer: 1,
      explanation: 'Gumamit sila ng mga lokal na lider upang mas madaling makontrol ang teritoryo.'
    },
    {
      q: 'Ano ang naging epekto ng imperyalismo sa ekonomiya ng mga kolonya?',
      options: ['Lalong naging independent', 'Naging bahagi ng pandaigdigang kalakalan', 'Nawala ang kalakalan', 'Walang pagbabago'],
      answer: 1,
      explanation: 'Ginamit ang mga kolonya bilang tagapagbigay ng hilaw na materyales at pamilihan.'
    },
    {
      q: 'Bakit nakilahok ang United States sa imperyalismo noong ika-19 na siglo?',
      options: ['Upang maprotektahan ang kultura', 'Upang palawakin ang impluwensya matapos ang digmaan sa Spain', 'Upang sumunod sa Europa', 'Upang magtayo ng simbahan'],
      answer: 1,
      explanation: 'Matapos ang Spanish-American War, nakuha ng US ang ilang teritoryo tulad ng Pilipinas.'
    },
    {
      q: 'Ano ang nagpapakita ng tugon ng mga mamamayan sa kolonyalismo?',
      options: ['Pagtanggap lamang sa pamamahala', 'Pag-aalsa at kilusang nasyonalismo', 'Walang reaksyon', 'Paglipat sa ibang bansa'],
      answer: 1,
      explanation: 'Maraming mamamayan ang lumaban upang makamit ang kalayaan.'
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
    { 
      q: 'Ang imperyalismo at kolonyalismo ay may parehong kahulugan.', 
      answer: false,
      explanation: 'Ang kolonyalismo ay direktang pamamahala habang ang imperyalismo ay maaaring impluwensya lamang sa ekonomiya o politika.'
    },
    { 
      q: 'Ang pangunahing dahilan ng imperyalismo ay pangangailangan ng hilaw na materyales at pamilihan.', 
      answer: true,
      explanation: 'Ang industriya sa Europa ay nangangailangan ng hilaw na materyales at lugar upang ipagbili ang kanilang produkto.'
    },
    { 
      q: 'Ang Treaty of Tordesillas ay naghati ng mundo sa pagitan ng Spain at Portugal.', 
      answer: true,
      explanation: 'Ang kasunduang ito noong 1494 ay nagtakda kung aling bahagi ng mundo ang maaaring sakupin ng dalawang bansa.'
    },
    { 
      q: 'Ang Dutch East India Company ay isang simbahan na nag-abot ng tulong sa Asya.', 
      answer: false,
      explanation: 'Ito ay kumpanya na kumontrol sa kalakalan ng Netherlands sa Asya, lalo na sa rekado.'
    },
    { 
      q: 'Ang pagkatalo ng Russia sa Japan noong 1905 ay nagpakita na kayang talunin ng bansang Asyano ang kapangyarihang Europeo.', 
      answer: true,
      explanation: 'Ang Digmaang Ruso-Hapon ay nagpatunay na ang Japan ay maaaring maging makapangyarihan din tulad ng mga bansang Europeo.'
    },
    { 
      q: 'Ang "civilizing mission" ay layuning magbigay ng kalayaan sa mga kolonya.', 
      answer: false,
      explanation: 'Ito ay ginamit bilang dahilan upang bigyang-katwiran ang pananakop at pagpapakalat ng kanilang kultura at relihiyon.'
    },
    { 
      q: 'Ang direktang pamamahala ay nangangahulugang ang kolonyal na bansa mismo ang namamahala sa teritoryo.', 
      answer: true,
      explanation: 'Sa sistemang ito, ang kolonyal na bansa ay gumagamit ng sariling opisyal upang mamahala ng direkta sa kolonya.'
    },
    { 
      q: 'Ang imperyalismo ay nagdulot ng pagkakaisa ng mga kolonya sa pandaigdigang kalakalan.', 
      answer: true,
      explanation: 'Ang mga kolonya ay naging bahagi ng global trade system bilang tagapagbigay ng hilaw na materyales at pamilihan.'
    },
    { 
      q: 'Ang United States ay hindi kailanman naging bahagi ng imperyalismo.', 
      answer: false,
      explanation: 'Matapos ang Spanish-American War, nakuha ng US ang ilang teritoryo tulad ng Pilipinas, Guam, at Puerto Rico.'
    },
    { 
      q: 'Ang paglaban at kilusang nasyonalismo ay tugon ng mga mamamayan sa kolonyalismo.', 
      answer: true,
      explanation: 'Maraming mamamayan sa mga kolonya ang nag-organisa ng mga kilusan upang makamit ang kalayaan.'
    },
  ],
  ww1: [
    { 
      q: 'Ang Unang Digmaang Pandaigdig ay nagsimula dahil lamang sa isang dahilan.', 
      answer: false,
      explanation: 'Maraming sanhi (MAIN) ang nagdulot nito, hindi iisa lamang.'
    },
    { 
      q: 'Ang alyansa ang nagpalawak ng digmaan.', 
      answer: true,
      explanation: 'Nadamay ang maraming bansa dahil sa kasunduan.'
    },
    { 
      q: 'Ang trench warfare ay nagresulta sa mabilis na panalo.', 
      answer: false,
      explanation: 'Nagdulot ito ng matagal na stalemate.'
    },
    { 
      q: 'Ang United States ay agad na sumali sa digmaan mula 1914.', 
      answer: false,
      explanation: 'Sumali lamang ito noong 1917.'
    },
    { 
      q: 'Ang Treaty of Versailles ay nagbigay gantimpala sa Germany.', 
      answer: false,
      explanation: 'Nagpataw ito ng mabigat na parusa.'
    },
    { 
      q: 'Ang militarismo ay nagpalala ng tensyon sa Europa.', 
      answer: true,
      explanation: 'Ang arms race ay nagdulot ng takot at kompetisyon.'
    },
    { 
      q: 'Ang League of Nations ay naging ganap na epektibo.', 
      answer: false,
      explanation: 'Nabigo ito dahil sa kakulangan ng kapangyarihan.'
    },
    { 
      q: 'Ang pagpaslang kay Franz Ferdinand ay direktang sanhi ng digmaan.', 
      answer: true,
      explanation: 'Ito ang nag-trigger ng sunod-sunod na deklarasyon ng digmaan.'
    },
    { 
      q: 'Ang total war ay nangangahulugang limitado lamang ang partisipasyon ng mamamayan.', 
      answer: false,
      explanation: 'Lahat ng sektor ng lipunan ay kasali.'
    },
    { 
      q: 'Ang WWI ay nagdulot ng pagbagsak ng ilang imperyo.', 
      answer: true,
      explanation: 'Bumagsak ang German, Ottoman, Austro-Hungarian, at Russian Empires.'
    },
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

const identificationData = {
  imp: [
    {
      q: 'Sistemang may direktang kontrol ng kolonyal na bansa',
      answer: 'Direktang pamamahala',
      explanation: 'Ito ay sistemang ang kolonyal na bansa mismo ang namamahala sa teritoryo gamit ang sariling opisyal, kaya mataas ang antas ng kontrol.'
    },
    {
      q: 'Kasunduan na naghati sa mundo sa Spain at Portugal',
      answer: 'Treaty of Tordesillas',
      explanation: 'Isang kasunduan na naghati sa mundo sa pagitan ng Spain at Portugal upang maiwasan ang sigalot sa pag-aangkin ng lupain.'
    },
    {
      q: 'Ideolohiyang nagsasabing tungkulin ng Europa na "paunlarin" ang iba',
      answer: 'White man\'s burden',
      alternatives: ['Civilizing mission'],
      explanation: 'Ideolohiyang nagsasabing may moral na obligasyon ang mga Europeo na dalhin ang kanilang kultura at kaalaman sa ibang bansa.'
    },
    {
      q: 'Kumpanyang ginamit ng England sa India',
      answer: 'British East India Company',
      explanation: 'Isang pribadong kompanya na ginamit ng England upang kontrolin ang kalakalan at pamamahala sa India.'
    },
    {
      q: 'Sistemang ginamit ng Dutch sa Indonesia',
      answer: 'Cultivation System',
      explanation: 'Patakarang ipinatupad ng Dutch na nagpilit sa mga magsasaka na magtanim ng produktong pang-export, na nagdulot ng pagsasamantala.'
    },
    {
      q: 'Digmaang nagpatunay na kayang talunin ng Asya ang Europa (Japan vs Russia)',
      answer: 'Digmaang Ruso-Hapon',
      alternatives: ['Russo-Japanese War'],
      explanation: 'Digmaang nagpakita na kayang talunin ng Japan ang isang bansang Europeo, kaya nagbago ang pananaw sa kapangyarihan sa Asya.'
    },
    {
      q: 'Pagmamahal sa bansa na nagtulak sa pananakop',
      answer: 'Nasyonalismo',
      alternatives: ['Nationalism'],
      explanation: 'Malakas na damdamin ng pagmamahal sa bansa na nagtulak sa pagpapalawak ng kapangyarihan at kompetisyon sa ibang bansa.'
    },
    {
      q: 'Pagpapalawak ng impluwensya ng isang bansa sa iba',
      answer: 'Imperyalismo',
      alternatives: ['Imperialism'],
      explanation: 'Tumutukoy sa pagpapalawak ng impluwensya ng isang bansa sa iba, maaaring sa ekonomiya, politika, o kultura.'
    },
    {
      q: 'Permanenteng paninirahan sa nasakop na lugar',
      answer: 'Kolonyalismo',
      alternatives: ['Colonialism'],
      explanation: 'Isang anyo ng imperyalismo kung saan may direktang paninirahan at pamamahala sa nasakop na lugar.'
    },
    {
      q: 'Sistemang gumagamit ng lokal na pinuno sa pamamahala',
      answer: 'Di-direktang pamamahala',
      alternatives: ['Indirect rule'],
      explanation: 'Sistemang gumagamit ng lokal na lider upang mapanatili ang kontrol ng mananakop nang hindi direktang namamahala.'
    },
  ],
  ww1: [
    {
      q: 'Dahilan ng WWI na tumutukoy sa Militarism, Alliances, Imperialism, Nationalism',
      answer: 'MAIN',
      explanation: 'Acronym para sa pangunahing sanhi ng Unang Digmaang Pandaigdig.'
    },
    {
      q: 'Arkiduke ng Austria-Hungary na pinaslang noong 1914',
      answer: 'Franz Ferdinand',
      alternatives: ['Archduke Franz Ferdinand'],
      explanation: 'Ang kanyang pagkamatay ang naging trigger ng WWI.'
    },
  ],
  ww2: [
    {
      q: 'Diktador ng Germany na namuno sa Nazi Party',
      answer: 'Adolf Hitler',
      alternatives: ['Hitler'],
      explanation: 'Siya ang pangunahing sanhi ng Ikalawang Digmaang Pandaigdig.'
    },
  ],
  cold: [
    {
      q: 'Tensyon sa pagitan ng US at USSR matapos ang WWII',
      answer: 'Cold War',
      explanation: 'Panahon ng matinding kompetisyon ngunit walang direktang digmaan.'
    },
  ],
  glob: [
    {
      q: 'Proseso ng pagkonekta ng mga bansa sa buong mundo',
      answer: 'Globalisasyon',
      alternatives: ['Globalization'],
      explanation: 'Pag-uugnay ng mga bansa sa pamamagitan ng kalakalan, teknolohiya, at kultura.'
    },
  ],
};

export default function QuizzesSection() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<'mcq' | 'tf' | 'identification'>('mcq');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuizData = selectedTopic
    ? quizType === 'mcq'
      ? mcqData[selectedTopic as keyof typeof mcqData] || []
      : quizType === 'tf'
      ? tfData[selectedTopic as keyof typeof tfData] || []
      : identificationData[selectedTopic as keyof typeof identificationData] || []
    : [];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setUserInput('');
    setShowResult(false);
    setQuizComplete(false);
  };

  const handleAnswer = () => {
    if (quizType === 'identification' && !userInput.trim()) return;
    if (quizType !== 'identification' && selectedAnswer === null) return;

    const question = currentQuizData[currentQuestion];
    let isCorrect = false;

    if (quizType === 'identification') {
      const userAnswer = userInput.trim().toLowerCase();
      const correctAnswer = question.answer.toLowerCase();
      const alternatives = question.alternatives?.map((alt: string) => alt.toLowerCase()) || [];
      
      isCorrect = userAnswer === correctAnswer || alternatives.some((alt: string) => userAnswer === alt);
    } else {
      isCorrect = selectedAnswer === question.answer;
    }

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
      setUserInput('');
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setUserInput('');
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
            onClick={() => {
              setQuizType('mcq');
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setUserInput('');
              setShowResult(false);
              setQuizComplete(false);
            }}
            className={`flex-1 ${
              quizType === 'mcq'
                ? 'bg-gradient-to-r from-[#d49240] to-[#b87835] text-white'
                : 'bg-[#f5e6d3] text-[#8b5a2b] hover:bg-[#ead5bb]'
            }`}
          >
            Multiple Choice
          </Button>
          <Button
            onClick={() => {
              setQuizType('tf');
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setUserInput('');
              setShowResult(false);
              setQuizComplete(false);
            }}
            className={`flex-1 ${
              quizType === 'tf'
                ? 'bg-gradient-to-r from-[#d49240] to-[#b87835] text-white'
                : 'bg-[#f5e6d3] text-[#8b5a2b] hover:bg-[#ead5bb]'
            }`}
          >
            Tama o Mali
          </Button>
          <Button
            onClick={() => {
              setQuizType('identification');
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setUserInput('');
              setShowResult(false);
              setQuizComplete(false);
            }}
            className={`flex-1 ${
              quizType === 'identification'
                ? 'bg-gradient-to-r from-[#d49240] to-[#b87835] text-white'
                : 'bg-[#f5e6d3] text-[#8b5a2b] hover:bg-[#ead5bb]'
            }`}
          >
            Identification
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
        ) : quizType === 'tf' ? (
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
        ) : (
          <div>
            <label className="block text-[#8b5a2b] font-semibold mb-3 text-lg">
              Isulat ang iyong sagot:
            </label>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer here..."
              className="text-lg p-6 border-2 border-[#d4a574] focus:border-[#d49240] rounded-xl"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !showResult && userInput.trim()) {
                  handleAnswer();
                }
              }}
            />
          </div>
        )}

        {showResult && (
          <div
            className={`mt-6 p-6 rounded-xl border-4 flex items-start gap-4 ${
              (quizType === 'identification' 
                ? (userInput.trim().toLowerCase() === question.answer.toLowerCase() || 
                   (question.alternatives?.some((alt: string) => userInput.trim().toLowerCase() === alt.toLowerCase())))
                : selectedAnswer === question.answer)
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            {(quizType === 'identification' 
              ? (userInput.trim().toLowerCase() === question.answer.toLowerCase() || 
                 (question.alternatives?.some((alt: string) => userInput.trim().toLowerCase() === alt.toLowerCase())))
              : selectedAnswer === question.answer) ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-bold text-lg mb-2">
                {(quizType === 'identification' 
                  ? (userInput.trim().toLowerCase() === question.answer.toLowerCase() || 
                     (question.alternatives?.some((alt: string) => userInput.trim().toLowerCase() === alt.toLowerCase())))
                  : selectedAnswer === question.answer) ? 'Tama!' : 'Mali'}
              </p>
              {quizType === 'identification' && 
               !(userInput.trim().toLowerCase() === question.answer.toLowerCase() || 
                 (question.alternatives?.some((alt: string) => userInput.trim().toLowerCase() === alt.toLowerCase()))) && (
                <>
                  <p className="text-red-700 mb-2">
                    <strong>Iyong sagot:</strong> {userInput}
                  </p>
                  <p className="text-green-700 mb-2">
                    <strong>Tamang sagot:</strong> {question.answer}
                  </p>
                </>
              )}
              {quizType !== 'identification' && selectedAnswer !== question.answer && (
                <p className="text-gray-700 mb-2">
                  <strong>Tamang sagot:</strong> {quizType === 'mcq' ? ('options' in question ? question.options[question.answer as number] : '') : question.answer ? 'Tama' : 'Mali'}
                </p>
              )}
              {'explanation' in question && question.explanation && (
                <p className="mt-2 text-gray-700"><strong>Paliwanag:</strong> {question.explanation}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {!showResult ? (
            <Button
              onClick={handleAnswer}
              disabled={quizType === 'identification' ? !userInput.trim() : selectedAnswer === null}
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
