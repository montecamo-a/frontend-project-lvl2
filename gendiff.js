#!/usr/bin/env node

import fs from 'fs';

import { program } from 'commander';
import diffJSON from './diffJSON.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((namwarne, { args }, command) => {
    console.log(
      diffJSON(
        JSON.parse(fs.readFileSync(args[0])),
        JSON.parse(fs.readFileSync(args[1]))
      )
    );
  });

program.parse();
