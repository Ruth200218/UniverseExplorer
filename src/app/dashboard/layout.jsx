'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import SideMenu from '../../components/SideMenu';
import EditMenu from '../../components/EditMenu';

const layout = ({ children }) => {
	const pathname = usePathname().includes('/edit');

	return (
		<>
			<div className='dashboard'>
				<div className='dashboard__grid-container'>
					<aside className='dashboard__side-menu'>{!pathname ? <SideMenu /> : <EditMenu />}</aside>
					<div className='dashboard__content'>{children}</div>
				</div>
			</div>
		</>
	);
};

export default layout;
