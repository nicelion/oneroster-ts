/**
 orgs.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { OROrg } from "@pkg/v1.1/orgs";
import { generateORDate, NormalizeOptional } from "../../common";
import { faker } from "@faker-js/faker";
import { OROrgType } from "@pkg/v1.1/enumerations";
import {
  BaseSchoolSuffixes,
  DistrictSuffixes,
  ElementarySchoolSuffixes,
  HighSchoolSuffixes,
  MiddleSchoolSuffixes,
  SchoolLevel,
} from "../../orgSuffixes";
import { capitalize } from "../../utils";

type OrgOptions = {
  level?: "elementary" | "middle" | "high";
};

export type OrgWithMetadata = OROrg & {
  "metadata.city": string;
  "metadata.state": string;
  "metadata.county": string;
  "metadata.street": string;
  "metadata.zip": string;
};

export const generateOrg = (
  options: OrgOptions,
  initial?: Partial<OrgWithMetadata>,
): NormalizeOptional<OrgWithMetadata> => {
  const city = initial?.["metadata.city"] ?? faker.location.city();
  const county = initial?.["metadata.county"] ?? faker.location.county();
  const state = initial?.["metadata.state"] ?? faker.location.state({ abbreviated: true });
  const street = initial?.["metadata.street"] ?? faker.location.streetAddress();
  const zip = initial?.["metadata.zip"] ?? faker.location.zipCode();

  const name =
    initial?.name ??
    generateOrgName({
      type: initial?.type ?? "school",
      level: options?.level ?? "high",
      city,
      county,
    });

  return {
    ...initial,
    sourcedId: faker.string.uuid(),
    status: initial?.status ?? "active",
    dateLastModified: initial?.dateLastModified ?? generateORDate(),
    name,
    type: initial?.type ?? "school",
    parentSourcedId: initial?.parentSourcedId ?? [],
    identifier: initial?.identifier ?? null,
    "metadata.city": city,
    "metadata.state": state,
    "metadata.county": county,
    "metadata.street": street,
    "metadata.zip": zip,
  };
};

const generateOrgName = (opts: {
  type: OROrgType;
  level?: (typeof SchoolLevel)[number];
  city: string;
  county: string;
}) => {
  if (opts.type == "district") {
    return `${faker.helpers.arrayElement([opts.city, opts.county])} ${faker.helpers.arrayElement(DistrictSuffixes)}`;
  }

  if (opts.type == "school") {
    const suffixes = [...BaseSchoolSuffixes];
    switch (opts.level) {
      case "elementary":
        suffixes.push(...ElementarySchoolSuffixes);
        break;
      case "high":
        suffixes.push(...HighSchoolSuffixes);
        break;
      case "middle":
        suffixes.push(...MiddleSchoolSuffixes);
        break;
      default:
        break;
    }
    const base = faker.helpers.arrayElement([
      faker.location.city(),
      `${faker.person.firstName()} ${faker.person.lastName()}`,
      capitalize(faker.word.noun()),
    ]);

    return `${base} ${faker.helpers.arrayElement(suffixes)}`;
  }

  return "Error Generating Name";
};
