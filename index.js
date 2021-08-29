const { Transformer } = require('markmap-lib');

const transformer = new Transformer();

function markdownItMarkmap(md) {
	const origRule = md.renderer.rules.fence.bind(md.renderer.rules);
	md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
		const token = tokens[idx];
		if (token.info === 'markmap') {
			const code = token.content.trim();
            const { root } = transformer.transform(code);
            const id = `markmap-${idx}`;
			return `
                <script src="https://cdn.jsdelivr.net/npm/d3@6"></script>
                <script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>
                <svg id="${id}" width="100%" height="100%"></svg>
                <script>
                const { markmap } = window;
                const { Markmap } = markmap;

                Markmap.create('#${id}', undefined, ${JSON.stringify(root)});
                </script>
            `;
		}
		
		// Other languages
		return origRule(tokens, idx, options, env, slf);
	};
}

module.exports = markdownItMarkmap;
