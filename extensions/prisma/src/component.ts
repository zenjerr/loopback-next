// Copyright IBM Corp. 2021. All Rights Reserved.
// Node module: @loopback/prisma
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Application,
  BindingScope,
  Component,
  config,
  ContextTags,
  CoreBindings,
  createBindingFromClass,
  inject,
  injectable,
  lifeCycleObserver,
  LifeCycleObserver,
} from '@loopback/core';
import {PrismaClient} from '@prisma/client';
import {PrismaBindings as PrismaBindings} from './keys';
import {
  DEFAULT_PRISMA_COMPONENT_OPTIONS,
  PrismaComponentOptions,
} from './types';

/**
 * The component used to register the necessary artifacts for Prisma integration
 * with LoopBack 4.
 *
 * @decorator - `@injectable({tags: {[ContextTags.KEY]: PrismaBindings.COMPONENT}})
 * @decorator '@lifecycleObserver('datasource')`
 */
@injectable({
  tags: {[ContextTags.KEY]: PrismaBindings.COMPONENT},
})
@lifeCycleObserver('datasource')
export class PrismaComponent implements Component, LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @inject(PrismaBindings.PRISMA_CLIENT_INSTANCE, {optional: true})
    private prismaClient?: PrismaClient,
    @config()
    private options: PrismaComponentOptions = DEFAULT_PRISMA_COMPONENT_OPTIONS,
  ) {
    if (
      this.prismaClient &&
      this.application.getBinding(PrismaBindings.PRISMA_CLIENT_INSTANCE)
        .scope !== BindingScope.SINGLETON
    ) {
      throw new Error(
        'A non-singleton instance of the Prisma Client was detected! This is not an approved configuration.',
      );
    }
  }

  async init() {
    if (!this.prismaClient) this.prismaClient = new PrismaClient();
    else return;

    this.application.add(
      createBindingFromClass(this.prismaClient, {
        key: PrismaBindings.PRISMA_CLIENT_INSTANCE,
        defaultScope: BindingScope.SINGLETON,
      }),
    );
  }

  async start() {
    const {lazyConnect, ...options} = this.options;
    if (lazyConnect) return;
    await this.prismaClient.$connect(options);
  }

  async stop() {
    await this.prismaClient.$disconnect();
  }
}
