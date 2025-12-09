/**
 classes.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { createCsvArrayCodec, ORDateTime, sourcedIdSchema } from "@pkg/common";
import { z } from "zod/v4";
import { ORClassType, ORGrade, ORStatusType } from "./enumerations";

/**
 * Classes represent the actual instance taught by an instructor and are generally be associated with a location and a time of day (period). Later on, an instructor and students will be assigned directly to the instance. In some student information systems (SISs), classes are referred to as sections.
 */
export const ORClasses = z.object({
  /** Unique ID for the class. SourcedId is used in other files and must be unique across all classes. */
  sourcedId: sourcedIdSchema,
  /**  */
  status: ORStatusType,
  /** The date that this record was last modified. */
  dateLastModified: ORDateTime,
  /** Name of this class. */
  title: z.string(),
  /** Grade(s) for which the class is attended. The permitted vocabulary is from CEDS (Version 5) and the 'Entry Grade Level' element https://ceds.ed.gov/CEDSElementDetails.aspx?TermId=7100 */
  grades: createCsvArrayCodec(ORGrade).nullish(),
  /** SourcedId of the course of which this class is an instance. */
  courseSourcedId: sourcedIdSchema,
  /** Human readable code used to help identify this class. */
  classCode: z.string().nullish(),
  /**  */
  classType: createCsvArrayCodec(ORClassType),
  /** Human readable description of where the class is physically located. */
  location: z.string().nullish(),
  /** SourcedId of the Org that teaches this class of OrgType "school". */
  schoolSourcedId: sourcedIdSchema,
  /** SourcedId of the terms (the academicSessions) in which the class is taught. */
  termSourcedId: createCsvArrayCodec(sourcedIdSchema),
  /**
   * Subject name(s) in human readable form. If the 'subjectCodes' attribute is present then the subjects and subjectCodes lists must have the same length and have order significance
   *
   * The vocabulary is from SCED (School Codes for the Exchange of Data) (Version 4) for the "Course Title" field:  http://nces.ed.gov/forum/SCED.asp
   *
   * If the value of the "Course Title" contains commas, then those commas must be removed.
   * F example, the "Course Title" for "SCED Course Code" "03210" is "Science, Technology and Society". This must be represented as "Science Technology and Society".
   *
   */
  subjects: createCsvArrayCodec(z.string()).nullish(),
  /**
   * Subject codes(s) in machine readable form. If more than one subject code is needed, use double quotes, and separate with commas (per RFC 4180). If the 'subjects' attribute is present the two lists must have the same length and have order significance.
   *
   * For deployments in the USA this vocabulary SHOULD be a School Courses for the Exchange of Data (SCED) code: http://nces.ed.gov/forum/SCED.asp.
   *
   */
  subjectCodes: createCsvArrayCodec(z.string()).nullish(),
  /** 	
	The time slots in the day that the class will be given. If more than one period is needed, use double quotes, and separate with commas (per RFC 4180).

	Examples: 1; "1,3,5"
 */
  periods: createCsvArrayCodec(z.string()).nullish(),
});

export type ORClasses<TMode extends "default" | "csv" = "default"> = TMode extends "default"
  ? z.infer<typeof ORClasses>
  : z.input<typeof ORClasses>;

export const ORClassResources = z.object({
  /** Unique ID for the class/resource association. SourcedId is used in other files and must be unique across all class resources. */
  sourcedId: sourcedIdSchema,
  /**  */
  status: ORStatusType,
  /** The date that this record was last modified. */
  dateLastModified: ORDateTime,
  /** Name of the related class.  */
  title: z.string().nullish(),
  /** SourcedId of the reference Class. */
  classSourcedId: sourcedIdSchema,
  /** SourcedId of the Resource associated with the Class. */
  resourceSourcedId: sourcedIdSchema,
});

export type ORClassResources<TMode extends "default" | "csv" = "default"> = TMode extends "default"
  ? z.infer<typeof ORClassResources>
  : z.input<typeof ORClassResources>;
