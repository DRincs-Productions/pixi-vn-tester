import { DialogActions, DialogContent, Divider, ModalClose } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';

interface ModalDialogCustomProps extends ModalDialogProps {
    open: boolean;
    setOpen?: (open: boolean) => void;
    children?: React.ReactNode;
    head?: string | React.ReactNode;
    actions?: React.ReactNode;
}

export default function ModalDialogCustom(props: ModalDialogCustomProps) {
    const {
        open
        , setOpen
        , children
        , actions
        , head
        , sx
        , ...rest
    } = props;
    const [internalOpen, setInternalOpen] = useState(open)
    useEffect(() => {
        if (open) {
            setInternalOpen(open)
            return
        }
        const timeout = setTimeout(() => {
            setInternalOpen(open)
        }, 400)
        return () => {
            clearTimeout(timeout)
        }
    }, [open])

    return (
        <AnimatePresence>
            <Modal
                keepMounted
                open={internalOpen}
                onClose={() => setOpen && setOpen(false)}
                component={motion.div}
                variants={{
                    open: {
                        opacity: 1,
                        pointerEvents: "auto",
                        backdropFilter: "blur(8px)",
                    },
                    closed: {
                        opacity: 0,
                        pointerEvents: "none",
                        backdropFilter: "blur(0px)",
                    }
                }}
                initial={"closed"}
                animate={open ? "open" : "closed"}
                exit={"closed"}
                transition={{
                    duration: 0.4,
                }}
            >
                <ModalDialog
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
                        }
                    }}
                    initial={"closed"}
                    animate={internalOpen ? "open" : "closed"}
                    exit={"closed"}
                    transition={{
                        duration: 0.3,
                    }}
                    {...rest}
                >
                    {setOpen && <ModalClose />}
                    {head}
                    {head && <Divider />}
                    <DialogContent>
                        {children}
                    </DialogContent>
                    {actions && <DialogActions>
                        {actions}
                    </DialogActions>}
                </ModalDialog>
            </Modal>
        </AnimatePresence>
    );
}
