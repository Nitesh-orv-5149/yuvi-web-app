export default function ExpertNotVerified() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-indigo-950 text-indigo-100 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Expert Profile</h1>
          <p className="mt-2 text-indigo-300/80">Status: <span className="text-red-400 font-medium">Not Verified</span></p>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-sm text-indigo-300/80 leading-relaxed">Your profile is pending admin verification. You can return later and sign in once it has been approved.</p>
        </div>
      </div>
    </div>
  );
}
