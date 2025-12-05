export default function ConfirmModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-80 text-center">
        <h3 className="text-white font-semibold mb-4">Delete Answer?</h3>
        <p className="text-slate-400 text-sm mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
