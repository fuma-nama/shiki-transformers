import type {Element, Text} from 'hast'
import type {ShikiTransformer, ShikiTransformerContext} from 'shiki'
import {parseComments, ParsedComments} from "./parse-comments";

export function createCommentNotationTransformer(
    name: string,
    regex: RegExp,
    onMatch: (
        this: ShikiTransformerContext,
        match: string[],
        line: Element,
        commentNode: Element,
        lines: Element[],
        index: number
    ) => boolean,
): ShikiTransformer {
    return {
        name,
        code(code) {
            const lines = code.children.filter(i => i.type === 'element') as Element[]
            const linesToRemove: (Element | Text)[] = []

            code.data ??= {}
            const data = code.data as {
                _shiki_notation?: ParsedComments
            }
            const parsed = data._shiki_notation ??= parseComments(code)

            for (const comment of parsed) {
                if (comment.info[1].length === 0) continue

                let lineIdx = lines.indexOf(comment.line)
                if (comment.line.children.length === 1) lineIdx++

                comment.info[1] = comment.info[1].replace(regex, (...match) => {
                    if (onMatch.call(this, match, comment.line, comment.token, lines, lineIdx)) {
                        return ''
                    }

                    return match[0]
                })

                const isEmpty = comment.info[1].trim().length === 0
                // ignore comment node
                if (isEmpty) comment.info[1] = ''
                
                if (isEmpty && comment.line.children.length === 1) {
                    linesToRemove.push(comment.line)
                } else if (isEmpty) {
                    comment.line.children.splice(comment.line.children.indexOf(comment.token), 1)
                } else {
                    const head = comment.token.children[0]

                    if (head.type === 'text') {
                        head.value = comment.info.join('')
                    }
                }
            }

            for (const line of linesToRemove)
                code.children.splice(code.children.indexOf(line), 1)
        },
    }
}
