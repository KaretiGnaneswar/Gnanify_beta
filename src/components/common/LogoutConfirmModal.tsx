import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal: React.FC<Props> = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-gray-900 text-white rounded-xl border border-white/10 w-96 max-w-[90vw] p-5 shadow-2xl">
        <div className="text-lg font-semibold mb-2">Confirm Logout</div>
        <div className="text-sm text-gray-300 mb-4">Are you sure you want to logout?</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutConfirmModal;
