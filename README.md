### What is this?

This is an experiment I'm doing with https://shiki.style.

Source code is modified from https://github.com/shikijs/shiki/tree/main/packages/transformers, and copyright belongs to
original authors Pine Wu and Anthony Fu.

### Changes

- Parse comments separately and cache it into the `data` property of nodes.
- Notation transformers read and replace parsed comments.
- Update original token, remove empty lines if necessary.

### New Syntax

```js
console.log("hello") // [!code highlight]

console.log("highlighted") // [!code highlight:2]
console.log("highlighted")

// the comment below will be removed
// [!code highlight:2]
console.log("highlighted")
console.log("highlighted")


console.log("combine") // [!code focus] [!code highlight]
console.log("combine") // Comment Allowed [!code focus] [!code highlight]
```