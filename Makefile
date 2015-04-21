SOURCE = visDOMSelect.js
MINIFIED = visDOMSelect.min.js

lint:
	jscs --preset airbnb $(SOURCE)

minify:
	@echo minifying $(SOURCE) with closure compiler
	@curl -s \
		-X POST \
		--data-urlencode 'compilation_level=SIMPLE_OPTIMIZATIONS' \
		--data-urlencode 'output_format=text' \
		--data-urlencode 'output_info=compiled_code' \
		--data-urlencode 'js_code@$(SOURCE)' \
		http://closure-compiler.appspot.com/compile \
		> $(MINIFIED)

.PHONY: lint minify
