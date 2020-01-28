var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');

});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});

let searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let label = $('small');
let escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio );

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function( resp ) {
        if ( resp === 'No hay tickets pendientes') {
            alert( resp );
            label.text( resp );
            return;
        }
        label.text( 'Ticket ' + resp.numero );
    });
});