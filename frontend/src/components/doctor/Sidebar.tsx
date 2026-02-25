import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  History, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'dashboard' | 'queue' | 'reports' | 'history' | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
}

const navItems: { label: string; icon: typeof LayoutDashboard; view: ViewType }[] = [
  { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Patient Queue', icon: Users, view: 'queue' },
  { label: 'Reports', icon: FileText, view: 'reports' },
  { label: 'History', icon: History, view: 'history' },
  { label: 'Settings', icon: Settings, view: 'settings' }
];

export function Sidebar({ currentView, onViewChange, onLogout }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-900">MedFlow AI</h1>
            <p className="text-xs text-slate-500">Doctor Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          
          return (
            <Button
              key={item.view}
              variant="ghost"
              onClick={() => {
                onViewChange(item.view);
                setIsMobileOpen(false);
              }}
              className={cn(
                'w-full justify-start gap-3 h-11 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-blue-600' : 'text-slate-400')} />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3 h-11 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <NavContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0">
        <NavContent />
      </div>
    </>
  );
}
