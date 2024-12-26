'use client';

import { Spinner } from '@/core/components';
import { useAuthStore } from '@/core/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Auth = () => {
	const router = useRouter();
	const { token } = useAuthStore();
	useEffect(() => {
		if (!token) router.push('/sign_in');
		else return;
	}, [token]);

	return token ? null : (
		<div className='h-screen w-screen bg-white dark:bg-black absolute top-0 left-0 z-50 flex justify-center items-center'>
			<Spinner size='lg' />
		</div>
	);
};
