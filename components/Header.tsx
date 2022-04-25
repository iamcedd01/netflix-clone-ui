import { FC, useEffect, useState } from 'react'

// Components
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
// Utils
import Link from 'next/link'

const Header: FC = () => {
  // States
  const [isScrolled, setIsScrolled] = useState(false)

  // Functions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-dark'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          width={100}
          height={100}
          alt="Netflix"
          src="https://rb.gy/ulxxee"
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            alt=""
            src="https://rb.gy/g1pwyx"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
