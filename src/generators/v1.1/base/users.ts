/**
 users.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORUser } from "@pkg/v1.1/users";
import { faker } from "@faker-js/faker";
import { ORGrade, ORRoleType } from "@pkg/v1.1/enumerations";
import { generateORDate, NormalizeOptional } from "../../common";
import { RequiredInput } from "@pkg/common";
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

const generateUserEmail = (options: {
  givenName: string;
  familyName: string;
  orgDomain?: string;
}) => {
  const emailDomain = options.orgDomain ?? "@test.com";

  return options.givenName + options.familyName + emailDomain;
};
