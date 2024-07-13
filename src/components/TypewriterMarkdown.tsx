import { Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TypewriterMarkdown({ children, delay = 0 }: { children: string; delay?: number; }) {
    const sentenceVariants = {
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
    };
    const letterVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
    }), [delay]);

    return (
        <Typography
            component={motion.p}
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children, key }) => {
                        if (typeof children === "string") {
                            return children.split("").map((char, i) => (
                                <motion.span key={`${key}-${char}-${i}`} variants={letterVariants}>
                                    {char}
                                </motion.span>
                            )) as any
                        }
                        if (Array.isArray(children)) {
                            return children.map((child) => {
                                if (typeof child === "string") {
                                    return child.split("").map((char, i) => (
                                        <motion.span key={`${key}-${char}-${i}`} variants={letterVariants}>
                                            {char}
                                        </motion.span>
                                    ))
                                }
                                return child
                            })
                        }
                        return <motion.p>
                            {children}
                        </motion.p>
                    },
                    a: ({ children, href, key }) => {
                        if (typeof children === "string") {
                            return <motion.a href={href} key={key} variants={sentenceVariants}>
                                {children.split("").map((char, i) => (
                                    <motion.span key={`${key}-${char}-${i}`} variants={letterVariants}>
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.a>
                        }
                        return <motion.a href={href} key={key} variants={letterVariants}>
                            {children}
                        </motion.a>
                    },
                }}
            >
                {children}
            </Markdown>
        </Typography>
    )
};
