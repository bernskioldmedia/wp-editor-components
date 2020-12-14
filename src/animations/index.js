import { createHigherOrderComponent } from '@wordpress/compose';
import { AnimationInspector } from './animation-inspector';

export * from './animation-inspector';

export const animationAttributes = {
	animationEnabled: {
		type: 'bool',
		default: false,
	},
	animationType: {
		type: 'string',
		default: 'fade-in',
	},
	animationDuration: {
		type: 'number',
		default: 1000,
	},
	animationDelay: {
		type: 'number',
		default: 0,
	},
};

export function addAnimationAttributes( attributes ) {
	return {
		...animationAttributes,
		...attributes,
	};
}

export function useAnimationProps( props ) {
	const { attributes } = props;

	const {
		animationEnabled,
		animationType,
		animationDuration,
		animationDelay,
	} = attributes;

	return {
		'data-aos': animationEnabled ? animationType : null,
		'data-aos-duration': animationEnabled ? animationDuration : null,
		'data-aos-delay': animationEnabled ? animationDelay : null,
	};
}

export const withAnimationInspector = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		return (
			<>
				<BlockEdit { ...props } />
				<AnimationInspector { ...props } />
			</>
		);
	};
}, 'withAnimationInspector' );
