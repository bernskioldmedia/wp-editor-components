export const sectionFooterAttributes = {
	sectionFooterShow: {
		type: 'boolean',
		default: false,
	},
	sectionFooterAlignment: {
		type: 'string',
		default: 'center',
	},
	sectionFooterText: {
		type: 'string',
		source: 'html',
		selector: '.section-footer-text',
	},
	sectionFooterCtaShow: {
		type: 'boolean',
		default: false,
	},
	sectionFooterCtaText: {
		type: 'string',
		source: 'html',
		selector: '.section-footer-cta-button',
	},
	sectionFooterCtaLink: {
		type: 'string',
		source: 'attribute',
		attribute: 'href',
		selector: '.section-footer-cta-button',
	},
	sectionFooterCtaLinkTarget: {
		type: 'string',
		source: 'attribute',
		attribute: 'target',
		selector: '.section-footer-cta-button',
	},
	sectionFooterCtaLinkRel: {
		type: 'string',
		source: 'attribute',
		attribute: 'rel',
		selector: '.section-footer-cta-button',
	},
};
