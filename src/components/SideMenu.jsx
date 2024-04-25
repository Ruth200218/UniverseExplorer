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
	// console.log('pathname', pathname);

	return (
		<>
			<ul>
				<li>
					<Link href='/dashboard'>
						<Icon.Home size='21' />
						Dashboard
					</Link>
				</li>
				<li>
					<Link href='/dashboard/profile'>
						<Icon.User size='21' />
						Profile
					</Link>
				</li>
				<li>
					<Link href='/dashboard/collection'>
						<Icon.Grid size='21' />
						Collection
					</Link>
				</li>
				<li>
					<Link href='/dashboard/import'>
						<Icon.Upload size='21' />
						Import
					</Link>
				</li>
				<li>
					<Link href='/dashboard/export'>
						<Icon.Download size='21' />
						Export
					</Link>
				</li>
			</ul>
			<ul className='buttons flex'>
				<li style={{ marginRight: '1rem' }}>
					<InvisibleBtn func={() => signOut()}>SignOut</InvisibleBtn>
				</li>
				<li>{pathname && pathname.includes('model') && <PrimaryBtn func={() => setIsEditPage(true)}>Edit</PrimaryBtn>}</li>
			</ul>
		</>
	);
};

export default SideMenu;
