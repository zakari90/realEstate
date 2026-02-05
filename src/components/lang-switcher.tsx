'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, FlagIcon, GlobeIcon } from 'lucide-react';


const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
];

export default function LangSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });

  };

  return (
    <DropdownMenu>
      <p className='sr-only'>change language</p>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1" variant="ghost" disabled={isPending}>
          {/* <GlobeIcon className="h-4 w-4" /> */}
          <span>{languages.find(lang => lang.code === localeActive)?.label ?? 'Select Language'}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-10 mx-auto">
        {languages.map(({ code, label }) => (
          <DropdownMenuItem 
            key={code} 
            onSelect={() => onSelectChange(code)}
            className="flex items-center gap-2 cursor-pointer hover:bg-primary-foreground">
            {/* <FlagIcon className="h-4 w-4" /> */}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
