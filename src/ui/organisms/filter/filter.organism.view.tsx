import React from 'react';

import { Select } from 'antd';

type FilterProps<T> = {
	placeholder?: string;
	value: T;
	options: T[];
	setValue: (targetValue: T) => void;
	allowClear?: boolean;
	disabled?: boolean;
	className?: string;
};

const Filter = <T extends any>(props: FilterProps<T>) => (
	<Select
		className={props.className}
		allowClear={props.allowClear}
		disabled={props.disabled}
		placeholder={props.placeholder}
		value={props.value}
		onChange={props.setValue}>
		{props.options.map((option, i) => (
			<Select.Option key={i} value={option}>
				<>{option}</>
			</Select.Option>
		))}
	</Select>
);

export { Filter };
