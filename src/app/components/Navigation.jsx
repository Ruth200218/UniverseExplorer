import Link from 'next/link';

const Navigation = () => {
	return (
		<nav className='navigation'>
			<ul className='left'>
				<li>
					<Link href='/documentation' target='_blank'>
						Doc
					</Link>
				</li>
				<li>
					<Link href='https://github.com/SantiagoCode/UniverseExplorer' target='_blank'>
						Repo
					</Link>
				</li>
				<li>
					<Link href='/contact' target='_blank'>
						Contact
					</Link>
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
		</nav>
	);
};

export default Navigation;
