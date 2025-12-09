/**
 index.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { faker } from "@faker-js/faker";
import { generateOrg } from "@pkg/generators/v1.1/base/orgs";
import {
  generateUser,
  generateUsersForSchoolByStudentCount,
} from "@pkg/generators/v1.1/base/users";
import { generateFamily } from "@pkg/generators/v1.1/utility/users/families";
import {
  generateAdministrator,
  generateParent,
  generateStudent,
  generateTeacher,
} from "@pkg/generators/v1.1/utility/users/userByRoles";
import { OROrg } from "@pkg/v1.1/orgs";
import { ORUser } from "@pkg/v1.1/users";
import z from "zod";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { OrgCsvHeaders, UsersCsvHeaders } from "@pkg/generators/v1.1/csv-headers";

// const UserJson: ORUser = {
// 	sourcedId: 'sdlkfmslk-lsrmf',
// 	status: 'active',
// 	dateLastModified: '2025-12-01T19:34:15.123Z',
// 	enabledUser: 'true',
// 	orgSourcedId: 'klmdflkmdlkfm',
// 	role: 'student',
// 	username: 'ianthompson',
// 	userIds: ['skdlfs49349'],
// 	givenName: 'Ian',
// 	familyName: 'Thompson',
// 	grades: ['01', '08']
// };

// const UserJsonValidated = ORUser.safeEncode(UserJson);

// const UserCsv: ORUser<'csv'> = {
// 	sourcedId: 'sdlkfmslk-lsrmf',
// 	status: 'active',
// 	dateLastModified: '2025-12-01T19:34:15.123Z',
// 	enabledUser: 'true',
// 	orgSourcedId: 'klmdflkmdlkfm',
// 	role: 'student',
// 	username: 'ianthompson',
// 	userIds: 'skdlfs49349',
// 	givenName: 'Ian',
// 	familyName: 'Thompson',
// 	grades: '"01,08"'
// };

// const UserCsvValidated = ORUser.safeDecode(UserCsv);

// console.log({ UserJsonValidated, UserCsvValidated });

// const generatedUser = generateUser({
//   orgSourcedId: "sldlkmfl",
//   allowedGrades: ["01", "03"],
// });
// const encoded = ORUser.encode(generatedUser);
// const decoded = ORUser.decode(encoded);

// console.log({ generatedUser, encoded, decoded });

// const generatedOrg = generateOrg(
//   { level: "high" },
//   {
//     parentSourcedId: ["helsd;d"],
//     "metadata.state": "SC",
//     name: "T.L. Hanna High School",
//     "metadata.city": "Anderson",
//     "metadata.county": "Anderson",
//   },
// );

// const parent = generateParent(
//   {},
//   {
//     orgSourcedId: generatedOrg.sourcedId,
//   },
// );
// const generatedStudent = generateStudent(
//   {
//     orgDomain: "@school.com",
//   },
//   {
//     agentSourcedIds: [parent.sourcedId],
//     orgSourcedId: generatedOrg.sourcedId,
//   },
// );

// const family = generateFamily({
//   orgSourcedId: generatedOrg.sourcedId,
//   numberOfChildren: 2,
//   numberOfParents: 2,
// });

// const administrator = generateAdministrator({}, { orgSourcedId: generatedOrg.sourcedId });
// const users = [...family, administrator];

// console.log({ generatedOrg, users });

// const serializeORUsersForCSV = (users: ORUser[]) => {
//   //   const temp = [];

//   //   users.forEach((user) => {
//   //     const validated = ORUser.safeEncode(user).data;
//   //     if (validated) {
//   //       temp.push(validated);
//   //     }
//   //   });

//   //   return temp as ORUser<"csv">[];

//   return z.array(ORUser).safeEncode(users);
// };

// console.log(serializeORUsersForCSV(users));
// // console.log(data, error);
const district = generateOrg(
  {},
  {
    type: "district",
    name: "Greenville County Schools",
    "metadata.city": "Greenville",
    "metadata.county": "Greenville",
    "metadata.state": "SC",
  },
);

const school = generateOrg(
  { level: "high" },
  {
    name: "JL Mann High School",
    "metadata.county": "Greenville",
    "metadata.city": "Greenville",
    "metadata.state": "SC",
    type: "school",
    parentSourcedId: [district.sourcedId],
  },
);

const ORG_DOMAIN = "@mann.com";
const NUM_OF_TEACHERS = 0;
const NUM_OF_STUDENTS = 5;
const NUM_OF_ADMINS = 0;

// const admins = Array.from({ length: NUM_OF_ADMINS }).map((i) =>
//   generateAdministrator(
//     { orgDomain: ORG_DOMAIN },
//     {
//       orgSourcedId: school.sourcedId,
//     },
//   ),
// );

// const students = Array.from({ length: NUM_OF_STUDENTS }).map((i) =>
//   generateStudent(
//     {
//       allowedGrades: ["09", "10", "11", "12"],
//       orgDomain: ORG_DOMAIN,
//     },
//     {
//       orgSourcedId: school.sourcedId,
//     },
//   ),
// );

// const teachers = Array.from({ length: NUM_OF_TEACHERS }).map((i) =>
//   generateTeacher(
//     {
//       orgDomain: ORG_DOMAIN,
//     },
//     {
//       orgSourcedId: school.sourcedId,
//     },
//   ),
// );

// const { data: orgs } = z.array(OROrg).safeEncode([school, district]);
// const { data: users } = z.array(ORUser).safeEncode([...students, ...admins, ...teachers]);

// console.log({ orgs, users });

// createCsvWriter({
//   header: OrgCsvHeaders,
//   path: "./outputs/test-1/orgs.csv",
// }).writeRecords([...orgs!]);

// createCsvWriter({
//   header: UsersCsvHeaders,
//   path: "./outputs/test-1/users.csv",
// }).writeRecords([...users!]);

const fam = generateUsersForSchoolByStudentCount({
  allowedGrades: ["09", "10", "11", "12"],
  maxParents: 2,
  maxSiblings: 5,
  totalStudents: 43_439,
});

const decode = z.array(ORUser).encode(fam);
console.log({ decode, length: fam.length });
