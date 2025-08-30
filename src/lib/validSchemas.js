import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(20, "Максимум 20 символів")
    .required("Введіть ім’я користувача"),
  email: Yup.string()
    .email("Некоректний email")
    .required("Email обов’язковий"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обов’язковий"),
});

export const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некоректний email")
    .required("Email обов’язковий"),
  password: Yup.string().required("Пароль обов’язковий"),
});