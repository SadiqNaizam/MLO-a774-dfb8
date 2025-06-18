import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck, AlertCircle } from 'lucide-react';

const PasswordResetRequestPage: React.FC = () => {
  console.log('PasswordResetRequestPage loaded');
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMessage(null); // Clear previous message

    if (!email) {
      setAlertMessage({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    // Simulate API call
    console.log('Password reset requested for:', email);
    // In a real app, you would call an API here.
    // For now, we'll just show a success message.
    setAlertMessage({
      type: 'success',
      message: `If an account exists for ${email}, a password reset link has been sent. Please check your inbox.`,
    });
    setEmail(''); // Clear the input field
  };

  const footerContent = (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Remember your password?{' '}
      <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
        Login here
      </Link>
    </p>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        <AuthFormWrapper
          title="Forgot Your Password?"
          description="Enter your email address below and we'll send you instructions to reset your password."
          footerContent={footerContent}
          appTitle="AuthApp"
        >
          {alertMessage && (
            <Alert variant={alertMessage.type === 'error' ? 'destructive' : 'default'} className="mb-4">
              {alertMessage.type === 'success' ? (
                <MailCheck className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{alertMessage.type === 'success' ? 'Request Sent' : 'Error'}</AlertTitle>
              <AlertDescription>{alertMessage.message}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        </AuthFormWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetRequestPage;