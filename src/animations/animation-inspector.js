/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const ANIMATION_TYPES = [
	{
		label: __( 'Fade ----' ),
		value: null,
		disabled: true,
	},
	{
		label: __( 'Fade In' ),
		value: 'fade-in',
	},
	{
		label: __( 'Fade Up' ),
		value: 'fade-up',
	},
	{
		label: __( 'Fade Down' ),
		value: 'fade-down',
	},
	{
		label: __( 'Fade to Right' ),
		value: 'fade-right',
	},
	{
		label: __( 'Fade to Left' ),
		value: 'fade-left',
	},
	{
		label: __( 'Zoom ----' ),
		value: null,
		disabled: true,
	},
	{
		label: __( 'Zoom In' ),
		value: 'zoom-in',
	},
	{
		label: __( 'Zoom In to Left' ),
		value: 'zoom-in-left',
	},
	{
		label: __( 'Zoom In to Right' ),
		value: 'zoom-in-right',
	},
	{
		label: __( 'Zoom Out' ),
		value: 'zoom-out',
	},
	{
		label: __( 'Zoom Out to Left' ),
		value: 'zoom-out-left',
	},
	{
		label: __( 'Zoom Out to Right' ),
		value: 'zoom-out-right',
	},
];

export default function AnimationInspector( props ) {
	const { attributes, setAttributes } = props;
	const {
		animationEnabled,
		animationType,
		animationDuration,
		animationDelay,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Animation', 'bm-block-library' ) }
				initialOpen={ animationEnabled }
			>
				<ToggleControl
					label={ __( 'Enable Animation?' ) }
					help={ __(
						'Allows the block to animate on the page. For the best great experience, use this as special effects with some caution.'
					) }
					checked={ animationEnabled }
					onChange={ ( animationEnabled ) =>
						setAttributes( { animationEnabled } )
					}
				/>

				{ animationEnabled && (
					<>
						<SelectControl
							label={ __( 'Type', 'bm-block-library' ) }
							value={ animationType }
							onChange={ ( animationType ) =>
								setAttributes( { animationType } )
							}
							options={ ANIMATION_TYPES }
						/>

						<RangeControl
							label={ __( 'Duration', 'bm-block-library' ) }
							value={ animationDuration }
							onChange={ ( animationDuration ) =>
								setAttributes( { animationDuration } )
							}
							min={ 500 }
							max={ 3000 }
							step={ 100 }
							allowReset={ true }
							resetFallbackValue={ 1000 }
							initialPosition={ 1000 }
							help={ __(
								'How long will the animation take? Set in milliseconds.',
								'bm-block-library'
							) }
						/>

						<RangeControl
							label={ __( 'Delay', 'bm-block-library' ) }
							value={ animationDelay }
							onChange={ ( animationDelay ) =>
								setAttributes( { animationDelay } )
							}
							min={ 0 }
							max={ 1000 }
							step={ 50 }
							allowReset={ true }
							resetFallbackValue={ 0 }
							initialPosition={ 0 }
							help={ __(
								'Wait this long before running the animation. Set in milliseconds.',
								'bm-block-library'
							) }
						/>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
