import *as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  name: Yup.string().min(3, 'Mínimo 3 caracteres').required('El nombre es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});
