import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Globe, Twitter } from 'lucide-react';
import SponsoredDeals from '../components/SponsoredDeals';

interface Influencer {
  username: string;
  displayName: string;
  followers: number;
  sparkGateScore: number;
  profileImage: string;
  bannerImage: string;
}

function InfluencerProfile() {
  const [searchParams] = useSearchParams();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const username = searchParams.get('username') || 'gainzy222';
        const response = await fetch(`${import.meta.env.API_URL}/api/influencer/${username}`);
        const data = await response.json();
        setInfluencer(data);
      } catch (error) {
        console.error('Error fetching influencer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencer();
  }, [searchParams]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!influencer) {
    return <div className="flex items-center justify-center min-h-screen">Influencer not found</div>;
  }

  return (
    <div className="pb-20">
      <div className="relative">
        <img 
          src={influencer.bannerImage} 
          alt="Banner" 
          className="object-cover w-full h-48"
        />
        <button className="absolute p-2 rounded-full top-4 left-4 bg-black/50">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 px-4 -mt-20">
        <div className="flex items-start justify-between">
          <div className="relative">
            <img 
              src={influencer.profileImage} 
              alt={influencer.displayName} 
              className="w-24 h-24 rounded-full border-4 border-[#0D0D12]"
            />
            <div className="absolute bottom-0 right-0 p-1 bg-purple-500 rounded-full">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-[#1A1A1F]">
              <Globe className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-lg bg-[#1A1A1F]">
              <Twitter className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {influencer.displayName}
            <div className="flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </h1>
          <p className="text-gray-400">@{influencer.username}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 bg-[#1A1A1F] rounded-lg p-4">
          <div>
            <p className="text-gray-400">Total Followers</p>
            <p className="text-2xl font-bold">{(influencer.followers / 1000).toFixed(1)}K</p>
          </div>
          <div>
            <p className="text-gray-400">SparkGate Score</p>
            <p className="text-2xl font-bold text-green-400">{influencer.sparkGateScore}</p>
          </div>
        </div>

        <button className="w-full py-3 mt-6 font-semibold bg-purple-500 rounded-lg">
          Send Request
        </button>

        <SponsoredDeals />
      </div>
    </div>
  );
}

export default InfluencerProfile;