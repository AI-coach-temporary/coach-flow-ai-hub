
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeIn = ({ children, className, delay = 0 }: FadeInProps) => {
  return (
    <div 
      className={cn(
        "animate-in fade-in-50 duration-500 fill-mode-both",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface SlideInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export const SlideIn = ({ children, direction = 'up', className, delay = 0 }: SlideInProps) => {
  const directionClasses = {
    up: 'animate-in slide-in-from-bottom-4',
    down: 'animate-in slide-in-from-top-4',
    left: 'animate-in slide-in-from-right-4',
    right: 'animate-in slide-in-from-left-4'
  };

  return (
    <div 
      className={cn(
        directionClasses[direction],
        "duration-500 fill-mode-both",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScaleIn = ({ children, className, delay = 0 }: ScaleInProps) => {
  return (
    <div 
      className={cn(
        "animate-in zoom-in-95 duration-300 fill-mode-both",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerChildren = ({ children, staggerDelay = 100, className }: StaggerChildrenProps) => {
  const childArray = Array.isArray(children) ? children : [children];
  
  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <FadeIn key={index} delay={index * staggerDelay}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

// Loading spinner component with smooth animation
export const LoadingSpinner = ({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-primary border-t-transparent",
        sizeClasses[size]
      )} />
    </div>
  );
};

// Button with loading state and animation
interface AnimatedButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedButton = ({ 
  children, 
  isLoading = false, 
  className,
  onClick,
  disabled,
  variant = 'default',
  size = 'md'
}: AnimatedButtonProps) => {
  const baseClasses = "relative transition-all duration-200 transform active:scale-95 hover:scale-105 disabled:hover:scale-100";
  const variantClasses = {
    default: "bg-brand-primary hover:bg-brand-secondary text-white",
    outline: "border border-gray-300 hover:border-brand-primary hover:text-brand-primary",
    ghost: "hover:bg-gray-50"
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
        isLoading && "cursor-not-allowed opacity-80",
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
