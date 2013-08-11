NBIN=$(CURDIR)/node_modules/.bin


all: static/js/index.js

static/js/index.js: client/bower.json client/js/*.js
	$(NBIN)/borschik -i client/js/index.js -o static/js/index.js --minimize=no
