import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function SettingsPage() {
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      
      <div className="mt-6 space-y-4">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Account</h2>
          
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={() => {
          logout();
          setShowLogoutConfirm(false);
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
