import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, closeModal } from "../../../store";
import { Modal } from "semantic-ui-react";
import RegisterForm from "../../../features/users/RegisterForm";
import LoginForm from "../../../features/users/LoginForm";

export default function ModalContainer() {
    const dispatch = useDispatch<AppDispatch>();
    const open = useSelector<AppState, boolean>(state => state.modal.open);
    const body = useSelector<AppState, string | null>(state => state.modal.body);

    const modalComponents: { [key: string]: JSX.Element } = {
        'RegisterForm': <RegisterForm />,
        'LoginForm': <LoginForm />
    };

    return (
        <Modal open={open} onClose={() => dispatch(closeModal())} size="mini">
            <Modal.Content>
                {modalComponents[body!]}
            </Modal.Content>
        </Modal>
    )
}


