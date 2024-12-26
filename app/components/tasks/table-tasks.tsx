'use client';

import { ITask, OUser, TaskState } from '@/core/interfaces';
import { Badge, Input, InputGroup, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components';
import { EditTaskDialog } from './edit-task-dialog';
import { useEffect, useState } from 'react';
import { Field } from 'formik';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { formatDate } from '@/core/lib/utils';

interface TableTaskProps {
	tasks: ITask[];
	users: OUser[];
}

export const TableTasks = ({ tasks, users }: TableTaskProps) => {
	const [search, setSearch] = useState<string>('');

	const statusColors = {
		[TaskState.TODO]: 'lime',
		[TaskState.IN_PROGRESS]: 'amber',
		[TaskState.COMPLETED]: 'emerald',
	};

	const assignee_user = (id: string) => users.find((user) => user.id === id);

	return (
		<>
			<InputGroup>
				<MagnifyingGlassIcon />
				<Input
					name='search'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search&hellip;'
					aria-label='Search'
				/>
			</InputGroup>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeader>Name</TableHeader>
						<TableHeader>Description</TableHeader>
						<TableHeader>Due date</TableHeader>
						<TableHeader>status</TableHeader>
						<TableHeader>Assignee</TableHeader>
						<TableHeader className='text-center'>actions</TableHeader>
					</TableRow>
				</TableHead>

				<TableBody>
					{tasks.map((task) => (
						<TableRow key={task.id}>
							<TableCell className='font-medium'>{task.title}</TableCell>
							<TableCell>{task.description}</TableCell>
							<TableCell>{formatDate(new Date(task.due_date))}</TableCell>
							<TableCell>
								<Badge color={statusColors[task.status]}>{task.status}</Badge>
							</TableCell>
							<TableCell>{assignee_user(task.assignee_id)?.name}</TableCell>
							<TableCell>
								<EditTaskDialog
									users={users}
									task={task}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
