import {PrismaClient} from '.prisma/client';
import {Application, createBindingFromClass} from '@loopback/core';
import {expect} from '@loopback/testlab';
import {PrismaBindings, PrismaComponent} from '../..';

describe('Prisma Component', () => {
  it("throws an error when Prisma Client isn't initialized", () => {
    const app = new Application();
    const component = new PrismaComponent(app);
    expect(component.init).to.throw();
  });

  it("throws an error when an existing Prisma Client isn't bound as a singleton.", () => {
    const app = new Application();
    app.bind(PrismaBindings.PRISMA_CLIENT_INSTANCE).to(new PrismaClient());
    app.add(
      createBindingFromClass(PrismaComponent, {
        defaultNamespace: 'components',
      }),
    );
  });
});
