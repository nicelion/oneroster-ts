/**
 courses.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { createCsvArrayCodec, ORDateTime, sourcedIdSchema } from "@pkg/common";
import { z } from "zod/v4";
import { ORGrade, ORStatusType } from "./enumerations";

export const ORCourseResources = z.object({
  /** Unique ID for the course/resource association. SourcedId is used in other files and must be unique across all course resources. */
  sourcedId: sourcedIdSchema,
  /**  */
  status: ORStatusType,
  /** The date that this record was last modified. */
  dateLastModified: ORDateTime,
  /** Name of the related course. */
  title: z.string().nullish(),
  /** SourcedId of the reference Course. */
  courseSourcedId: sourcedIdSchema,
  /** SourcedId of the Resource associated with the course. */
  resourceSourcedId: sourcedIdSchema,
});

/**
 * Courses are the different offerings for the district. Courses are not the actual representation attached to students and instructors, but are the overarching course that will generally be taught by different instructors in different classrooms/periods. Courses are sometimes referred to as course templates or class templates depending on your student information system (SIS).
 *
 * - The number of courses should be significantly fewer than the number of classes. Think of a course as a general subject being taught, and a class as an instance of the subject. For example, a course would be English 2, and a class would be English 2 - Ms. Townsend Period 4.
 * - The orgSourcedId should be the sourcedId of the district.
 * - The schoolYearSourcedId should be an academicSession lasting for the full school year.
 */
export const ORCourses = z.object({
  /** Unique ID for the course. */
  sourcedId: sourcedIdSchema,
  /**  */
  status: ORStatusType,
  /** The date that this record was last modified. */
  dateLastModified: ORDateTime,
  /** SourcedId of an AcademicSession with type of "schoolYear". */
  schoolYearSourcedId: sourcedIdSchema.nullish(),
  /** Name of the course. */
  title: z.string(),
  /** Human readable course code. */
  courseCode: z.string().nullish(),
  /** Grade(s) for which the class is attended. The permitted vocabulary is from CEDS (Version 5) for the 'Entry Grade Level' element */
  grades: createCsvArrayCodec(ORGrade).nullish(),
  /** SourcedId of an org to which this course belongs. */
  orgSourcedId: sourcedIdSchema,
  /**
   * Subject name(s) in human readable form. If the 'subjectCodes' attribute is present then the subjects and subjectCodes lists must have the same length and have order significance
   *
   * The vocabulary is from SCED (School Codes for the Exchange of Data) (Version 4) for the "Course Title" field:  http://nces.ed.gov/forum/SCED.asp
   *
   * If the value of the "Course Title" contains commas, then those commas must be removed.
   * For example the "Course Title" for "SCED Course Code" "03210" is "Science, Technology and Society". This must be represented as "Science Technology and Society".
   *
   */
  subjects: createCsvArrayCodec(z.string()).nullish(),
  /**
   * Subject codes(s) in machine readable form. If the 'subjects' attribute is present then the subjects and subjectCodes lists must have the same length and have order significance.
   *
   * For deployments in the USA this vocabulary SHOULD be a School Courses for the Exchange of Data (SCED) code: http://nces.ed.gov/forum/SCED.asp.
   */
  subjectCodes: z.string().nullish(),
});
