import { useState } from 'react';

export const useForm = <T extends Object>( formData: T ) => {
    
    const [form, setForm] = useState( formData );

    const onChange = ( value: string, key: keyof T ) => {
        setForm({
            ...form,
            [key]: value
        });
    }

    return {
        ...form,
        form,
        onChange,
    }

}
