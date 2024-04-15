import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { afterLoadEventState } from './atoms/afterLoadEventState';
import { addRefreshSave, loadRefreshSave } from './utility/ActionsUtility';

export default function EventInterceptor() {
    const notifyLoadEvent = useSetRecoilState(afterLoadEventState);
    const navigate = useNavigate();

    useEffect(() => {
        loadRefreshSave(navigate, () => notifyLoadEvent((prev) => prev + 1))
        window.addEventListener("beforeunload", addRefreshSave);
        return () => {
            window.removeEventListener("beforeunload", addRefreshSave);
        };
    }, []);

    return null
}
