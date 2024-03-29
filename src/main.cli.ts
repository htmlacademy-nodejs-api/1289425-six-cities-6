#!/usr/bin/env node
import {CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand} from './cli/index.ts';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cliApplication.processCommand(process.argv);
}

console.log('Start cli');
bootstrap();
