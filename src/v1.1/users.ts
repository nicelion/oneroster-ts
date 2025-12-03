/**
 users.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import {
	createCsvArrayCodec,
	csvArrayCodec,
	CSVListOf,
	ORBool,
	ORDateTime,
	sourcedIdSchema,
	zCSVList
} from '@pkg/common';
import { ORGrade, ORRoleType, ORStatusType } from './enumerations';
import { z, ZodArray, ZodType } from 'zod/v4';

// export const ORUserCSV = z.object({
// 	sourcedId: z.string(),
// 	status: ORStatusType,
// 	dateLastModified: ORDateTime,
// 	enabledUser: ORBool,
// 	orgSourcedId: z.string(),
// 	role: ORRoleType,
// 	username: z.string(),
// 	userIds: z.string().optional(),
// 	givenName: z.string(),
// 	familyName: z.string(),
// 	middleName: z.string(),
// 	identifier: z.string().optional().nullable(),
// 	email: z.string().optional().nullable(),
// 	phone: z.string().optional().nullable(),
// 	agentSourcedIds: z.string().optional().nullable(),
// 	password: z.string().optional().nullable()
// });

// export const ORUserJSON = z.object({
// 	...ORUserCSV.shape,
// 	userIds: z.array(z.string()),
// 	agentSourcedIds: z.array(z.string())
// });

// type JSON = z.output<typeof ORUserJSON>;
// type CSV = z.input<typeof ORUserJSON>;

// export const ORUser = z.codec(ORUserCSV, ORUserJSON, {
// 	encode(value, payload) {
// 		// return ORUserJSON.parse(value);
// 		return {
// 			...value,
// 			userIds: '',
// 			agentSourcedIds: ''
// 		};
// 	},
// 	decode(value, payload) {
// 		return {
// 			...value,
// 			agentSourcedIds: [],
// 			userIds: []
// 		};
// 	}
// });

export const ORUser = z.object({
	/** Unique ID for the user. SourcedId is used in other files and must be unique across all users */
	sourcedId: sourcedIdSchema,
	/** This MUST NOT be used for the Bulk mode
	 * {@link ORStatusType}
	 */
	status: ORStatusType,
	/** The date that this record was last modified. */
	dateLastModified: ORDateTime,
	/**
	 * Permitted values: { "true" | "false" }. 'false' denotes that the user is an active record but system access is curtailed according to the local administration rules. */
	enabledUser: ORBool,
	/**
	 * SourcedIds of the Orgs to which this user belongs. (Note in most in cases, it is expected that users will belong to a single school).
	 */
	orgSourcedId: z.string(),
	/** Role for the user. {@link ORRoleType}*/
	role: ORRoleType,
	/** User name. */
	username: z.string(),
	/**
	 * External machine-readable ID (e.g. LDAP id, LTI id) for this user
	 * The ID must be accompanied by a type to indicate the nature of the Identifier. The Type and ID values are enclosed in '{}' with a colon used to separate the values. If more than one userId is needed, use double quotes, and separate with commas (per RFC 4180).
	 *
	 * @example
	 * {LDAP:Id}
	 * "{LDAP:Id},{LTI:Id},{Fed:Id}"
	 *
	 */
	userIds: csvArrayCodec,
	/** User's first name. */
	givenName: z.string(),
	/** User's surname. */
	familyName: z.string(),
	/** User's middle name (s). If more than one then they are separated by a space. */
	middleName: z.string().optional().nullable(),
	/** Identifier for the user with a human readable meaning. */
	identifier: z.string().optional().nullable(),
	/** Email address for the User. */
	email: z.string().optional().nullable(),
	/** SMS address for the User. */
	sms: z.string().optional().nullable(),
	/** Phone number for the User. */
	phone: z.string().optional().nullable(),
	/**
	 * SourcedIds of the Users to which this user has a relationship. If multiple IDs are required then use double quotes and separate with commas.
	 * Note: In most cases this will be for indicating parental relationships.
	 */
	agentSourcedIds: createCsvArrayCodec(z.string()).optional().nullable(),
	/**  */
	password: z.string().optional().nullable(),
	/**
	 * Grade(s) for which a user with role 'student' is enrolled. The permitted vocabulary is from CEDS (Version 5) for the 'Entry Grade Level' element https://ceds.ed.gov/CEDSElementDetails.aspx?TermId=7100.
	 * See {@link ORGrade}
	 */
	grades: createCsvArrayCodec(ORGrade).optional()
});

// export type ORUser = z.infer<typeof ORUser>;
// export type ORUserCSVRow = z.input<typeof ORUser>;

// type TestORUser<TMode extends "hello"> = TMode extends "hello" ? ORUser : ORUserCSVRow

// type t = TestORUser<"hello">

export type ORUser<TMode extends 'default' | 'csv' = 'default'> = TMode extends 'default'
	? z.infer<typeof ORUser>
	: z.input<typeof ORUser>;
