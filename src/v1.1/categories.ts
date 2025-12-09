/**
 categories.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { z } from "zod/v4";
import { ORStatusType } from "./enumerations";
import { ORDateTime, sourcedIdSchema } from "@pkg/common";

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

export type ORCategories<TMode extends "default" | "csv" = "default"> = TMode extends "default"
  ? z.infer<typeof ORCategories>
  : z.input<typeof ORCategories>;
