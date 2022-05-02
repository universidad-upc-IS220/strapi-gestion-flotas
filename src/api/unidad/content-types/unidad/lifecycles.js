
module.exports = {
  async afterUpdate(event) {
    try {
      // console.log("event", event);

      const { data, where, select, populate } = event.params;
      const { nro_serie } = event.result;
      console.log("---->", data?.kilometraje, typeof(data?.kilometraje))
      if (Object.keys(data).includes('kilometraje') && data?.kilometraje > 50000 && data?.kilometraje < 80000) {

        await strapi.plugins['email'].services.email.send({
          to: 'jcahuanam@gmail.com',
          from: 'gestion.flotas.app@gmail.com',
          subject: 'Alerta: Primer Mantenimiento Técnico',
          text: `La unidad con número de serie ${nro_serie} ha superado los 50 000 kilometros, su kilometraje actual es ${data.kilometraje}. Es necesario agendar su primer mantenimiento en las próximas 2 semanas.`
        });
      }
      if (Object.keys(data).includes('kilometraje') && data?.kilometraje >= 80000) {

        await strapi.plugins['email'].services.email.send({
          to: 'jcahuanam@gmail.com',
          from: 'gestion.flotas.app@gmail.com',
          subject: 'Alerta: Segundo Mantenimiento Técnico',
          text: `La unidad con número de serie ${nro_serie} ha superado los 80 000 kilometros, su kilometraje actual es ${data.kilometraje}. Es necesario agendar su segundo mantenimiento en las próximas 2 semanas.`
        });
      }

    } catch (error) {
      console.log(error)
    }
  },
}
