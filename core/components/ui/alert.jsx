import { XCircleIcon } from '@heroicons/react/20/solid';

export const Alert = ({ title, descriptions }) => {
	return (
		<div className='rounded-md bg-black/10 p-4 transition-all duration-300'>
			<div className='flex'>
				<div className='flex-shrink-0'>
					<XCircleIcon
						aria-hidden='true'
						className='h-5 w-5 text-red-400'
					/>
				</div>
				<div className='ml-3'>
					<h3 className='text-sm font-bold text-red-800'>{title}</h3>
					<div className='mt-2 text-sm text-red-700'>
						<ul
							role='list'
							className='list-disc space-y-1 pl-5'>
							{descriptions.map((description, index) => (
								<li key={index}>{description}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
