/**
 common.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { z, ZodType } from 'zod/v4';

/**
 * Make all properties required *but* allow their values to be undefined.
 * Useful for getting IntelliSense to tell you what keys to provide.
 */
export type RequiredInput<T> = {
	[K in keyof T]-?: T[K] | undefined;
};

export type CSVListOf<T extends string> = string & {
	readonly __csvListBrand?: T;
};

export const ORDateTime = z.string().regex(
	// YYYY-MM-DDTHH:mm:ss.SSSZ
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
	{
		message:
			'Must be an ISO 8601 UTC datetime string with millisecond precision (e.g. 2025-12-01T19:34:15.123Z)'
	}
);

export const ORBool = z.enum(['true', 'false']);

export const zCSVList = z
	.string()
	.transform((value) => {
		const v = value.trim();

		if (v === '') return [];

		return v
			.split(',')
			.map((item) => item.trim())
			.filter((item) => item.length > 0);
	})
	.pipe(z.array(z.string()));

export const csvArrayCodec = z.codec(z.string(), z.array(z.string()), {
	encode(value, payload) {
		return value.join(',');
	},
	decode(value, payload) {
		const v = value.trim();

		if (v === '') return [];

		return v
			.split(',')
			.map((item) => item.trim())
			.filter((item) => item.length > 0);
	}
});

export const createCsvArrayCodec = <TSchema extends ZodType>(schema: TSchema) => {
	return z.codec(z.string(), z.array(schema), {
		encode(values, payload) {
			if (!values || values.length === 0) return '';

			const csv = values.join(',');

			// Multiple items require quotes
			if (values.length > 1) {
				return `"${csv}"`;
			}

			// Single item: no quotes
			return csv;
		},
		decode(value, payload) {
			let v = value.trim();

			if (v === '' || v === `""`) return [];

			// If wrapped in quotes, strip them
			if (v.startsWith(`"`) && v.endsWith(`"`)) {
				v = v.slice(1, -1);
			}

			// Now split
			if (v === '') return [];

			return v
				.split(',')
				.map((s) => s.trim())
				.filter((s) => s.length > 0) as z.input<TSchema>[];
		}
	});
};

export const parentSourcedIdSchema = createCsvArrayCodec(z.string());
// export type CsvList<T extends string> = T | `${T},${CsvList<T>}`;

export const sourcedIdSchema = z.guid();
