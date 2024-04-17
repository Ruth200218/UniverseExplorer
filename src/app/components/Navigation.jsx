import Link from 'next/link';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<div className='container flex'>
				<ul className='left'>
					<li>
						<Link href='/#hero'>Explore Universe</Link>
					</li>
					<li>
						<Link href='/#footer'>Contact Dev Team</Link>
					</li>
				</ul>
				<ul className='right'>
					<li>
						<Link href='/login'>Login</Link>
					</li>
					<li>
						<Link href='/register'>Register</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
