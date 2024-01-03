const post = {
  firstname: "Anna",
  lastname: "Andersson",
  email: "anna.andersson@gmail.com",
  personalnumber: "550713-1405",
  address: "Utvecklargatan 12",
  zipCode: "111 22",
  city: "Stockholm",
  country: "Sweden",
};

const error = [
  {
    "error": "firstname is missing"
  },
  {
    "error": "email is not valid"
  }
]

describe('test POST contact', () => { 
  it('should return 400 on invalid post', () => {

  })

  it('should return 201 on valid post', () => {
    
  })
 })