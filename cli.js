import { Command } from 'commander';
import { nodePlop } from 'plop';
import path from 'path';

const program = new Command();

program
  .name('react-pages-cli')
  .description('CLI tool for generating React pages with MUI styling')
  .version('1.0.2', '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Display help for command');

program
  .command('generate')
  .description('Generate a new React page with MUI styling')
  .action(async () => {
    const plopInstance = nodePlop(path.resolve('./plopfile.js'));
    const generator = plopInstance.getGenerator('Page');
    await generator.runActions({});
    console.log('Page generated successfully!');
  });

program.on('--help', () => {
  console.log('');
  console.log('Examples:');
  console.log('  $ react-pages-cli generate');
  console.log('  $ react-pages-cli -v');
  console.log('  $ react-pages-cli --help');
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}