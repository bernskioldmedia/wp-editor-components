import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Available Font Awesome families.
 *
 * @type {*[]}
 */
const FONT_AWESOME_FAMILY_OPTIONS = [
	{
		label: __( 'Regular', 'bm-block-library' ),
		value: 'far',
	},
	{
		label: __( 'Solid', 'bm-block-library' ),
		value: 'fas',
	},
	{
		label: __( 'Duotone', 'bm-block-library' ),
		value: 'fad',
	},
	{
		label: __( 'Brands', 'bm-block-library' ),
		value: 'fab',
	},
];

export function getDefaultFontAwesomeFamilies( props ) {
	return applyFilters(
		'bmBlockLibrary.fontAwesomeFamilies',
		FONT_AWESOME_FAMILY_OPTIONS,
		props
	);
}
