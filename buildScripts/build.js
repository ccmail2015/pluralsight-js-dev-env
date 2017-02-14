/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';
webpack(webpackConfig).run((err, stats) => {
    if (err) {
        //so a fatal error occured. stop here.
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStatus=stats.toJson();
    if (jsonStatus.hasErrors) {
        return jsonStatus.errors.map(error => console.log(chalk.red(error)));

    }
    if (jsonStatus.hasWarnings) {
        console.log(chalk.yellow("Webpack generate the following warnings"));
        jsonStatus.warnings.map(warning => console.log(chalk.yellow(warning)));
    }
    console.log(`webpack status: ${stats}`);

    //success
    console.log(chalk.green('Your app has been built for produciton, written to dist!'));
    return 0;
});
