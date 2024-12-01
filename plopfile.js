import path from 'path';
import fs from 'fs';

export default function (plop) {
  plop.setGenerator('Page', {
    description: 'Generate a new React page with MUI styling',
    prompts: [
      {
        type: 'list',
        name: 'name',
        message: 'Select the page you want to generate:',
        choices: [
          'Home',
          'About',
          'Contact',
          'Services',
          'Pricing',
          'Careers',
          'Error',
          'Custom',
        ],
      },
    ],
    actions: (data) => {
      const actions = [];
      const pageName = data.name;
      const seoFilePath = 'src/components/Seo.js';

      let templateFile;

      if (pageName === 'Custom') {
        templateFile = 'Page.js.hbs';
      } else {
        templateFile = `${pageName}Page.js.hbs`;
      }

      actions.push({
        type: 'add',
        path: `src/pages/{{pascalCase name}}Page.js`,
        templateFile: path.resolve(`templates/${templateFile}`),
      });

      if (!fs.existsSync(seoFilePath)) {
        actions.push({
          type: 'add',
          path: seoFilePath,
          templateFile: path.resolve('templates/Seo.js.hbs'),
        });
      }

      return actions;
    },
  });
}