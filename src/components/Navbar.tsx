import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar bg-neutral justify-around">
      <Link href="/">
        <a className="btn btn-ghost text-3xl text-base-100 display">Sieve</a>
      </Link>
      <p className="text-lg text-base-100">
        Sifting through the news with NLP models
      </p>
    </div>
  );
};

export default Navbar;
