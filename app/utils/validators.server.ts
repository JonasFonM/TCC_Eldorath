/* eslint-disable no-var */
export const validateEmail = (email: string): string | undefined => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
      return "Digite um email válido."
    }
  }
  
  export const validatePassword = (password: string): string | undefined => {
    if (password.length < 5) {
      return "Você precisa de uma senha maior que 5 caracteres."
    }
  }
  
  export const validateName = (name: string): string | undefined => {
    if (!name.length) return `Você precisa informar um nome de usuário.`
  }