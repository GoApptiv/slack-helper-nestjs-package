# GoApptiv Slack Helper NestJS

This package provides additional utility functions for Slack like automatically sending exception message to slack on exception and many more features to come

## Installation

1. Create a `.npmrc` in the root folder and add the following lines.

```bash
//npm.pkg.github.com/:_authToken=TOKEN
@goapptiv:registry=https://npm.pkg.github.com/
```

2. Create a personal token with **read:packages** permission and replace the `TOKEN` with your personal token in the above mentioned file.

3. Install the package using the following command

```bash
npm install @goapptiv/slack-helper-nestjs
```

4. Register the SlackHelperModule in your root module

```ts
SlackHelperModule.registerAsync({
  isGlobal: true,
  imports: [AppConfigModule],
  useFactory: (appConfigService: AppConfigService) => ({
    appEnv: appConfigService.appEnvironment,
    channels: {
      default: 'general',
      general: 'general',
      exceptions: 'exception',
    },
  }),
  inject: [AppConfigService],
});
```

5. Pass eventEmitter

This package internally uses [@goapptiv/exception-handler-nestjs](https://github.com/GoApptiv/exception-handler-nestjs-package), so make sure to pass the eventEmitter to exception-handler filters.

## Usage

It does everything automatically!
