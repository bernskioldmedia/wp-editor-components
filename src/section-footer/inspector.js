/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

const DEFAULT_ALIGNMENT_OPTIONS = [
	{
		label: __( 'Left', 'bm-block-library' ),
		value: 'left',
	},
	{
		label: __( 'Center', 'bm-block-library' ),
		value: 'center',
	},
	{
		label: __( 'Right', 'bm-block-library' ),
		value: 'right',
	},
];

export function SectionFooterInspector( props ) {
	const { attributes, setAttributes } = props;
	const {
		sectionFooterShow,
		sectionFooterAlignment,
		sectionFooterCtaShow,
	} = attributes;
	return (
		<PanelBody
			title={ __( 'Section Footer', 'bm-block-library' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __( 'Show Section Footer', 'bm-block-library' ) }
				checked={ sectionFooterShow }
				onChange={ ( value ) =>
					setAttributes( { sectionFooterShow: value } )
				}
			/>

			{ sectionFooterShow && (
				<>
					<SelectControl
						label={ __( 'Alignment', 'bm-block-library' ) }
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
							'bm-block-library'
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
