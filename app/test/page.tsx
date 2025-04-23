'use client';

import { useEffect, useState } from 'react';
import { getTelegramUser, isTelegramWebApp } from '@/lib/telegram';

export default function TestPage() {
  const [user, setUser] = useState<any>(null);
  const [isWebApp, setIsWebApp] = useState(false);

  useEffect(() => {
    setIsWebApp(isTelegramWebApp());
    setUser(getTelegramUser());
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Telegram Web App Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Web App Status</h2>
          <p>Running in Telegram: {isWebApp ? 'Yes' : 'No'}</p>
        </div>

        {user && (
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold">User Information</h2>
            <pre className="mt-2 text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 