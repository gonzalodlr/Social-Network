/** @format */

export function passwordValidator(password) {
  if (!password) return "Please fill in this field.";
  if (password.length < 1)
    return "Password should contain at least 1 characters.";
  return "";
}