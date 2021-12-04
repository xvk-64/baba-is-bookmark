import React from 'react'
import Select, { ClearIndicatorProps, StylesConfig, Props, MultiValueRemoveProps } from 'react-select'

import dropdownIndicator from '@assets/img/icons/dropdown-arrow.png'
import checkMark from '@assets/img/icons/check-mark.png'
import crossMark from '@assets/img/icons/cross-mark.png'

const selectStyles: StylesConfig = {
	control: (provided, state: any) => ({
		...provided,
		backgroundColor: "#202850",
		border: "#4759B1 4px solid",
		borderColor: "#4759B1",
		transitionDuration: "revert",

		width: state.selectProps.width,
		// height: "100px",

		cursor: state.isDisabled ? "not-allowed" : "pointer",

		':hover': {
			borderColor: "#4759B1",
			backgroundColor: "#4759B1",
		}
	}),
	valueContainer: (provided, state) => ({
		...provided,
		paddingRight: "2px",
	}),
	placeholder: (provided, state) => ({
		...provided,
		color: "lightgray"
	}),
	menu: (provided, state) => ({
		...provided,
		backgroundColor: "#202850",
		// zIndex: 5
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: "#202850",

		backgroundImage: state.isSelected ? `url(${checkMark})` : "",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "calc(100% - 5px) 5px",

		cursor: state.isDisabled ? "not-allowed" : "pointer",

		':hover': {
			backgroundColor: "#4759B1",
		}
	}),
	input: (provided, state) => ({
		fontFamily: "Baba"
	}),
	multiValue: (provided, state) => ({
		...provided,
		backgroundColor: "#6677BF",
	}),
	multiValueLabel: (provided, state) => ({
		...provided,
		color: "white"
	}),
	multiValueRemove: (provided, state) => ({
		...provided,
		":hover": {
			backgroundColor: "#ff5555",
			cursor: "pointer"
		}
	}),
	clearIndicator: (provided, state) => ({
		...provided,
		cursor: "pointer",
	}),
	singleValue: (provided, state) => ({
		color: "white",
		fontSize: 20,
		lineHeight: 1,

		// Terrible hack to avoid some wierd misalignment from react-select
		transform: "translate(0, -50%)"
	}),
}

interface BabaSelectProps extends Props<any, boolean> {
	width?: string,
}

function DropdownIndicator() {
	return (
		<div>
			<img src={dropdownIndicator} />
		</div>
	)
}
function ClearIndicator(props: ClearIndicatorProps) {
	return (
		<div
			{...props.innerProps}
			className={props.className}
			style={{ cursor: "pointer" }}
		>
			{props.children || <img src={crossMark} />}
		</div>
	);
};

function MultiValueRemove(props: MultiValueRemoveProps) {
	return <div {...props.innerProps}>{props.children || <img src={crossMark} width={15} />}</div>;
}

export default function BabaSelect(props: BabaSelectProps) {
	return (
		<Select
			{...props}
			components={{
				DropdownIndicator: DropdownIndicator,
				ClearIndicator: ClearIndicator,
				IndicatorSeparator: null,
				MultiValueRemove: MultiValueRemove
			}}
			styles={selectStyles}
		/>
	)
}