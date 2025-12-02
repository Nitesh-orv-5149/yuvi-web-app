import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YuviCollab Admin',
  description: 'Admin dashboard for YuviCollab',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-md mx-auto min-h-screen bg-slate-950 shadow-2xl pb-20">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
              <h1 className="text-3xl font-bold text-white">Admin</h1>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
