import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 justify-center">
      <Link className="flex-0 btn btn-ghost text-xl display" href="/">
        Sieve
      </Link>
    </div>
  );
};

export default Navbar;
