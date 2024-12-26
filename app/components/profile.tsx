'use client';
import { Avatar } from '@/core/components';

interface ProfileProps {
	name: string;
}

export const Profile = ({ name }: ProfileProps) => {
	return (
		<div>
			<Avatar
				className='size-10'
				initials={name.charAt(0)}
			/>
			<span className='font-bold flex gap-2'>{name}</span>
		</div>
	);
};
