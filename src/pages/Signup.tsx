
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Play, Sparkles } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { signUp, signInWithGoogle, signInWithLinkedIn, enableDemoMode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await signUp(email, password, firstName, lastName);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleLinkedInSignIn = async () => {
    await signInWithLinkedIn();
  };

  const handleDemoMode = () => {
    enableDemoMode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Demo Mode Button - Prominent */}
        <Card className="border-2 border-brand-primary bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-3 bg-brand-primary/10 rounded-full group-hover:bg-brand-primary/20 transition-colors duration-300">
                  <Play className="h-6 w-6 text-brand-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Try Demo Mode</h3>
              <p className="text-sm text-gray-600">
                Explore all features instantly with sample data. No signup required.
              </p>
              <Button 
                onClick={handleDemoMode}
                size="lg"
                className="w-full bg-brand-primary hover:bg-brand-secondary transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start Demo Experience
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Signup Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join thousands of coaches growing their business with AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleGoogleSignIn}
                variant="outline" 
                className="w-full h-11 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01]"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button 
                onClick={handleLinkedInSignIn}
                variant="outline" 
                className="w-full h-11 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01]"
              >
                <svg className="mr-2 h-4 w-4" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Continue with LinkedIn
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200 animate-in fade-in-50 duration-200">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    type="text" 
                    placeholder="John" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 transition-all duration-200 focus:scale-[1.01]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    type="text" 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 transition-all duration-200 focus:scale-[1.01]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10 transition-all duration-200 focus:scale-[1.01]"
                    placeholder="At least 6 characters"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    required 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 pr-10 transition-all duration-200 focus:scale-[1.01]"
                    placeholder="Confirm your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-brand-primary hover:bg-brand-secondary transition-all duration-300 transform hover:scale-[1.02]" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-brand-primary hover:text-brand-secondary transition-colors">
                Sign in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
