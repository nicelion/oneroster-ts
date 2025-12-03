/**
 common.ts
 one-roster
 
 Created by Ian Thompson on December 2nd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { faker } from "@faker-js/faker";

export type NormalizeOptional<T> = {
  [K in keyof T]-?: undefined extends T[K] ? T[K] : T[K];
};

export const generateORDate = () => faker.date.recent().toISOString();
