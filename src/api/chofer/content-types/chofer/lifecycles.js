const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let estadoAnterior = null;
module.exports = {
  beforeUpdate(event){
    console.log("event >", event);
    const { data } = event.params;
    console.log("data >", data);
    estadoAnterior = data.estado;
  },
  async afterUpdate(event) {
    try {
      // console.log("estado anterior", estadoAnterior);
      const { data, where, select, populate } = event.params;

      if (Object.keys(data).includes('estado')) {
        const { telefono } = event.result;
        console.log("Enviar mensaje")
        let message = '';

        if(data?.estado === false){
          message = 'Su usuario ha sido inhabilitado para las rutas de Lima y Callao debido a que presenta papeletas pendientes.';

        } else if (data?.estado === true){
          message = 'Su usuario ha sido habilitado para las rutas de Lima y Callao.'
        }
        await client.messages
          .create({
            body: message,
            from: '+16204624801',
            to: `+51${telefono}`
          })
          .then(message => console.log("message:", message.sid));
      }

    } catch (error) {
      console.log(error)
    }
  },
}
