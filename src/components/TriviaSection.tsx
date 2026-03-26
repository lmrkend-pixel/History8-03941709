import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

const triviaFacts = [
  {
    topic: 'Christmas Truce (1914)',
    fact: 'Noong Unang Digmaang Pandaigdig, nagkaroon ng pansamantalang tigil-putukan na kilala bilang Christmas Truce noong 1914. Sa panahong ito, tumigil ang ilang sundalo sa labanan at nagkaroon ng mapayapang interaksyon, naglaro ng football, at nagpalitan ng regalo sa pagitan ng mga British at German troops.',
    icon: '🎄'
  },
  {
    topic: 'Messenger Pigeons sa WWI',
    fact: 'Gumamit ng mga kalapati bilang tagapagdala ng mensahe noong WWI dahil mas maaasahan sila kaysa sa ibang paraan ng komunikasyon. May mga kalapati na ginawaran pa ng parangal dahil sa kanilang kontribusyon. Ang kalapating si Cher Ami ay nakaligtas mula sa tatlong bala at nakapaghatid ng mahalagang mensahe na nakaligtas sa 200 sundalo.',
    icon: '🕊️'
  },
  {
    topic: 'Trench Warfare at Trench Foot',
    fact: 'Ang trench warfare noong Unang Digmaang Pandaigdig ay nagdulot ng matinding kondisyon sa kalusugan ng mga sundalo. Marami ang nagkaroon ng sakit na trench foot dahil sa matagal na pagkababad sa putik at tubig. Sa ilang matinding kaso, kinailangan pang gupitin ang mga paa.',
    icon: '👢'
  },
  {
    topic: 'China at Komunismo',
    fact: 'Ang China ay isa sa pinakamalaking bansang komunista sa kasalukuyan. Naitatag ang pamahalaang komunista matapos ang Chinese Revolution sa pamumuno ni Mao Zedong. Hanggang ngayon, nananatili itong may impluwensya sa pandaigdigang politika at ekonomiya.',
    icon: '🇨🇳'
  },
  {
    topic: 'Poison Gas sa WWI',
    fact: 'Ang paggamit ng poison gas noong Unang Digmaang Pandaigdig ay isa sa mga unang halimbawa ng chemical warfare sa modernong panahon. Kabilang dito ang chlorine at mustard gas na nagdulot ng matinding pinsala sa baga at balat. Dahil dito, nagkaroon ng pandaigdigang kasunduan upang limitahan ang paggamit ng ganitong uri ng sandata.',
    icon: '☠️'
  },
  {
    topic: 'World War II Casualties',
    fact: 'Ang World War II ang pinakamalawak at pinakamapaminsalang digmaan sa kasaysayan. Mahigit 70 milyong tao ang nasawi sa digmaang ito, kabilang ang mga sibilyan at sundalo. Ito ay halos 3% ng populasyon ng mundo noong panahong iyon.',
    icon: '⚔️'
  },
  {
    topic: 'Berlin Wall',
    fact: 'Ang Berlin Wall ay simbolo ng paghahati ng mundo sa panahon ng Cold War. Pinaghiwalay nito ang East at West Germany hanggang sa ito ay bumagsak noong 1989. Ang pagbagsak nito ay naging simula ng reunification ng Germany at wakas ng Cold War.',
    icon: '🧱'
  },
  {
    topic: 'Ekonomiya sa Komunismo',
    fact: 'Sa ilalim ng komunismo, tulad sa Soviet Union, kontrolado ng estado ang ekonomiya at yaman ng bansa. Layunin nitong alisin ang agwat sa pagitan ng mayaman at mahirap. Gayunpaman, sa praktika, nagkaroon ng mga problema sa kakulangan ng produkto at kawalan ng insentibo para sa innovation.',
    icon: '⚖️'
  },
  {
    topic: 'Communist Manifesto',
    fact: 'Si Karl Marx at si Friedrich Engels ang nagsulat ng Communist Manifesto noong 1848. Ipinapaliwanag nito ang mga ideya ng komunismo at laban sa kapitalismo. Ang dokumentong ito ay isa sa pinaka-impluwensiyal na political texts sa kasaysayan.',
    icon: '📕'
  },
  {
    topic: 'Hiroshima at Nagasaki',
    fact: 'Ang Hiroshima and Nagasaki bombings noong Agosto 1945 ang nagwakas sa World War II sa Asia. Ito ang unang at huling paggamit ng atomic bomb sa digmaan. Mahigit 200,000 tao ang nasawi, karamihan ay mga sibilyan.',
    icon: '💣'
  },
  {
    topic: 'The Rosetta Stone',
    fact: 'Ang Rosetta Stone ay natuklasan noong 1799 ng mga sundalo ni Napoleon sa Egypt. Ito ay mahalaga dahil nakatulong itong i-decode ang Egyptian hieroglyphics. Ang stone ay may parehong text na nakasulat sa tatlong wika: hieroglyphics, Demotic script, at Ancient Greek.',
    icon: '🗿'
  },
  {
    topic: 'The Great Wall of China',
    fact: 'Ang Great Wall of China ay hindi isang patuloy na wall - ito ay binubuo ng maraming sections na itinayo sa iba\'t ibang panahon. Ang kabuuang haba nito ay mahigit 21,000 kilometers! Ito ay itinayo upang protektahan ang China mula sa mga invaders.',
    icon: '🏯'
  },
  {
    topic: 'Vikings at Navigation',
    fact: 'Ang mga Vikings ay mga magagaling na mandaragat na nakarating sa North America 500 taon bago dumating si Christopher Columbus. Gumamit sila ng sun compass at pag-obserba sa mga ibon at alon upang mag-navigate sa karagatan.',
    icon: '⛵'
  },
  {
    topic: 'The Library of Alexandria',
    fact: 'Ang Library of Alexandria sa Ancient Egypt ay isa sa pinakamalaking at pinaka-sikat na library ng ancient world. Tinatayang may 400,000 to 700,000 scrolls ito. Ang pagkasira nito ay itinuturing na isa sa pinakamalaking pagkawala ng kaalaman sa kasaysayan.',
    icon: '📚'
  }
];

