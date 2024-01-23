#!/usr/bin/env node
import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.ts';

function bootstrap() {
  console.log('Start cli');
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
