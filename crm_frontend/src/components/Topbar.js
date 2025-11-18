import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Topbar
 * Displays page title and actions. Accepts:
 * - title: string
 * - rightContent: ReactNode
 * - onToggleTheme?: () => void
 * - themeLabel?: string
 */
export default function Topbar({ title, rightContent, onToggleTheme, themeLabel }) {
  return (
    <header className="topbar" role="banner">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-actions">
        {rightContent}
        {onToggleTheme && (
          <button className="btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {themeLabel || 'Toggle Theme'}
          </button>
        )}
      </div>
    </header>
  );
}
