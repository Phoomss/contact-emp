const axios = require("axios");

const _token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmJiYTA4Y2MyMzY0YWNmMGVjMWY0YWZjMDRhOGZiNGFiMDNlMWYxYjQ5YTNkM2ZkMjQ0OTUwODk4MDFkNjdhOTFhMDJhMjg4ODMyOTBkMzQiLCJpYXQiOjE2ODc5MjgwODcsIm5iZiI6MTY4NzkyODA4NywiZXhwIjoxNzE5NTUwNDg3LCJzdWIiOiI3OCIsInNjb3BlcyI6W119.o4cdga4N0eSWtujzifA9njLMMB2p7KcqEbm40MRCrptgoJDqyvKDTxZoo5UwRQVJgyDZsU7VKO3oe0iesywt9uek-_xNmRTwV_20O0lwljNk4Su_AZfDr62mNNXB_5WqSLSgBaaspOww3iou28pwfmFUSEupulfkCjR8tiQ0TbuQ72rhv8MO8D_CThJq2W1AtDSvmx6SStuuCclT6137Va8PI7zWYtc629UXIsKW-iEUgnmqvjmqTqCNtYUIERIU7neOIdKcntwpsq6fe0c5TcBNXDlGkiFjrHfjm199HlfIOcSWd80Jl-UROizU64nxm70FSQdLrjC8-DDiWXaEBU6K7GxrbKiyYxc2WQYTa6Y0WyyU-32yyXJH9nuUEAnHTD9Bic6eNSIPlRTLEHJeGSjAbqgWX8NOxj4sHiwWHcbVIvU32EQtqSrG7V5mewirpdpYbMz51sz4JPEluNd8p2jfNx6Iw19RTp2cZE4Dk9og2o48DcnSRDt3WG4fFyauDHTjDH4s92WC8SGOEgn_zTMkgC4OZ1snCszncXz2BRvIp3_fEGCW8m66bXP09dUz6uACIN9pYM4Fz7cFHxl8dZqzyAcfQP1feK8f7Ba9mu_9zXh2N-B9CsRiG2oJc5ry3iBJqWMgaEI97IQIyQ9JkjKJsf2mcj24yBmbHLG4GGU"
exports.getEmpData = async (req, res) => {
  let empId = req.params.emp_id;
  let empParam = "work_locations,positions"
  let url = `https://hrapi.egat.co.th/api/v1/persons?filter[PersonCode]=00${empId}&include=${empParam}`;
  console.log(url)
  const header = {
    headers: {
      Authorization: "Bearer " + _token, //the token is a variable which holds the token
    },
  };
  let result = '';
  let message = '';
  let status_code = '';

  await axios.get(url, header)
    .then(
      (response) => {
        // console.log(response.data)
        message = 'เข้าสู่ระบบ',
          status_code = 200,
          result = response.data
      }
    ).catch((e) => console.log(e))

  if (!result.data) {
    message = 'ข้อมูลของท่านไม่ถูกต้อง',
      status_code = 422,
      result = ""
  }
  res.send({
    message,
    status_code,
    data: { result }
  })
};
