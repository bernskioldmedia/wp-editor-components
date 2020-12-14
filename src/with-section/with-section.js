/**
 * WordPress Dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal Dependencies
 */
import SectionEdit from '../Section/edit';
import SectionHeaderEdit from '../Section_Header/edit';
import SectionFooterEdit from '../Section_Footer/edit';
import SectionHeaderSave from '../Section_Header/save';
import SectionFooterSave from '../Section_Footer/save';
import SectionSave from '../Section/save';
import { InspectorControls } from '@wordpress/block-editor';
import SectionAppearance from '../Section/inspector';
import SectionHeaderInspector from '../Section_Header/inspector';
import SectionFooterInspector from '../Section_Footer/inspector';

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
