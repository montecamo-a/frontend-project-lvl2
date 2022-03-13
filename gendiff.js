import { program } from 'commander';
import diff from './diff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((_, { args }) => {
    console.log(diff(...args));
  });

program.parse();
