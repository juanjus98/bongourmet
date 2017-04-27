$(function() {
  "use strict";
  console.log("Main: " + base_url);

/**
 * Menú hover
 */
 $(".dropdown").hover(            
  function() {
    $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
    $(this).toggleClass('open');
    $('b', this).toggleClass("caret caret-up");                
  },
  function() {
    $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
    $(this).toggleClass('open');
    $('b', this).toggleClass("caret caret-up");                
  });

//Alert
$('.example21-t-2').on('click', function () {
  $.confirm({
    title: 'Congratulations!',
    content: 'Consider something great happened, and you have to show a positive message.',
    type: 'green',
    buttons: {
      omg: {
        text: 'Thank you!',
        btnClass: 'btn-green',
      },
      close: function () {
      }
    }
  });
});

  //Cargar iterms del carrito
  loadCartItems();


/**
 * Lightslider
 */
$('#salones-slider').lightSlider({
        item:9,
        loop:false,
        slideMove:2,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed:600,
        pager:false,
        responsive : [
            {
                breakpoint:1300,
                settings: {
                    item:8,
                    slideMove:2,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:1120,
                settings: {
                    item:7,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:970,
                settings: {
                    item:6,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:800,
                settings: {
                    item:5,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:700,
                settings: {
                    item:4,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:3,
                    slideMove:1
                  }
            },
            {
                breakpoint:280,
                settings: {
                    item:1,
                    slideMove:1
                  }
            }
        ]
    });

 var waSlider = $('#clients-slider').lightSlider({
  autoWidth:true,
  auto:true,
  loop:true,
  pauseOnHover: false,
  item:8,
  slideMargin:0,
  pager: false
});

 $('#waslider').lightSlider({
  autoWidth:true,
  auto:false,
  pauseOnHover: true,
  loop:true,
  pager: false,
  onSliderLoad: function() {
    $('#autoWidth').removeClass('cS-hidden');
  } 
});

//Tooltip
$('[data-toggle="tooltip"]').tooltip();

// Initialize Slidebars
var controller = new slidebars();
controller.init();

// Seleccionar color option-color
$( '.option-color' ).on( 'click', function () {
  var color = $(this).data('color');
  $(".colores li").removeClass('active');
  $('#color').val(color);
  $(this).parent('li').addClass('active');
} );

/**
 * Carrito
 */
//Agregar al carrito
$(document).on("click",".addtocart",function() {
  var idform = $(this).data('idform');
  var objdata = $( "#" + idform ).serializeArray();
  $.ajax({
    url: base_url + "set_cart",
    type: "POST",
    dataType: "json",
    data: objdata,
    success: function(data) {
      set_cart(data);    
      $.confirm({
        icon: 'fa fa-check',
        title: 'Producto agregado',
        content: 'El producto fue agregado satisfactoriamente al cotizador.',
        type: 'green',
        buttons: {
          omg: {
            text: 'Seguir navegando'
          },
          buttonCart: {
            text: 'Ir al cotizador',
            btnClass: 'btn-green',
            action: function () {
              $(location).attr('href', base_url + 'cotizador');
              return false;
            }
          }
        },
        closeIcon: true,
        closeIconClass: 'fa fa-close'
      });

    }
  });

  return false;
});

//Actualizar carrito
$(document).on("click",".btn-change-qty",function() {
  var rowid = $(this).data("rowid");
  var qty = $(this).parents("#row_" + rowid).find("input[name*='qty']").val();
  var objdata = {rowid:rowid, qty:qty};

  $.ajax({
    url: base_url + "update_cart",
    type: "POST",
    dataType: "json",
    data: objdata,
    success: function(data) {
      console.log('Update cart.');
    }
  });

  return false;
});

//Eliminar item de carrito
$(document).on("click",".del-cart",function() {
  var rowid = $(this).data("rowid");
  var objdata = {rowid:rowid};
  $.ajax({
    url: base_url + "del_cart",
    type: "POST",
    dataType: "json",
    data: objdata,
    success: function(data) {
      if(data.estado){
        set_cart(data);
        $("#row_" + data.rowid).fadeOut(300).remove();
        var rowCount = $('.table-carrito tbody tr').length;
        if(rowCount == 0){
          $('.table-carrito').append('<tr><td colspan="4" class="text-center"><h4>Sin registros.</h4></td></tr>');
        }
        console.log(rowCount);
      }
    }
  });

  return false;
});

// Actualiza cantidad de items
function set_cart(data){
  $("#cart_num_items").html("(" + data['total_items'] + ")");
  return false;
}

/**
 * Validar Formulario #form-contactanos
 */
//Validar formulario
$('#form-contactanos').formValidation({
  framework: 'bootstrap',
  message: 'Valor no válido.',
        /*icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },*/
          fields: {
            nombre: {
              row: '.form-group',
              validators: {
                notEmpty: {
                  message: 'Ingrese Nombres y Apellidos.'
                }
              }
            },
            email: {
              row: '.form-group',
              validators: {
                notEmpty: {
                  message: 'Ingrese su correo.'
                },
                emailAddress: {
                  message: 'Ingrese un correo válido.'
                }
              }
            },
            telefono: {
              row: '.form-group',
              validators: {
                notEmpty: {
                  message: 'Ingrese un teléfono.'
                }
              }
            }
          }
        });

// Toggle main menu
$( '.js-toggle-main-menu' ).on( 'click', function ( event ) {
  event.preventDefault();
  event.stopPropagation();
  controller.toggle( 'main-menu' );
} );

// Close any
$( document ).on( 'click', '.js-close-any', function ( event ) {
  if ( controller.getActiveSlidebar() ) {
    event.preventDefault();
    event.stopPropagation();
    controller.close();
  }
} );

// Close Slidebar links
$( '[off-canvas] a' ).on( 'click', function ( event ) {
  event.preventDefault();
  event.stopPropagation();

  var url = $( this ).attr( 'href' ),
  target = $( this ).attr( 'target' ) ? $( this ).attr( 'target' ) : '_self';

  controller.close( function () {
    window.open( url, target );
  } );
} );

// Add close class to canvas container when Slidebar is opened
$( controller.events ).on( 'opening', function ( event ) {
  $( '[canvas]' ).addClass( 'js-close-any' );
} );

// Add close class to canvas container when Slidebar is opened
$( controller.events ).on( 'closing', function ( event ) {
  $( '[canvas]' ).removeClass( 'js-close-any' );
} );


});