export class Form {
  inputMandatoryFields(
    email: unknown,
    password: unknown,
  ): {
    isValid: boolean;
    errors: { email?: string; password?: string };
  } {
    const errors: { email?: string; password?: string } = {};

    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === undefined || email === null || email === "") {
      errors.email = "Email is mandatory";
    } else if (typeof email !== "string") {
      errors.email = "Email must be a string";
    } else if (!isValidEmail.test(email.trim())) {
      errors.email = "Wrong email";
    }

    if (password === undefined || password === null || password === "") {
      errors.password = "Password is mandatory";
    } else if (typeof password !== "string") {
      errors.password = "Password must be a string";
    } else {
      const pwd = password;

      if (pwd.length < 8 || pwd.length > 15) {
        errors.password = "Password must be from 8 to 15 symbols";
      }

      if (!/[A-Z]/.test(pwd)) {
        errors.password = errors.password
          ? errors.password + "; At least one capital letter mandatory"
          : "At least one capital letter mandatory";
      }

      if (!/\d/.test(pwd)) {
        errors.password = errors.password
          ? errors.password + "; At least one digit mandatory"
          : "At least one digit mandatory";
      }

      if (!/[!@_$&*?()\-\+]/.test(pwd)) {
        errors.password = errors.password
          ? errors.password + "; At least one special symbol mandatory"
          : "At least one special symbol mandatory (!@_$&*()-+)";
      }
    }
    const isValid = Object.keys(errors).length === 0;
    console.log(isValid, errors);
    return { isValid, errors };
  }

  inputOptionalFields(
    age?: unknown,
    phone?: unknown,
    country?: unknown,
  ): {
    isValid: boolean;
    errors: { age?: string; phone?: string; country?: string };
  } {
    const errors: { age?: string; phone?: string; country?: string } = {};
    const isProvided = (value: unknown) =>
      value !== undefined && value !== null && value !== "";

    if (isProvided(age)) {
      if (typeof age !== "number" || Number.isNaN(age)) {
        errors.age = "Age must be a number";
      } else if (age < 18 || age > 99) {
        errors.age = "Age should be from 18 to 99 years";
      }
    }

    if (isProvided(phone)) {
      if (typeof phone !== "string" && typeof phone !== "number") {
        errors.phone = "Phone must be a string or number";
      } else {
        const cleaned = phone.toString().replace(/\s+/g, "");
        if (!/^\+?[1-9]\d{1,14}$/.test(cleaned)) {
          errors.phone = "Wrong phone number";
        }
      }
    }

    if (isProvided(country)) {
      if (typeof country !== "string") {
        errors.country = "Country must be a string";
      } else {
        const trimmed = country.trim();
        if (trimmed.length < 2 || trimmed.length > 50) {
          errors.country =
            "Country can not be shorter than 2 characters or longer than 50";
        }
      }
    }

    const isValid = Object.keys(errors).length === 0;
    console.log(isValid, errors);
    return { isValid, errors };
  }
}
