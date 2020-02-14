const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

function getPreCondition() {
    return helpers
        .run('generator-jhipster/generators/client')
        .withOptions({
            'from-cli': true,
            skipInstall: true,
            skipServer: true,
            blueprints: 'bluerim',
            skipChecks: true
        })
        .withGenerators([
            [
                require('../generators/client/index.js'), // eslint-disable-line global-require
                'jhipster-nodejs:client',
                path.join(__dirname, '../generators/client/index.js')
            ]
        ]);
}

const commonPrompt = {
    baseName: 'sampleMysql',
    packageName: 'com.mycompany.myapp',
    databaseType: 'sql',
    devDatabaseType: 'h2Disk',
    applicationType: 'monolith',
    cacheProvider: 'ehcache',
    authenticationType: 'jwt',
    prodDatabaseType: 'mysql',
    enableTranslation: true,
    clientTheme: 'none',
    languages: ['en'],
    nativeLanguage: 'en',
    buildTool: 'maven',
    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5'
};

describe('Subgenerator client of primereact-blueprint JHipster blueprint', () => {
    describe('Sample test', () => {
        before(done => {
            getPreCondition()
                .withPrompts({
                    clientFramework: 'primereact',
                    ...commonPrompt
                })
                .on('end', done);
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
