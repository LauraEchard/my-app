export default function (
  user = { firstname: "", lastname: "", age: "", gender: "", proba: 0 },
  action: any
) {
  if (action.type === "addUser") {
    // REGISTER INFORMATION FROM FIRST FORM
    user.firstname = action.firstname;
    user.lastname = action.lastname;
    return user;
  } else if (action.type === "addAge") {
    // REGISTER INFORMATION FROM SECOND FORM
    user.age = action.age;
    return user;
  } else if (action.type === "addGender") {
    // REGISTER INFORMATION FROM GENDER API
    user.gender = action.gender;
    user.proba = action.proba;
    return user;
  } else {
    return user;
  }
}
