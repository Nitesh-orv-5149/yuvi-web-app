'use client';
import { useSession } from 'next-auth/react';
import ClientNavbar from '@/components/client/ClientNavbar';
import ClientBottomNav from '@/components/client/ClientBottomNav';
import { useRouter, usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23]">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-[#ff006e] rounded-full"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth');
    return null;
  }

  const getActiveTab = () => {
    if (pathname.includes('/client/home')) return 'home';
    if (pathname.includes('/client/create-query')) return 'post';
    if (pathname.includes('/client/messages')) return 'dm';
    if (pathname.includes('/client/expert')) return 'experts';
    if (pathname.includes('/client/profile')) return 'profile';
    return 'home';
  };

  const handleTabChange = (tab) => {
    switch (tab) {
      case 'home':
        router.push('/client/home');
        break;
      case 'post':
        router.push('/client/create-query');
        break;
      case 'dm':
        router.push('/client/messages');
        break;
      case 'experts':
        router.push('/client/expert');
        break;
      case 'profile':
        router.push('/client/profile');
        break;
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1029] to-[#050114] pb-24">
    <ClientNavbar />
    <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-3xl mx-auto">
      {children}
    </div>
    <ClientBottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
  </div>
)
}
