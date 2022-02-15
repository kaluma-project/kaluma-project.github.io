---
layout: "base.njk"
title: Modules
tags: pages
---

# Third-party modules

## Install a module

1. Copy URL of a module
2. Install the module using NPM:

```shell-session
npm install --save https://github.com/<username>/<repo>
```

## Publish a module in Github

1. Place module `name` and `version` in `package.json`.
2. Create a tag (release) with the version name.
3. Create PR with adding `<module_name>.json` to `src/_data/modules`.

```json
{
  "url": "https://github.com/<username>/<repo>",
  "tags": ["tag1", "tag2"]
}
```

### H3

#### H4

##### H5

```js
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/styles');
  eleventyConfig.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
    markdownTemplateEngine: 'njk',
  };
};
```

---

## Modules

Total: {{ modules | length }} modules

{% for name, item in modules %}
- `{{name}}` - [{{item.url}}]({{item.url}})
{% endfor %}
