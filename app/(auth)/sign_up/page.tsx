import { Link } from '@/core/components';
import { Divider } from '@/core/components';
import { SignInForm, SignUpForm } from '../components';
import { SparklesIcon } from '@heroicons/react/16/solid';

export default function SignUp() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-4 row-start-2 items-center sm:items-start'>
				<div className='flex flex-col justify-start gap-2 w-full'>
					<SparklesIcon className='w-10 h-10 text-blue-500' />
					<h1 className='text-2xl font-bold'>Sign up</h1>
					<p className='text-sm text-zinc-500'>Insert your credentials to create an account</p>
				</div>
				<Divider />
				<SignUpForm />
				<Divider />
				<p className='text-sm text-zinc-500'>
					already have an account?{' '}
					<Link
						className='text-blue-500'
						href='/sign_in'>
						Sign up
					</Link>
				</p>
			</main>
		</div>
	);
}
