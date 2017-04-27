console.log("Variables");
/**
 * Cargar items de carrito
 */
function loadCartItems(){
  $.getJSON( base_url + "get_cart" , function( data ) {
    $("#cart_num_items").html("(" + data.total_items + ")");
    //Items
    /*$.each( data.items, function( key, val ) {
      console.log(val);
    });*/
  });
  return false;
}

/*!
 * jquery.spinner v0.2.1 (https://vsn4ik.github.io/jquery.spinner/)
 * Copyright 2013-2017 xixilive
 * Licensed under the MIT license
 */
'use strict';

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  }
  else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  }
  else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  var spinningTimer;
  var Spinner;
  var Spinning = function($element, options) {
    this.$el = $element;
    this.options = $.extend({}, Spinning.rules.defaults, Spinning.rules[options.rule] || {}, options);
    this.min = Number(this.options.min) || 0;
    this.max = Number(this.options.max) || 0;

    this.$el.on({
      'focus.spinner': $.proxy(function(e) {
        e.preventDefault();
        $(document).trigger('mouseup.spinner');
        this.oldValue = this.value();
      }, this),
      'change.spinner': $.proxy(function(e) {
        e.preventDefault();
        this.value(this.$el.val());
      }, this),
      'keydown.spinner': $.proxy(function(e) {
        var dir = {
          38: 'up',
          40: 'down'
        }[e.which];

        if (dir) {
          e.preventDefault();
          this.spin(dir);
        }
      }, this)
    });

    //init input value
    this.oldValue = this.value();
    this.value(this.$el.val());
    return this;
  };

  Spinning.rules = {
    defaults: { min: null, max: null, step: 1, precision: 0 },
    currency: { min: 0.00, max: null, step: 0.01, precision: 2 },
    quantity: { min: 1, max: 999, step: 1, precision: 0 },
    percent:  { min: 1, max: 100, step: 1, precision: 0 },
    month:    { min: 1, max: 12, step: 1, precision: 0 },
    day:      { min: 1, max: 31, step: 1, precision: 0 },
    hour:     { min: 0, max: 23, step: 1, precision: 0 },
    minute:   { min: 1, max: 59, step: 1, precision: 0 },
    second:   { min: 1, max: 59, step: 1, precision: 0 }
  };

  Spinning.prototype = {
    spin: function(dir) {
      if (this.$el.prop('disabled')) {
        return;
      }

      this.oldValue = this.value();
      var step = $.isFunction(this.options.step) ? this.options.step.call(this, dir) : this.options.step;
      var multipler = dir === 'up' ? 1 : -1;

      this.value(this.oldValue + Number(step) * multipler);
    },

    value: function(v) {
      if (v === null || v === undefined) {
        return this.numeric(this.$el.val());
      }
      v = this.numeric(v);

      var valid = this.validate(v);
      if (valid !== 0) {
        v = (valid === -1) ? this.min : this.max;
      }
      this.$el.val(v.toFixed(this.options.precision));

      if (this.oldValue !== this.value()) {
        // changing.spinner
        this.$el.trigger('changing.spinner', [this.value(), this.oldValue]);

        // lazy changed.spinner
        clearTimeout(spinningTimer);
        spinningTimer = setTimeout($.proxy(function() {
          this.$el.trigger('changed.spinner', [this.value(), this.oldValue]);
        }, this), Spinner.delay);
      }
    },

    numeric: function(v) {
      v = this.options.precision > 0 ? parseFloat(v, 10) : parseInt(v, 10);

      // If the variable is a number
      if (isFinite(v)) {
        return v;
      }

      return v || this.options.min || 0;
    },

    validate: function(val) {
      if (this.options.min !== null && val < this.min) {
        return -1;
      }

      if (this.options.max !== null && val > this.max) {
        return 1;
      }

      return 0;
    }
  };

  Spinner = function(element, options) {
    this.$el = $(element);
    this.$spinning = this.$el.find('[data-spin="spinner"]');

    if (this.$spinning.length === 0) {
      this.$spinning = this.$el.find(':input[type="text"]');
    }

    options = $.extend({}, options, this.$spinning.data());

    this.spinning = new Spinning(this.$spinning, options);

    this.$el
      .on('click.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))
      .on('mousedown.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'));

    $(document).on('mouseup.spinner', $.proxy(function() {
      clearTimeout(this.spinTimeout);
      clearInterval(this.spinInterval);
    }, this));

    if (options.delay) {
      this.delay(options.delay);
    }

    if (options.changed) {
      this.changed(options.changed);
    }

    if (options.changing) {
      this.changing(options.changing);
    }
  };

  Spinner.delay = 500;

  Spinner.prototype = {
    constructor: Spinner,

    spin: function(e) {
      var dir = $(e.currentTarget).data('spin');

      switch (e.type) {
        case 'click':
          e.preventDefault();
          this.spinning.spin(dir);
          break;
        case 'mousedown':
          if (e.which === 1) {
            this.spinTimeout = setTimeout($.proxy(this, 'beginSpin', dir), 300);
          }
          break;
      }
    },

    delay: function(ms) {
      var delay = Number(ms);

      if (delay >= 0) {
        this.constructor.delay = delay + 100;
      }
    },

    value: function() {
      return this.spinning.value();
    },

    changed: function(fn) {
      this.bindHandler('changed.spinner', fn);
    },

    changing: function(fn) {
      this.bindHandler('changing.spinner', fn);
    },

    bindHandler: function(t, fn) {
      if ($.isFunction(fn)) {
        this.$spinning.on(t, fn);
      }
      else {
        this.$spinning.off(t);
      }
    },

    beginSpin: function(dir) {
      this.spinInterval = setInterval($.proxy(this.spinning, 'spin', dir), 100);
    }
  };

  var old = $.fn.spinner;

  $.fn.spinner = function(options, value) {
    return this.each(function() {
      var data = $.data(this, 'spinner');

      if (!data) {
        data = new Spinner(this, options);

        $.data(this, 'spinner', data);
      }
      if (options === 'delay' || options === 'changed' || options === 'changing') {
        data[options](value);
      }
      else if (options === 'step' && value) {
        data.spinning.step = value;
      }
      else if (options === 'spin' && value) {
        data.spinning.spin(value);
      }
    });
  };

  $.fn.spinner.Constructor = Spinner;
  $.fn.spinner.noConflict = function() {
    $.fn.spinner = old;
    return this;
  };

  $(function() {
    $('[data-trigger="spinner"]').spinner();
  });

  return $.fn.spinner;
});
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