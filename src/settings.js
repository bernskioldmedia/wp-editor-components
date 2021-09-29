import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Available Font Awesome families.
 *
 * @type {*[]}
 */
const FONT_AWESOME_FAMILY_OPTIONS = [
	{
		label: __( 'Regular', 'TEXTDOMAIN' ),
		value: 'far',
	},
	{
		label: __( 'Solid', 'TEXTDOMAIN' ),
		value: 'fas',
	},
	{
		label: __( 'Duotone', 'TEXTDOMAIN' ),
		value: 'fad',
	},
	{
		label: __( 'Brands', 'TEXTDOMAIN' ),
		value: 'fab',
	},
];

export function getDefaultFontAwesomeFamilies( props ) {
	return applyFilters(
		'bmEditor.settings.fontAwesomeFamilies',
		FONT_AWESOME_FAMILY_OPTIONS,
		props
	);
}
