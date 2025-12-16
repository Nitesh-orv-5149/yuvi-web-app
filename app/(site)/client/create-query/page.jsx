'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QueryForm from '@/components/client/create-query/QueryForm';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function CreateQueryPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    if (!session?.user?.id) {
      alert('You must be logged in');
      return;
    }

    setIsLoading(true);
    try {
      const body = {
        questionTitle: formData.title,
        questionBody: formData.description,
        categoryId: formData.category,
        clientId: session.user.id,
      };

      await axios.post('/api/client/queries', body);

      alert('Question posted successfully');
      router.push('/client/home');
    } catch (err) {
      console.error(err);
      alert('Failed to post question');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          <span className="bg-cyan-300 bg-clip-text text-transparent">
            Ask a Question
          </span>
        </h1>
        <p className="text-[#a0a0b0] text-sm sm:text-base">
          Get answers from experienced experts
        </p>
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-6 sm:p-8">
        <QueryForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
