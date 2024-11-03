import React from 'react';
import { Plus } from 'lucide-react';

interface Deal {
  id: string;
  name: string;
  amount: string;
  type: string;
  image: string;
}

function SponsoredDeals() {
  const deals: Deal[] = [
    {
      id: '1',
      name: 'Joker 2',
      amount: '600K',
      type: 'Paid Sponsorship',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820'
    },
    {
      id: '2',
      name: 'Monad',
      amount: '100K',
      type: 'KOL round',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0821'
    }
  ];

  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold mb-4">Sponsored</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {deals.map((deal) => (
          <DealCard key={deal.id} {...deal} />
        ))}
        <AvailableSlot />
      </div>
    </section>
  );
}

function DealCard({ name, amount, type, image }: Deal) {
  return (
    <div className="flex-shrink-0 w-24">
      <img src={image} alt={name} className="w-24 h-24 rounded-full mb-2" />
      <h3 className="font-semibold text-sm">{name}</h3>
      <p className="text-sm text-gray-400">{amount}</p>
      <p className="text-xs text-gray-500">{type}</p>
      <button className="mt-2 w-full py-1 px-3 bg-[#1A1A1F] rounded-md text-sm">
        View
      </button>
    </div>
  );
}

function AvailableSlot() {
  return (
    <div className="flex-shrink-0 w-24">
      <div className="w-24 h-24 rounded-full bg-[#1A1A1F] flex items-center justify-center mb-2">
        <Plus className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-semibold text-sm">Available</h3>
      <button className="mt-2 w-full py-1 px-3 bg-purple-500 rounded-md text-sm">
        Make a Bid
      </button>
    </div>
  );
}

export default SponsoredDeals;