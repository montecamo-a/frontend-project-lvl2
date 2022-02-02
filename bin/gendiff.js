#!/usr/bin/env node
import { Command } from 'commander';
import comparisonFlatFiles from '../src/comparison.js';

const program = new Command();
program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    console.log(genDiffFlatFiles(file1, file2));
    return genDiffFlatFiles(file1, file2);
  });
program.parse();
