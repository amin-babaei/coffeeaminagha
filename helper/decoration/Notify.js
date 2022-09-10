import { useContext } from "react";
import { DataContext } from "../../store/GlobaStore";
import Snack from "./Snack";

const Notify = () => {
    const {state, dispatch} = useContext(DataContext)
    const { notify } = state

    return (
        <>
            {notify.error &&
                <Snack
                    msg={{ msg: notify.error}}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    type="error"
                />
            }

            {notify.success &&
                <Snack
                    msg={{ msg: notify.success }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    type="success"
                />
            }
        </>
    );
}

export default Notify;