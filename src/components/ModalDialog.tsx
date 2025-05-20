import { DialogActions, DialogContent, Divider, ModalClose } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { default as ModalDialogJoy, ModalDialogProps } from "@mui/joy/ModalDialog";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export interface ModalDialogCustomProps extends ModalDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
    head?: string | React.ReactNode;
    actions?: React.ReactNode;
    canBeIgnored?: boolean;
}

export default function ModalDialogCustom(props: ModalDialogCustomProps) {
    const { open, setOpen, children, actions, head, sx, canBeIgnored = true, ...rest } = props;
    const [internalOpen, setInternalOpen] = useState(open);
    useEffect(() => {
        if (open) {
            setInternalOpen(open);
            return;
        }
        const timeout = setTimeout(() => {
            setInternalOpen(open);
        }, 400);
        return () => {
            clearTimeout(timeout);
        };
    }, [open]);
    const modalVarians = useMemo(
        () => `transition-all duration-400
        ${open ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none backdrop-blur-0"}`,
        [open]
    );

    return (
        <AnimatePresence>
            <Modal
                keepMounted
                open={internalOpen}
                onClose={() => canBeIgnored && setOpen(false)}
                className={modalVarians}
            >
                <ModalDialogJoy
                    sx={{
                        ...sx,
                    }}
                    component={motion.div}
                    variants={{
                        open: {
                            opacity: 1,
                            pointerEvents: "auto",
                        },
                        closed: {
                            opacity: 0,
                            pointerEvents: "none",
                        },
                    }}
                    initial={"closed"}
                    animate={internalOpen ? "open" : "closed"}
                    exit={"closed"}
                    transition={{
                        duration: 0.3,
                    }}
                    {...rest}
                >
                    {canBeIgnored && <ModalClose />}
                    {head}
                    {head && <Divider />}
                    <DialogContent>{internalOpen && children}</DialogContent>
                    {actions && <DialogActions>{actions}</DialogActions>}
                </ModalDialogJoy>
            </Modal>
        </AnimatePresence>
    );
}
