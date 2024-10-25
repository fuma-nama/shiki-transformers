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

### JSX Supported

```jsx
<div>
    <p>Hello World</p>
    {/* [!code highlight] */}
    <p>Highlighted</p>
</div>
```

### Performance

It only looks for the last token of line to scan comments, and extend only when JSX is enabled:

```jsx
<>
    {/* [!code highlight] */}
</>
```

As there's a curly bracket `}` before the comment itself.