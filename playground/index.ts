/**
 index.ts
 one-roster
 
 Created by Ian Thompson on December 1st 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { generateOrg } from "@pkg/generators/v1.1/orgs";
import { generateUser } from "@pkg/generators/v1.1/users";
import { ORUser } from "@pkg/v1.1/users";

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

const generatedUser = generateUser({
  orgSourcedId: "sldlkmfl",
  allowedGrades: ["01", "03"],
});
const encoded = ORUser.encode(generatedUser);
const decoded = ORUser.decode(encoded);

console.log({ generatedUser, encoded, decoded });

const generatedOrg = generateOrg(
  { level: "high" },
  { parentSourcedId: ["helsd;d"], "metadata.state": "SC" },
);

console.log(generatedOrg);
