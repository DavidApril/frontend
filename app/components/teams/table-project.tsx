'use client';

import { IProject } from '@/core/interfaces';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components';
import { useRouter } from 'next/navigation';

interface TableProjectProps {
	projects: IProject[];
}

export const TableProject = ({ projects }: TableProjectProps) => {
	const router = useRouter();

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableHeader>Name</TableHeader>
					<TableHeader>Description</TableHeader>
				</TableRow>
			</TableHead>

			<TableBody>
				{projects.map((project) => (
					<TableRow
						className='cursor-pointer'
						key={project.id}
						onClick={() => router.push(`/${project.id}`)}>
						<TableCell className='font-medium'>{project.name}</TableCell>
						<TableCell>{project.description}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
