import { Typography } from "@mui/joy";
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

export default function Typewriter({ children, delay = 0 }: { children: string; delay?: number; }) {
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
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
        >
            {children.split("").map((char, i) => (
                <motion.span key={`${char}-${i}`} variants={letterVariants}>
                    {char}
                </motion.span>
            ))}
        </Typography>
    )
};
