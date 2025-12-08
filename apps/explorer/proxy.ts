import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/:entity(address|block|contract|host|tx)/:path*'],
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the caught path contains uppercase characters, lowercase the URL.
  if (/[A-Z]/.test(pathname)) {
    const lowercasePath = pathname.toLowerCase()
    const url = request.nextUrl.clone()
    url.pathname = lowercasePath

    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

