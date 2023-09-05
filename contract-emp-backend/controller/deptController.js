require('dotenv').config({ path: './config.env' })
const axios = require('axios');

function substringDepartment(input) {
  const parts = input.split(" ");
  const startingChar = parts[0].charAt(0); // Get the starting character of the first part

  
  if (startingChar === 'ห') {// แผนก
    return parts.slice(0, 3).join(" ");
  } else if (startingChar === 'ม') {//หมวด
    let secondStartingChar = parts[1].charAt(0)
    if (secondStartingChar === "อ") {
      return parts.slice(0, 2).join(" ");
    }else{
      return parts.slice(0, 3).join(" ");
    }
  }
  else if (startingChar === 'ก' || startingChar === "น" || startingChar === "ช" ) {
    return parts.slice(0, 2).join(" ");
  } else if (startingChar === 'อ') {
    return parts[0];
  } else {
    return input; // Return the original input if none of the cases match
  }
}

const getDepartments = async (req, res) => {
  let name = req.params.name
  let url = `https://hrapi.egat.co.th/api/v1/organizations?filter[InNamePath]=${name}`;
  let _token = process.env.HR_API_TOKEN;
  console.log(url)
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ` + _token,
      },
    });
    // console.log(response)
    const result = response.data;
    let departments = result.data;
    let department_names = []

    departments.map((dept) => {
      console.log(dept['org_thai_name_reverse_path'])
      // ตัด string

      department_names.push(substringDepartment(dept['org_thai_name_reverse_path']))

    })

    departments
    let resp = {
      message: "Success",
      status_code: 200,
      data: department_names,
    };
    res.status(200).json(resp)

    // return  {
    //   message: "Success",
    //   status_code: 200,
    //   data: result.data[0],
    // };
  } catch (error) {
    console.error(error);
    return {
      message: "Error fetching organization data",
      status_code: 500,
      data: { result: "" },
    };
  }
}

module.exports = {
  getDepartments
}