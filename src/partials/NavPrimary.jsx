'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { InvisibleBtn } from '../components/Buttons';

export default function NavPrimary() {
	return (
		<nav className='nav_primary'>
			<ul className='left'>
				<li>
					<Link href='/#hero'>Home</Link>
				</li>
				<li>
					<Link href='/#footer'>DevTeam</Link>
				</li>
			</ul>
			<ul className='right'>
				<li>
					<InvisibleBtn func={() => signOut()}>SignOut</InvisibleBtn>
				</li>
			</ul>
		</nav>
	);
}
