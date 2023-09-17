import Avatar from '../../general/avatar/avatar'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <div
      className="navbar sticky  top-0 z-50 p-4"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'linear-gradient(180deg, black,   transparent)',
      }}
    >
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl text-white bg-secondary"
        >
          <Image
            src="/intergalac.png"
            alt="logo"
            className="h-14 w-14 rounded-full mr-4 align-middle border-none justify-center"
            width={50}
            height={50}
          />
          Intergalac
        </Link>
      </div>

      <div className="flex-none mr-8 pt-2">
        <Link href={'/profile'}>
          <Avatar size="w-12" />
        </Link>
      </div>
    </div>
  )
}

export default Header
