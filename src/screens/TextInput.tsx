import { Button, Input } from '@mui/joy';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogDataState } from '../atoms/dialogDataState';
import { inputOptionsState } from '../atoms/inputOptionsState';
import ModalDialogCustom from '../components/ModalDialog';
import TypewriterMarkdown from '../components/TypewriterMarkdown';

export default function TextInput() {
    const { text } = useRecoilValue(dialogDataState)
    const [{ open, currentValue, type }, setOptions] = useRecoilState(inputOptionsState);
    const [tempValue, setTempValue] = useState(currentValue);
    const { t } = useTranslation(["translation"]);

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
                    onChange={(e) => setTempValue(e.target.value)}
                />
            </>}
        >
            {text && <TypewriterMarkdown
                text={text}
            />}
        </ModalDialogCustom>
    );
}
