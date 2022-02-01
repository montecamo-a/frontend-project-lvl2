#!/usr/bin/env node
import { Command } from 'commander';
import getDiff from '../src/comparison.js';
import getValue from '../src/getValue.js';
const program  = new Command();
program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    const [valueFromFile1, valueFromFile2] = [getValue(file1), getValue(file2)];
    return console.log(getDiff(valueFromFile1, valueFromFile2));
  });
program.parse();