const MarkdownIt = require('markdown-it');

const renderer = new MarkdownIt()
	.use(require('../index'));

console.log(renderer.render(`
\`\`\`markmap
# test
## test1
### test1-1
## test2
### test2-1
### test2-2
### test2-1
### test2-2
### test2-1
### test2-2
### test2-1
### test2-2
\`\`\`
`));