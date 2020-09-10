# la-acme-inc

This project was bootstrapped with [Telefonica's Living app generator](https://www.npmjs.com/package/@telefonica/la-generator).

## Dependencies:

- node > 12
- docker & docker-compose

## Quick start

Complete `config.env` file with your configuration secrets

Install npm dependencies: `make install`

Check available commands: `make help`:

```
Usage: make <command>

  Commands:

    install:                    install all dependencies.

    dev-dialogs:                run dialogs on aura-mini-bot.
    cla:                        open CLA site to test your dialogs.
    pack-dialogs:               generate dialogs package.
    install-dialogs:            install dialogs dependencies.
    tunnel:                     create SSH tunnel using ngrok & uptate azure bot endpoint.
    lint-dialogs-check:         lint dialogs code.
    lint-dialogs:               lint dialogs code. Fix errors.

    lint-web-check:             lint web applications.
    lint-web:                   lint web applications. Fix errors.

    dev-stb:                    run set-top-box-haac web server.
    dev-stb-mock:               run set-top-box-haac web server using mocked aura client.
    launch-stb:                 launch local set-top-box-haac web application to STB.
    install-stb:                install set-top-box-haac web application dependencies.
    build-stb:                  build set-top-box-haac web application.
    build-stb-mock:             build set-top-box-haac web application using mocked aura client.

    dev-mh:                     run movistar-home web server.
    dev-mh-mock:                run movistar-home web server using mocked aura client.
    install-mh:                 install movistar-home web application dependencies.
    build-mh:                   build movistar-home web application.
    build-mh-mock:              build movistar-home web application using mocked aura client.
```

## Dialogs and SSH tunnel

Command `make dev-dialogs` will build your dialogs and run them on aura-mini-bot using docker.

aura-mini-bot uses Microsoft DirectLine to exchange messages with client applications. You'll need to expose your host to Microsoft Azure:

run `make tunnel`, navigate to https://microsoft.com/devicelogin and use the code given by the command.

After login, this command will use [ngrok](https://ngrok.com/) service and update your azure bot endpoint url.

## Webapps

Use `make dev-stb` and `make dev-mh` to run your webapps and comunicate with your dialogs using Azure Direct Line.

For development, use `make dev-stb-mock`and `make dev-mh-mock` to use a mocked version of Aura Client.
Configure your responses at `webapps/common/mocks/index.ts`

## Lean more

Available UI components: http://storybook-living-apps.apps-dev.hi.inet

Docs: http://docs-living-apps.apps-dev.hi.inet
