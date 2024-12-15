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
  .version('1.0.5');

program
  .command('generate')
  .description('Generate a new React page')
  .action(async () => {
    try {
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

      const pageTemplatePath = path.resolve(__dirname, '../templates', `${pageName}.js.hbs`);
      const seoTemplatePath = path.resolve(__dirname, '../templates', 'Seo.js.hbs');

      if (!fs.existsSync(pageTemplatePath)) {
        console.error(`❌ Template for page "${pageName}" not found at ${pageTemplatePath}`);
        return;
      }

      const pageTemplateContent = fs.readFileSync(pageTemplatePath, 'utf-8');
      const pageTemplate = Handlebars.compile(pageTemplateContent);

      const seoOutput = Handlebars.compile(fs.readFileSync(seoTemplatePath, 'utf-8'))({
        title: `${pageName} Page`,
        description: `This is the ${pageName} page.`,
      });

      const output = pageTemplate({
        name: pageName,
        seo: seoOutput,
      });

      const outputPath = path.resolve(__dirname, '../src/pages', `${pageName}.js`);
      fs.writeFileSync(outputPath, output);

      const seoOutputPath = path.resolve(__dirname, '../src/components', 'Seo.js');
      if (!fs.existsSync(seoOutputPath)) {
        const seoTemplateContent = fs.readFileSync(seoTemplatePath, 'utf-8');
        const seoOutput = Handlebars.compile(seoTemplateContent)({
          title: `${pageName} Page`,
          description: `This is the ${pageName} page.`,
        });
        fs.writeFileSync(seoOutputPath, seoOutput);
        console.log(`✅ Seo component generated at ${seoOutputPath}`);
      }

      console.log(`\n✅ Page "${pageName}" generated successfully at ${outputPath}`);
    } catch (error) {
      console.error('❌ Failed to generate page:', error.message);
    }
  });

program.parse(process.argv);