SOURCE = visDOMSelect.js
MINIFIED = visDOMSelect.min.js
CHECKBOXTOGGLE-HEAD = examples/checkboxToggle/checkboxToggle

lint:
	jscs --preset airbnb $(SOURCE)

minify:
	$(info minifying $(SOURCE) with closure compiler)
	@curl -s \
		-X POST \
		--data-urlencode 'compilation_level=SIMPLE_OPTIMIZATIONS' \
		--data-urlencode 'output_format=text' \
		--data-urlencode 'output_info=compiled_code' \
		--data-urlencode 'js_code@$(SOURCE)' \
		http://closure-compiler.appspot.com/compile \
		> $(MINIFIED)

checkboxToggle:
	$(info minifying checkboxToggle bookmarklet with closure compiler)
	@cat $(SOURCE) $(CHECKBOXTOGGLE-HEAD).snippet.js \
		> $(CHECKBOXTOGGLE-HEAD).js
	@curl -s \
		-X POST \
		--data-urlencode 'compilation_level=ADVANCED_OPTIMIZATIONS' \
		--data-urlencode 'output_format=text' \
		--data-urlencode 'output_info=compiled_code' \
		--data-urlencode 'js_code@$(CHECKBOXTOGGLE-HEAD).js' \
		http://closure-compiler.appspot.com/compile \
		> $(CHECKBOXTOGGLE-HEAD).min.js

.PHONY: all
