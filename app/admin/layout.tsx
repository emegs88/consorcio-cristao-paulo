'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Building2, Users, DollarSign, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/igrejas', label: 'Igrejas', icon: Building2 },
  { href: '/admin/membros', label: 'Membros', icon: Users },
  { href: '/admin/repasses', label: 'Repasses', icon: DollarSign },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0c0c1d]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-xl font-bold gold-gradient-text">
            Prospere Alianca <span className="text-xs text-gray-500 ml-1">Admin</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}
                className={`nav-link flex items-center gap-2 ${pathname === item.href ? 'active' : ''}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button onClick={handleLogout} className="nav-link flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0c0c1d]/95 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                  className={`nav-link flex items-center gap-3 py-3 ${pathname === item.href ? 'active' : ''}`}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <button onClick={handleLogout} className="nav-link flex items-center gap-3 py-3 text-red-400">
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </nav>
          </div>
        )}
      </header>

      {children}
    </div>
  )
}
