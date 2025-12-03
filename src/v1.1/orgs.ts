/**
 orgs.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { z } from "zod/v4";
import { OROrgType, ORStatusType } from "./enumerations";
import { createCsvArrayCodec, ORDateTime, parentSourcedIdSchema } from "@pkg/common";

export const OROrg = z.object({
  sourcedId: z.string(),
  status: ORStatusType,
  dateLastModified: ORDateTime,
  name: z.string(),
  type: OROrgType,
  identifier: z.string().optional().nullable(),
  parentSourcedId: parentSourcedIdSchema,
});

export type OROrg = z.infer<typeof OROrg>;
