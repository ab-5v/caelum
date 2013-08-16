NBIN=$(CURDIR)/node_modules/.bin

all: static/js/index.js static/css/index.css

static/js/index.js: client/js/index.js client/bower.json
	$(NBIN)/borschik -i $< -o $@ --minimize=no

static/css/index.css: client/styl/*.styl
	$(NBIN)/stylus -I client/styl < client/styl/index.styl > $@
