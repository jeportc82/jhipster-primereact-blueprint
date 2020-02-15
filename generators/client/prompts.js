/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const chalk = require('chalk');

module.exports = {
    askForModuleName,
    askForClient,
    askFori18n,
    askForClientTheme,
    askForClientThemeVariant,
    askForClientSideOpts
};

function askForModuleName() {
    if (this.baseName) return;

    this.askModuleName(this);
}

function askForClient(meta) {
    if (!meta && this.existingProject) return;

    const applicationType = this.applicationType;

    const choices = [
        {
            value: 'react',
            name: 'PrimeReact'
        },
        {
            value: 'no',
            name: 'No client'
        }
    ];

    const PROMPT = {
        type: 'list',
        name: 'clientFramework',
        when: response => applicationType !== 'microservice' && applicationType !== 'uaa',
        message: `Which ${chalk.yellow('*Framework*')} would you like to use for the client?`,
        choices,
        default: 'angularX'
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.clientFramework = prompt.clientFramework;
        if (this.clientFramework === 'no') {
            this.skipClient = true;
        }
        done();
    });
}

function askFori18n() {
    if (this.existingProject || this.configOptions.skipI18nQuestion) return;

    this.aski18n(this);
}

function askForClientSideOpts(meta) {}

function askForClientTheme(meta) {
    if (!meta && this.existingProject) {
        return;
    }

    const skipClient = this.skipClient;
    const done = this.async();
    const defaultChoices = [
        { value: 'luna-amber', name: 'Luna Amber', clientThemeVariant: 'dark' },
        { value: 'luna-blue', name: 'Luna Blue', clientThemeVariant: 'dark' },
        { value: 'luna-green', name: 'Luna Green', clientThemeVariant: 'dark' },
        { value: 'luna-pink', name: 'Luna Pink', clientThemeVariant: 'dark' },
        { value: 'nova-colored', name: 'Nova Colored', clientThemeVariant: 'light' },
        { value: 'nova-dark', name: 'Nova Dark', clientThemeVariant: 'dark' },
        { value: 'nova-light', name: 'Nova Light', clientThemeVariant: 'light' },
        { value: 'rhea', name: 'Rhea', clientThemeVariant: 'light' }
    ];

    const PROMPT = {
        type: 'list',
        name: 'clientTheme',
        when: () => !skipClient,
        message: 'Which theme would you like to use for PrimeReact?',
        choices: defaultChoices,
        default: 'nova-light'
    };

    promptQuestion(PROMPT, done, this);
    // this.clientThemeVariant = prompt.clientThemeVariant;
}

function promptQuestion(PROMPT, done, generator) {
    generator.prompt(PROMPT).then(prompt => {
        generator.clientTheme = prompt.clientTheme;
        if (prompt.clientTheme === 'nova-light') {
            generator.clientThemeVariant = 'light';
        } else {
            generator.clientThemeVariant = 'dark';
        }
        done();
    });
}

function askForClientThemeVariant(meta) {
    if (!meta && this.existingProject) {
        return;
    }
    if (this.clientTheme === 'nova-light') {
        this.clientThemeVariant = 'light';
        return;
    }

    const skipClient = this.skipClient;

    const choices = [{ value: 'primary', name: 'Primary' }, { value: 'dark', name: 'Dark' }, { value: 'light', name: 'Light' }];

    const PROMPT = {
        type: 'list',
        name: 'clientThemeVariant',
        when: () => !skipClient,
        message: 'Choose a Bootswatch variant navbar theme (https://bootswatch.com/)?',
        choices,
        default: 'primary'
    };

    if (meta) return PROMPT; // eslint-disable-line consistent-return

    const done = this.async();

    this.prompt(PROMPT).then(prompt => {
        this.clientThemeVariant = prompt.clientThemeVariant;
        done();
    });
}
