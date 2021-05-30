import { FormTokenField } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

const MAX_FETCHED_TERMS = -1;

export function RecordSelect( props ) {

	const {
		label,
		value,
		onChange,
		type = 'postType',
		objectType,
		query = { per_page: MAX_FETCHED_TERMS },
		placeholder = '',
	} = props;

	const [ search, setSearch ] = useState( '' );

	// Get the posts or terms from WP.
	const foundObjects = useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );
		// query.search = search; @todo
		const _objects = getEntityRecords( type, objectType, query );

		if ( ! _objects ) {
			return [];
		}

		return _objects.map( ( item ) => {
			return {
				value: item.id,
				label: type === 'postType' ? item.title.raw : item.name,
			};
		} );
	}, [ search ] );


	const mapStoredValuesToFormTokenField = ( values ) => {
		if ( ! values ) {
			return [];
		}

		return values.map( ( item ) => item.label );
	};

	const onValueSelect = ( names ) => {
		const objects = names.map( ( name ) => {
			const object = foundObjects.filter( ( item ) => {
				return item.label === name;
			} );

			if ( object.length < 1 ) {
				return null;
			}

			return object[0];
		} ).filter( ( item ) => item !== null );

		onChange( objects );
	};

	return (
		<FormTokenField
			label={ label }
			placeholder={ placeholder }
			value={ mapStoredValuesToFormTokenField( value ) }
			suggestions={ foundObjects.map( ( item ) => item.label ) }
			onChange={ onValueSelect }
			__experimentalExpandOnFocus={ true }
		/>
	);
}
