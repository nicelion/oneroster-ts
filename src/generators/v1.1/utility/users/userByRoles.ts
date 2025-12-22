/**
 students.ts
 oneroster-ts
 
 Created by Ian Thompson on December 3rd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORUser } from "../../../../v1.1/users";
import { GenerateUserRequired } from "../../types";
import { generateUser } from "../../base/users";

export const generateStudent = (options: GenerateUserRequired, params: Partial<ORUser>) => {
  return generateUser(options, {
    ...params,
    role: "student",
  });
};

export const generateParent = (options: GenerateUserRequired, params: Partial<ORUser>) => {
  return generateUser(options, {
    ...params,
    role: "parent",
    grades: [],
  });
};

export const generateAdministrator = (options: GenerateUserRequired, params: Partial<ORUser>) => {
  return generateUser(options, {
    ...params,
    role: "administrator",
    grades: [],
  });
};

export const generateTeacher = (options: GenerateUserRequired, params: Partial<ORUser>) => {
  return generateUser(options, {
    ...params,
    role: "teacher",
    grades: [],
  });
};
