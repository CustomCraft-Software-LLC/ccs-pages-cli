import path from 'path';

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
      const pageName = data.name;
      let templateFile;

      if (pageName === 'Custom') {
        templateFile = 'Page.js.hbs';
      } else {
        templateFile = `${pageName}Page.js.hbs`;
      }

      return [
        {
          type: 'add',
          path: `src/pages/{{pascalCase name}}Page.js`,
          templateFile: path.resolve(`templates/${templateFile}`),
        },
      ];
    },
  });
}