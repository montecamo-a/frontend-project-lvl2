#!/usr/bin/env node

const { program } = require("commander");

program
  .description("Compares two configuration files and shows a difference.")
  .option("-V, --version", "output the version number");

program.parse();