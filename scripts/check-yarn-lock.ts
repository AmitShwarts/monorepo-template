import kleur from 'kleur';
import simpleGit from 'simple-git';
import { readFile } from 'fs/promises';

const git = simpleGit();

const getLastComittedFileText = async (path: string): Promise<string> => {
  return git.show([`HEAD:${path}`]);
}

type HasChangedDepsParams = {
  lastComittedFile: Record<string, any>;
  stagedFile: Record<string, any>;
}

const hasChangedDeps = async ({lastComittedFile, stagedFile}: HasChangedDepsParams): Promise<boolean> => {
  const devTypes = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ];

  return devTypes.some(devType => {
    const commitedList = JSON.stringify(lastComittedFile[devType]);
    const stagedList = JSON.stringify(stagedFile[devType]);

    return commitedList !== stagedList;
  });
}

const getPackagesWithChangedDeps = async (stagedPackageJsonsPaths: string[]): Promise<string[]> => {
  const packagesWithChangedDeps: string[] = [];

  await Promise.all(
    stagedPackageJsonsPaths.map(async (path) => {
      const [comittedFileText, stagedFileText] = await Promise.all([
        getLastComittedFileText(path),
        readFile(path, 'utf8'),
      ])
      const lastComittedFile = JSON.parse(comittedFileText);
      const stagedFile = JSON.parse(stagedFileText);

      if (await hasChangedDeps({lastComittedFile, stagedFile})) {
        packagesWithChangedDeps.push(path);
      }
    })
  );

  return packagesWithChangedDeps;
}

const main = async () => {
  try {
    const statusSummary = await git.status();
    const stagedPackageJsonsPaths = statusSummary.staged.filter(filePath => filePath.includes('package.json'));
    const isYarnLockStaged = !!statusSummary.staged.find(filePath => filePath === 'yarn.lock')
    const packagesWithChangedDeps = await getPackagesWithChangedDeps(stagedPackageJsonsPaths);

    if (!isYarnLockStaged && packagesWithChangedDeps.length > 0) {
      // eslint-disable-next-line no-console
      console.error(kleur.yellow('seems like some of the dependencies changed.\nplease run `yarn` to update `yarn.lock` and commit it.'));
      process.exit(1);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(kleur.bgYellow(kleur.bold('Error checking yarn.lock:')), error);
    process.exit(1);
  }
}

main();
