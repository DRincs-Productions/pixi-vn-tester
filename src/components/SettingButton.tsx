import { Card, CardContent, CardProps, Checkbox, useTheme } from "@mui/joy";

export default function SettingButton({ children, checked, sx, onChange, ...rest }: {
    checked?: boolean;
} & CardProps) {
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
            <Checkbox
                disableIcon
                overlay
                checked={true}
                variant="outlined"
                color="neutral"
                onChange={onChange}
                sx={{ mt: -2 }}
                slotProps={{
                    action: {
                        sx: {
                            borderWidth: checked ? 2 : undefined,
                            borderColor: checked ? useTheme().palette.primary.outlinedBorder : undefined,
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
