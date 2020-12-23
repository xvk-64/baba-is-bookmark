import React, { PropsWithChildren, PropsWithoutRef } from 'react'
import Select, { OptionTypeBase, Styles } from 'react-select'
import * as SelectProps from 'react-select'
import {IndicatorProps} from 'react-select'

import dropdownIndicator from '@assets/img/icons/dropdown-arrow.png'
import checkMark from '@assets/img/icons/check-mark.png'
import crossMark from '@assets/img/icons/cross-mark.png'
import { multiValueRemoveCSS } from "react-select/src/components/MultiValue"

const selectStyles: Styles = {
	
	control: (provided, state) => ({
		...provided,
		backgroundColor:"#202850",
		border:"#4759B1 4px solid",
		borderColor:"#4759B1",
		transitionDuration:"revert",

		backgroundImage: state.isMulti ? "" : `url(${dropdownIndicator})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "100%, -5px",

		width: state.selectProps.width,

		cursor: state.isDisabled ? "not-allowed" : "",

		':hover': {
			borderColor:"#4759B1",
			backgroundColor:"#4759B1",
		}
	}),
	placeholder: (provided, state) => ({
		...provided,
		color:"lightgray"
	}),
	menu: (provided, state) => ({
		...provided,
		backgroundColor:"#202850",
		width: state.selectProps.width || "100%",
		zIndex: 5
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: "#202850",

		backgroundImage: state.isSelected ? `url(${checkMark})` : "",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "100% 5px",

		cursor: state.isDisabled ? "not-allowed" : "pointer",

		':hover': {
			backgroundColor: "#4759B1",
		}
	}),
	input: (provided, state) => ({
		fontFamily: "Baba"
	}),
	singleValue: (provided, state) => ({
		color:"white",
		fontSize:20,
		lineHeight:1
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
	})
	
}

interface BabaSelectProps extends SelectProps.Props<SelectProps.OptionTypeBase, boolean> {
	width?: string
}

function DropdownIndicator() {
	return (
		<div>
			<img src={dropdownIndicator} />
		</div>
	)
}
function ClearIndicator(props: IndicatorProps<SelectProps.OptionTypeBase, boolean>) {
	return (
	  <div
		{...props.innerProps}
		className={props.className}
		style={{cursor:"pointer"}}
	  >
		{props.children || <img src={crossMark} />}
	  </div>
	);
  };

type MultiValueRemoveProps = {
	children: Node,
	data: any,
	innerProps: {
		className: string,
	},
	selectProps: any,
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
				IndicatorSeparator:() => null,
				MultiValueRemove:MultiValueRemove
			}}
			styles={selectStyles}
		/>
	)
}