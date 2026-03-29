import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Lightbulb, BookOpen, GraduationCap, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <Card className="border-4 border-[#d49240] bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#8b5a2b] mb-4">
          📘 About Us
        </h2>
        <p className="text-xl text-[#5a3618]">
          This page summarizes the <strong className="text-[#8b5a2b]">research background</strong>,{' '}
          <strong className="text-[#8b5a2b]">purpose</strong>, and{' '}
          <strong className="text-[#8b5a2b]">researcher profiles</strong> for the Social Studies Explorers Hub.
        </p>
      </Card>

      {/* Researcher's Background */}
      <Card className="border-4 border-[#d49240] bg-white p-8 shadow-xl rounded-xl">
        <div className="flex items-start gap-4 mb-6">
          <Users className="h-12 w-12 text-[#8b5a2b] flex-shrink-0" />
          <div>
            <h3 className="text-3xl font-bold text-[#8b5a2b] mb-2">Researcher's Background</h3>
            <div className="h-1 w-32 bg-gradient-to-r from-[#8b5a2b] to-[#d49240] rounded-full"></div>
          </div>
        </div>
        
        <div className="space-y-4 text-lg text-[#5a3618] leading-relaxed">
          <p>
            <strong className="text-[#8b5a2b]">Hi! 👋</strong> We are third-year students from{' '}
            <strong>Batangas State University ARASOF Nasugbu Campus</strong>, majoring in Social Studies. 
            We created this website as part of our research about how social media and digital platforms 
            can help improve students' learning in Social Studies.
          </p>
          <p>
            Based on our study, we discovered that platforms like videos and online content can make 
            learning more <span className="font-bold text-[#d49240]">fun</span>,{' '}
            <span className="font-bold text-[#d49240]">engaging</span>, and{' '}
            <span className="font-bold text-[#d49240]">easier to understand</span>. 
            Students who use interactive digital tools show higher engagement and better retention of 
            historical concepts.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎓', label: 'Education Majors' },
            { icon: '📚', label: 'Researchers' },
            { icon: '💻', label: 'Tech Enthusiasts' },
            { icon: '🌟', label: 'Future Educators' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-gradient-to-br from-[#f5e6d3] to-[#ead5bb] border-2 border-[#d49240] rounded-xl p-4 text-center"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <p className="text-sm font-bold text-[#5a3618]">{item.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Purpose */}
      <Card className="border-4 border-[#d49240] bg-white p-8 shadow-xl rounded-xl">
        <div className="flex items-start gap-4 mb-6">
          <Target className="h-12 w-12 text-[#d49240] flex-shrink-0" />
          <div>
            <h3 className="text-3xl font-bold text-[#d49240] mb-2">Purpose</h3>
            <div className="h-1 w-32 bg-gradient-to-r from-[#d49240] to-[#8b5a2b] rounded-full"></div>
          </div>
        </div>

        <p className="text-lg text-[#5a3618] mb-6 leading-relaxed">
          The <strong>Social Studies Explorers Hub</strong> was built as a comprehensive digital space 
          where learners can engage with history in multiple interactive ways:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '📹', title: 'Watch video lessons', desc: 'Visual learning through historical footage and explanations' },
            { icon: '🎮', title: 'Play interactive games', desc: 'Learn through fun, engaging activities and challenges' },
            { icon: '📝', title: 'Answer quizzes', desc: 'Test knowledge with instant feedback and explanations' },
            { icon: '💡', title: 'Explore fun trivia', desc: 'Discover fascinating historical facts and stories' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-gradient-to-br from-[#f5e6d3] to-[#ead5bb] border-2 border-[#d49240] rounded-xl p-5"
            >
              <div className="text-4xl flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-bold text-[#8b5a2b] text-lg mb-1">{item.title}</h4>
                <p className="text-[#5a3618] text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Our Mission */}
      <Card className="border-4 border-[#7e9f4d] bg-gradient-to-br from-white to-[#f5e6d3] p-10 shadow-xl rounded-xl">
        <div className="flex items-start gap-4 mb-8">
          <Heart className="h-12 w-12 text-[#7e9f4d] flex-shrink-0" />
          <div>
            <h3 className="text-3xl font-bold text-[#7e9f4d] mb-2">Our Mission</h3>
            <div className="h-1 w-32 bg-gradient-to-r from-[#7e9f4d] to-[#6a8742] rounded-full"></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#7e9f4d] to-[#6a8742] text-white px-8 py-4 rounded-2xl text-3xl font-bold mb-6 shadow-lg">
            "Explore the Past, Engage the Present, Learn for the Future"
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: GraduationCap, label: 'Future Educators', color: 'from-blue-500 to-blue-600' },
            { icon: Lightbulb, label: 'Interactive Learning', color: 'from-yellow-500 to-orange-500' },
            { icon: BookOpen, label: 'Technology-Driven', color: 'from-purple-500 to-pink-500' },
          ].map((badge) => (
            <Badge
              key={badge.label}
              className={`bg-gradient-to-r ${badge.color} text-white px-6 py-3 text-base font-bold flex items-center gap-2`}
            >
              <badge.icon className="h-5 w-5" />
              {badge.label}
            </Badge>
          ))}
        </div>

        <p className="text-xl text-[#5a3618] leading-relaxed max-w-4xl mx-auto">
          We hope this platform helps learners enjoy <strong>World History</strong> while improving their knowledge. 
          As future educators, our goal is to transform traditional learning into a more{' '}
          <span className="font-bold text-[#7e9f4d]">interactive</span>,{' '}
          <span className="font-bold text-[#7e9f4d]">engaging</span>, and{' '}
          <span className="font-bold text-[#7e9f4d]">technology-driven experience</span> that supports better 
          academic performance and genuine love for learning history.
        </p>
      </Card>

      {/* Research Impact */}
      <Card className="border-4 border-[#d49240] bg-gradient-to-r from-[#d49240] to-[#b87835] p-8 shadow-xl rounded-xl text-white text-center">
        <div className="text-6xl mb-4">🌟</div>
        <h3 className="text-3xl font-bold mb-4">Our Research Impact</h3>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Through this project, we aim to demonstrate how digital platforms can revolutionize 
          Social Studies education, making history accessible, engaging, and meaningful for 
          Grade 8 students and beyond!
        </p>
      </Card>

      {/* YouTube Channel & QR Code */}
      <Card className="border-4 border-[#8b5a2b] bg-white p-8 shadow-xl rounded-xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="text-5xl">📺</div>
          <div>
            <h3 className="text-3xl font-bold text-[#8b5a2b] mb-2">Connect With Us</h3>
            <div className="h-1 w-32 bg-gradient-to-r from-[#8b5a2b] to-[#d49240] rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* QR Code */}
          <div className="flex flex-col items-center">
            <img 
              src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100020512/68e7.png" 
              alt="YouTube Channel QR Code" 
              className="w-48 h-48 border-4 border-[#8b5a2b] rounded-xl shadow-lg"
              crossOrigin="anonymous"
            />
            <p className="text-sm text-[#5a3618] mt-3 font-semibold">Scan to Visit</p>
          </div>

          {/* YouTube Link */}
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl font-bold text-[#8b5a2b] mb-3">Visit Our YouTube Channel</h4>
            <p className="text-lg text-[#5a3618] mb-4 leading-relaxed">
              Subscribe to our channel for more educational videos, tutorials, and social studies content!
            </p>
            <a 
              href="https://www.youtube.com/channel/UCTeLqBwslx1n1UX8sEVZPoA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              🎥 Visit YouTube Channel
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
