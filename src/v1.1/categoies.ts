/**
 categoies.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORDateTime, sourcedIdSchema } from "@pkg/common";
import { z } from "zod/v4";
import { ORStatusType } from "./enumerations";

export const ORCategories = z.object({
  /** Unique ID for the category. */
  sourcedId: sourcedIdSchema,
  /** 	
	See section 4.13.8 [OneRoster, 20a] for the enumeration list.

	This MUST NOT be used for the Bulk mode.
 */
  status: ORStatusType,
  /** 	
	The date that this record was last modified.

	This MUST NOT be used for the Bulk mode.
 */
  dateLastModified: ORDateTime,
  /** The title assigned to the set of lineItems to denote its nature e.g. homework, essays, etc. */
  title: z.string(),
});
