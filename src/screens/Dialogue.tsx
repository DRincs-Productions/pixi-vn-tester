import { GameWindowManager } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogDataState } from '../atoms/dialogDataState';
import { dialogueCardHeightState } from '../atoms/dialogueCardHeightState';
import { typewriterDelayState } from '../atoms/typewriterDelayState';
import DragHandleDivider from '../components/DragHandleDivider';
import SliderResizer from '../components/SliderResizer';
import TypewriterMarkdown from '../components/TypewriterMarkdown';
import { resizeWindowsHandler } from '../utility/ComponentUtility';
import ChoicesMenu from './ChoicesMenu';
import NextButton from './NextButton';

export default function Dialogue({ nextOnClick }: {
    nextOnClick: (props: StepLabelProps) => void,
}) {
    const [windowSize] = useState({
        x: 0,
        y: 300 * GameWindowManager.screenScale,
    });
    const [imageSize, setImageSize] = useState({
        x: 300 * GameWindowManager.screenScale,
        y: 0,
    })
    const [cardHeight, setCardHeight] = useRecoilState(dialogueCardHeightState)
    const typewriterDelay = useRecoilValue(typewriterDelayState)
    const { text, character, hidden } = useRecoilValue(dialogDataState)

    return (
        <>
            <ChoicesMenu
                marginButton={windowSize.y + 50}
                fullscreen={text ? false : true}
            />
            <Box
                sx={{
                    height: '90%',
                    width: '100%',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                }}
            >
                <SliderResizer
                    orientation="vertical"
                    max={100}
                    min={0}
                    value={cardHeight}
                    onChange={(_, value) => {
                        if (typeof value === "number") {
                            // if (value > 75) {
                            //     value = 75
                            // }
                            setCardHeight(value)
                        }
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        height: `${cardHeight}%`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <AnimatePresence>
                        <Box
                            sx={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                height: "100%",
                            }}
                            component={motion.div}
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    pointerEvents: "auto",
                                },
                                closed: {
                                    opacity: 0,
                                    y: 200,
                                    pointerEvents: "none",
                                }
                            }}
                            initial={"closed"}
                            animate={hidden ? "closed" : "open"}
                            exit={"closed"}
                            transition={{ type: "tween" }}
                        >
                            <Card
                                key={"dialogue-card"}
                                orientation="horizontal"
                                sx={{
                                    overflow: 'auto',
                                    gap: 1,
                                    padding: 0,
                                    height: "100%",
                                }}
                            >
                                {character && <AspectRatio
                                    flex
                                    ratio="1"
                                    maxHeight={"20%"}
                                    sx={{
                                        height: "100%",
                                        minWidth: imageSize.x,
                                    }}
                                    component={motion.div}
                                    variants={{
                                        open: {
                                            opacity: 1,
                                            scale: 1,
                                            pointerEvents: "auto",
                                        },
                                        closed: {
                                            opacity: 0,
                                            scale: 0,
                                            pointerEvents: "none",
                                        }
                                    }}
                                    initial={"closed"}
                                    animate={character?.icon ? "open" : "closed"}
                                    exit={"closed"}
                                    transition={{ type: "tween" }}
                                >
                                    <img
                                        src={character?.icon}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>}
                                {character && <Box
                                    component={motion.div}
                                    variants={{
                                        open: {
                                            opacity: 1,
                                            x: 0,
                                            pointerEvents: "auto",
                                        },
                                        closed: {
                                            opacity: 0,
                                            x: -100,
                                            pointerEvents: "none",
                                        }
                                    }}
                                    initial={"closed"}
                                    animate={character?.icon ? "open" : "closed"}
                                    exit={"closed"}
                                    transition={{ type: "tween" }}
                                >
                                    <DragHandleDivider
                                        orientation="vertical"
                                        onMouseDown={(e) => resizeWindowsHandler(e, imageSize, setImageSize)}
                                        sx={{
                                            width: 0,
                                            height: "100%",
                                            left: -8,
                                        }}
                                    />
                                </Box>}
                                <CardContent>
                                    <AnimatePresence>
                                        {character && character.name && <Typography
                                            fontSize="xl"
                                            fontWeight="lg"
                                            sx={{
                                                color: character.color,
                                            }}
                                            component={motion.div}
                                            variants={{
                                                open: {
                                                    opacity: 1,
                                                    pointerEvents: "auto",
                                                    scale: 1,
                                                },
                                                closed: {
                                                    opacity: 0,
                                                    pointerEvents: "none",
                                                    scale: 0,
                                                }
                                            }}
                                            initial={"closed"}
                                            animate={character.name ? "open" : "closed"}
                                            exit={"closed"}
                                        >
                                            {character.name + (character.surname ? " " + character.surname : "")}
                                        </Typography>}
                                    </AnimatePresence>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            minHeight: 10,
                                            display: 'flex',
                                            flex: 1,
                                            overflow: 'auto',
                                            height: "100%",
                                            marginRight: 2,
                                            marginBottom: 2,
                                        }}
                                    >
                                        <TypewriterMarkdown
                                            text={text || ""}
                                            delay={typewriterDelay}
                                        />
                                    </Sheet>
                                </CardContent>
                            </Card>
                        </Box>
                        <NextButton
                            nextOnClick={nextOnClick}
                        />
                    </AnimatePresence>
                </Box>
            </Box>
        </>
    );
}
