'use client';

import { AlertDialog, AlertTitle, AlertActions, AlertDescription } from '@/core/components/ui/alert-dialog';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components';
import { IProject } from '@/core/interfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TableProjectProps {
	projects: IProject[];
}

export const TableProject = ({ projects }: TableProjectProps) => {
	const router = useRouter();

	const [deleteAlert, setDeleteAlert] = useState(false);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableHeader>Id</TableHeader>
					<TableHeader>Name</TableHeader>
					<TableHeader>Description</TableHeader>
					<TableHeader>No. Tasks</TableHeader>
					<TableHeader className='text-center'>Actions</TableHeader>
				</TableRow>
			</TableHead>

			<TableBody>
				{projects.map((project) => (
					<TableRow key={project.id}>
						<TableCell>{project.id.split('-')[0]}</TableCell>
						<TableCell className='font-medium'>{project.name}</TableCell>
						<TableCell>{project.description}</TableCell>
						<TableCell>{0}</TableCell>
						<TableCell>
							<>
								<div className='flex gap-2'>
									<Button
										type='button'
										color='red'
										onClick={() => setDeleteAlert(true)}>
										Delete
									</Button>
									<Button
										type='button'
										color='light'
										onClick={() => router.push(`/${project.id}`)}>
										View
									</Button>
								</div>
								<AlertDialog
									open={deleteAlert}
									onClose={setDeleteAlert}>
									<AlertTitle>Are you sure you want to delete this proyect?</AlertTitle>
									<AlertDescription>Deleting this project will remove all associated data permanently.</AlertDescription>
									<AlertActions>
										<Button
											plain
											onClick={() => setDeleteAlert(false)}>
											Cancel
										</Button>
										<Button onClick={() => setDeleteAlert(false)}>Refund</Button>
									</AlertActions>
								</AlertDialog>
							</>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
