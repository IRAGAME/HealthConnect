import React from 'react';

/**
 * GlassCard - Un composant Card avec effet verre (glass morphism)
 */
export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
}> = ({ children, className = '', isDark }) => (
  <div
    className={`${className} backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
      isDark
        ? 'bg-slate-800/40 border-slate-600/30 hover:bg-slate-800/50'
        : 'bg-white/40 border-white/20 hover:bg-white/50'
    }`}
  >
    {children}
  </div>
);

/**
 * GradientText - Un texte avec gradient de couleur moderne
 */
export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}> = ({ children, className = '', isDark = false }) => (
  <span
    className={`${className} bg-gradient-to-r ${
      isDark
        ? 'from-cyan-400 via-blue-400 to-emerald-400'
        : 'from-cyan-600 via-blue-600 to-emerald-600'
    } bg-clip-text text-transparent`}
  >
    {children}
  </span>
);

/**
 * ModernBadge - Badge avec styles modernes
 */
export const ModernBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  isDark: boolean;
  className?: string;
}> = ({ children, variant = 'primary', isDark, className = '' }) => {
  const variants: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
    primary: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-700',
      darkBg: 'dark:bg-cyan-900/30',
      darkText: 'dark:text-cyan-300',
    },
    success: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      darkBg: 'dark:bg-emerald-900/30',
      darkText: 'dark:text-emerald-300',
    },
    warning: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      darkBg: 'dark:bg-amber-900/30',
      darkText: 'dark:text-amber-300',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      darkBg: 'dark:bg-red-900/30',
      darkText: 'dark:text-red-300',
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      darkBg: 'dark:bg-blue-900/30',
      darkText: 'dark:text-blue-300',
    },
  };

  const style = variants[variant];

  return (
    <span
      className={`${className} inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${style.bg} ${style.text} ${style.darkBg} ${style.darkText}`}
    >
      {children}
    </span>
  );
};

/**
 * ModernDivider - Séparateur moderne avec gradient optionnel
 */
export const ModernDivider: React.FC<{
  isDark: boolean;
  gradient?: boolean;
  className?: string;
}> = ({ isDark, gradient = false, className = '' }) => (
  <div
    className={`${className} h-px ${
      gradient
        ? `bg-gradient-to-r ${isDark ? 'from-transparent via-slate-600 to-transparent' : 'from-transparent via-gray-300 to-transparent'}`
        : isDark
        ? 'bg-slate-600/30'
        : 'bg-gray-200/50'
    } transition-colors duration-300`}
  />
);

/**
 * LoadingSpinner - Spinner de chargement moderne
 */
export const LoadingSpinner: React.FC<{
  isDark: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ isDark, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`${className} ${sizes[size]} animate-spin ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );
};

/**
 * ModernSkeleton - Skeleton loader moderne avec shimmer effect
 */
export const ModernSkeleton: React.FC<{
  isDark: boolean;
  className?: string;
}> = ({ isDark, className = '' }) => (
  <div
    className={`${className} ${isDark ? 'bg-slate-700' : 'bg-gray-200'} rounded-lg animate-shimmer bg-gradient-to-r ${isDark ? 'from-slate-700 via-slate-600 to-slate-700' : 'from-gray-200 via-gray-100 to-gray-200'}`}
  />
);

/**
 * FloatingLabel - Input avec label animé flottant
 */
export const FloatingLabelInput: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
  type?: string;
  className?: string;
}> = ({ id, label, value, onChange, isDark, type = 'text', className = '' }) => (
  <div className={`${className} relative`}>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`peer w-full px-4 py-3 bg-transparent border-b-2 transition-colors duration-300 placeholder-transparent focus:outline-none ${
        isDark
          ? 'border-slate-600 text-white focus:border-cyan-400 focus:shadow-[0_1px_0_0_rgba(6,182,212,0.3)]'
          : 'border-gray-300 text-gray-900 focus:border-cyan-500 focus:shadow-[0_1px_0_0_rgba(8,143,178,0.3)]'
      }`}
      placeholder={label}
    />
    <label
      htmlFor={id}
      className={`absolute left-0 -top-3.5 text-sm font-medium transition-all duration-300 pointer-events-none ${
        value
          ? isDark
            ? 'text-cyan-400'
            : 'text-cyan-600'
          : isDark
          ? 'text-slate-400 peer-focus:text-cyan-400'
          : 'text-gray-500 peer-focus:text-cyan-600'
      }`}
    >
      {label}
    </label>
  </div>
);
