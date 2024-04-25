'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { InvisibleBtn } from '../../components/Buttons';
import Earth from '../../components/Earth';
import Link from 'next/link';
import * as Icon from 'react-feather';

const page = () => {
	return (
		<>
			<Earth />
			<div className='dashboard'>
				<div className='dashboard__grid-container'>
					<aside className='dashboard__side-menu'>
						<ul>
							<li>
								<a href='#'>
									<Icon.Grid size='21' />
									Collection
								</a>
							</li>
							<li>
								<a href='#'>
									<Icon.Upload size='21' />
									Import
								</a>
							</li>
							<li>
								<a href='#'>
									<Icon.Download size='21' />
									Export
								</a>
							</li>
						</ul>
						<ul>
							<li>
								<InvisibleBtn func={() => signOut()}>SignOut</InvisibleBtn>
							</li>
						</ul>
					</aside>
					<div className='dashboard__content'>
						<h2>Tus ultimos modelos</h2>
						<div className='dashboard__content-grid'>
							<Items />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const Items = () => {
	const list = [
		['New System', 'Description'],
		['Kepler-11', 'Description'],
		['Kepler-22', 'Description'],
		['Kepler-62', 'Description'],
	];

	return (
		<div className='dashboard__content-container'>
			{list.map(([item, description]) => (
				<Link href='' className='dashboard_content-item'>
					<h3>{item}</h3>
					<p>{description}</p>
				</Link>
			))}
		</div>
	);
};

export default page;
