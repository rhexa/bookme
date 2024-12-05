APP=bookme-db-1331

connect-db:
	flyctl postgres connect -a ${APP}

proxy-db:
	flyctl proxy 5432 -a ${APP}