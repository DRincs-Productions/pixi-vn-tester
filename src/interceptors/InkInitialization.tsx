import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initializeInk } from '../utilities/ink-utility';
import { useMyNavigate } from '../utilities/navigate-utility';

export default function InkInitialization() {
    const navigate = useMyNavigate();
    const { t: tNarration } = useTranslation(["narration"]);

    useEffect(() => {
        initializeInk({ navigate, t: tNarration })
    }, [])

    return null
}
