import React from 'react';
import { Navigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Music } from 'lucide-react';

export function Login() {
  const { isSignedIn } = useUser();

  // Redirect to home if already signed in
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Music className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to MusicStore
          </h2>
          <p className="text-blue-100">
            Sign in to access your account and start shopping
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-none",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: 
                  "border border-gray-300 hover:bg-gray-50 text-gray-700",
                formFieldInput: 
                  "border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                footerActionLink: "text-blue-600 hover:text-blue-700"
              }
            }}
            redirectUrl="/"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
}