---
title: Modules
---

# Third-party modules

## Install a module

1. Copy URL of a module
2. Install the module using NPM:

```powershell
npm install --save https://github.com/<username>/<repo>
```

## Publish a module in Github

1. Place module `name` and `version` in `package.json`.
2. Create a tag (release) with the version name.
3. Create PR with adding `<module_name>.json` to `src/_data/modules`.

```json
{
  "url": "https://github.com/<username>/<repo>",
  "tags": [...]
}
```

---

## Modules

Total: {{ modules | length }} modules

{% for name, item in modules %}
- `{{name}}` - [{{item.url}}]({{item.url}})
{% endfor %}
