/**
 * Internal Dependencies
 */
import { sectionAttributes } from './section';
import { sectionFooterAttributes } from './section-footer';
import { sectionHeaderAttributes } from './section-header';

/**
 * WordPress Dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';
import { select } from '@wordpress/data';

/**
 * Convert a focal point object to a background
 * position string.
 *
 * @param focalPoint
 * @return {string}
 */
export function focalPointToBgPos( focalPoint ) {
	return `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`;
}

/**
 * Merges the provided block attributes with the
 * attributes for a Section.
 *
 * @param blockAttributes
 * @return {Object}
 */
export function mergeSectionAttributes( blockAttributes ) {
	return {
		...sectionAttributes,
		...sectionHeaderAttributes,
		...sectionFooterAttributes,
		...blockAttributes,
	};
}

/**
 * Get the URL from a media object.
 *
 * @param media
 * @param size
 * @return {*}
 */
export function getMediaUrl( media, size = 'large' ) {
	if ( media.sizes && media.sizes[size] && media.sizes[size].url ) {
		return media.sizes[size].url;
	}
	return media.url;
}

/**
 * Get Media Dimensions
 *
 * @param media
 * @param size
 * @return {{width: *, height: *}}
 */
export function getMediaDimensions( media, size = 'large' ) {
	let width = 0,
		height = 0;

	if ( media.sizes && media.sizes[size] && media.sizes[size].width ) {
		width = media.sizes[size].width;
	} else {
		width = media.width;
	}

	if ( media.sizes && media.sizes[size] && media.sizes[size].height ) {
		height = media.sizes[size].height;
	} else {
		height = media.height;
	}

	return {
		height,
		width,
	};
}

/**
 * Check if image is dark.
 *
 * @param imageSrc
 * @param callback
 */
export function isImageDark( imageSrc, callback ) {
	const fuzzy = 0.1;
	const img = document.createElement( 'img' );
	img.src = imageSrc;
	img.style.display = 'none';
	document.body.appendChild( img );

	img.onload = function() {
		// create canvas
		const canvas = document.createElement( 'canvas' );
		canvas.width = this.width;
		canvas.height = this.height;

		const ctx = canvas.getContext( '2d' );
		ctx.drawImage( this, 0, 0 );

		const imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
		const data = imageData.data;
		let r, g, b, max_rgb;
		let light = 0,
			dark = 0;

		for ( let x = 0, len = data.length; x < len; x += 4 ) {
			r = data[x];
			g = data[x + 1];
			b = data[x + 2];

			max_rgb = Math.max( Math.max( r, g ), b );
			if ( max_rgb < 128 ) {
				dark++;
			} else {
				light++;
			}
		}

		const dl_diff = ( light - dark ) / ( this.width * this.height );
		if ( dl_diff + fuzzy < 0 ) {
			callback( true );
		} else {
			callback( false );
		}
	};
}

/**
 * Check if a color is considered light or dark.
 *
 * @param color
 * @return {boolean}
 */
export function isColorLight( color ) {
	// Variables for red, green, blue values
	let r, g, b, hsp;

	// Check the format of the color, HEX or RGB?
	if ( color.match( /^rgb/ ) ) {
		// If HEX --> store the red, green, blue values in separate variables
		color = color.match(
			/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
		);

		r = color[1];
		g = color[2];
		b = color[3];
	} else {
		// If RGB --> Convert it to HEX: http://gist.github.com/983661
		color = +(
			'0x' + color.slice( 1 ).replace( color.length < 5 && /./g, '$&$&' )
		);

		r = color >> 16;
		g = ( color >> 8 ) & 255;
		b = color & 255;
	}

	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	hsp = Math.sqrt(
		0.299 * ( r * r ) + 0.587 * ( g * g ) + 0.114 * ( b * b )
	);

	// Using the HSP value, determine whether the color is light or dark
	if ( hsp > 127.5 ) {
		return true;
	}

	return false;
}

/**
 * Convert a string to a URL slug.
 *
 * @param str
 * @return {string}
 */
export function convertToSlug( str ) {
	if ( ! str || str === '' ) {
		return str;
	}

	str = str.replace( /^\s+|\s+$/g, '' ); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	const from =
		'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;';
	const to =
		'AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------';
	for ( let i = 0, l = from.length; i < l; i++ ) {
		str = str.replace(
			new RegExp( from.charAt( i ), 'g' ),
			to.charAt( i )
		);
	}

	str = str
		.replace( /[^a-z0-9 -]/g, '' ) // remove invalid chars
		.replace( /\s+/g, '-' ) // collapse whitespace and replace by -
		.replace( /-+/g, '-' ); // collapse dashes

	return str;
}

/**
 * Get Background Class
 *
 * @param attributes
 * @return {null|*}
 */
export function getBackgroundClass( attributes ) {
	const { backgroundColor } = attributes;

	if ( backgroundColor ) {
		return getColorClassName( 'background-color', backgroundColor );
	}
	return null;
}

/**
 * Get selected filter values from a filter dropdown via react-select.
 *
 * @param items
 * @return {*[]|*}
 */
export function getSelectedPostFilters( items ) {
	if ( null === items || ! items.length ) {
		return [];
	}

	return items.map( ( selected ) => {
		return selected.value;
	} );
}

/**
 * Get term data based on taxonomy and term ID.
 *
 * @param taxonomy
 * @param termId
 * @return {*}
 */
export function getTermData( taxonomy, termId ) {
	const { getEntityRecord } = select( 'core' );

	return getEntityRecord( 'taxonomy', taxonomy, termId );
}

/**
 * Check if we are currently requesting items from the post type and query.
 *
 * @param postType
 * @param query
 * @param recordType
 * @return {*}
 */
export function isRequestingData( postType, query, recordType = 'postType' ) {
	const { isResolving } = select( 'core/data' );

	return isResolving( 'core', 'getEntityRecords', [
		recordType,
		postType,
		query,
	] );
}

export function getRecords( postType, query, recordType = 'postType' ) {
	const { getEntityRecords } = select( 'core' );
	const records = getEntityRecords( recordType, postType, query );

	return parseReturnedRecords( records );
}

export function parseReturnedRecords( records ) {
	if ( ! records || ! records.length ) {
		return [];
	}

	return records;
}

export function queryStringFromObject( object ) {
	return (
		'?' +
		Object.keys( object )
			  .map(
				  ( k ) =>
					  `${ encodeURIComponent( k ) }=${ encodeURIComponent(
						  object[k]
					  ) }`
			  )
			  .join( '&' )
	);
}
