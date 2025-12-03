/**
 enumerations.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import z from 'zod/v4';

/**
 * The grade level or primary instructional level at which a student enters and receives services in a school or an educational institution during a given academic session.
 */
export const ORGrade = z.enum({
	/** Infant/Toddler */
	IT: 'IT',
	/** Preschool */
	PR: 'PR',
	/** Prekindergarten */
	PK: 'PK',
	/** Transitional Kindergarten */
	TK: 'TK',
	/** Kindergarten */
	KG: 'KG',
	/** First grade */
	'01': '01',
	/** Second grade */
	'02': '02',
	/** Third grade */
	'03': '03',
	/** Fourth grade */
	'04': '04',
	/** Fifth grade */
	'05': '05',
	/** Sixth grade */
	'06': '06',
	/** Seventh grade */
	'07': '07',
	/** Eighth grade */
	'08': '08',
	/** Ninth grade */
	'09': '09',
	/** Tenth grade */
	'10': '10',
	/** Eleventh grade */
	'11': '11',
	/** Twelfth grade */
	'12': '12',
	/** Grade 13 */
	'13': '13',
	/** Post-secondary */
	PS: 'PS',
	/** Ungraded */
	UG: 'UG',
	/** Other */
	Other: 'Other'
});

export type ORGrade = z.infer<typeof ORGrade>;

/** The set of permitted tokens for the type of class are listed below. */
export const ORClassType = z.enum({
	/** The homeroom (form) assigned to the class. */
	homeroom: 'homeroom',
	/** The class as assigned in the timetable. */
	scheduled: 'scheduled'
});

export type ORClassType = z.infer<typeof ORClassType>;

/** The set of permitted tokens for the type of gender are listed below. */
export const ORGender = z.enum({
	/** Gender of Male. */
	male: 'male',
	/** Gender of Female. */
	female: 'female'
});
export type ORGender = z.infer<typeof ORGender>;

export const ORImportance = z.enum({
	/** A resource of primary usage. */
	primary: 'primary',
	/** A resource of secondary usage. */
	secondary: 'secondary'
});
export type ORImportance = z.infer<typeof ORImportance>;

/**
 * The set of permitted tokens for the type of organization are listed below.
 *
 * The explicit hierarchy is: national -> state -> local -> district -> school.
 *
 * Note that a 'department' may be inserted below any entity other than national and above any entity other than national and state i.e. national -> state-> department -> local -> department -> district -> department -> school -> department.
 */
export const OROrgType = z.enum({
	/** Denotes a department. A department may be a subset in a school or a set of schools. Added in V1.1. */
	department: 'department',
	/** Denotes a school. This is the unit of assignment for classes and enrollments. */
	school: 'school',
	/** Denotes a school district. Added in V1.1. */
	district: 'district',
	/** V1.0 instances will use this value to identify districts. */
	local: 'local',
	/** Denotes a state level organization. */
	state: 'state',
	/** Denotes a national level organization. */
	national: 'national'
});
export type OROrgType = z.infer<typeof OROrgType>;

export const ORRoleType = z.enum({
	/**
	 * Administrator in the organization (e.g. School).
	 * May be used for enrollment.
	 */
	administrator: 'administrator',
	/** Someone who provides appropriate aide to the user but NOT also one of the other roles. */
	aide: 'aide',
	/** Guardian of the user and NOT the Mother or Father. May also be a Relative. */
	guardian: 'guardian',
	/** Mother or father of the user. */
	parent: 'parent',
	/** Exam proctor. Added in V1.1. May be used for enrollment. */
	proctor: 'proctor',
	/** A relative of the user and NOT the Mother or Father. May also be the Guardian. */
	relative: 'relative',
	/** A student at a organization (e.g. School). May be used for enrollment. */
	student: 'student',
	/** A Teacher at organization (e.g. School). May be used for enrollment. */
	teacher: 'teacher'
});
export type ORRoleType = z.infer<typeof ORRoleType>;

