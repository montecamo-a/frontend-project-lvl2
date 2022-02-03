#!/usr/bin/env node
import { Command } from 'commander';
import { gendiff } from '../src/gendiff2.js';
import getValue from '../src/parser.js';

const program = new Command();
program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    const valueFile1 = getValue(file1);
    const valueFile2 = getValue(file2);
    console.log(gendiff(valueFile1, valueFile1));
    return gendiff(valueFile1, valueFile2);
  });
program.parse();
