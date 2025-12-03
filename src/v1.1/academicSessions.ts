/*
 * academicSessions.ts
 * one-roster
 *
 * Created by Ian Thompson on December 1st 2025
 * ianthompson@nicelion.com
 * https://www.nicelion.com
 *
 * Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 *
 */

import { z } from 'zod/v4';
import { ORSessionType, ORStatusType } from './enumerations';
import { ORDateTime, parentSourcedIdSchema } from '@pkg/common';

export const ORAcademicSession = z.object({
	sourcedId: z.string(),
	status: ORStatusType,
	dateLastModified: ORDateTime,
	title: z.string(),
	type: ORSessionType,
	startDate: ORDateTime,
	endDate: ORDateTime,
	parentSourcedId: parentSourcedIdSchema,
	schoolYear: z.string()
});
