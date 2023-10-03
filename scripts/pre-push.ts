import kleur from 'kleur';
import path from 'path';
import {execSync} from 'child_process';

const prePush = () => {
  execSync('yarn test', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
};

try {
  // eslint-disable-next-line no-console
  console.log(kleur.yellow('starting pre-push hook checks'));
  prePush();
  // eslint-disable-next-line no-console
  console.log(kleur.green('great! no pre-push errors :)'));
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(kleur.bgRed(kleur.bold('pre-push failed!')), err);
  process.exit(1);
}
