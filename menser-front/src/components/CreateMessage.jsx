
import React, { useState } from "react";
import { Button, Textarea, Label, TextInput } from "flowbite-react";

import setToast from '../utils/toast.utils';



export default function CreateMessage() {
    const [formFields, setFormFields] = useState({
        user: '',
        header: '',
        message: ''
    });
    const [fieldErrors, setFieldErrors] = useState({
        user: false,
        message: false
    });

    const validateFields = () => {
        if (!formFields.user || !formFields.message) {
            setToast('error', 'Preencha os campos obrigatórios.');
            setFieldErrors({
                email: !formFields.user,
                password: !formFields.message,
            });
            return true;
        }
        return false;
    }

    const handleChange = (name, value) => {
        setFormFields({ ...formFields, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: false });
    };

    const handleClick = () => {
        const hasError = validateFields();
        if (!hasError) {
            console.log('createMessage');
            //  redirect '/'
        }
    }
    return (
        <form className="flex flex-col gap-4 px-4">
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="user" value="*Destinatário:" />
                </div>
                <TextInput onChange={(e) => handleChange('user', e.target.value)} id="user" type="text" placeholder="usuário" required />
            </div>
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="header" value="Cabeçalho:" />
                </div>
                <TextInput onChange={(e) => handleChange('header', e.target.value)} id="header" type="text" />
            </div>
            <div className="w-10/12">
                <div className="mb-2 block">
                    <Label htmlFor="content" value="*Mensagem:" />
                </div>
                <Textarea onChange={(e) => handleChange('message', e.target.value)} id="content" placeholder="Mensagem..." required rows={10} className="resize-none" />
            </div>
            <Button className="max-w-md" onClick={handleClick}>Enviar</Button>
        </form>
    );
}