export default function TriviaSection() {
  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <Card className="border-4 border-[#d49240] bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b] mb-4">
          📚 Trivia Corner
        </h2>
        <p className="text-xl text-[#5a3618]">
          <strong className="text-[#8b5a2b]">Trivia</strong> means interesting facts that make you curious. 
          Discover fascinating stories and surprising details from history!
        </p>
      </Card>

      {/* Section Title */}
      <div className="flex items-center gap-4">
        <Lightbulb className="h-12 w-12 text-[#d49240]" />
        <h3 className="text-4xl font-bold text-[#8b5a2b]">Did you know?</h3>
      </div>

      {/* Trivia Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {triviaFacts.map((item, index) => (
          <Card
            key={index}
            className="group border-4 border-[#d49240] bg-gradient-to-br from-white to-[#f5e6d3] p-6 hover:shadow-2xl transition-all hover:scale-[1.02] rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="text-6xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-2xl font-bold text-[#7e9f4d] group-hover:text-[#6a8742] transition-colors">
                    {item.topic}
                  </h4>
                  <Badge className="bg-[#7e9f4d] text-white ml-2 flex-shrink-0">
                    #{index + 1}
                  </Badge>
                </div>
                <p className="text-[#5a3618] leading-relaxed text-lg">
                  {item.fact}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Fun Facts Box */}
      <Card className="border-4 border-[#7e9f4d] bg-gradient-to-r from-[#7e9f4d] to-[#6a8742] p-8 shadow-xl rounded-xl text-white text-center">
        <div className="text-6xl mb-4">🌟</div>
        <h3 className="text-3xl font-bold mb-4">Keep Exploring!</h3>
        <p className="text-xl max-w-2xl mx-auto">
          History is full of amazing stories and fascinating facts. The more you learn, 
          the more you understand how the past shapes our present and future!
        </p>
      </Card>
    </div>
  );
}
