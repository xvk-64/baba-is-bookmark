import React, { useEffect, useState } from 'react'
import Level from './Level'

import {LevelData} from 'common/LevelData'
import BabaSelect from '@components/Inputs/BabaSelect'
import Pagination from '@components/Pagination'

import Loading from '@assets/img/loading.gif'
import Sleepy from '@assets/img/sleepy.gif'

import './styles/LevelGallery.css'

export declare interface ILevelGalleryProps {
	levels: LevelData[];

	isLoading?: boolean
}

const levelsPerPage = 24;

const sortingOptions = [
	{ value: 'timeAsc', label: 'Newest first'},
	{ value: 'timeDesc', label: 'Oldest first' },
	{ value: 'nameAsc', label: 'Title (A-Z)' },
	{ value: 'nameDesc', label: 'Title (Z-A)' },
	{ value: 'authorAsc', label: 'Author (A-Z)' },
	{ value: 'authorDesc', label: 'Author (Z-A)' },
];
const defaultSortingOption = sortingOptions[0]

export default function LevelGallery(props: ILevelGalleryProps) {

	let [currentPage, setCurrentPage] = useState(1)

	let [sortingMethod, setSortingMethod] = useState(defaultSortingOption)

	let [sortedLevels, setSortedLevels] = useState(props.levels)

	let numPages = Math.ceil(props.levels.length / levelsPerPage)

	let handleCurrentPageChange = (newPage: number) => {
		setCurrentPage(Math.max(Math.min(newPage, numPages), 1))
	}

	let handleSortingValueChange = (newValue: any) => {
		setSortingMethod(newValue)
	}

	let sortLevels = () => {
		let sorted: LevelData[] = []
	
		switch (sortingMethod.value) {
			case 'timeAsc':
				sorted = props.levels.sort((a, b) => (a.timestamp && b.timestamp) && a.timestamp < b.timestamp ? 1 : -1)
				break;
			case 'timeDesc':
				sorted = props.levels.sort((a, b) => (a.timestamp && b.timestamp) && a.timestamp > b.timestamp ? 1 : -1)
				break;
			case 'nameAsc':
				sorted = props.levels.sort((a, b) => (a.name + "").localeCompare(b.name + ""))
				break;
			case 'nameDesc':
				sorted = props.levels.sort((a, b) => (b.name + "").localeCompare(a.name + ""))
				break;
			case 'authorAsc':
				sorted = props.levels.sort((a, b) => (a.author + "").localeCompare(b.author + ""))
				break;
			case 'authorDesc':
				sorted = props.levels.sort((a, b) => (b.author + "").localeCompare(a.author + ""))
				break;
		}
	
		setSortedLevels([...sorted])
	}

	useEffect(() => {
		setCurrentPage(1)
		sortLevels()
	}, [props.levels, sortingMethod])

	let levelsOnCurrentPage = sortedLevels.slice((currentPage - 1) * levelsPerPage, currentPage * levelsPerPage)

	if (props.isLoading)
		return (
			<div className="levelGallery">
				<div className="levelGallery-gallery">
					<img className="levelGallery-loading" src={Loading} />
				</div>
			</div>
		)

	if (currentPage == 1 && levelsOnCurrentPage.length == 0)
		return (
			<div className="levelGallery">
				<div className="levelGallery-gallery">
					<div className="levelGallery-noResults">
						<h2>
							No results.
						</h2>
						<img className="levelGallery-loading" src={Sleepy} />
					</div>
				</div>
			</div>
		)

	return (
		<div className="levelGallery">
			<Pagination currentPage={currentPage} numPages={numPages} onChange={handleCurrentPageChange}/>
			<div className="levelGallery-options">
				<BabaSelect 
					options={sortingOptions}
					isSearchable={false}
					width="180px"
					value={sortingMethod}
					onChange={(newValue) => handleSortingValueChange(newValue)}
				/>
			</div>

			<div className="levelGallery-gallery-container">
				<div className="levelGallery-gallery">
					{
						levelsOnCurrentPage.map(levelData => 
							<Level key={levelData.code} levelData={levelData} />
							)
						}

				</div>
				<Pagination currentPage={currentPage} numPages={numPages} onChange={handleCurrentPageChange}/>
			</div>

		</div>
	)
}