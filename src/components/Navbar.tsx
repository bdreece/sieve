/* sieve - Sifting through the news with NLP models
 * Copyright (C) 2022 Brian Reece
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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
