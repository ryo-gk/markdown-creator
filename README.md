# markdown-creator
Create markdown file via command line.

## Usage

```shell
mdc create -t sample/template.md -n new-file -o sample --vars 2022-01-01,"John Doe"
```

e.g.) sample/template.md
```md
---
title: Post at {$1}
author: {$2}
---

## {$1}'s news
- Lorem ipsum1
- Lorem ipsum2
```

## Options
You can also see the each options with `mdc create --help`.

### -t, --template <templateFilePath>
Use specified file as template.

### -n, --name <fileName>
Use specified name as file's name.

### -o, --out <outputPath>
Use specified path as directory where file create.

### --vars <variables>
Use variables which are used for format.
You can pass variables with commma connected, which are used to format the string `{$1}`, `{$2}`, ...

### --today <variables>
Replace the characters `{$today}` with today's date using passed the day.js format.

For example, if you have below template markdown file,

```md
---
title: Lorem ipsum
publishedAt: {$today}
---

## The news of {$today}
```

and run the `mdc create -n my-post --today YYYY-MM-DD` on Jun 1st, 2023.

After that, following `my-post.md` file may be generated.

```md
---
title: Lorem ipsum
publishedAt: 2023-01-01
---

## The news of 2023-01-01
```
