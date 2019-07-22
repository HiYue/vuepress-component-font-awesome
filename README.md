# Font Awesome component for Vuepress

This plugin allows you to use Font Awesome icons in Vuepress markdown file directly. 

```markdown
<!-- Insert a address book icon, red colour, 3x large size -->
<Fa-AddressBook color="red" size="3x" />
```

## Install
- Step 1: Install dependency
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

> If in your project, you root folder is in other place, for example: 'docs', then pass the `dest` option:
```bash
yarn fa:build --dest=docs
```

The plugin will put the font awesome components in right place, which is `.vuepress/components/Fa`.

## Use Font Awesome in your markdown

In any of your markdown file, simply add:
```markdown
<Fa-AddressBook />
```

Add props to icon:
```markdown
<Fa-AddressBook color="red" size="3x" />
```

**Here below are props you could pass:**

- color: String, Color Hex Code
- size: String, Font Awesome size class: 'lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'
- pull: String, left/right
- rotation: [String, Number], degrees such as 90/180/270
- flip: String, such as 'horizontal', 'vertical', 'both'
- spin: true/false
- pulse: true/false
- border: true/false
