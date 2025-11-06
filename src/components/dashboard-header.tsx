
'use client';

import Link from 'next/link';
import { Bell, Search, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Breadcrumbs } from './breadcrumbs';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { useState, useEffect } from 'react';

export function DashboardHeader() {
  const { isMobile } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-background px-4 md:px-6 py-3 h-16">
        <div className="flex items-center gap-2">
            {isClient && isMobile && <SidebarTrigger />}
        </div>
        <div className="flex items-center gap-1 sm:gap-3 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-primary"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <div className="font-semibold text-primary">P</div>
              <span className="sr-only">Projects</span>
          </Button>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full h-auto p-0"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <span className="ml-2 font-semibold text-primary hidden sm:inline">RoJSALE</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}
