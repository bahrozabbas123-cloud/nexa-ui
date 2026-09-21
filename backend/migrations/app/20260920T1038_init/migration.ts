#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2230a1f9cc3fb4e9f568e7aaf25d0cd337ec5c0709b5ac66cb3d37a39aac9984/contract';
import endContract from '../../snapshots/2230a1f9cc3fb4e9f568e7aaf25d0cd337ec5c0709b5ac66cb3d37a39aac9984/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
