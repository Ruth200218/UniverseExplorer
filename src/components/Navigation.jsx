import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function Navigation() {
	const session = await getServerSession();
	return (
		<nav className='navigation'>
			<div className='container flex'>
				{session ? (
					<>
						<ul className='left'>
							<li>
								<Link href='/#hero'>Explore Universe</Link>
							</li>
							<li>
								<Link href='/#footer'>Contact Dev Team</Link>
							</li>
							<li>
								<Link href='/dashboard'>Dashboard</Link>
							</li>
							<li>
								<Link href={"http://localhost:3000/api/auth/signout"}>SignOut</Link>
							</li>
						</ul>
					</>
				) : (
					<>
						<ul className='right'>
							<li>
								<Link href='/login'>Login</Link>
							</li>
							<li>
								<Link href='/register'>Register</Link>
							</li>
						</ul>
					</>
				)}
			</div>
		</nav>
	);
};