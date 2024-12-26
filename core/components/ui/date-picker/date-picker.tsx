'use client';

import * as React from 'react';
import { format, setDate } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import clsx from 'clsx';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';

interface DatePickerProps {
	date: Date | undefined;
	setDate: Dispatch<SetStateAction<string | undefined>>;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={clsx('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={(day) => setDate(day ? day.toString() : undefined)}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
