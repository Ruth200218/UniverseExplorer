import React from 'react';
import NavPrimary from '../../partials/NavPrimary';

const page = () => {
	return (
		<div style={{ position: 'relative', zIndex: 1 }}>
			<div className='dashboard'>
				<NavPrimary />
				<aside className='dashboard__side-menu'>
					<ul>
						<li>
							<a href='#'>Home</a>
						</li>
						<li>
							<a href='#'>About</a>
						</li>
						<li>
							<a href='#'>Contact</a>
						</li>
					</ul>
				</aside>
				<main className='dashboard__content'>
					<div className='dashboard__content-container'>
						<div className='dashboard_content-item'>
							<h4>Celda</h4>
						</div>
						<div className='dashboard_content-item'>
							<h4>Celda</h4>
						</div>
						<div className='dashboard_content-item'>
							<h4>Celda</h4>
						</div>
						<div className='dashboard_content-item'>
							<h4>Celda</h4>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default page;
