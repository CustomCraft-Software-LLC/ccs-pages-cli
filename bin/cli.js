#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('ccs-pages-cli')
  .description('Generate React pages with MUI styling')
  .version('1.0.6');

program
  .command('generate')
  .description('Generate a new React page')
  .action(async () => {
    const { pageName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'pageName',
        message: 'Select the page you want to generate:',
        choices: [
          'HomePage',
          'AboutPage',
          'ContactPage',
          'ServicesPage',
          'PricingPage',
          'CareersPage',
          'ErrorPage',
          'Page',
        ],
      },
    ]);

    const cwd = process.cwd();
    const pageTemplatePath = path.resolve(__dirname, '../templates', `${pageName}.js.hbs`);
    const seoTemplatePath = path.resolve(__dirname, '../templates', 'Seo.js.hbs');

    if (!fs.existsSync(pageTemplatePath)) {
      console.error(`Template for page "${pageName}" not found.`);
      return;
    }

    const pageTemplate = Handlebars.compile(fs.readFileSync(pageTemplatePath, 'utf-8'));
    const seoTemplate = Handlebars.compile(fs.readFileSync(seoTemplatePath, 'utf-8'));
    const seoOutput = seoTemplate({ title: `${pageName} Page`, description: `This is the ${pageName} page.` });

    const pageOutput = pageTemplate({ name: pageName, seo: seoOutput });
    const pageOutputPath = path.resolve(cwd, 'src/pages', `${pageName}.js`);
    const seoOutputPath = path.resolve(cwd, 'src/components', 'Seo.js');

    fs.mkdirSync(path.dirname(pageOutputPath), { recursive: true });
    fs.writeFileSync(pageOutputPath, pageOutput);

    if (!fs.existsSync(seoOutputPath)) {
      fs.mkdirSync(path.dirname(seoOutputPath), { recursive: true });
      fs.writeFileSync(seoOutputPath, seoTemplate({ title: `${pageName} Page`, description: `This is the ${pageName} page.` }));
      console.log(`Seo component generated at ${seoOutputPath}`);
    }

    console.log(`Page "${pageName}" generated successfully at ${pageOutputPath}`);
  });

program.parse(process.argv);