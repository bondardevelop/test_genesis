$(document).ready(function() {

var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("select_wrapper");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
 
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        var i, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);


//scroll top //
$("#scroll-top").hide();
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#scroll-top').fadeIn();
		} else {
			$('#scroll-top').fadeOut();
		}
	});
	$('#scroll-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});
});
//scroll top end//


$('#togl_button').click(function(e){
  e.preventDefault();
  $('.search_more_hide').slideToggle();
  $(this).find('img').toggleClass('rotateY');
});

$('#menu').click(function(e){
  e.preventDefault();
  $('.toggle_menu').slideToggle();
  
});



$( function() {
	$( "#slider-range" ).slider({
		range: true,
		min: 18,
		max: 40,
		values: [ 18, 23 ],
		slide: function( event, ui ) {
			// $( "#amount" ).val(ui.values[ 0 ] );
			// $( "#next" ).val(ui.values[ 1 ] );
			$(ui.handle).find('.tooltip').text(ui.values[0]);
			$(ui.handle).find('.tooltip_bottom').text(ui.values[1]);
		},
		create: function(event, ui) {
			var tooltip = $('<div class="tooltip" />');
			tooltip["0"].innerHTML = 18;
			var tooltip2 = $('<div class="tooltip_bottom" />');
			tooltip2["0"].innerHTML = 23;

			$(event.target).find('.ui-slider-handle:first').append(tooltip);
			$(event.target).find('.ui-slider-handle:last').append(tooltip2);			
		},
		change: function(event, ui) {
			$('#hidden').attr('value', ui.values[0]);
			$('#hidden_bottom').attr('value', ui.values[1]);
		}
	});

});

});