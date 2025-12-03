/**
 enrollments.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORDateTime, sourcedIdSchema } from '@pkg/common';
import { z } from 'zod/v4';
import { ORRoleType, ORStatusType } from './enumerations';

export const OREnrollments = z.object({
	sourcedId: sourcedIdSchema,
	status: ORStatusType,
	dateLastModified: ORDateTime,
	classSourcedId: sourcedIdSchema,
	schoolSourcedId: sourcedIdSchema,
	userSourcedId: sourcedIdSchema,
	role: ORRoleType,
	primary: z.stringbool().nullish(),
	beginDate: ORDateTime.nullish(),
	endDate: ORDateTime.nullish()
});
