import { Button, Input } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dialogDataState } from '../atoms/dialogDataState';
import { textInputOptionsState } from '../atoms/textInputOptionsState';
import ModalDialogCustom from '../components/ModalDialog';
import TypewriterMarkdown from '../components/TypewriterMarkdown';

export default function TextInput() {
    const { text } = useRecoilValue(dialogDataState)
    const [{ open }, setOptions] = useRecoilState(textInputOptionsState);
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
                        setOptions((prev) => ({ ...prev, open: false }))
                    }}
                >
                    {t("confirm")}
                </Button>
                <Input />
            </>}
        >
            {text && <TypewriterMarkdown
                text={text}
            />}
        </ModalDialogCustom>
    );
}
