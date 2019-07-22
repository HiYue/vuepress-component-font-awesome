# Font Awesome component for Vuepress

This plugin allows you to use Font Awesome icons in Vuepress markdown file directly. 

``` markdown
<!-- Insert a address book icon, red colour, 3x large size -->
<Fa-AddressBook color="red" size="3x" />
```

## Install
- Step 1: Install dependency
```bash
npm i vuepress-plugin-font-awesome
```
**OR**
```bash
yarn add vuepress-plugin-font-awesome
```
- Step 2: Create a shortcut script, please add following codes  in your `package.json` file
```json
  "scripts": {
    "fa:build": "node node_modules/vuepress-plugin-font-awesome/index.js"
  }
```

## Generate Font Awesome components

> Simply run following command:
```bash
yarn fa:build
```

## Use Font Awesome in your markdown

In any of your markdown file, simply add:
```markdown
<Fa-AddressBook />
```

Add a red and 3x large icon:
```markdown
<Fa-AddressBook color="red" size="3x" />
```