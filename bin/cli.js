#!/usr/bin/env node

const commander = require('commander');
const shell = require('shelljs');
const fs = require('fs-extra');
const chalk = require('chalk');
const log = console.log;

commander
  .name("dashbox")
  .usage("command [parameter]")
commander
  .command("init")
  .alias("i")
  .description("Load default Boilerplate-box into current directory")
  .action(function () {
    loadBox("dashbox-init-default");
  });
commander
  .command("load <source>")
  .alias("l")
  .description("Load defined Boilerplate-box from https://github.com/dashdev-box/ into current directory")
  .action(function (source) {
    loadBox(source);
  });
commander.parse(process.argv);


function loadBox(source) {
  
  // check if directory is empty and abort if it's not
  if (fs.readdirSync(".").length != 0) { 
    log(chalk.red("current directory not empty - aborting"));
    return;
  }

  // load - git clone
  log(chalk.green("Loading '" + source + "' into current directory"));
  if (source.endsWith("-box") || source.endsWith("-default")) {
    shell.exec("git clone https://github.com/dashdev-box/" + source + " .");
  } else {
    shell.exec("git clone https://github.com/dashdev-box/" + source + "-box .");
  }
  log("");

  // check for valid box specification
  var initFile = "./dashbox-init.json";
  if (!fs.existsSync(initFile)) {
    log(chalk.red("dashbox-init.json not found - aborting"));
    return;
  }

  // check for package.json and run npm install
  var path = './package.json'
  if (fs.existsSync(path)) {
    log(chalk.green("Found package.json, executing 'npm install'"));
    shell.exec("npm install --loglevel=error");
  }

  // Run Post-Install routine, configured in dashbox-init.json
  log(chalk.green("Running Post-Install commands from 'dashbox-init.json'"));
  fs.readJson('./dashbox-init.json', (err, obj) => {
    if (err) console.error(err);

    log(chalk.yellow("Documentation: " + obj.docs_url))
    log("")

    for (const property in obj.post_clone_remove) {
      var file = `${obj.post_clone_remove[property]}`;
      log(chalk.yellow(`Remove: '${file}'`));
      fs.remove(file, err => {
        if (err) return console.error(err)
      })
    }
    log("")

    for (const property in obj.post_clone_execute) {
      var execute = `${obj.post_clone_execute[property]}`;
      if (execute != '') {
        log(chalk.yellow(`Execute: '${execute}'`));
        shell.exec(execute);
      }
    }
    log("")

    log(chalk.yellow("Scripts:"))
    for (const property in obj.scripts_description) {
      var scripts = `${obj.scripts_description[property]}`;
      if (scripts != '') log(chalk.yellow("  " + scripts));
    }
    log("");

    log(chalk.green("Finish Success"))
  })

  fs.remove(initFile, err => {
    if (err) return console.error(err)
  })

}