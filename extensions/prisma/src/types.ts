// Copyright IBM Corp. 2021. All Rights Reserved.
// Node module: @loopback/prisma
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/**
 * Interface defining the options accepted by {@link ./component/PrismaComponent}.
 */
export interface PrismaComponentOptions {
  // Add the definitions here
  lazyConnect: boolean;
  [key: string]: unknown;
}

/**
 * The default options used by {@link PrismaComponent}.
 */
export const DEFAULT_PRISMA_COMPONENT_OPTIONS: PrismaComponentOptions = {
  lazyConnect: false,
};
