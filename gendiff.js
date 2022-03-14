import { program } from 'commander';
import makeFormatter from './formatters/index.js';
import diff from './diff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action(({ format }, { args }) => {
    console.log(makeFormatter(format)(diff(...args)));
  });

program.parse();
