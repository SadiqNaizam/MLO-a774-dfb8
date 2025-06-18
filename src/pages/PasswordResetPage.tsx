import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const passwordResetSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Point error to confirmPassword field
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordResetPage: React.FC = () => {
  console.log('PasswordResetPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setResetToken(token);
      console.log('Password reset token found:', token);
      // Here you would typically validate the token with the backend.
      // For this example, we'll just store it.
    } else {
      console.warn('Password reset token not found in URL.');
      setSubmissionStatus('error');
      setSubmissionMessage('Invalid or missing password reset link. Please request a new one.');
    }
  }, [searchParams]);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    console.log('Password reset form submitted:', data);
    console.log('Using token:', resetToken);

    if (!resetToken) {
        setSubmissionStatus('error');
        setSubmissionMessage('Password reset token is missing. Cannot proceed.');
        return;
    }

    // Simulate API call
    try {
      // Replace with actual API call:
      // await api.post('/auth/reset-password', { token: resetToken, newPassword: data.newPassword });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      setSubmissionStatus('success');
      setSubmissionMessage('Your password has been successfully reset! You can now log in with your new password.');
      form.reset();
      // Optionally navigate to login page after a delay or on user action
      // setTimeout(() => navigate('/'), 3000); // Redirect to login page (path '/' from App.tsx)
    } catch (error) {
      console.error('Password reset failed:', error);
      setSubmissionStatus('error');
      // Check if error is an instance of Error to safely access message
      if (error instanceof Error) {
        setSubmissionMessage(error.message || 'An unexpected error occurred. Please try again.');
      } else {
        setSubmissionMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormWrapper
          title="Reset Your Password"
          description="Enter your new password below. Make sure it's strong and memorable."
          appTitle="AuthApp"
          footerContent={
            submissionStatus !== 'success' && (
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Remembered your password?{' '}
                <Link to="/" className="font-medium text-primary hover:underline">
                  Login here
                </Link>
              </p>
            )
          }
        >
          {submissionStatus === 'idle' || submissionStatus === 'error' && !resetToken && (
             <Alert variant={submissionStatus === 'error' ? 'destructive' : 'default'}>
                {submissionStatus === 'error' && <AlertTriangle className="h-4 w-4" />}
                <AlertTitle>{submissionStatus === 'error' ? 'Error' : 'Notice'}</AlertTitle>
                <AlertDescription>{submissionMessage || "Waiting for token validation..."}</AlertDescription>
            </Alert>
          )}

          {resetToken && submissionStatus !== 'success' && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submissionStatus === 'error' && submissionMessage && resetToken && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submissionMessage}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !resetToken}>
                  {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          )}

          {submissionStatus === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="font-semibold">Success!</AlertTitle>
              <AlertDescription>
                {submissionMessage}
                <div className="mt-4">
                  <Button onClick={() => navigate('/')} variant="outline"> {/* Path '/' from App.tsx */}
                    Proceed to Login
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </AuthFormWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetPage;