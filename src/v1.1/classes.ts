/**
 classes.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { createCsvArrayCodec, ORDateTime, sourcedIdSchema } from '@pkg/common';
import { z } from 'zod/v4';
import { ORClassType, ORGrade, ORStatusType } from './enumerations';

export const ORClasses = z.object({
	sourcedId: sourcedIdSchema,
	status: ORStatusType,
	dateLastModified: ORDateTime,
	title: z.string(),
	grades: createCsvArrayCodec(ORGrade).nullish(),
	courseSourcedId: sourcedIdSchema,
	classCode: z.string().nullish(),
	classType: createCsvArrayCodec(ORClassType),
	location: z.string().nullish(),
	schoolSourcedId: sourcedIdSchema,
	termSourcedId: createCsvArrayCodec(sourcedIdSchema),
	subjects: createCsvArrayCodec(z.string()).nullish(),
	subjectCodes: createCsvArrayCodec(z.string()).nullish(),
	periods: createCsvArrayCodec(z.string()).nullish()
});

export const ORClassResources = z.object({
	sourcedId: sourcedIdSchema,
	status: ORStatusType,
	dateLastModified: ORDateTime,
	title: z.string().nullish(),
	classSourcedId: sourcedIdSchema,
	resourceSourcedId: sourcedIdSchema
});
