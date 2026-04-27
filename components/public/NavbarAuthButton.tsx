'use client'

import dynamic from 'next/dynamic'

const SUPABASE_ENABLED =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const DesktopInner = SUPABASE_ENABLED
  ? dynamic(
      () => import('./NavbarAuthButtonInner').then((m) => m.default),
      { ssr: false, loading: () => <div aria-hidden className="hidden lg:block w-8 h-8 rounded-full bg-gray-200 animate-pulse" /> }
    )
  : () => null

const MobileInner = SUPABASE_ENABLED
  ? dynamic(
      () => import('./NavbarAuthButtonInner').then((m) => m.MobileNavbarAuthButtonInner),
      { ssr: false, loading: () => null }
    )
  : () => null

interface NavbarAuthButtonProps {
  onNavigate?: () => void
  transparent?: boolean
}

export default function NavbarAuthButton(props: NavbarAuthButtonProps) {
  return <DesktopInner {...props} />
}

export function MobileNavbarAuthButton(props: NavbarAuthButtonProps) {
  return <MobileInner {...props} />
}
