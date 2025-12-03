/**
 courses.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { createCsvArrayCodec, ORDateTime, sourcedIdSchema } from '@pkg/common';
import { z } from 'zod/v4';
import { ORGrade, ORStatusType } from './enumerations';

export const ORCourseResources = z.object({
	sourcedId: sourcedIdSchema,
	status: ORStatusType,
	dateLastModified: ORDateTime,
	title: z.string().nullish(),
	courseSourcedId: sourcedIdSchema,
	resourceSourcedId: sourcedIdSchema
});

export const ORSources = z.object({
	sourcedId: sourcedIdSchema,
	status: ORStatusType,
	dateLastModified: ORDateTime,
	schoolYearSourcedId: sourcedIdSchema.nullish(),
	title: z.string(),
	courseCode: z.string().nullish(),
	grades: createCsvArrayCodec(ORGrade).nullish(),
	orgSourcedId: sourcedIdSchema,
	subjects: createCsvArrayCodec(z.string()).nullish(),
	subjectCodes: z.string().nullish()
});
