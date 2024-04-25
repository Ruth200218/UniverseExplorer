'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import { InvisibleBtn } from './Buttons';

const SideMenu = () => {
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
			<ul>
				<li>
					<InvisibleBtn func={() => signOut()}>SignOut</InvisibleBtn>
				</li>
			</ul>
		</>
	);
};

export default SideMenu;
