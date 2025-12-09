/**
 types.ts
 oneroster-ts
 
 Created by Ian Thompson on December 3rd 2025
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2025 Nice Lion Technologies LLC. All Rights Reserved.
 
*/

import { ORGrade } from "@pkg/v1.1/enumerations";

export type GenerateUserRequired = {
  orgDomain?: string;
  allowedGrades?: ORGrade[];
};
