import { Card, CardContent, CardProps, Radio } from "@mui/joy";

export default function SettingButton({ children, sx, ...rest }: {} & CardProps) {
    return (
        <Card
            sx={{
                boxShadow: 'none',
                '&:hover': { bgcolor: 'background.level1' },
                ...sx,
            }}
            {...rest}
        >
            <CardContent>
                {children}
            </CardContent>
            <Radio
                disableIcon
                overlay
                // checked={type === item.name}
                variant="outlined"
                color="neutral"
                // value={item.name}
                sx={{ mt: -2 }}
                slotProps={{
                    action: {
                        sx: {
                            // ...(type === item.name && {
                            //     borderWidth: 2,
                            //     borderColor:
                            //         'var(--joy-palette-primary-outlinedBorder)',
                            // }),
                            '&:hover': {
                                bgcolor: 'transparent',
                            },
                        },
                    },
                }}
            />
        </Card>
    );
}
