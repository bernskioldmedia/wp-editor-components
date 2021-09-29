/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

const DEFAULT_HEADER_STYLES = [
	{
		label: __( 'Centered', 'TEXTDOMAIN' ),
		value: 'normal',
	},
	{
		label: __( 'Small', 'TEXTDOMAIN' ),
		value: 'small',
	},
	{
		label: __( 'Left', 'TEXTDOMAIN' ),
		value: 'left',
	},
];

export function SectionHeaderInspector( props ) {
	const { attributes, setAttributes } = props;

	const {
        sectionWrapperEnabled,
		sectionHeaderShow,
		sectionHeaderStyle,
		sectionCtaShow,
    } = attributes;

    if ( ! sectionWrapperEnabled ) {
		return null;
	}

	return (
		<PanelBody
			title={ __( 'Section Header', 'TEXTDOMAIN' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __( 'Show Section Header', 'TEXTDOMAIN' ) }
				checked={ sectionHeaderShow }
				onChange={ ( value ) =>
					setAttributes( { sectionHeaderShow: value } )
				}
			/>

			{ sectionHeaderShow && (
				<>
					<SelectControl
						label={ __( 'Style', 'TEXTDOMAIN' ) }
						value={ sectionHeaderStyle }
						onChange={ ( value ) =>
							setAttributes( {
								sectionHeaderStyle: value,
							} )
						}
						options={ applyFilters(
							'sectionHeader.styles',
                            'bmEditor',
							DEFAULT_HEADER_STYLES,
							props
						) }
					/>
					<ToggleControl
						label={ __(
							'Show Call to Action Link',
							'TEXTDOMAIN'
						) }
						checked={ sectionCtaShow }
						onChange={ ( value ) =>
							setAttributes( { sectionCtaShow: value } )
						}
					/>
				</>
			) }
		</PanelBody>
	);
}
