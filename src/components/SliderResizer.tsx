import { Slider, SliderProps, Stack, useTheme } from "@mui/joy";

export default function SliderResizer(props: SliderProps) {
    const {
        orientation,
        sx,
        ...rest
    } = props;

    return (
        <Stack
            direction={orientation === "vertical" ? "row" : "column"}
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
                pointerEvents: "none",
                width: '100%',
                height: '100%',
                position: "absolute",
                bottom: 33,
                left: 0,
                right: 0,
            }}
        >
            <Slider
                orientation={orientation}
                sx={{
                    cursor: orientation === "vertical" ? "row-resize" : "col-resize",
                    position: "static",
                    pointerEvents: "none",
                    bottom: 33,
                    zIndex: useTheme().zIndex.table + 1,
                    "--Slider-trackSize": "0px",
                    "--Slider-thumbWidth": "42px",
                    "--Slider-thumbSize": "16px",
                    "& .MuiSlider-thumb": {
                        pointerEvents: "auto",
                    },
                    ...sx,
                }}
                {...rest}
            />
        </Stack>
    );
}
