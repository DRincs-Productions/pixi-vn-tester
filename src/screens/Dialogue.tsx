import { GameWindowManager } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Button } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { typewriterDelayState } from '../atoms/typewriterDelayState';
import DragHandleDivider from '../components/DragHandleDivider';
import Typewriter from '../components/Typewriter';
import DialogueDataEventInterceptor from '../interceptors/DialogueDataEventInterceptor';
import { DialogueFormModel } from '../models/DialogueFormModel';
import { InterfaceInfoFormModel } from '../models/InterfaceInfoFormModel';
import { resizeWindowsHandler } from '../utility/ComponentUtility';
import { useMyNavigate } from '../utility/useMyNavigate';
import DialogueMenu from './DialogueMenu';

export default function Dialogue({ interfaceInfoForm, nextOnClick }: {
    interfaceInfoForm: UseFormReturn<InterfaceInfoFormModel, any, undefined>,
    nextOnClick: (props: StepLabelProps) => void,
}) {
    const dialogueForm = useForm<DialogueFormModel>({
        defaultValues: {
            character: undefined,
            text: undefined,
            menu: undefined,
            showDialogueCard: true,
            showNextButton: true,
        },
    });
    const [windowSize, setWindowSize] = useState({
        x: 0,
        y: 300 * GameWindowManager.screenScale,
    });
    const [imageSize, setImageSize] = useState({
        x: 300 * GameWindowManager.screenScale,
        y: 0,
    })

    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const typewriterDelay = useRecoilValue(typewriterDelayState)
    const text = dialogueForm.getValues('text')

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Enter' || event.code == 'Space') {
            nextOnClick({
                t,
                navigate,
            })
            interfaceInfoForm.setValue('skipEnabled', false)
        }
    }

    return (
        <>
            <DialogueDataEventInterceptor
                dialogueForm={dialogueForm}
                interfaceInfoForm={interfaceInfoForm}
            />
            <DialogueMenu
                dialogueWindowHeight={windowSize.y + 50}
                fullscreen={text ? false : true}
                dialogueForm={dialogueForm}
            />
            <Box
                sx={{
                    width: '100%',
                    position: "absolute",
                    bottom: { xs: 14, sm: 18, md: 20, lg: 24, xl: 30 },
                    left: 0,
                    right: 0,
                }}
            >
                <Controller
                    control={dialogueForm.control}
                    name="showDialogueCard"
                    render={({ field: { value: showDialogueCard } }) => (
                        <Box
                            sx={{
                                position: "absolute",
                                top: -5,
                                width: "100%",
                                zIndex: 100,
                            }}
                            component={motion.div}
                            animate={{
                                opacity: showDialogueCard ? 1 : 0,
                                y: showDialogueCard ? 0 : windowSize.y,
                                pointerEvents: showDialogueCard ? "auto" : "none",
                            }}
                            transition={{ type: "tween" }}
                        >
                            <DragHandleDivider
                                orientation="horizontal"
                                onMouseDown={(e) => resizeWindowsHandler(e, windowSize, setWindowSize)}
                            />
                        </Box>
                    )}
                />
                <Controller
                    control={dialogueForm.control}
                    name="showDialogueCard"
                    render={({ field: { value: showDialogueCard } }) => (
                        <Card
                            orientation="horizontal"
                            sx={{
                                overflow: 'auto',
                                height: windowSize.y,
                                gap: 1,
                            }}
                            component={motion.div}
                            animate={{
                                opacity: showDialogueCard ? 1 : 0,
                                y: showDialogueCard ? 0 : windowSize.y,
                                pointerEvents: showDialogueCard ? "auto" : "none",
                            }}
                            transition={{ type: "tween" }}
                        >
                            <Controller
                                control={dialogueForm.control}
                                name="character"
                                render={({ field: { value: character } }) => {
                                    if (!character?.icon) {
                                        return <></>
                                    }
                                    return (<>
                                        <AspectRatio
                                            flex
                                            ratio="1"
                                            maxHeight={"20%"}
                                            sx={{
                                                height: "100%",
                                                minWidth: imageSize.x,
                                            }}
                                        >
                                            <img
                                                src={character.icon}
                                                loading="lazy"
                                                alt=""
                                            />
                                        </AspectRatio>
                                        <DragHandleDivider
                                            orientation="vertical"
                                            onMouseDown={(e) => resizeWindowsHandler(e, imageSize, setImageSize)}
                                            sx={{
                                                width: 0,
                                                left: -8,
                                            }}
                                        />
                                    </>)
                                }}
                            />
                            <CardContent>
                                <Controller
                                    control={dialogueForm.control}
                                    name="character"
                                    render={({ field: { value: character } }) => (
                                        <>
                                            {character && character.name && <Typography fontSize="xl" fontWeight="lg"
                                                sx={{
                                                    color: character.color,
                                                }}

                                            >
                                                {character.name + (character.surname ? " " + character.surname : "")}
                                            </Typography>}
                                        </>
                                    )}
                                />
                                <Sheet
                                    sx={{
                                        bgcolor: 'background.level1',
                                        borderRadius: 'sm',
                                        p: 1.5,
                                        minHeight: 10,
                                        display: 'flex',
                                        flex: 1,
                                        overflow: 'auto',
                                    }}
                                >
                                    {typewriterDelay !== 0
                                        ? <Typewriter
                                            text={text || ""}
                                            delay={localStorage.getItem('typewriter_delay_millisecond')! as unknown as number}
                                        />
                                        : text}
                                </Sheet>
                            </CardContent>
                        </Card>
                    )}
                />
                <Controller
                    control={dialogueForm.control}
                    name="showNextButton"
                    render={({ field: { value: showNextButton } }) => (
                        <Controller
                            control={interfaceInfoForm.control}
                            name="nextStepLoading"
                            render={({ field: { value: loading } }) => (
                                <Button
                                    variant="solid"
                                    color="primary"
                                    size="sm"
                                    loading={loading}
                                    sx={{
                                        position: "absolute",
                                        bottom: -10,
                                        right: 0,
                                        width: { xs: 70, sm: 100, md: 150 },
                                        border: 3,
                                        zIndex: 100,
                                    }}
                                    onClick={() => {
                                        interfaceInfoForm.setValue('skipEnabled', false)
                                        nextOnClick({
                                            t,
                                            navigate,
                                        })
                                    }}
                                    component={motion.div}
                                    animate={{
                                        opacity: showNextButton ? 1 : 0,
                                        y: showNextButton ? 0 : 0,
                                        pointerEvents: showNextButton ? "auto" : "none",
                                    }}
                                    transition={{ type: "spring" }}
                                >
                                    {t("next")}
                                </Button>
                            )}
                        />
                    )}
                />
            </Box>
        </>
    );
}
