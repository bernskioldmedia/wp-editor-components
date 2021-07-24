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
		label: __( 'Fade ----', 'TEXTDOMAIN' ),
		value: null,
		disabled: true,
	},
	{
		label: __( 'Fade In', 'TEXTDOMAIN' ),
		value: 'fade-in',
	},
	{
		label: __( 'Fade Up', 'TEXTDOMAIN' ),
		value: 'fade-up',
	},
	{
		label: __( 'Fade Down', 'TEXTDOMAIN' ),
		value: 'fade-down',
	},
	{
		label: __( 'Fade to Right', 'TEXTDOMAIN' ),
		value: 'fade-right',
	},
	{
		label: __( 'Fade to Left', 'TEXTDOMAIN' ),
		value: 'fade-left',
	},
	{
		label: __( 'Zoom ----', 'TEXTDOMAIN' ),
		value: null,
		disabled: true,
	},
	{
		label: __( 'Zoom In', 'TEXTDOMAIN' ),
		value: 'zoom-in',
	},
	{
		label: __( 'Zoom In to Left', 'TEXTDOMAIN' ),
		value: 'zoom-in-left',
	},
	{
		label: __( 'Zoom In to Right', 'TEXTDOMAIN' ),
		value: 'zoom-in-right',
	},
	{
		label: __( 'Zoom Out', 'TEXTDOMAIN' ),
		value: 'zoom-out',
	},
	{
		label: __( 'Zoom Out to Left', 'TEXTDOMAIN' ),
		value: 'zoom-out-left',
	},
	{
		label: __( 'Zoom Out to Right', 'TEXTDOMAIN' ),
		value: 'zoom-out-right',
	},
];

export function AnimationInspector( props ) {
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
				title={ animationEnabled ? __( 'Animation: On', 'TEXTDOMAIN' ) : __( 'Animation: Off', 'TEXTDOMAIN' ) }
				initialOpen={ animationEnabled }
			>
				<ToggleControl
					label={ __( 'Enable Animation?', 'TEXTDOMAIN' ) }
					help={ __(
						'Allows the block to animate on the page. For the best great experience, use this as special effects with some caution.', 'TEXTDOMAIN'
					) }
					checked={ animationEnabled }
					onChange={ ( animationEnabled ) =>
						setAttributes( { animationEnabled } )
					}
				/>

				{ animationEnabled && (
					<>
						<SelectControl
							label={ __( 'Type', 'TEXTDOMAIN' ) }
							value={ animationType }
							onChange={ ( animationType ) =>
								setAttributes( { animationType } )
							}
							options={ ANIMATION_TYPES }
						/>

						<RangeControl
							label={ __( 'Duration', 'TEXTDOMAIN' ) }
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
								'TEXTDOMAIN'
							) }
						/>

						<RangeControl
							label={ __( 'Delay', 'TEXTDOMAIN' ) }
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
								'TEXTDOMAIN'
							) }
						/>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
