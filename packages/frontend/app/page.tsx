'use client'

import ToastNotification from "@/components/Layout/ToastNotification";
import MiniResumeForm from "@/modules/MiniResume/MiniResumeForm";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Mini Resume Builder</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <MiniResumeForm />
        </div>
      </div>
      <ToastNotification />
    </main>
  );
}
