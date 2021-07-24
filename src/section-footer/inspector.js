/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

const DEFAULT_ALIGNMENT_OPTIONS = [
	{
		label: __( 'Left', 'TEXTDOMAIN' ),
		value: 'left',
	},
	{
		label: __( 'Center', 'TEXTDOMAIN' ),
		value: 'center',
	},
	{
		label: __( 'Right', 'TEXTDOMAIN' ),
		value: 'right',
	},
];

export function SectionFooterInspector( props ) {
	const { attributes, setAttributes } = props;
	const {
        sectionWrapperEnabled,
		sectionFooterShow,
		sectionFooterAlignment,
		sectionFooterCtaShow,
    } = attributes;
    
    if ( ! sectionWrapperEnabled ) {
		return null;
	}
    
	return (
		<PanelBody
			title={ __( 'Section Footer', 'TEXTDOMAIN' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __( 'Show Section Footer', 'TEXTDOMAIN' ) }
				checked={ sectionFooterShow }
				onChange={ ( value ) =>
					setAttributes( { sectionFooterShow: value } )
				}
			/>

			{ sectionFooterShow && (
				<>
					<SelectControl
						label={ __( 'Alignment', 'TEXTDOMAIN' ) }
						value={ sectionFooterAlignment }
						onChange={ ( value ) =>
							setAttributes( {
								sectionFooterAlignment: value,
							} )
						}
						options={ applyFilters(
							'bmBlockLibrary.sectionFooter.alignmentOptions',
							DEFAULT_ALIGNMENT_OPTIONS,
							props
						) }
					/>
					<ToggleControl
						label={ __(
							'Show Call to Action Button',
							'TEXTDOMAIN'
						) }
						checked={ sectionFooterCtaShow }
						onChange={ ( value ) =>
							setAttributes( {
								sectionFooterCtaShow: value,
							} )
						}
					/>
				</>
			) }
		</PanelBody>
	);
}
