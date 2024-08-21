import './Message.scss'

import { useState, useEffect } from 'react'

const Message = ({ message, onClose }) => {

    const [type, setType] = useState('')

    useEffect(() => {

        if (message.includes('sucesso')) setType('success');
        if (message.includes('Erro')) setType('error');

        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose])

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    )
}

export default Message
