/**
 users.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORUser } from "../../../v1.1/users";
import { faker } from "@faker-js/faker";
import { ORGrade, ORRoleType } from "../../../v1.1/enumerations";
import { generateORDate, NormalizeOptional } from "../../common";
import { RequiredInput } from "../../../common";
import { GenerateUserRequired } from "../types";

export const generateUser = (
  required: GenerateUserRequired,
  initial?: Partial<ORUser>,
): NormalizeOptional<ORUser> => {
  const givenName = initial?.givenName ?? faker.person.firstName();
  const familyName = initial?.familyName ?? faker.person.lastName();
  const middleName = initial?.middleName ?? faker.person.middleName();

  let grades = [];

  // (initial?.grades ?? required.allowedGrades)
  // ? faker.helpers.arrayElement([required.allowedGrades])
  // : [];

  if (!initial?.grades) {
    grades.push(faker.helpers.arrayElement(required.allowedGrades ?? ["09"]));
  }
  const phone = faker.phone.number({ style: "international" });

  let role = initial?.role ?? faker.helpers.arrayElement([...ORRoleType.options]);

  // Only students should have grades.
  if (role !== "student") {
    grades = [];
  }

  return {
    ...initial,
    sourcedId: initial?.sourcedId ?? faker.string.uuid(),
    status: initial?.status ?? "active",
    dateLastModified: initial?.dateLastModified ?? generateORDate(),
    enabledUser: initial?.enabledUser ?? "true",
    orgSourcedId: initial?.orgSourcedId ?? faker.string.uuid(),
    role,
    username: givenName + familyName,
    userIds: [],
    givenName,
    familyName,
    middleName,
    grades: grades ?? [],
    identifier: null,
    email: generateUserEmail({ familyName, givenName, orgDomain: required.orgDomain }),
    sms: phone,
    phone: phone,
    agentSourcedIds: initial?.agentSourcedIds ?? [],
    password: initial?.password ?? null,
  };
};

const normalizeEmailPart = (value: string) => {
  return value
    .normalize("NFKD") // 1. split accented characters
    .replace(/[\u0300-\u036f]/g, "") // 2. remove diacritics
    .toLowerCase()
    .replace(/['"]/g, "") // 3. remove apostrophes & quotes
    .replace(/\s+/g, ".") // 4. spaces → dots
    .replace(/[^a-z0-9._-]/g, "") // 5. remove all other junk
    .replace(/\.{2,}/g, ".") // 6. collapse multiple dots
    .replace(/^\.+|\.+$/g, ""); // 7. trim leading/trailing dots
};

export const generateUserEmail = (options: {
  givenName: string;
  familyName: string;
  orgDomain?: string;
}) => {
  const emailDomain = options.orgDomain ?? "@test.com";

  const given = normalizeEmailPart(options.givenName);
  const family = normalizeEmailPart(options.familyName);

  const local =
    given && family
      ? `${given}.${family}`
      : given || family || faker.internet.username().toLowerCase();

  return `${local}${emailDomain}`;
};
export interface GenerateFamilyOptions extends GenerateUserRequired {
  /** Min number of siblings (students) in this family (used if siblingCount not provided) */
  minSiblings?: number;
  /** Max number of siblings (students) in this family (used if siblingCount not provided) */
  maxSiblings?: number;
  /** Min number of parents in this family */
  minParents?: number;
  /** Max number of parents in this family */
  maxParents?: number;
  /** Optional fixed familyName (otherwise faker-generated) */
  familyName?: string;
  /** If provided, this exact number of siblings will be generated */
  siblingCount?: number;
}

export interface GeneratedFamily {
  familyName: string;
  parents: NormalizeOptional<ORUser>[];
  students: NormalizeOptional<ORUser>[];
  allUsers: NormalizeOptional<ORUser>[];
}

export const generateFamily = (options: GenerateFamilyOptions): GeneratedFamily => {
  const {
    minSiblings = 0,
    maxSiblings = 4,
    minParents = 0,
    maxParents = 2,
    familyName: initialFamilyName,
    siblingCount: forcedSiblingCount,
    ...required
  } = options;

  const familyName = initialFamilyName ?? faker.person.lastName();

  // ✅ Parents (0 allowed)
  const parentCount = maxParents === 0 ? 0 : safeRandomInt(minParents, maxParents);

  const parents: NormalizeOptional<ORUser>[] = Array.from({ length: parentCount }, () =>
    generateUser(required, {
      role: "parent",
      familyName,
      grades: [],
      agentSourcedIds: [],
    }),
  );

  const parentIds = parents.map((p) => p.sourcedId!).filter(Boolean);

  // ✅ Students / siblings (0 allowed)
  const siblingCount =
    forcedSiblingCount !== undefined
      ? forcedSiblingCount
      : maxSiblings === 0
        ? 0
        : safeRandomInt(minSiblings, maxSiblings);

  const students: NormalizeOptional<ORUser>[] = Array.from({ length: siblingCount }, () =>
    generateUser(required, {
      role: "student",
      familyName,
      agentSourcedIds: parentIds, // ✅ empty array if no parents
    }),
  );

  return {
    familyName,
    parents,
    students,
    allUsers: [...parents, ...students],
  };
};

const partitionStudentCountIntoFamilies = (
  totalStudents: number,
  minSiblings: number,
  maxSiblings: number,
): number[] => {
  if (totalStudents === 0) return [];

  // ✅ If siblings are completely disabled, we cannot place students
  if (maxSiblings === 0) {
    throw new Error("Cannot generate students when maxSiblings is 0");
  }

  const sizes: number[] = [];
  let remaining = totalStudents;

  while (remaining > 0) {
    const maxForThisFamily = Math.min(maxSiblings, remaining);
    const minForThisFamily = Math.min(minSiblings, maxForThisFamily);

    if (remaining <= maxSiblings) {
      sizes.push(remaining);
      break;
    }

    const size = safeRandomInt(minForThisFamily, maxForThisFamily);

    sizes.push(size);
    remaining -= size;
  }

  return sizes;
};

const safeRandomInt = (min: number, max: number) => {
  if (max < min) return min;
  return faker.number.int({ min, max });
};
export interface GenerateSchoolUsersOptions extends GenerateUserRequired {
  /** Total number of student users to generate for this school */
  totalStudents: number;

  /** Sibling bounds for families */
  minSiblings?: number;
  maxSiblings?: number;

  /** Parent bounds per family */
  minParents?: number;
  maxParents?: number;
}

/**
 * Generate users for a school starting from a target student count.
 *
 * - Partitions totalStudents into random family sizes
 * - For each family:
 *   - generates parents (role: "parent")
 *   - generates siblings (role: "student") with shared familyName
 *   - students.agentSourcedIds = parents' sourcedIds
 */
export const generateUsersForSchoolByStudentCount = (
  options: GenerateSchoolUsersOptions,
): NormalizeOptional<ORUser>[] => {
  const {
    totalStudents,
    minSiblings = 0,
    maxSiblings = 4,
    minParents = 0,
    maxParents = 2,
    ...required
  } = options;

  if (totalStudents > 0 && maxSiblings === 0) {
    throw new Error("totalStudents > 0 but maxSiblings is 0 — impossible configuration");
  }

  const familySizes = partitionStudentCountIntoFamilies(totalStudents, minSiblings, maxSiblings);

  const families = familySizes.map((size) =>
    generateFamily({
      ...required,
      minSiblings,
      maxSiblings,
      minParents,
      maxParents,
      siblingCount: size,
    }),
  );

  return families.flatMap((f) => f.allUsers);
};
