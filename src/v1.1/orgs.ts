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

/**
 * Orgs represent the organizational structure of your school district.
 *
 * In general, the file will have one row to represent the district and one row to represent each building.
 *
 * The buildings will generally reference the district’s sourcedId in the parentSourcedId column.
 */
export const OROrg = z.object({
  sourcedId: z.string(),
  /**
   * Unique id for the organization. SourcedId is used in other files and must be unique across all organizations.
   */
  status: ORStatusType,
  /**
   * The date that this record was last modified.
   */
  dateLastModified: ORDateTime,
  /**
   * Name of the organization.
   */
  name: z.string(),
  /**
   * Type of this organization
   */
  type: OROrgType,
  /**
   * NCES ID National Center for Education Statistics) for the school/district.
   */
  identifier: z.string().optional().nullable(),
  /**
   * SourcedId of an Org representing the Parent organization.
   */
  parentSourcedId: parentSourcedIdSchema.nullish(),
});

export type OROrg<TMode extends "default" | "csv" = "default"> = TMode extends "default"
  ? z.infer<typeof OROrg>
  : z.input<typeof OROrg>;
