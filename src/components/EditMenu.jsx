'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import { InvisibleBtn } from './Buttons';
import { PrimaryBtn } from './Buttons';
import { usePathname } from 'next/navigation';

const SideMenu = ({ setIsEditPage }) => {
	const pathname = usePathname();

	return (
		<>
			<ul>
				<li>
					<Link href='/dashboard'>
						<Icon.Home size='21' />
						Dashboard
					</Link>
				</li>
			</ul>
			<ul className='buttons flex'>
				<li style={{ marginRight: '1rem' }}>
					<InvisibleBtn func={() => signOut()}>SignOut</InvisibleBtn>
				</li>
				<li>{pathname && pathname.includes('model') && <PrimaryBtn func={() => setIsEditPage(false)}>Save</PrimaryBtn>}</li>
			</ul>
		</>
	);
};

export default SideMenu;