/**
 * The standard workflow is based upon the cycle of: not submitted -> submitted -> partially graded -> fully graded.
 */
export const ORScoreStatus = z.enum({
	/** The result is exempt i.e. this score does NOT contribute to any summative assessment. */
	exempt: 'exempt',
	/** The result is fully graded. */
	fullyGraded: 'fully graded',
	/** The result is not submitted. */
	notSubmitted: 'not submitted',
	/** The result is partially graded. Further scoring will be undertaken and this score must NOT be used in summative assessment i.e. it must become 'fully graded'. */
	partiallyGraded: 'partially graded',
	/** The result is submitted. This is a FINAL score and can only be changed as part of a formal review process. */
	submitted: 'submitted'
});
export type ORScoreStatus = z.infer<typeof ORScoreStatus>;

export const ORSessionType = z.enum({
	/** Denotes a period over which some grade/result is to be awarded. */
	gradingPeriod: 'gradingPeriod',
	/** Denotes a semester period. Typically there a two semesters per schoolYear. */
	semester: 'semester',
	/** Denotes the school year. */
	schoolYear: 'schoolYear',
	/** Denotes a term period. Typically there a three terms per schoolYear. */
	term: 'term'
});
export type ORSessionType = z.infer<typeof ORSessionType>;

export const ORStatusType = z.enum({
	/** An active record. */
	active: 'active',
	/** Denotes that it is safe to delete the record. */
	toBeDeleted: 'tobedeleted',
	/** @deprecated. To be mapped to 'tobedeleted. */
	inactive: 'inactive'
});
export type ORStatusType = z.infer<typeof ORStatusType>;

// /**
//  * The grade level or primary instructional level at which a student enters and receives services in a school or an educational institution during a given academic session.
//  */
// export const ORGrade = {
// 	/** Infant/Toddler */
// 	IT: 'IT',
// 	/** Preschool */
// 	PR: 'PR',
// 	/** Prekindergarten */
// 	PK: 'PK',
// 	/** Transitional Kindergarten */
// 	TK: 'TK',
// 	/** Kindergarten */
// 	KG: 'KG',
// 	/** First grade */
// 	'01': '01',
// 	/** Second grade */
// 	'02': '02',
// 	/** Third grade */
// 	'03': '03',
// 	/** Fourth grade */
// 	'04': '04',
// 	/** Fifth grade */
// 	'05': '05',
// 	/** Sixth grade */
// 	'06': '06',
// 	/** Seventh grade */
// 	'07': '07',
// 	/** Eighth grade */
// 	'08': '08',
// 	/** Ninth grade */
// 	'09': '09',
// 	/** Tenth grade */
// 	'10': '10',
// 	/** Eleventh grade */
// 	'11': '11',
// 	/** Twelfth grade */
// 	'12': '12',
// 	/** Grade 13 */
// 	'13': '13',
// 	/** Post-secondary */
// 	PS: 'PS',
// 	/** Ungraded */
// 	UG: 'UG',
// 	/** Other */
// 	Other: 'Other'
// } as const;

// export type ORGrade = (typeof ORGrade)[keyof typeof ORGrade];

// /** The set of permitted tokens for the type of class are listed below. */
// export const ORClassType = {
// 	/** The homeroom (form) assigned to the class. */
// 	homeroom: 'homeroom',
// 	/** The class as assigned in the timetable. */
// 	scheduled: 'scheduled'
// } as const;

// export type ORClassType = (typeof ORClassType)[keyof typeof ORClassType];

// /** The set of permitted tokens for the type of gender are listed below. */
// export const ORGender = {
// 	/** Gender of Male. */
// 	male: 'male',
// 	/** Gender of Female. */
// 	female: 'female'
// } as const;
// export type ORGender = (typeof ORGender)[keyof typeof ORGender];

// export const ORImportance = {
// 	/** A resource of primary usage. */
// 	primary: 'primary',
// 	/** A resource of secondary usage. */
// 	secondary: 'secondary'
// } as const;
// export type ORImportance = (typeof ORImportance)[keyof typeof ORImportance];

