/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

const DEFAULT_HEADER_STYLES = [
	{
		label: __( 'Centered', 'bm-block-library' ),
		value: 'normal',
	},
	{
		label: __( 'Small', 'bm-block-library' ),
		value: 'small',
	},
	{
		label: __( 'Left', 'bm-block-library' ),
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
			title={ __( 'Section Header', 'bm-block-library' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __( 'Show Section Header', 'bm-block-library' ) }
				checked={ sectionHeaderShow }
				onChange={ ( value ) =>
					setAttributes( { sectionHeaderShow: value } )
				}
			/>

			{ sectionHeaderShow && (
				<>
					<SelectControl
						label={ __( 'Style', 'bm-block-library' ) }
						value={ sectionHeaderStyle }
						onChange={ ( value ) =>
							setAttributes( {
								sectionHeaderStyle: value,
							} )
						}
						options={ applyFilters(
							'bmBlockLibrary.sectionHeader.styles',
							DEFAULT_HEADER_STYLES,
							props
						) }
					/>
					<ToggleControl
						label={ __(
							'Show Call to Action Link',
							'bm-block-library'
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
