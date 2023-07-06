const soap = require('soap')

const authenticationClient = async () => {
  try {

    const client = await soap.createClientAsync('http://webservices.egat.co.th/authentication/au_provi.php?wsdl')

    return client
  } catch (error) {
    console.error('😈 Error authenticationClient :', error)
  }
}

module.exports = {
  authenticationClient
}
