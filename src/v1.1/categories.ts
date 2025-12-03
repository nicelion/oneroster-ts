/**
 categories.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { z } from 'zod/v4';
import { ORStatusType } from './enumerations';
import { ORDateTime } from '@pkg/common';

export const ORCategories = z.object({
	sourcedId: z.string(),
	status: ORStatusType,
	dateLastModified: ORDateTime,
	title: z.string()
});
