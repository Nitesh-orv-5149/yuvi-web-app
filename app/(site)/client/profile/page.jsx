'use client';
import ProfileHeader from '@/components/client/profile/ProfileHeader';
import ProfileStats from '@/components/client/profile/ProfileStats';
import UserQueries from '@/components/client/profile/UserQueries';
import ProfileActions from '@/components/client/profile/ProfileActions';
import { mockQueries } from '@/lib/mockData';

export default function ProfilePage() {
  return (
    <div className="animate-fadeIn max-w-2xl">
      <ProfileHeader />
      <ProfileStats />
      <UserQueries queries={mockQueries} />
      <ProfileActions />
    </div>
  );
}
