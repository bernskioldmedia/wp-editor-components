/**
 * !!!!!
 * N.B. Don't forget to update these in Components/Section/class-Section.php too!
 */
export default {
	backgroundColor: {
		type: 'string',
		default: 'transparent',
	},
	backgroundImageId: {
		type: 'number',
	},
	backgroundImageUrl: {
		type: 'string',
	},
	backgroundImageFocalPoint: {
		type: 'object',
		default: {
			x: 0.5,
			y: 0.5,
		},
	},
	backgroundImageDimensions: {
		type: 'object',
		default: {
			width: 0,
			height: 0,
		},
	},
	isSectionFullHeight: {
		type: 'boolean',
		default: false,
	},
	sectionContentWidth: {
		type: 'string',
		default: 'page-width',
	},
	sectionVerticalSpacing: {
		type: 'string',
		default: 'normal',
	},
};
