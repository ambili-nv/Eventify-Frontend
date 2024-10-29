import { nameRegex, emailRegex } from "../constants";

type SignupValidation = Partial<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}>;

const validateSignUp = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}) => {
    const { name, email, password, confirmPassword} = values;
    const errors: SignupValidation = {};

    // Name validate
    if (!name.trim().length) {
        errors.name = "Required*";
    } else if (name.length > 20) {
        errors.name = "Must be 20 characters or less.";
    } else if (!nameRegex.test(name)) {
        errors.name = "First letter must be capital and no leading or trailing spaces.";
    }

    // Email validate
    if (!email.trim().length) {
        errors.email = "Required*";
    } else if (!emailRegex.test(email)) {
        errors.email = "Invalid email format.";
    }

    // Password validate
    if (!password.trim().length) {
        errors.password = "Required*";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
    } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        errors.password = "Password must contain uppercase and lowercase letters.";
    } else if (!/\d/.test(password)) {
        errors.password = "Password must contain at least one digit.";
    } else if (!/[@$!%*?&]/.test(password)) {
        errors.password = "Password must contain at least one special character.";
    }

    // ConfirmPassword validate
    if (!confirmPassword.trim().length) {
        errors.confirmPassword = "Required*";
    } else if (confirmPassword.length !== password.length || confirmPassword !== password) {
        errors.confirmPassword = "Password is not matching";
    }

    return errors;
};


function validateLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim().length) {
      errors.email = "Required*";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }
    if (!password.trim().length) {
      errors.password = "Password is Required*";
    }
    return errors;
  }
  
  


// validations/serviceValidation.ts
const validateService = (values: {
    title: string;
    category: string;
    price: number;
    description: string;
    location: string;
    contactDetails: {
      phone: string;
      email: string;
    };
  }) => {
    const errors: any = {};
  
    // Title validation
    if (!values.title.trim()) {
      errors.title = "Required*";
    } else if (!/^[A-Z]/.test(values.title.trim())) {
      errors.title = "Title must start with a capital letter.";
    }
  
    // Category validation
    if (!values.category) {
      errors.category = "Required*";
    }
  
    // Price validation
    if (values.price <= 0) {
      errors.price = "Price must be a positive number.";
    }
  
    // Description validation
    if (!values.description.trim()) {
      errors.description = "Required*";
    }
  
    // Location validation
    if (!values.location.trim()) {
      errors.location = "Required*";
    } else if (!/^[A-Z]/.test(values.location.trim())) {
      errors.location = "Location must start with a capital letter.";
    }
  
    // Contact details validation
    if (!values.contactDetails.phone.trim()) {
      errors.contactDetails = errors.contactDetails || {};
      errors.contactDetails.phone = "Required*";
    } else if (!/^\d{10}$/.test(values.contactDetails.phone)) {
      errors.contactDetails = errors.contactDetails || {};
      errors.contactDetails.phone = "Phone number must be 10 digits.";
    }
  
    if (!values.contactDetails.email.trim()) {
      errors.contactDetails = errors.contactDetails || {};
      errors.contactDetails.email = "Required*";
    }
  
    return errors;
  };
    

export { 
    validateSignUp,
    validateLogin,
    validateService
 };
