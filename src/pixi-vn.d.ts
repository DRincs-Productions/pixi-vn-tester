declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelResult {
        newRoute: string
    }
    interface StepLabelProps {
        navigate: (route: string) => void
    }
}
