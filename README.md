DashBox - Simple development framework for [Dash](https://www.dash.org) [Platform](https://www.dashdevs.org). Making developers life easier.


### Features

- Load Templates, Examples and Tutorials for different use cases and knowledge levels
- Automated software testing with Mocha and Chai
- Configurable build pipeline and build processes
- Scriptable deployment and migrations framework

### Install

```
$ npm install -g dashbox
``` 

### Usage - Load default box

For a default template-set of contracts, tests and migrations run the following command inside an empty project directory:

```
$ dashbox init
``` 
That's it! This loads the default minimal template (bare-box).

### Usage - Load custom box

For a custom and more advanced Template / Example / Tutorial run following command inside an empty project directory:

```
$ dashbox load <source-box>

eg.

$ dashbox load dashjs-html-js-example
$ dashbox load chrome-extension
$ dashbox load chrome-extension-example
$ dashbox load chrome-extension-wallet-tutorial (WIP)
``` 

View all available boxes on https://github.com/dashdev-box

```
Usage: dashbox command [parameter]

Options:
  -h, --help       output usage information

Commands:
  init|i           Load default Template-box (bare-box) into current directory
  load|l <source>  Load custom Template-box from https://github.com/dashdev-box into current directory
```

### Documentation

No documentation yet. 

Visit https://www.dashdevs.org for updates

Please contact via Discord ( https://chat.dashdevs.org ) or Github ( https://github.com/dashdev-box ) Issue/PullRequest if you want to add a template.


### License

MIT 