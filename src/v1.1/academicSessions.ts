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

import { z } from "zod/v4";
import { ORSessionType, ORStatusType } from "./enumerations";
import { ORDateTime, parentSourcedIdSchema } from "../common";

/**
 * Academic Sessions represent time segments of your school year (e.g., semesters, terms, marking periods).
 *
 * Generally, the file starts with a school year divided into terms. Although the IMS specification does allow for other units like a semester, a term is what classes are assigned to, so it is the basic unit. You can, however, make a term and call it Semester 2 if you choose.
 */
export const ORAcademicSession = z.object({
  /** SourcedId of this academicSession. */
  sourcedId: z.string(),
  /**  */
  status: ORStatusType,
  /** The date that this record was last modified. */
  dateLastModified: ORDateTime,
  /** Name or title of the academic session. */
  title: z.string(),
  /**  */
  type: ORSessionType,
  /** Inclusive start date for the academic session. */
  startDate: ORDateTime,
  /** Exclusive end date for the academic session. */
  endDate: ORDateTime,
  /** SourcedId of the parent of this academic session. */
  parentSourcedId: parentSourcedIdSchema,
  /** The school year for which the academic session contributes. This year should be that in which the school year ends. */
  schoolYear: z.string(),
});

export type ORAcademicSession<TMode extends "default" | "csv" = "default"> = TMode extends "default"
  ? z.infer<typeof ORAcademicSession>
  : z.input<typeof ORAcademicSession>;
