import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InterfaceInfoFormModel } from '../models/InterfaceInfoFormModel';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function SkipAutoInterceptor({ interfaceInfoForm, nextOnClick }: {
    nextOnClick: (props: StepLabelProps) => Promise<void>,
    interfaceInfoForm: UseFormReturn<InterfaceInfoFormModel, any, undefined>,
}) {
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const skipEnabled = interfaceInfoForm.watch('skipEnabled')
    const autoEnabled = interfaceInfoForm.watch('autoEnabled')
    const [recheckSkipAuto, setRecheckSkipAuto] = useState<number>(0)

    useEffect(() => {
        if (skipEnabled || autoEnabled) {
            nextOnClick({
                t,
                navigate,
            }).then(() => {
                nextOnClickInternal()
            })
        }
    }, [skipEnabled, recheckSkipAuto, autoEnabled])

    function nextOnClickInternal() {
        if (skipEnabled) {
            setTimeout(() => {
                setRecheckSkipAuto((p) => p + 1)
            }, 200);
        }
        else if (autoEnabled) {
            let autoForwardSecond = localStorage.getItem('auto_forward_second')
            if (autoForwardSecond) {
                let millisecond = parseInt(autoForwardSecond) * 1000
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, millisecond);
            }
        }
    }

    return null
}
