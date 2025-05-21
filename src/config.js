
  const firstName = {
    name: 'firstname',
    label: 'First Name',
    id: 'firstname',
    minLength: 4,
    maxLength: 60,
    placeholder: 'Enter your first name',
    value: '',
    error: false,
    errorMessage :'',
    type :'text',
  }
 const lastName = {
    name: 'lastname',
    label: 'Last Name',
    id: 'lastname',
    minLength: 1,
    maxLength: 60,
    placeholder: 'Enter your last name',
    value: '',
    error: false,
    type :'text',
    errorMessage :''
  }
  const email=  {
    name: 'email',
    label: 'Enter email',
    id: 'email',
    value: '',
    minLength: 7,
    maxLength: 60,
    placeholder: 'Enter your email',
    error: false,
    errorMessage :'',
    type: "email"
  }
  const password = {
    name: 'password',
    label: 'Password',
    id: 'password',
    value: '',
    minLength: 8,
    maxLength: 60,
    placeholder: 'Enter your password',
    error: false,
    errorMessage :'',
    type :'password',
  }


export const signUp = [firstName,lastName,email,password];

export const login = [email,password];