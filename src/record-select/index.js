/**
 * External Dependencies
 */
import Select from 'react-select';

/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';

export function RecordSelector( {
	onChange,
	value,
	multiple,
	placeholder,
    type = 'postType',
    objectType = 'post'
} ) {

    const { isResolving, records } = useSelect( ( select ) => {
        const { getEntityRecords } = select('core');
        const { isResolving } = select('core/data');
        const query = {
            per_page: -1,
        };
        const _records = getEntityRecords( type, objectType, query );

        return {
            isResolving: isResolving('core', 'getEntityRecords', [ type, objectType, query ]),
            records: _records,
        };
    } );
    
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

		if ( ! isResolving ) {
			/**
			 * Map CPT type records.
			 */
			if ( 'postType' === type ) {
				records && records.map( ( record ) => {
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

				records && records.map( ( record ) => {
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
			isDisabled={ isResolving }
			isMulti={ multiple }
			placeholder={ placeholder }
		/>
	);
}
