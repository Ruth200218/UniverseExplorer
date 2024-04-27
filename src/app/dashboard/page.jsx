'use client';

import React from 'react';
import Dashboard_ListModels from '../../components/Dashboard_ListModels';

const page = () => {
	return (
		<>
			<h3>Tus ultimos modelos</h3>
			<div className='dashboard__content-grid'>
				<Dashboard_ListModels />
			</div>
		</>
	);
};

export default page;
