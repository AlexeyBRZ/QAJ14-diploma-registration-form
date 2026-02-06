import { Form } from "../form";

const validEmail = "testemail@test.com";
const validPassword = "Password!3";

describe("Positive tests", () => {
  let form: Form;
  beforeEach(() => (form = new Form()));

  test("check valid inputs", () => {
    const result = form.inputMandatoryFields(
      "testemail@test.com",
      "Password!3",
    );
    expect(result.isValid).toBe(true);
  });

  test("check correct values for all input fields", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      "PPPAAAs4$",
    );
    const resultOfOptional = form.inputOptionalFields(
      43,
      +7373737373,
      "Morocco",
    );
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for all fields but without country", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      "mmmM8?????",
    );
    const resultOfOptional = form.inputOptionalFields(99, +7373737373, "");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for all fields but without age", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      "mmmM8?????",
    );
    const resultOfOptional = form.inputOptionalFields(
      undefined,
      +7373737373,
      "Morocco",
    );
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for all fields but without phone", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      "PassP$yt9",
    );
    const resultOfOptional = form.inputOptionalFields(18, "", "Latvia");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for Mandatory fields but only with age", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields(43, "", undefined);
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for Mandatory fields but only with phone", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields(
      undefined,
      +7373737373,
      "",
    );
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for Mandatory fields but only with country", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields("", undefined, "Greece");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for Mandatory fields but only with phone", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields("", +7373737373, "");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });

  test("check correct values for Mandatory fields and nulls for optional", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields(null, null, null);
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.isValid).toBe(true);
  });
});

describe("Negative tests", () => {
  let form: Form;
  beforeEach(() => (form = new Form()));

  test("check if invalid email", () => {
    const result = form.inputMandatoryFields("wrongmail", validPassword);
    expect(result.errors).toEqual({ email: "Wrong email" });
  });

  test("check if email field emty and correct password", () => {
    const result = form.inputMandatoryFields("", validPassword);
    expect(result.errors).toEqual({ email: "Email is mandatory" });
  });

  test("check if password without digit", () => {
    const result = form.inputMandatoryFields(validEmail, "Password!");
    expect(result.errors).toEqual({ password: "At least one digit mandatory" });
  });

  test("check if password without special symbol", () => {
    const result = form.inputMandatoryFields(validEmail, "Password90");
    expect(result.errors).toEqual({
      password: "At least one special symbol mandatory (!@_$&*()-+)",
    });
  });

  test("check if password too short", () => {
    const result = form.inputMandatoryFields(validEmail, "Pas@90");
    expect(result.errors).toEqual({
      password: "Password must be from 8 to 15 symbols",
    });
  });

  test("check if password too long", () => {
    const result = form.inputMandatoryFields(
      validEmail,
      "Password90&ejvnefknmclkxmexkwfndmcejwndfmcj4980598309840580934ejvnefknmclkxmexkwfndmcejwndfmcj4980598309840580934ejvnefknmclkxmexkwfndmcejwndfmcj4980598309840580934",
    );
    expect(result.errors).toEqual({
      password: "Password must be from 8 to 15 symbols",
    });
  });

  test("check errors if email and password are empty", () => {
    const result = form.inputMandatoryFields(undefined, "");
    expect(result.errors).toEqual({
      password: "Password must be from 8 to 15 symbols",
      email: "Email is mandatory",
      password: "Password is mandatory",
    });
  });

  test("check wrong value for age field", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields("WrongAge");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.errors).toEqual({ age: "Age must be a number" });
  });

  test("check wrong value for phone field", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields(77, "$$$@^&$");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.errors).toEqual({ phone: "Wrong phone number" });
  });

  test("check wrong value for country field", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields("", undefined, 89);
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.errors).toEqual({
      country: "Country must be a string",
    });
  });

  test("check too short value for country field", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields("", undefined, "g");
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.errors).toEqual({
      country: "Country can not be shorter than 2 characters or longer than 50",
    });
  });

  test("check too long value for country field", () => {
    const resultOfmandotory = form.inputMandatoryFields(
      validEmail,
      validPassword,
    );
    const resultOfOptional = form.inputOptionalFields(
      undefined,
      "",
      "CountryCOuntryKKKCountryCOuntryKKKCountryCOuntryKKKCountryCOuntryKKKCountryCOuntryKKKCountryCOuntryKKK",
    );
    expect(resultOfmandotory.isValid).toBe(true);
    expect(resultOfOptional.errors).toEqual({
      country: "Country can not be shorter than 2 characters or longer than 50",
    });
  });
});
