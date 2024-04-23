"use client";

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function NavPrimary() {
    return (
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
                <button onClick={() => signOut()}>SignOut</button>
            </li>
        </ul>
    )
}