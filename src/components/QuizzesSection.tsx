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

// Define available quiz types for each topic
const availableQuizTypes: Record<string, Array<'mcq' | 'tf' | 'identification'>> = {
  imp: ['mcq', 'identification'],
  ww1: ['mcq', 'tf'],
  ww2: ['mcq', 'identification'],
  cold: ['mcq', 'tf'],
  glob: ['mcq', 'tf'],
};

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
      q: 'Alin sa sumusunod ang pinakamahusay na nagpapaliwanag kung bakit naging pandaigdigan ang digmaan mula sa isang lokal na alitan?',
      options: ['Dahil sa teknolohiya', 'Dahil sa alyansa ng mga bansa', 'Dahil sa relihiyon', 'Dahil sa kalakalan'],
      answer: 1,
      explanation: 'Dahil sa sistema ng alyansa, ang alitan ng Austria-Hungary at Serbia ay nadamay ang kanilang mga kaalyado, kaya lumawak ang digmaan.'
    },
    {
      q: 'Paano nakaapekto ang militarismo sa pagsiklab ng digmaan?',
      options: ['Nagpahina ng hukbo', 'Nagpalakas ng ekonomiya', 'Nagdulot ng takot at kompetisyon sa armas', 'Nagpababa ng tensyon'],
      answer: 2,
      explanation: 'Ang arms race ay nagpalala ng tensyon at hinala sa pagitan ng mga bansa.'
    },
    {
      q: 'Ano ang naging papel ng nasyonalismo sa digmaan?',
      options: ['Nagdulot ng pagkakaisa ng lahat', 'Nagpalala ng tunggalian at pagnanais ng kapangyarihan', 'Nagpahinto ng digmaan', 'Nagpaunlad ng ekonomiya'],
      answer: 1,
      explanation: 'Ang matinding pagmamahal sa bansa ay nag-udyok ng kompetisyon at hidwaan.'
    },
    {
      q: 'Bakit mahalaga ang pagpaslang kay Archduke Franz Ferdinand?',
      options: ['Dahil siya ang hari', 'Dahil ito ang direktang nagpasiklab ng digmaan', 'Dahil ito ang huling labanan', 'Dahil ito ang kasunduan'],
      answer: 1,
      explanation: 'Ito ang naging "spark" o mitsa ng digmaan na nagpasimula ng chain reaction.'
    },
    {
      q: 'Ano ang pangunahing katangian ng trench warfare?',
      options: ['Mabilis na laban', 'Labanan sa himpapawid', 'Mabagal at patagalan na labanan', 'Walang depensa'],
      answer: 2,
      explanation: 'Nagdulot ito ng stalemate kung saan walang panig ang makausad.'
    },
    {
      q: 'Ano ang ipinapakita ng paggamit ng poison gas at machine guns?',
      options: ['Pag-unlad ng agrikultura', 'Modernisasyon ng digmaan', 'Pagbaba ng pinsala', 'Pagkawala ng digmaan'],
      answer: 1,
      explanation: 'Ipinakita nito ang epekto ng industriyalisasyon sa pakikidigma.'
    },
    {
      q: 'Bakit tinawag na "total war" ang digmaan?',
      options: ['Dahil maikli ito', 'Dahil lahat ng yaman at mamamayan ay kasali', 'Dahil walang sundalo', 'Dahil tahimik'],
      answer: 1,
      explanation: 'Lahat ng aspeto ng lipunan ay ginamit para sa digmaan.'
    },
    {
      q: 'Ano ang pangunahing dahilan ng pagsuko ng Germany noong 1918?',
      options: ['Panalo sila', 'Pagod na hukbo at kakulangan sa suplay', 'Pagkapanalo ng Russia', 'Pagkawala ng teknolohiya'],
      answer: 1,
      explanation: 'Naubos ang lakas at suporta ng Germany kaya napilitang sumuko.'
    },
    {
      q: 'Ano ang epekto ng Treaty of Versailles sa Germany?',
      options: ['Paglakas ng ekonomiya', 'Pagkakaroon ng kolonya', 'Mabigat na parusa at kahihiyan', 'Pagkapanalo'],
      answer: 2,
      explanation: 'Pinatawan ito ng malaking bayad at limitasyon sa militar.'
    },
    {
      q: 'Paano nakaapekto ang digmaan sa pandaigdigang politika?',
      options: ['Walang pagbabago', 'Pagbagsak ng mga imperyo at pag-usbong ng bagong bansa', 'Pagkawala ng bansa', 'Pag-unti ng populasyon lamang'],
      answer: 1,
      explanation: 'Nagbago ang mapa ng mundo at nabuo ang mga bagong bansa.'
    },
  ],
  ww2: [
    {
      q: 'Aling sitwasyon ang pinakamahusay na nagpapakita kung bakit lumakas ang suporta kay Hitler?',
      options: ['Pag-unlad ng ekonomiya ng Germany', 'Pagkakaisa ng Allied Powers', 'Kahirapan at kahihiyang dulot ng Treaty of Versailles', 'Pagkatalo ng Japan'],
      answer: 2,
      explanation: 'Pinagsamang krisis at kahihiyan ang nagbunsod ng paghahanap ng radikal na lider.'
    },
    {
      q: 'Paano nakaimpluwensya ang Great Depression sa politika ng Europe?',
      options: ['Pinatatag ang demokrasya', 'Pinalakas ang tradisyunal na lider', 'Nagbukas ng daan sa awtoritaryanismo', 'Naging neutral ang mga bansa'],
      answer: 2,
      explanation: 'Krisis sa ekonomiya → pagkawala ng tiwala → pagtanggap sa diktador.'
    },
    {
      q: 'Ano ang implikasyon ng totalitarianismo sa ugnayang pandaigdig?',
      options: ['Mas maraming kompromiso', 'Mas kontroladong desisyon ng iisang lider', 'Mas bukas na komunikasyon', 'Mas mabagal na aksyon'],
      answer: 1,
      explanation: 'Iisang lider ang mabilis magpasya, kaya tumataas ang tensyon.'
    },
    {
      q: 'Bakit nagkaroon ng alitan sa pagitan ng Axis at Allied Powers?',
      options: ['Dahil sa pagkakaiba ng klima', 'Dahil sa magkasalungat na layunin at ideolohiya', 'Dahil sa kakulangan sa lider', 'Dahil sa neutralidad'],
      answer: 1,
      explanation: 'Expansion vs. pagpigil sa pananakop ang ugat ng alitan.'
    },
    {
      q: 'Ano ang agarang bunga ng pagsalakay sa Poland noong 1939?',
      options: ['Pagbuo ng UN', 'Pagdeklara ng digmaan ng UK at France', 'Pagsuko ng Germany', 'Pagpasok ng U.S.'],
      answer: 1,
      explanation: 'Tinupad ng UK at France ang kasunduang ipagtanggol ang Poland.'
    },
    {
      q: 'Ano ang ipinapakita ng blitzkrieg strategy tungkol sa modernong digmaan?',
      options: ['Nakatuon sa depensa', 'Umaasa sa bilis at koordinasyon', 'Mabagal na paglusob', 'Diplomasya ang sandata'],
      answer: 1,
      explanation: 'Pinagsamang lakas at bilis ang nagpapabagsak ng kalaban.'
    },
    {
      q: 'Ano ang estratehikong kahalagahan ng D-Day sa digmaan?',
      options: ['Nagpatigil sa digmaan sa Asya', 'Nagbukas ng bagong front laban sa Germany', 'Nagpatibay sa Axis', 'Nagpasuko sa Japan'],
      answer: 1,
      explanation: 'Nagbigay-daan sa paglaya ng Kanlurang Europe.'
    },
    {
      q: 'Ano ang ipinahihiwatig ng pagbagsak ng Berlin noong 1945?',
      options: ['Paglakas ng Axis', 'Katapusan ng digmaan sa Europe', 'Simula ng Cold War', 'Pagkapanalo ng Japan'],
      answer: 1,
      explanation: 'Bumagsak ang sentro ng Nazi power.'
    },
    {
      q: 'Bakit naging kritikal ang paggamit ng atomic bomb sa Japan?',
      options: ['Nagpalakas sa militar ng Japan', 'Nagdulot ng agarang pagsuko', 'Nagpahaba ng digmaan', 'Nagpatibay sa Axis'],
      answer: 1,
      explanation: 'Malawakang pinsala ang pumilit sa Japan na tumigil.'
    },
    {
      q: 'Alin ang pinakamahalagang pagbabagong dulot ng WWII sa pandaigdigang kaayusan?',
      options: ['Pagkawala ng alyansa', 'Pag-usbong ng U.S. at USSR bilang superpowers', 'Pagkakapantay ng lahat ng bansa', 'Pagwawakas ng lahat ng digmaan'],
      answer: 1,
      explanation: 'Nagbago ang balanse ng kapangyarihan sa mundo.'
    },
  ],
  cold: [
    {
      q: 'Ano ang pangunahing dahilan kung bakit iniwasan ng US at USSR ang direktang digmaan sa Cold War?',
      options: ['Kakulangan sa sundalo', 'Takot sa mutual destruction dulot ng nuclear weapons', 'Kawalan ng interes sa digmaan', 'Pagkakaibigan ng mga lider'],
      answer: 1,
      explanation: 'Parehong may nuclear weapons ang dalawang bansa, kaya ang direktang digmaan ay maaaring magdulot ng malawakang pagkawasak sa magkabilang panig (MAD).'
    },
    {
      q: 'Ano ang ipinapahiwatig ng "domino theory"?',
      options: ['Pagbagsak ng ekonomiya', 'Pagkalat ng komunismo mula sa isang bansa patungo sa iba', 'Pagkakaisa ng mga bansa', 'Pagwawakas ng digmaan'],
      answer: 1,
      explanation: 'Pinaniniwalaan ng US na kapag naging komunista ang isang bansa, susunod ang mga kalapit nito.'
    },
    {
      q: 'Ano ang naging epekto ng Berlin Blockade sa relasyon ng mga bansa?',
      options: ['Nagkaroon ng pagkakaisa', 'Lalong tumindi ang tensyon sa pagitan ng US at USSR', 'Natapos ang Cold War', 'Naging neutral ang Germany'],
      answer: 1,
      explanation: 'Isa ito sa unang krisis ng Cold War na nagpalala ng hidwaan ng dalawang panig.'
    },
    {
      q: 'Ano ang pangunahing layunin ng propaganda sa Cold War?',
      options: ['Magturo ng agham', 'Hikayatin ang suporta at sirain ang kalaban', 'Magbigay ng trabaho', 'Magpalago ng ekonomiya'],
      answer: 1,
      explanation: 'Ginamit ito upang impluwensyahan ang isip ng mamamayan at palakasin ang ideolohiya.'
    },
    {
      q: 'Paano nakaapekto ang Space Race sa Cold War?',
      options: ['Nagdulot ng digmaan', 'Naging sukatan ng teknolohikal na kapangyarihan', 'Nagpababa ng tensyon', 'Nagwakas ng alyansa'],
      answer: 1,
      explanation: 'Ang tagumpay sa kalawakan ay simbolo ng superioridad ng isang ideolohiya.'
    },
    {
      q: 'Ano ang naging epekto ng pagkatalo ng US sa Vietnam War?',
      options: ['Lumakas ang kapitalismo sa Asya', 'Lumaganap ang komunismo sa rehiyon', 'Natapos ang Cold War', 'Nagkaroon ng kapayapaan'],
      answer: 1,
      explanation: 'Nagbigay ito ng daan sa paglawak ng impluwensyang komunista sa Timog-Silangang Asya.'
    },
    {
      q: 'Ano ang pangunahing dahilan ng pagbagsak ng Soviet Union?',
      options: ['Pananakop ng US', 'Panloob na kahinaan at reporma', 'Pagkatalo sa digmaan', 'Pagkawala ng alyansa'],
      answer: 1,
      explanation: 'Ang Glasnost at Perestroika ay naglantad ng kahinaan ng sistema at nagdulot ng pagbagsak nito.'
    },
    {
      q: 'Ano ang kahalagahan ng Cuban Missile Crisis?',
      options: ['Ito ang unang digmaan', 'Ito ang pinakamalapit sa nuclear war', 'Ito ang huling laban', 'Ito ang kasunduan'],
      answer: 1,
      explanation: 'Halos humantong ito sa nuclear war kaya naging kritikal na yugto ng Cold War.'
    },
    {
      q: 'Ano ang naging epekto ng Unang Digmaang Pandaigdig sa Gitnang Silangan?',
      options: ['Walang pagbabago', 'Pagkontrol ng Britain at France sa dating teritoryo ng Ottoman', 'Paglakas ng Ottoman Empire', 'Pagkakaroon ng iisang bansa'],
      answer: 1,
      explanation: 'Nahati ang mga teritoryo at napunta sa kontrol ng Kanluran.'
    },
    {
      q: 'Ano ang pangunahing kahinaan ng League of Nations?',
      options: ['Maraming miyembro', 'Walang sariling puwersang militar', 'May labis na kapangyarihan', 'Kontrolado ng Germany'],
      answer: 1,
      explanation: 'Dahil wala itong kakayahang magpatupad ng desisyon, naging mahina ito sa pagpigil ng digmaan.'
    },
  ],
  glob: [
    {
      q: 'Ano ang pinakamalapit na kahulugan ng globalisasyon?',
      options: ['Pagkakahiwalay ng mga bansa', 'Pagsasama-sama ng ekonomiya, kultura, at politika ng mga bansa', 'Pagkontrol ng isang bansa sa lahat', 'Pagbawas ng teknolohiya'],
      answer: 1,
      explanation: 'Ang globalisasyon ay proseso ng pag-uugnay ng mga bansa sa aspeto ng ekonomiya, kultura, at politika sa pamamagitan ng teknolohiya at kalakalan.'
    },
    {
      q: 'Alin sa sumusunod ang halimbawa ng political globalization?',
      options: ['Pag-usbong ng K-pop', 'Pagbuo ng ASEAN', 'Pagtaas ng export', 'Pagkain ng fusion food'],
      answer: 1,
      explanation: 'Ang ASEAN ay isang pandaigdigang organisasyon na nagpapakita ng kooperasyong politikal sa pagitan ng mga bansa.'
    },
    {
      q: 'Bakit sinasabing may epekto ang globalisasyon sa soberanya ng estado?',
      options: ['Nawawala ang kultura', 'Tumataas ang populasyon', 'Naiimpluwensyahan ng pandaigdigang kasunduan ang desisyon ng bansa', 'Lahat ng bansa ay nagiging pareho'],
      answer: 2,
      explanation: 'Dahil sa treaties at international agreements, may mga desisyong kailangang iayon ng bansa sa pandaigdigang pamantayan.'
    },
    {
      q: 'Ano ang pangunahing layunin ng free trade?',
      options: ['Pataas ang presyo ng produkto', 'Pigilan ang kalakalan', 'Palayain ang daloy ng produkto sa pagitan ng bansa', 'Limitahan ang import'],
      answer: 2,
      explanation: 'Layunin ng free trade na alisin ang hadlang tulad ng tariffs upang mapadali ang palitan ng produkto.'
    },
    {
      q: 'Alin ang pinakamainam na halimbawa ng outsourcing?',
      options: ['Pagbili ng lokal na produkto', 'Paglipat ng produksyon sa ibang bansa para makatipid', 'Pagtaas ng buwis', 'Pag-aaral ng kultura'],
      answer: 1,
      explanation: 'Ang outsourcing ay pag-delegate ng trabaho o produksyon sa ibang bansa upang mabawasan ang gastos.'
    },
    {
      q: 'Ano ang maaaring negatibong epekto ng economic globalization?',
      options: ['Pagdami ng trabaho', 'Pagbaba ng presyo', 'Pagkalugi ng lokal na negosyo', 'Pag-unlad ng teknolohiya'],
      answer: 2,
      explanation: 'Dahil sa kompetisyon mula sa murang imported goods, nahihirapan ang lokal na negosyo na makipagsabayan.'
    },
    {
      q: 'Ano ang ibig sabihin ng hybridization ng kultura?',
      options: ['Pagkawala ng kultura', 'Pagkopya ng banyagang kultura', 'Paghahalo ng lokal at banyagang kultura', 'Pag-iwas sa ibang kultura'],
      answer: 2,
      explanation: 'Nagkakaroon ng bagong anyo ng kultura mula sa pagsasanib ng lokal at dayuhang impluwensya.'
    },
    {
      q: 'Alin ang halimbawa ng homogenization?',
      options: ['Pagkakaiba-iba ng kultura', 'Pagkakaroon ng natatanging tradisyon', 'Pagiging magkakatulad ng kultura dahil sa global influence', 'Pag-unlad ng lokal na wika'],
      answer: 2,
      explanation: 'Ang homogenization ay nagreresulta sa pagkakapareho ng kultura dahil sa malakas na impluwensya ng global media at brands.'
    },
    {
      q: 'Paano nakakatulong ang globalisasyon sa global citizenship?',
      options: ['Nagiging makasarili ang tao', 'Lumalawak ang responsibilidad sa kapwa-tao sa buong mundo', 'Nawawala ang komunikasyon', 'Nababawasan ang kaalaman'],
      answer: 1,
      explanation: 'Dahil sa globalisasyon, mas nagiging mulat ang tao sa isyu ng ibang bansa at nagkakaroon ng pakikiisa.'
    },
    {
      q: 'Ano ang pinakamainam na solusyon sa hamon ng globalisasyon?',
      options: ['Iwasan ang ibang bansa', 'Itigil ang kalakalan', 'Isulong ang sustainable lifestyle at ethical consumption', 'Isara ang internet'],
      answer: 2,
      explanation: 'Ang responsableng pamumuhay ay tumutulong upang mabawasan ang negatibong epekto ng globalisasyon.'
    },
  ],
};

