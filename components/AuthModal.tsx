import React, { useState } from 'react';
import { LogoIcon } from './icons/Icons';

interface AuthModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission to a backend here.
    // For this demo, we'll just log the user in.
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
            <LogoIcon className="mx-auto h-12 w-auto text-primary" />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {isLoginView ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                or{' '}
                <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-primary hover:text-primary-dark">
                    {isLoginView ? 'create an account' : 'sign in instead'}
                </button>
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLoginView && (
             <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input id="name" name="name" type="text" required className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" placeholder="Full Name" />
            </div>
          )}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm" placeholder="Password" />
          </div>
          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">
              {isLoginView ? 'Sign in' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
