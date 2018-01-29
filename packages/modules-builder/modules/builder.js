const fs = require('fs');
const spawn = require('child_process').spawn;
const chalk = require('chalk');

const { forEachObjIndexed } = require('ramda');


const exec = (command, extraEnv) =>
  spawn(command, {
    shell: true,
    env: { ...process.env, ...extraEnv },
  });

const writeMessage = message => process.stdout.write(message);


export const compileAccordingToInfo = ({
  messages,
  command,
  moduleType,
  env = 'development',
}) => {
  writeMessage(chalk.blue(messages.onBeforeRun));

  const execCompiling = exec(command, {
    BABEL_ENV: moduleType,
    NODE_ENV: env,
  });

  execCompiling.stderr.on('data', error => writeMessage(error.toString()));

  execCompiling
    .on('exit', (code) => {
      code !== 0 && writeMessage(chalk.red(messages.onError));
      code === 0 && writeMessage(chalk.green(messages.onSuccess));
    });
};


export default const createBuilder = infoToCompile =>
  () => forEachObjIndexed(compileAccordingToInfo, infoToCompile);
