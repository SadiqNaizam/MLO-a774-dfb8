import React, { PropsWithChildren } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from 'lucide-react'; // Example icon

interface AuthFormWrapperProps extends PropsWithChildren {
  title: string;
  description?: string;
  footerContent?: React.ReactNode;
  showAppBranding?: boolean;
  appTitle?: string;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  description,
  children,
  footerContent,
  showAppBranding = true,
  appTitle = "SecureApp", // Default App Title
}) => {
  console.log('AuthFormWrapper loaded, title:', title);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        {showAppBranding && (
          <div className="flex flex-col items-center pt-6">
            <ShieldCheck className="h-12 w-12 text-primary" />
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {appTitle}
            </h2>
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center space-y-2 pt-4 border-t">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormWrapper;