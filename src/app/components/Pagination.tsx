import React from 'react'

import BabaButton from '@components/Inputs/BabaButton'

import LeftArrow from '@assets/img/icons/arrow-left.png'
import RightArrow from '@assets/img/icons/arrow-right.png'
import DoubleLeftArrow from '@assets/img/icons/double-arrow-left.png'
import DoubleRightArrow from '@assets/img/icons/double-arrow-right.png'

import './styles/Pagination.css'

export declare interface IPaginationProps {
	currentPage: number
	numPages: number

	onChange?: (newPage: number) => void
}

export default function Pagination(props: IPaginationProps) {


	return (
			(props.numPages > 1) 
			? (
			<div className="pagination-container">
				<div className="pagination-button-container">
					<BabaButton onClick={e => props.onChange && props.onChange(1)} className="pagination-button" squareSize="md" disabled={props.currentPage == 1}><img src={DoubleLeftArrow} /></BabaButton>
					<BabaButton onClick={e => props.onChange && props.onChange(props.currentPage - 1)} className="pagination-button" squareSize="md" disabled={props.currentPage == 1}><img src={LeftArrow} /></BabaButton>
					<span className="pagination-page-status">Page {props.currentPage}/{props.numPages}</span>
					<BabaButton onClick={e => props.onChange && props.onChange(props.currentPage + 1)} className="pagination-button" squareSize="md" disabled={props.currentPage == props.numPages}><img src={RightArrow} /></BabaButton>
					<BabaButton onClick={e => props.onChange && props.onChange(props.numPages)} className="pagination-button" squareSize="md" disabled={props.currentPage == props.numPages}><img src={DoubleRightArrow} /></BabaButton>
				</div>
			</div>
			)
			: <></>
	)
}