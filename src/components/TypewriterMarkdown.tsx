import { Typography } from "@mui/joy";
import { motion, Variants } from "framer-motion";
import { Key, useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TypewriterMarkdownInternal({ children, key, letterVariants, dadElement }: {
    children: any,
    key: Key | null | undefined;
    letterVariants: Variants;
    dadElement: (children: JSX.Element | JSX.Element[]) => JSX.Element | JSX.Element[];
    isRoot?: boolean;
}) {
    if (typeof children === "string") {
        const spanList = children.split("").map((char, i) => (
            <motion.span key={`${key}-${char}-${i}`} variants={letterVariants} >
                {char}
            </motion.span>
        ))
        return dadElement(spanList)
    }
    if (Array.isArray(children)) {
        const list = children.map((child) => {
            if (typeof child === "string") {
                let spanList = child.split("").map((char, i) => (
                    <motion.span key={`${key}-${char}-${i}`} variants={letterVariants} >
                        {char}
                    </motion.span>
                ))
                return spanList
            }
            return child
        })
        return dadElement(list)
    }
    return dadElement(children)
};

export default function TypewriterMarkdown({ text, delay = 0 }: { text: string; delay?: number; }) {
    const sentenceVariants: Variants = {
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
    };
    const letterVariants = useMemo<Variants>(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    }), [delay]);

    return (
        <Typography
            component={motion.p}
            key={text}
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => {
                                if (Array.isArray(children)) {
                                    children.push(<motion.br key={key + "-br"} />)
                                    return children
                                }
                                return children
                            }}
                        />
                    },
                    a: ({ children, href, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.a
                                href={href}
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.a>
                            }
                        />
                    },
                    code: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.code
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.code>
                            }
                        />
                    },
                    ul: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.ul
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.ul>
                            }
                        />
                    },
                    li: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.li
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.li>
                            }
                        />
                    },
                    strong: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.strong
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.strong>
                            }
                        />
                    },
                    em: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.em
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.em>
                            }
                        />
                    },
                    hr: ({ key }) => {
                        return <motion.hr
                            key={key}
                            variants={letterVariants}
                        />
                    },
                    th: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.th
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.th>
                            }
                        />
                    },
                    del: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.del
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.del>
                            }
                        />
                    },
                    table: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.table
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.table>
                            }
                        />
                    },
                    h1: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h1
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h1>
                            }
                        />
                    },
                    h2: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h2
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h2>
                            }
                        />
                    },
                    h3: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h3
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h3>
                            }
                        />
                    },
                    h4: ({ children, key }) => {
                        return <TypewriterMarkdownInternal
                            children={children}
                            key={key}
                            letterVariants={letterVariants}
                            dadElement={(children) => <motion.h4
                                key={key}
                                variants={letterVariants}
                            >
                                {children}
                            </motion.h4>
                            }
                        />
                    },
                }}
            >
                {text}
            </Markdown>
        </Typography>
    )
};
