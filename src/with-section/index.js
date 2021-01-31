import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { SectionAppearance, SectionEdit, SectionSave } from '../section';
import { SectionFooterEdit, SectionFooterInspector, SectionFooterSave } from '../section-footer';
import { SectionHeaderEdit, SectionHeaderInspector, SectionHeaderSave } from '../section-header';


/**
 * Override the default block to wrap it in our bespoke Section
 * code to enable Section props for editing.
 */
export const withSectionEdit = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
        const { attributes } = props;
        const { sectionWrapperEnabled } = attributes;

		return (
			<SectionEdit { ...props }>
                <SectionHeaderEdit { ...props } />
                
                { sectionWrapperEnabled ? (
                    <div className="section-body">
					    <BlockEdit { ...props } />
				    </div>
                ) : (
                    <BlockEdit { ...props } />
                )}

				<SectionFooterEdit { ...props } />

				<InspectorControls>
					<SectionAppearance { ...props } />
					<SectionHeaderInspector { ...props } />
					<SectionFooterInspector { ...props } />
				</InspectorControls>
			</SectionEdit>
		);
	};
}, 'withSectionEdit' );

/**
 * Override the default block to wrap it in our bespoke Section
 * code to enable Section props for saving.
 */
export const withSectionSave = createHigherOrderComponent( ( BlockSave ) => {
	return ( props ) => {
        const { attributes } = props;
        const { sectionWrapperEnabled } = attributes;

		return (
			<SectionSave { ...props }>
                <SectionHeaderSave { ...props } />
                
                { sectionWrapperEnabled ? (
                    <div className="section-body">
					    <BlockSave { ...props } />
				    </div>
                ) : (
                    <BlockSave { ...props } />
                )}

				<SectionFooterSave { ...props } />
			</SectionSave>
		);
	};
}, 'withSectionSave' );
