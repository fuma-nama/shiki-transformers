import type {Element} from "hast"

export type ParsedComments = {
    line: Element
    token: Element
    info: [prefix: string, content: string, suffix?: string]
}[]

const matchers = [
    /^(<!--)(.+)(-->)$/,
    /^(\/\*)(.+)(\*\/)$/,
    /^(\/\/|["']|;{1,2}|%{1,2}|--|#)(.+)$/
]

export function parseComments(code: Element): ParsedComments {
    const out: ParsedComments = []

    for (const line of code.children.filter(i => i.type === 'element')) {
        const elements = line.children
        const last = elements.at(-1)

        for (const token of last ? [last] : []) {
            if (token.type !== 'element')
                continue

            const match = matchToken(token)
            if (!match) continue

            out.push({
                info: match,
                line,
                token
            })
        }
    }

    return out
}

function matchToken(token: Element): [prefix: string, content: string, suffix?: string] | undefined {
    const text = token.children[0]
    if (text.type !== 'text')
        return

    for (const matcher of matchers) {
        // no leading and trailing spaces allowed for matchers

        let trimmed = text.value.trimStart()
        const spaceFront = text.value.length - trimmed.length

        trimmed = trimmed.trimEnd()
        const spaceEnd = text.value.length - trimmed.length - spaceFront

        const result = matcher.exec(trimmed)
        if (!result) continue

        return [
            ' '.repeat(spaceFront) + result[1],
            result[2],
            result[3] ? result[3] + ' '.repeat(spaceEnd) : undefined
        ]
    }
}