#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/gendiff2.js';
import parser from '../src/parser.js';
import stylish from '../src/stylish.js';

const program = new Command();
program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', stylish, stylish)
  .helpOption('-h, --help', 'output usage information')
  .argument('<value1>', 'FirstFile', parser)
  .argument('<value2>', 'SecondFile', parser)
  .action((value1, value2, options) => {
    const treeDiff = gendiff(value1, value2);
    console.log(options.format(treeDiff));
    return options.format(treeDiff);
  });
program.parse();
