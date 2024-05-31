import { DialogActions, DialogContent, Divider, ModalClose } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

interface ModalDialogCustomProps extends ModalDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
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
        <Modal
            keepMounted
            open={internalOpen}
            onClose={() => setOpen(false)}
            component={motion.div}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: open ? 1 : 0,
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                duration: 0.4,
            }}
        >
            <ModalDialog
                sx={{
                    ...sx,
                }}
                component={motion.div}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: open ? 1 : 0,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
                {...rest}
            >
                <ModalClose />
                {head}
                <Divider />
                <DialogContent>
                    {children}
                </DialogContent>
                {actions && <DialogActions>
                    {actions}
                </DialogActions>}
            </ModalDialog>
        </Modal>
    );
}