const tfData = {
  imp: [],
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
    { 
      q: 'Ang Cold War ay isang direktang digmaan sa pagitan ng US at USSR.', 
      answer: false,
      explanation: 'Ito ay hindi direktang labanan kundi ideolohikal at proxy wars lamang.'
    },
    { 
      q: 'Ang arms race ay nagdulot ng pagtaas ng bilang ng nuclear weapons.', 
      answer: true,
      explanation: 'Nagkaroon ng kompetisyon sa paggawa ng mas malalakas na armas.'
    },
    { 
      q: 'Ang Sputnik ay inilunsad ng United States.', 
      answer: false,
      explanation: 'Ito ay unang satellite na inilunsad ng USSR.'
    },
    { 
      q: 'Ang Berlin Airlift ay tugon sa blockade ng Soviet Union.', 
      answer: true,
      explanation: 'Nagpadala ng suplay ang US upang suportahan ang West Berlin.'
    },
    { 
      q: 'Ang Perestroika ay patakarang militar.', 
      answer: false,
      explanation: 'Ito ay repormang pang-ekonomiya.'
    },
    { 
      q: 'Ang Cold War ay nagdulot ng paghahati ng mundo sa dalawang ideolohiya.', 
      answer: true,
      explanation: 'Nahati ang mundo sa kapitalismo at komunismo.'
    },
    { 
      q: 'Ang Treaty of Versailles ay nagdulot ng galit sa Germany.', 
      answer: true,
      explanation: 'Dahil sa mabigat na parusa, nagkaroon ng sama ng loob ang Germany.'
    },
    { 
      q: 'Ang NATO ay alyansa ng mga komunistang bansa.', 
      answer: false,
      explanation: 'Ito ay alyansa ng mga bansang kapitalista.'
    },
    { 
      q: 'Ang pagbagsak ng Berlin Wall ay simbolo ng pagtatapos ng Cold War.', 
      answer: true,
      explanation: 'Ipinakita nito ang pagbagsak ng komunismo sa Eastern Europe.'
    },
    { 
      q: 'Ang WWI ay walang naging epekto sa hinaharap na digmaan.', 
      answer: false,
      explanation: 'Ito ay naging isa sa mga sanhi ng WWII dahil sa mga kasunduang ipinataw.'
    },
  ],
  glob: [
    { 
      q: 'Ang globalisasyon ay nag-uugnay sa mga bansa sa pamamagitan ng teknolohiya at kalakalan.', 
      answer: true,
      explanation: 'Ito ang pangunahing mekanismo kung paano nagiging konektado ang mga bansa.'
    },
    { 
      q: 'Walang epekto ang globalisasyon sa lokal na trabaho.', 
      answer: false,
      explanation: 'Maaaring makalikha o makabawas ito ng trabaho depende sa sitwasyon.'
    },
    { 
      q: 'Ang multinational corporations ay nag-ooperate sa iisang bansa lamang.', 
      answer: false,
      explanation: 'Ang MNCs ay kumikilos sa maraming bansa upang palawakin ang negosyo.'
    },
    { 
      q: 'Ang global supply chain ay kinabibilangan ng produksyon sa iba\'t ibang bansa.', 
      answer: true,
      explanation: 'Iba\'t ibang bahagi ng produkto ay ginagawa sa iba\'t ibang bansa.'
    },
    { 
      q: 'Ang cultural globalization ay nagpapalaganap ng media at internet culture.', 
      answer: true,
      explanation: 'Media at internet ang pangunahing daluyan ng pagkalat ng kultura.'
    },
    { 
      q: 'Ang homogenization ay nagpapalakas ng lokal na identidad.', 
      answer: false,
      explanation: 'Ito ay nagdudulot ng pagkawala o paghina ng lokal na kultura.'
    },
    { 
      q: 'Ang globalisasyon ay maaaring magdulot ng hindi pantay na distribusyon ng yaman.', 
      answer: true,
      explanation: 'Mas nakikinabang ang mayayamang bansa kaysa sa umuunlad.'
    },
    { 
      q: 'Ang global citizenship ay nangangahulugang responsibilidad lamang sa sariling bansa.', 
      answer: false,
      explanation: 'Saklaw nito ang pananagutan sa buong mundo.'
    },
    { 
      q: 'Ang transnational advocacy networks ay tumutulong sa global issues tulad ng climate change.', 
      answer: true,
      explanation: 'Pinag-uugnay nito ang mga tao para sa sama-samang aksyon.'
    },
    { 
      q: 'Ang sustainable lifestyle ay walang kinalaman sa globalisasyon.', 
      answer: false,
      explanation: 'Ito ay mahalagang tugon upang mabawasan ang epekto ng globalisasyon.'
    },
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
      q: 'Kasunduang nagparusa sa Germany',
      answer: 'Treaty of Versailles',
      explanation: 'Nagpataw ng mabigat na parusa at limitasyon na nagdulot ng galit sa Germany.'
    },
    {
      q: 'Pandaigdigang krisis sa ekonomiya noong 1930s',
      answer: 'Great Depression',
      explanation: 'Nagdulot ng malawakang kahirapan at pagkawala ng tiwala sa pamahalaan.'
    },
    {
      q: 'Sistemang may ganap na kontrol ng estado',
      answer: 'Totalitarianismo',
      alternatives: ['Totalitarianism'],
      explanation: 'Lahat ng aspeto ng buhay ay kontrolado ng pamahalaan o lider.'
    },
    {
      q: 'Pinuno ng Nazi Germany',
      answer: 'Adolf Hitler',
      alternatives: ['Hitler'],
      explanation: 'Pinamunuan ang Germany sa agresibong pananakop at digmaan.'
    },
    {
      q: 'Pinuno ng Fascist Italy',
      answer: 'Benito Mussolini',
      alternatives: ['Mussolini'],
      explanation: 'Nagpatupad ng fascism at nakipag-alyansa sa Germany.'
    },
    {
      q: 'Alyansa ng Germany, Italy, Japan',
      answer: 'Axis Powers',
      alternatives: ['Axis'],
      explanation: 'Mga bansang naghangad palawakin ang kanilang teritoryo at impluwensya.'
    },
    {
      q: 'Alyansa laban sa Axis',
      answer: 'Allied Powers',
      alternatives: ['Allies', 'Allied'],
      explanation: 'Mga bansang nagtulungan upang pigilan ang pananakop ng Axis.'
    },
    {
      q: 'Biglaang pag-atake ng Japan sa U.S.',
      answer: 'Pearl Harbor',
      explanation: 'Inatake ang base ng U.S. na nagdulot ng pagpasok nito sa digmaan.'
    },
    {
      q: 'Paglusob ng Allied sa Normandy',
      answer: 'D-Day',
      explanation: 'Mahalaga sa pagbawi ng Europe mula sa kontrol ng Germany.'
    },
    {
      q: 'Pandaigdigang organisasyon para sa kapayapaan',
      answer: 'United Nations',
      alternatives: ['UN'],
      explanation: 'Itinatag upang mapanatili ang kapayapaan at maiwasan ang digmaan.'
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
    // Set quiz type to the first available type for this topic
    const availableTypes = availableQuizTypes[topicId] || ['mcq'];
    setQuizType(availableTypes[0]);
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
      <div className="relative min-h-screen overflow-hidden">
        {/* Educational Brown Theme Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d3] via-[#faf3e8] to-[#f5e6d3]" />
        
        {/* Floating Educational Elements - Brown Theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s', color: '#8b5a2b' }}>📚</div>
          <div className="absolute top-20 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s', color: '#d49240' }}>✏️</div>
          <div className="absolute bottom-20 left-20 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.2s', color: '#c77d3a' }}>🎓</div>
          <div className="absolute bottom-10 right-10 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.8s', color: '#b87835' }}>📖</div>
          <div className="absolute top-1/2 left-1/4 text-4xl opacity-15" style={{ animation: 'float 6s ease-in-out infinite', color: '#8b5a2b' }}>🔖</div>
          <div className="absolute top-1/3 right-1/4 text-4xl opacity-15" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '2s', color: '#d49240' }}>📐</div>
        </div>

        {/* Decorative corner patterns */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-8 border-t-8 border-[#c77d3a] opacity-40 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-8 border-t-8 border-[#c77d3a] opacity-40 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-8 border-b-8 border-[#c77d3a] opacity-40 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-8 border-b-8 border-[#c77d3a] opacity-40 rounded-br-3xl" />

        <div className="relative z-10 space-y-8">
          {/* Academic Header - Brown Theme */}
          <div className="relative">
            <Card className="border-4 border-[#c77d3a] bg-gradient-to-r from-[#8b5a2b] to-[#b87835] p-8 shadow-2xl rounded-xl relative overflow-hidden transform hover:scale-105 transition-all">
              {/* Chalkboard texture overlay */}
              <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)',
              }} />
              
              <div className="relative">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-6xl animate-bounce">📚</span>
                  <h2 className="text-4xl md:text-6xl font-black text-[#f5e6d3] text-center drop-shadow-xl animate-pulse">
                    Test Your Knowledge
                  </h2>
                  <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎓</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xl text-[#f5e6d3] font-semibold">
                  <span>✏️</span>
                  <p className="text-center drop-shadow-md">
                    Answer topic-based quizzes with instant feedback and clear explanations
                  </p>
                  <span>✏️</span>
                </div>
                
                {/* Decorative line */}
                <div className="mt-4 h-1 bg-[#f5e6d3] opacity-50 mx-auto rounded-full" style={{ width: '80%' }} />
              </div>
            </Card>
          </div>

          {/* Book-style Topic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {quizTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="animate-in zoom-in duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleTopicSelect(topic.id)}
              >
                {/* Book Cover Design - Brown Theme */}
                <Card className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 overflow-hidden h-80 ${
                  index % 5 === 0 ? 'border-[#c77d3a] bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8]' :
                  index % 5 === 1 ? 'border-[#d49240] bg-gradient-to-br from-[#faf3e8] to-[#f5e6d3]' :
                  index % 5 === 2 ? 'border-[#b87835] bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8]' :
                  index % 5 === 3 ? 'border-[#c77d3a] bg-gradient-to-br from-[#faf3e8] to-[#f5e6d3]' :
                  'border-[#d49240] bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8]'
                }`}>
                  {/* Book spine shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#8b5a2b] opacity-20" />
                  
                  {/* Page lines effect */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(139,90,43,.1) 30px, rgba(139,90,43,.1) 31px)'
                  }} />

                  <div className="relative h-full flex flex-col p-8">
                    {/* Topic Number Badge - Brown Theme */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`h-16 w-16 rounded-full text-[#f5e6d3] flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-white ${
                        index % 5 === 0 ? 'bg-gradient-to-br from-[#8b5a2b] to-[#6d4522]' :
                        index % 5 === 1 ? 'bg-gradient-to-br from-[#c77d3a] to-[#b87835]' :
                        index % 5 === 2 ? 'bg-gradient-to-br from-[#d49240] to-[#c28437]' :
                        index % 5 === 3 ? 'bg-gradient-to-br from-[#8b5a2b] to-[#6d4522]' :
                        'bg-gradient-to-br from-[#c77d3a] to-[#b87835]'
                      }`}>
                        {topic.index}
                      </div>
                      <Badge className="text-xs font-bold shadow-md bg-[#f5e6d3] text-[#8b5a2b] border-2 border-[#c77d3a]">
                        📖 AVAILABLE
                      </Badge>
                    </div>

                    {/* Topic Title - Brown Theme */}
                    <h3 className="text-2xl font-black mb-4 leading-tight group-hover:scale-105 transition-transform text-[#8b5a2b]" style={{ fontFamily: 'Georgia, serif' }}>
                      {topic.title}
                    </h3>

                    {/* Decorative pencil icon */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">✏️</div>
                    </div>

                    {/* Start Button - Brown Theme */}
                    <Button className="w-full bg-gradient-to-r from-[#8b5a2b] to-[#6d4522] hover:from-[#6d4522] hover:to-[#5a3618] text-[#f5e6d3] font-black text-lg py-6 shadow-xl transform group-hover:scale-105 transition-all">
                      📚 START QUIZ
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Motivational Footer - Brown Theme */}
          <Card className="border-4 border-[#c77d3a] bg-gradient-to-r from-[#8b5a2b] via-[#c77d3a] to-[#d49240] p-6 shadow-2xl rounded-xl">
            <div className="flex items-center justify-center gap-4 text-2xl font-black text-[#f5e6d3]">
              <span className="text-4xl animate-bounce">🎓</span>
              <span>KNOWLEDGE IS POWER - START YOUR LEARNING JOURNEY!</span>
              <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>📚</span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const topic = quizTopics.find((t) => t.id === selectedTopic);

  // Check if quiz data is empty
  if (currentQuizData.length === 0) {
    const quizTypeLabel = quizType === 'mcq' ? 'Multiple Choice' : quizType === 'tf' ? 'Tama o Mali' : 'Identification';
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
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-3xl font-bold text-[#8b5a2b] mb-4">No Questions Available</h2>
          <p className="text-xl text-[#5a3618] mb-8">
            {quizTypeLabel} questions are not available for this topic yet.
          </p>
          <p className="text-lg text-[#5a3618] mb-8">
            Please try another quiz type or topic.
          </p>
          <Button
            onClick={() => setSelectedTopic(null)}
            className="bg-gradient-to-r from-[#d49240] to-[#b87835] hover:from-[#c28437] hover:to-[#a66c2f] text-white font-bold text-lg px-8 py-6"
          >
            Choose Another Topic
          </Button>
        </Card>
      </div>
    );
  }

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
          {availableQuizTypes[selectedTopic]?.includes('mcq') && (
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
          )}
          {availableQuizTypes[selectedTopic]?.includes('tf') && (
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
          )}
          {availableQuizTypes[selectedTopic]?.includes('identification') && (
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
          )}
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
