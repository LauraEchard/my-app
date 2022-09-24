export default function (
  user = { firstname: "", lastname: "", age: "", gender: "", proba: 0 },
  action: any
) {
  if (action.type === "addUser") {
    console.log("reducer NAME", action.firstname, action.lastname);
    user.firstname = action.firstname;
    user.lastname = action.lastname;
    return user;
  } else if (action.type === "addAge") {
    console.log("reducer AGE =>", user.age);
    user.age = action.age;
    return user;
  } else if (action.type === "addGender") {
    console.log("reducer GENDER =>", user.gender, user.proba);
    user.gender = action.gender;
    user.proba = action.proba;
    return user;
  } else {
    return user;
  }
}
