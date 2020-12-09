include config.env

define help

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

endef
export help

help:
	@echo "$$help"

install: install-dialogs install-stb install-mh
	@npm install

# dialogs

dev-dialogs: pack-dialogs
	@docker-compose run --use-aliases --rm --service-ports aura-mini-bot

cla:
	@open "https://cla-living-apps.apps-dev.tid.es?auraId=79a8077f-98e3-42b2-86a2-43e83050b4a2&dlSecret=${AURA_MICROSOFT_DL_SECRET}&laName=la-acme-inc"

pack-dialogs:
	@cd dialogs && npm pack

install-dialogs:
	@npm --prefix dialogs/ install

build-dialogs:
	@npm --prefix dialogs/ run build

tunnel:
	@docker-compose run --rm azcli

lint-dialogs:
	@eslint dialogs --ext .ts -c dialogs/.eslintrc.js --fix --quiet

lint-dialogs-check:
	@eslint dialogs --ext .ts -c dialogs/.eslintrc.js --quiet

# webapps

lint-web:
	@eslint webapps --ext .ts,.tsx -c webapps/.eslintrc.js --fix --quiet

lint-web-check:
	@eslint webapps --ext .ts,.tsx -c webapps/.eslintrc.js --quiet

# set-top-box

dev-stb:
	@sleep 8 && open "http://localhost:3000?auraId=79a8077f-98e3-42b2-86a2-43e83050b4a2&dlSecret=${AURA_MICROSOFT_DL_SECRET}" &
	@npm --prefix webapps/set-top-box-haac/ run browser

dev-stb-mock:
	@npm --prefix webapps/set-top-box-haac/ run browser:mock

launch-stb: build-stb
	@docker-compose up -d web-stb
	@npx @telefonica/stb-url-launch "http://localhost:8081?auraId=79a8077f-98e3-42b2-86a2-43e83050b4a2&dlSecret=${AURA_MICROSOFT_DL_SECRET}&env=PRO"

launch-stb-mock: build-stb-mock
	@docker-compose up -d web-stb
	@npx @telefonica/stb-url-launch http://localhost:8081

install-stb:
	@npm --prefix webapps/set-top-box-haac/ install

build-stb:
	@npm --prefix webapps/set-top-box-haac/ run build

build-stb-mock:
	@npm --prefix webapps/set-top-box-haac/ run build:mock

# movistar-home

dev-mh:
	@sleep 8 && open "http://localhost:3001?auraId=79a8077f-98e3-42b2-86a2-43e83050b4a1&dlSecret=${AURA_MICROSOFT_DL_SECRET}" &
	@npm --prefix webapps/movistar-home/ run browser

dev-mh-mock:
	@npm --prefix webapps/movistar-home/ run browser:mock

install-mh:
	@npm --prefix webapps/movistar-home/ install

build-mh:
	@npm --prefix webapps/movistar-home/ run build

