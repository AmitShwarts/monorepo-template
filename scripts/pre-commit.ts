import kleur from 'kleur';
import path from 'path';
import {execSync} from 'child_process';

const preCommit = () => {
  execSync('yarn check-yarn-lock', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });

  execSync('yarn run -T lint-staged', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
    env: {
      ...process.env,
      PRE_COMMIT: 'true',
    },
  });
};

try {
  // eslint-disable-next-line no-console
  console.log(kleur.yellow('starting pre-commit hook checks'));
  preCommit();
  // eslint-disable-next-line no-console
  console.log(kleur.green('great! no pre-commit errors :)'));
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(kleur.bgRed(kleur.bold('pre-commit failed!')), err);
  process.exit(1);
}