// /**
//  * The set of permitted tokens for the type of organization are listed below.
//  *
//  * The explicit hierarchy is: national -> state -> local -> district -> school.
//  *
//  * Note that a 'department' may be inserted below any entity other than national and above any entity other than national and state i.e. national -> state-> department -> local -> department -> district -> department -> school -> department.
//  */
// export const OROrgType = {
// 	/** Denotes a department. A department may be a subset in a school or a set of schools. Added in V1.1. */
// 	department: 'department',
// 	/** Denotes a school. This is the unit of assignment for classes and enrollments. */
// 	school: 'school',
// 	/** Denotes a school district. Added in V1.1. */
// 	district: 'district',
// 	/** V1.0 instances will use this value to identify districts. */
// 	local: 'local',
// 	/** Denotes a state level organization. */
// 	state: 'state',
// 	/** Denotes a national level organization. */
// 	national: 'national'
// } as const;
// export type OROrgType = (typeof OROrgType)[keyof typeof OROrgType];

// export const ORRoleType = {
// 	/**
// 	 * Administrator in the organization (e.g. School).
// 	 * May be used for enrollment.
// 	 */
// 	administrator: 'administrator',
// 	/** Someone who provides appropriate aide to the user but NOT also one of the other roles. */
// 	aide: 'aide',
// 	/** Guardian of the user and NOT the Mother or Father. May also be a Relative. */
// 	guardian: 'guardian',
// 	/** Mother or father of the user. */
// 	parent: 'parent',
// 	/** Exam proctor. Added in V1.1. May be used for enrollment. */
// 	proctor: 'proctor',
// 	/** A relative of the user and NOT the Mother or Father. May also be the Guardian. */
// 	relative: 'relative',
// 	/** A student at a organization (e.g. School). May be used for enrollment. */
// 	student: 'student',
// 	/** A Teacher at organization (e.g. School). May be used for enrollment. */
// 	teacher: 'teacher'
// } as const;
// export type ORRoleType = (typeof ORRoleType)[keyof typeof ORRoleType];

// /**
//  * The standard workflow is based upon the cycle of: not submitted -> submitted -> partially graded -> fully graded.
//  */
// export const ORScoreStatus = {
// 	/** The result is exempt i.e. this score does NOT contribute to any summative assessment. */
// 	exempt: 'exempt',
// 	/** The result is fully graded. */
// 	fullyGraded: 'fully graded',
// 	/** The result is not submitted. */
// 	notSubmitted: 'not submitted',
// 	/** The result is partially graded. Further scoring will be undertaken and this score must NOT be used in summative assessment i.e. it must become 'fully graded'. */
// 	partiallyGraded: 'partially graded',
// 	/** The result is submitted. This is a FINAL score and can only be changed as part of a formal review process. */
// 	submitted: 'submitted'
// } as const;
// export type ORScoreStatus = (typeof ORScoreStatus)[keyof typeof ORScoreStatus];

// export const ORSessionType = {
// 	/** Denotes a period over which some grade/result is to be awarded. */
// 	gradingPeriod: 'gradingPeriod',
// 	/** Denotes a semester period. Typically there a two semesters per schoolYear. */
// 	semester: 'semester',
// 	/** Denotes the school year. */
// 	schoolYear: 'schoolYear',
// 	/** Denotes a term period. Typically there a three terms per schoolYear. */
// 	term: 'term'
// } as const;
// export type ORSessionType = (typeof ORSessionType)[keyof typeof ORSessionType];

// export const ORStatusType = {
// 	/** An active record. */
// 	active: 'active',
// 	/** Denotes that it is safe to delete the record. */
// 	toBeDeleted: 'tobedeleted',
// 	/** @deprecated. To be mapped to 'tobedeleted. */
// 	inactive: 'inactive'
// };
// export type ORStatusType = (typeof ORStatusType)[keyof typeof ORStatusType];
