/**
 enrollments.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORDateTime, sourcedIdSchema } from "../common";
import { z } from "zod/v4";
import { ORRoleType, ORStatusType } from "./enumerations";

/**
 * Enrollments connect users to classes. The file contains references to the sourcedId of the user and the class, as well as the org the class is taught in. Each row in the file needs a unique identifier. In cases where the student information system (SIS) doesn't provide one, it's best practice to combine the sourcedId of the user and the class.
 */
export const OREnrollments = z.object({
  /** Unique identifier of this enrollment. */
  sourcedId: sourcedIdSchema,
  /**  */
  status: ORStatusType,
  /** The date that this record was last modified. */
  dateLastModified: ORDateTime,
  /** SourcedId of the Class. */
  classSourcedId: sourcedIdSchema,
  /** SourcedId of an Org with type 'school'. */
  schoolSourcedId: sourcedIdSchema,
  /** SourcedId of the User. */
  userSourcedId: sourcedIdSchema,
  /**
   * See section 4.13.5 [OneRoster, 20a] for the enumeration list. The ONLY permitted values are: { administrator | proctor | student | teacher }.
   *
   */
  role: ORRoleType,
  /** Permitted values: { "true" | "false" }. Applicable only to teachers. Only one teacher should be designated as the primary teacher for a class in the period defined by the begin/end dates. */
  primary: z.stringbool().nullish(),
  /** The start date for the enrollment. This date must align with the associated academic session (term) identified in the class. */
  beginDate: ORDateTime.nullish(),
  /** The end date for the enrollment (exclusive). This date must align with the associated academic session (term) identified for the class */
  endDate: ORDateTime.nullish(),
});
