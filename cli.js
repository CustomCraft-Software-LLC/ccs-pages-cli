import { Command } from 'commander';
import { nodePlop } from 'plop';
import path from 'path';

const program = new Command();

program
  .name('react-pages-cli')
  .description('CLI tool for generating React pages with MUI styling')
  .version('1.0.0', '-v, --version', 'Output the current version');

program
  .command('generate')
  .description('Generate a new React page with MUI styling')
  .action(async () => {
    try {
      const plopInstance = nodePlop(path.resolve('./plopfile.js'));
      const generator = plopInstance.getGenerator('Page');

      await generator.runActions({});
      console.log(`Page generated successfully!`);
    } catch (err) {
      console.error('Error generating page:', err.message);
    }
  });

program
  .helpOption('-h, --help', 'Display help for command');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}