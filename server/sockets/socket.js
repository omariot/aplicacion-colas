const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", client => {
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguienteTicket();

    console.log(siguiente);
    callback(siguiente);
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        ok: true,
        message: "El necesario escribir el escritorio"
      });
    }
    let ticket = ticketControl.atenderTicket(data.escritorio);
    callback(ticket);
    client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos4()
    } );
  });

});
