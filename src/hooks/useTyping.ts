import { useEffect, useState } from 'react'

/** Cycles through words with a type / delete effect. */
export function useTyping(words: string[], typeMs = 70, deleteMs = 35, holdMs = 1600) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let t: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteMs : typeMs,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

  return text
}
