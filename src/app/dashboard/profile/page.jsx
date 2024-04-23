"use client";
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Page() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <p>Loading...</p>
	}

	const { user } = session;
	console.log(user);

	return (
		<main>
			<div className='container' style={{ marginTop: "100px" }}>
				<div className='dashboard section'></div>
				<p>You are {user._doc.first_name} {user._doc.last_name} </p>
			</div>
		</main>
	);
};
