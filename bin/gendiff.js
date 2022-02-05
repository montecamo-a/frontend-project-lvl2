#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/gendiff2.js';
import stylish from '../src/stylish.js';

const program = new Command();
program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', stylish, stylish)
  .helpOption('-h, --help', 'output usage information')
  .argument('<filePath1>', 'Path To First File')
  .argument('<filePath2>', 'Path To Second File')
  .action((filePath1, filePath2, options) => {
    const resultOfGenDiff = gendiff(filePath1, filePath2, options.format);
    console.log(resultOfGenDiff);
    return resultOfGenDiff;
  });
program.parse();
