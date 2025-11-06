
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  BarChart2,
  Users,
  FileText,
  Folder,
  CreditCard,
  AreaChart,
  Box,
  MessageSquare,
  Shield,
  Bell,
  Globe,
  Settings,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const menuItems = [
  {
    section: 'OVERVIEW',
    links: [{ href: '/dashboard', label: 'Dashboard', icon: BarChart2 }],
  },
  {
    section: 'MANAGEMENT',
    links: [
      { href: '/users', label: 'User Management', icon: Users },
      { href: '/advertisements', label: 'Ads Management', icon: FileText },
      { href: '/categories', label: 'Categories', icon: Folder },
    ],
  },
  {
    section: 'BUSINESS',
    links: [
      { href: '/payments', label: 'Payments & Finance', icon: CreditCard },
      { href: '/reports', label: 'Reports & Analytics', icon: AreaChart },
      { href: '/packages', label: 'Package Management', icon: Box },
    ],
  },
  {
    section: 'SUPPORT',
    links: [
      {
        href: '/support-tickets',
        label: 'Support Tickets',
        icon: MessageSquare,
        badge: '5',
      },
    ],
  },
  {
    section: 'SYSTEM',
    links: [
      { href: '/roles', label: 'Roles & Permissions', icon: Users },
      { href: '/notifications', label: 'Notifications', icon: Bell },
      { href: '/security', label: 'Security', icon: Shield },
      { href: '/locations', label: 'Locations', icon: Globe },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <Sidebar
      collapsible="icon"
      className="bg-sidebar text-sidebar-foreground shadow-lg fixed w-64 h-screen flex flex-col"
    >
      {/* ===== HEADER ===== */}
      <SidebarHeader className="p-4 mb-2 flex items-center justify-between h-16">
        <Link href="/dashboard" className="flex items-center gap-2 flex-1" aria-label="RoJSALE Home">
          <div className="bg-background rounded-lg w-10 h-10 flex items-center justify-center relative">
            <span className="text-primary font-bold text-lg">R</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg leading-tight">RoJSALE</h1>
          </div>
        </Link>
      </SidebarHeader>

      {/* ===== CONTENT ===== */}
      <SidebarContent className="flex-1">
        <ScrollArea className="h-full">
          <SidebarMenu>
            {menuItems.map((section) => (
              <div key={section.section} className="mb-5 px-4">
                <p className="text-[10px] font-semibold text-sidebar-foreground/60 uppercase mb-2 tracking-wide">
                  {section.section}
                </p>
                <div className="flex flex-col gap-1">
                  {section.links.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <Link href={link.href}>
                        <SidebarMenuButton
                          isActive={pathname.startsWith(link.href)}
                          tooltip={link.label}
                          className="h-10 text-sm font-semibold justify-start rounded-lg hover:bg-sidebar-accent/10 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                        >
                          <link.icon className="size-5" />
                          <span className="flex-1 text-left">{link.label}</span>
                          {link.badge && (
                            <Badge
                              className={'text-xs bg-sky-500 text-white'}
                            >
                              {link.badge}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </div>
              </div>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      {/* ===== FOOTER ===== */}
      <SidebarSeparator className="my-2 border-sidebar-foreground/20" />
      <SidebarFooter className="p-4">
        <div className="rounded-xl p-4 bg-sidebar-foreground/10">
          <h3 className="font-bold text-sm text-sidebar-foreground">Need Help?</h3>
          <p className="text-xs text-sidebar-foreground/70 mt-1 mb-3">Contact support for assistance</p>
          <Button
            size="sm"
            className="w-full bg-sidebar-accent text-sidebar-accent-foreground font-semibold hover:bg-sidebar-accent/90"
          >
            Get Support
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
