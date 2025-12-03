/**
 users.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORUser } from '@pkg/v1.1/users';
import { faker } from '@faker-js/faker';
import { ORGrade, ORRoleType } from '@pkg/v1.1/enumerations';
import { generateORDate } from '../common';
import { RequiredInput } from '@pkg/common';
type NormalizeOptional<T> = {
	[K in keyof T]-?: undefined extends T[K] ? T[K] : T[K];
};
type GenerateUserRequired = {
	orgSourcedId: string;
	orgDomain?: string;
	allowedGrades?: ORGrade[];
};
export const generateUser = (
	required: GenerateUserRequired,
	initial?: Partial<ORUser>
): NormalizeOptional<ORUser> => {
	const givenName = initial?.givenName ?? faker.person.firstName();
	const familyName = initial?.familyName ?? faker.person.lastName();
	const middleName = initial?.middleName ?? faker.person.middleName();

	const grades =
		(initial?.grades ?? required.allowedGrades)
			? faker.helpers.arrayElement([required.allowedGrades])
			: [];
	const phone = faker.phone.number({ style: 'international' });

	return {
		...initial,
		sourcedId: initial?.sourcedId ?? faker.string.uuid(),
		status: initial?.status ?? 'active',
		dateLastModified: initial?.dateLastModified ?? generateORDate(),
		enabledUser: initial?.enabledUser ?? 'true',
		orgSourcedId: required.orgSourcedId,
		role: initial?.role ?? faker.helpers.arrayElement([...ORRoleType.options]),
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
		password: initial?.password ?? null
	};
};

const generateUserEmail = (options: {
	givenName: string;
	familyName: string;
	orgDomain?: string;
}) => {
	const emailDomain = options.orgDomain ?? '@test.com';

	return options.givenName + options.familyName + emailDomain;
};
