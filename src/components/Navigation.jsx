import Link from 'next/link';
import { getServerSession } from 'next-auth';
import NavPrimary from "../partials/NavPrimary";

export default async function Navigation() {
	const session = await getServerSession();
	return (
		<nav className='navigation'>
			<div className='container flex'>
				{session ? (
					<>
						<NavPrimary />
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