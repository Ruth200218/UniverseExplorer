'use client';

import React, { useState } from 'react';

import SideMenu from '../../components/SideMenu';
import EditMenu from '../../components/EditMenu';

const Layout = ({ children }) => {
	const [isEditPage, setIsEditPage] = useState(false);

	return (
		<>
			<div className='dashboard'>
				<div className='dashboard__grid-container'>
					<aside className='dashboard__side-menu'>{!isEditPage ? <SideMenu setIsEditPage={setIsEditPage} /> : <EditMenu setIsEditPage={setIsEditPage} />}</aside>
					<div className='dashboard__content'>{children}</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
