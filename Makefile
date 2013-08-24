NBIN=$(CURDIR)/node_modules/.bin

JSDIR=client/js
STYLDIR=client/styl

all: static/js/index.js static/css/index.css

static/js/index.js: $(JSDIR)/index.js $(JSDIR)/*.js client/bower.json
	$(NBIN)/borschik -i $< -o $@ --minimize=no

static/css/index.css: $(STYLDIR)/index.styl $(STYLDIR)/*.styl
	$(NBIN)/stylus -I $(STYLDIR) < $< > $@
