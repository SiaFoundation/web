import Link from 'next/link.js'
import Head from 'next/head.js'
import Image from 'next/image.js'
import {
  useParams,
  usePathname,
  useRouter as useAppRouter,
} from 'next/navigation.js'
import { useRouter as usePagesRouter } from 'next/router.js'
import type { NextRouter } from 'next/router.js'

// when using next internally in npm packages consumed by a next app
// there were issues resolving the internal next/link references because
// next does not have exports files in package.json.
// Fixed by importing everything here with .js and using these re-exports.
export {
  Link,
  Head,
  Image,
  useParams,
  usePathname,
  useAppRouter,
  usePagesRouter,
  NextRouter,
}
