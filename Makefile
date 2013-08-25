NBIN=$(CURDIR)/node_modules/.bin

JSDIR=client/js
STYLDIR=client/styl

MODULES=node_modules client/bower_components

all: static/js/index.js static/css/index.css

static/js/index.js: $(JSDIR)/index.js $(JSDIR)/*.js $(MODULES) static/js
	$(NBIN)/borschik -i $< -o $@ --minimize=no

static/css/index.css: $(STYLDIR)/index.styl $(STYLDIR)/*.styl $(MODULES) static/css
	$(NBIN)/stylus -I $(STYLDIR) < $< > $@

static/%:
	mkdir -p $@

node_modules: package.json
	npm install

client/bower_components: client/bower.json
	cd client && $(NBIN)/bower install

clean:
	rm -rf static/js static/css

clean-all: clean
	rm -rf $(MODULES)

.PHONY: clean clean-all
