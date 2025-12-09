/**
 families.ts
 oneroster-ts
 
 Created by Ian Thompson on December 3rd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { faker } from "@faker-js/faker";
import { generateParent, generateStudent } from "./userByRoles";

type FamilyOptions = {
  orgSourcedId: string;
  numberOfChildren: number;
  numberOfParents: number;
  orgDomain?: string;
};

export const generateFamily = (options: FamilyOptions) => {
  const familyName = faker.person.lastName();

  const parents = [];
  const students = [];

  for (let index = 0; index < options.numberOfParents; index++) {
    parents.push(
      generateParent(
        {},
        {
          familyName,
          orgSourcedId: options.orgSourcedId,
        },
      ),
    );
  }

  for (let index = 0; index < options.numberOfChildren; index++) {
    students.push(
      generateStudent(
        {
          orgDomain: options.orgDomain,
        },
        {
          familyName,
          orgSourcedId: options.orgSourcedId,
          agentSourcedIds: parents.map((p) => p.sourcedId),
        },
      ),
    );
  }

  return [...parents, ...students];
};
