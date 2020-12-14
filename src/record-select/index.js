/**
 * External Dependencies
 */
import React from 'react';
import Select from 'react-select';

/**
 * WordPress Dependencies
 */
import { withSelect } from '@wordpress/data';

function RecordSelector( {
	onChange,
	value,
	multiple,
	placeholder,
	isRequesting,
	type,
	records,
} ) {
	/**
	 * Map the API records to an objects array
	 * that react-select will take.
	 *
	 * It supports taxonomies and CPTs.
	 *
	 * @return {Array}
	 */
	const getOptions = () => {
		const options = [];

		if ( ! isRequesting ) {
			/**
			 * Map CPT type records.
			 */
			if ( 'postType' === type ) {
				records.map( ( record ) => {
					const option = {
						label: record.title.rendered,
						value: record.id,
					};
					options.push( option );
				} );
			} else if ( 'taxonomy' === type ) {
				/**
				 * Map Taxonomy Type Records
				 */

				records.map( ( record ) => {
					const option = {
						label: record.name,
						value: record.id,
					};
					options.push( option );
				} );
			}
		}

		return options;
	};

	return (
		<Select
			options={ getOptions() }
			onChange={ onChange }
			className="record-selector-control"
			value={ value }
			isDisabled={ isRequesting }
			isMulti={ multiple }
			placeholder={ placeholder }
		/>
	);
}

/**
 * Make available a list of all records
 * for the component props.
 */
export default withSelect( ( select, props ) => {
	const { getEntityRecords } = select( 'core' );
	const { isResolving } = select( 'core/data' );

	/**
	 * Determine what type of records we are fetching,
	 * with a fallback to fetching posts.
	 */
	const entityType = props.type ? props.type : 'postType';
	const objectType = props.objectType ? props.objectType : 'post';

	/**
	 * Ensure that we get all posts.
	 *
	 * @type {{per_page: number}}
	 */
	const query = {
		per_page: -1,
	};

	return {
		records: getEntityRecords( entityType, objectType, query ),
		isRequesting: isResolving( 'core', 'getEntityRecords', [
			entityType,
			objectType,
			query,
		] ),
	};
} )( RecordSelector );
