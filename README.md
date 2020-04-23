# alterest-todos

A meteorJS ToDo app built with React components for view layer.

## Installation

Provided meteorjs is installed already in your system, follow the below steps

```
        $ git clone https://github.com/ram95krishh/alterest-todos.git
        $ cd alterest-todos
        $ npm i
```

### Run in dev mode
```
        $ npm start
```

### Run in prod mode
```
        $ npm run prod
```
## Tests
- Mocha test framework is used with chai providing the assertion libraries. Run the tests with the following command
```
        $ npm test
```

## Docs
JSdocs and better-docs (a template library that works with JSDocs for UI) have been used to generate docs for the code. There are 2 types
1. UI docs (jsdoc-ui.json -> config file)
```
        $ npm run docs:ui
```

2. Api docs (jsdoc-api.json -> config file)
```
        $npm run docs:api
```

They generate docs into html which can be opened and viewed in a consolidated way present in docs/ui/index.html and docs/api/index.html for UI and APIs respectively.
**Reference:** 
https://github.com/jsdoc/jsdoc
https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js/

## Features completed
- **React view components**
- **Unit tests**
- **Docs using JSDocs**