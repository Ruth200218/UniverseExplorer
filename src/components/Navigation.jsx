import Link from 'next/link';

export default function Navigation() {
	return (
		<nav className='navigation'>
			<div className='container flex'>
				<ul className='left'>
					<li>
						<Link href='/'>Home</Link>
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
}
