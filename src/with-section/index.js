/**
 * WordPress Dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal Dependencies
 */
import SectionEdit from '../section/edit';
import SectionHeaderEdit from '../section-header/edit';
import SectionFooterEdit from '../section-footer/edit';
import SectionHeaderSave from '../section-header/save';
import SectionFooterSave from '../section-footer/save';
import SectionSave from '../section/save';
import { InspectorControls } from '@wordpress/block-editor';
import SectionAppearance from '../section/inspector';
import SectionHeaderInspector from '../section-header/inspector';
import SectionFooterInspector from '../section-footer/inspector';

/**
 * Override the default block to wrap it in our bespoke Section
 * code to enable Section props for editing.
 */
export const withSectionEdit = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		return (
			<SectionEdit { ...props }>
				<SectionHeaderEdit { ...props } />
				<div className="section-body">
					<BlockEdit { ...props } />
				</div>
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
		return (
			<SectionSave { ...props }>
				<SectionHeaderSave { ...props } />
				<div className="section-body">
					<BlockSave { ...props } />
				</div>
				<SectionFooterSave { ...props } />
			</SectionSave>
		);
	};
}, 'withSectionSave' );
