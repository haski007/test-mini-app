import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { Header } from './components/Header';
import { Feature } from './components/Feature';
import { 
  MessageSquare, 
  Share2, 
  CreditCard, 
  Globe,
  Users,
  Lock
} from 'lucide-react';

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: 'Instant Messaging',
      description: 'Send messages, photos, and files instantly with end-to-end encryption.'
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Share content seamlessly with your contacts and groups.'
    },
    {
      icon: CreditCard,
      title: 'Payments',
      description: 'Send and receive payments securely within conversations.'
    },
    {
      icon: Globe,
      title: 'Mini Apps',
      description: 'Access a world of services without leaving Telegram.'
    },
    {
      icon: Users,
      title: 'Group Chats',
      description: 'Create groups with up to 200,000 members.'
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Industry-leading encryption and privacy features.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Telegram Mini App Demo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the power of Telegram Mini Apps with this interactive demo. 
            Explore features and capabilities that make Telegram the perfect platform 
            for your next project.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>

        <section className="mt-12 text-center">
          <button 
            onClick={() => WebApp.showAlert('Hello from Telegram Mini App!')}
            className="bg-[#2AABEE] text-white px-6 py-3 rounded-lg font-semibold
                     hover:bg-[#229ED9] transition-colors"
          >
            Try Telegram Alert
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Telegram Mini App Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;