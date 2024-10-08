import { Button, Input } from '@mui/joy';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogDataState } from '../../atoms/dialogDataState';
import { inputOptionsState } from '../../atoms/inputOptionsState';
import ModalDialogCustom from '../../components/ModalDialog';
import TypewriterMarkdown from '../../components/TypewriterMarkdown';

export default function TextInput() {
    const { text } = useRecoilValue(dialogDataState)
    const [{ open, type }, setOptions] = useRecoilState(inputOptionsState);
    const [tempValue, setTempValue] = useState();
    const { t } = useTranslation(["interface"]);

    return (
        <ModalDialogCustom
            open={open}
            color="primary"
            actions={<>
                <Button
                    key={'exit'}
                    color='primary'
                    variant="outlined"
                    onClick={() => {
                        setOptions((prev) => ({ ...prev, currentValue: tempValue }));
                    }}
                >
                    {t("confirm")}
                </Button>
                <Input
                    value={tempValue}
                    type={type}
                    onChange={(e) => {
                        let value: any = e.target.value;
                        if (e.target.type === "number") {
                            value = e.target.valueAsNumber
                        }
                        setTempValue(value)
                    }}
                />
            </>}
        >
            {text && <TypewriterMarkdown
                text={text}
            />}
        </ModalDialogCustom>
    );
}
