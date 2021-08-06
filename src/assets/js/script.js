$(document).ready(function () {
	var type = '';
	$('#menu-action').click(function() {
	  $('.sidebar').toggleClass('active');
	  $(this).toggleClass('active');

	});
	
	// Add hover feedback on menu
	$('.exc_btn').click(function() {
		  $('.overview_sec').addClass('open');
		  $('.option_tab').addClass('open');
		  $('.conect_cont').addClass('close');
		  $('.conect_login').addClass('open');
		  
		});

	$('#menu-action').hover(function() {
	    $('.sidebar').toggleClass('hovered');
	});


	$('.watch_list_down').click(function() {
		$(this).toggleClass('open');
	    $('.watch').toggleClass('open');
	});

	$(".watch_input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".coin_list li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });


	$(".check_form input:checkbox").change(function () {
    $(this).closest(".trade-data-bottom").toggleClass('check');
	});

	$(".trade_check_form input:checkbox").change(function () {
    $(this).closest(".trade-data-bottom").toggleClass('check');
	});

	$(".check_form input:checkbox").click(function() {
    
       $(".import_trade .plan_title.check_trade_entry").toggleClass("check_sel", !$(".check_form input:checkbox").is(":checked"));
       $(".import_trade .uncheck_trade").toggleClass("uncheck_sel", $(".check_form input:checkbox").is(":checked"));
      
    });
	$(".trade_check_form input:checkbox").click(function() {
    
       $(".import_plan .plan_title.check_trade_entry").toggleClass("check_sel", !$(".trade_check_form input:checkbox").is(":checked"));
      
    });
	

	$('.action-box2 img').click(function() {

			$('.action-box2 .drop-cont').toggleClass('open');
	    	$('.action-box2').toggleClass('open');
		
	});

	$('.add_trade_btn').click(function() {

			$('.with_data').show();
	    	$('.without_data').hide();
		
	});

		$('.date').datepicker({
  			multidate: false,
			format: 'dd-mm-yyyy'
		});

		$(".trade-data-top .check_form input:checkbox").change(function () {
    $(this).closest(".data_cont").toggleClass('check');
	});

	$(".trade-data-top .trade_check_form input:checkbox").change(function () {
    $(this).closest(".data_cont").toggleClass('check');
	});


		$(".option_tab .nav a").click(function() {
			var attr = $(this).attr('href');
			if(attr == '#trade_account'){
				$('.trading_opt.trade_opt .watch_drop').hide();
			$('.switch_sec.trading_switch .switch-toggle').hide();
			}else{
				$('.trading_opt.trade_opt .watch_drop').show();
			$('.switch_sec.trading_switch .switch-toggle').show();
			}
			
		});

		$(".trade_opt select[name='trade_journal_option']").change(function() {
			if($(this).val()=="trade_account"){
             $('.trading_opt.trade_opt').hide();
			$('.mob_opt_cont').hide();
			$('.mob_switch').hide();
			}else{
				$('.trading_opt.trade_opt').show();
			$('.mob_opt_cont').show();
			$('.mob_switch').show();
			}
        });
			// $("#watch_input").on("keyup", function() {
	//     var value = $(this).val().toLowerCase();

	//     	$("#watch_cont .coin_title").filter(function() {
	//       		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	//     	});
	
	//     // if(value.length == 0){
	//     // 	$("#watch_cont *").filter(function() {
	//     //   		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	//     // 	});
	//     // }
	// });

	$("select[name='watchlist']").change(function() {
         if($(this).val()=="watchall"){
             $('.all_opt').show();
             $('.watch_opt').hide();
           }else{
           	$('.all_opt').hide();
             $('.watch_opt').show();
           }
     });

		$("select[name='trade_journal_option']").change(function() {
         if($(this).val()=="trade_journal"){
             $('.mob_journal_sec').show();
             $('.mob_entrie_sec').hide();
             $('.mob_plan_sec').hide();
             $('.mob_account_sec').hide();
           }else if($(this).val()=="trade_entries"){
           	$('.mob_entrie_sec').show();
           	$('.mob_journal_sec').hide();
             $('.mob_plan_sec').hide();
             $('.mob_account_sec').hide();
             
           }else if($(this).val()=="trade_plans"){
           	$('.mob_plan_sec').show();
           	$('.mob_journal_sec').hide();
             $('.mob_entrie_sec').hide();
             $('.mob_account_sec').hide();
            
           }else if($(this).val()=="trade_account"){
           	$('.mob_account_sec').show();
           	$('.mob_journal_sec').hide();
             $('.mob_entrie_sec').hide();
             $('.mob_plan_sec').hide();    
           }
     });
	

	//progress bar

	$(".progress_bar").each(function()
	{
	  var data,progressHeight, color;
	  data = $(this).attr('data');
	  progressHeight = $(this).attr('progressHeight');
	  color = $(this).attr('color');
	  $(this).css('height', progressHeight);
	  var barSpan = '<span class="bar"></span>';
	  // var valueSpan = '<span class="value"></span>';
	  $(this).append(barSpan);
	  // $(this).append(valueSpan);
	  $(this).children(".bar").css('width', data+'%');
	  $(this).children(".bar").css('background-color', color);
	  //$('.progress_hold').children(".value").html(data+'%');
	  $(this).prev(".value").html(data+'%');
	})

		
        //switch tab
 		//mob jouranal note

        $('.mob .journal_fold li a').click(function() {

	    	$('.journal_note_cnt.mob').addClass('open');
	    	$('.mob .journal_fold').addClass('close');
	    	$('.note_detail.mob').removeClass('open');
	    	$('.note_detail.mob').removeClass('close');
		
	});
        $('.journal_note_cnt.mob .note_list .note_cont').click(function() {

	    	$('.note_detail.mob').addClass('open');
			$('.journal_note_cnt.mob').removeClass('open');
	});


       $('.note_detail_back_btn').click(function() {
       		$('.note_detail.mob').removeClass('open');
       		$('.journal_note_cnt.mob').addClass('open');
	    	
		
	}); 


       $('.note_back_btn').click(function() {

	    	$('.journal_note_cnt.mob').removeClass('open');
	    	$('.note_detail.mob').addClass('close');
	    	$('.mob .journal_fold').removeClass('close');
	    	
		
	});

   //      if($(".switch_in").is(":checked")) {
			// 		$(".secnd_sec").css('pointer-events','auto').removeClass('disabled');
			// 		$(".third_sec").css('pointer-events','auto').removeClass('disabled');
			// 		$(".mr_btn .input-group").css('pointer-events','auto').removeClass('disabled');
			// } else {
			// 	$(".secnd_sec").css('pointer-events','none').addClass('disabled');
			// 		$(".third_sec").css('pointer-events','none').addClass('disabled');
			// 		$(".mr_btn .input-group").css('pointer-events','none').addClass('disabled');
			// }

        $('#switch').change(function(){
			if($(this).is(":checked")) {
					$(".switch").removeClass('disabled');
			} else {
					$(".switch").addClass('disabled');
			}
		});

		$('#switch1').change(function(){
			if($(this).is(":checked")) {
					$(".switch1").removeClass('disabled');
			} else {
					$(".switch1").addClass('disabled');
			}
		});

		$('#switch2').change(function(){
			if($(this).is(":checked")) {
					$(".switch2").removeClass('disabled');
			} else {
					$(".switch2").addClass('disabled');
			}
		});

		$('#switch3').change(function(){
			if($(this).is(":checked")) {
					$(".switch3").removeClass('disabled');
			} else {
					$(".switch3").addClass('disabled');
			}
		});

		$('#switch4').change(function(){
			if($(this).is(":checked")) {
					$(".switch4").removeClass('disabled');
			} else {
					$(".switch4").addClass('disabled');
			}
		});

		$('#switch5').change(function(){
			if($(this).is(":checked")) {
					$(".switch5").removeClass('disabled');
			} else {
					$(".switch5").addClass('disabled');
			}
		});

		$('#switch6').change(function(){
			if($(this).is(":checked")) {
					$(".switch6").removeClass('disabled');
			} else {
					$(".switch6").addClass('disabled');
			}
		});

		$('#switch7').change(function(){
			if($(this).is(":checked")) {
					$(".switch7").removeClass('disabled');
			} else {
					$(".switch7").addClass('disabled');
			}
		});

		$('#switch8').change(function(){
			if($(this).is(":checked")) {
					$(".switch8").removeClass('disabled');
			} else {
					$(".switch8").addClass('disabled');
			}
		});

		$('#switch9').change(function(){
			if($(this).is(":checked")) {
					$(".switch9").removeClass('disabled');
			} else {
					$(".switch9").addClass('disabled');
			}
		});

		$('#switch10').change(function(){
			if($(this).is(":checked")) {
					$(".switch10").removeClass('disabled');
			} else {
					$(".switch10").addClass('disabled');
			}
		});

		$('#switch11').change(function(){
			if($(this).is(":checked")) {
					$(".switch11").removeClass('disabled');
			} else {
					$(".switch11").addClass('disabled');
			}
		});

		$('#switch12').change(function(){
			if($(this).is(":checked")) {
					$(".switch12").removeClass('disabled');
			} else {
					$(".switch12").addClass('disabled');
			}
		});

		$('#switch13').change(function(){
			if($(this).is(":checked")) {
					$(".switch13").removeClass('disabled');
			} else {
					$(".switch13").addClass('disabled');
			}
		});

		$('#switch14').change(function(){
			if($(this).is(":checked")) {
					$(".switch14").removeClass('disabled');
			} else {
					$(".switch14").addClass('disabled');
			}
		});

		$('#switch15').change(function(){
			if($(this).is(":checked")) {
					$(".switch15").removeClass('disabled');
			} else {
					$(".switch15").addClass('disabled');
			}
		});

		$('#switch16').change(function(){
			if($(this).is(":checked")) {
					$(".switch16").removeClass('disabled');
			} else {
					$(".switch16").addClass('disabled');
			}
		});

		$('#switch17').change(function(){
			if($(this).is(":checked")) {
					$(".switch17").removeClass('disabled');
			} else {
					$(".switch17").addClass('disabled');
			}
		});

		$('#switch18').change(function(){
			if($(this).is(":checked")) {
					$(".switch18").removeClass('disabled');
			} else {
					$(".switch18").addClass('disabled');
			}
		});

		$('#switch19').change(function(){
			if($(this).is(":checked")) {
					$(".switch19").removeClass('disabled');
			} else {
					$(".switch19").addClass('disabled');
			}
		});

		$('#switch20').change(function(){
			if($(this).is(":checked")) {
					$(".switch20").removeClass('disabled');
			} else {
					$(".switch20").addClass('disabled');
			}
		});
		$('#switch21').change(function(){
			if($(this).is(":checked")) {
					$(".switch21").removeClass('disabled');
			} else {
					$(".switch21").addClass('disabled');
			}
		});

		$('#switch22').change(function(){
			if($(this).is(":checked")) {
					$(".switch22").removeClass('disabled');
			} else {
					$(".switch22").addClass('disabled');
			}
		});

		$('#switch23').change(function(){
			if($(this).is(":checked")) {
					$(".switch23").removeClass('disabled');
			} else {
					$(".switch23").addClass('disabled');
			}
		});

		$('#switch24').change(function(){
			if($(this).is(":checked")) {
					$(".switch24").removeClass('disabled');
			} else {
					$(".switch24").addClass('disabled');
			}
		});

		$('#switch25').change(function(){
			if($(this).is(":checked")) {
					$(".switch25").removeClass('disabled');
			} else {
					$(".switch25").addClass('disabled');
			}
		});

		$('#switch26').change(function(){
			if($(this).is(":checked")) {
					$(".switch26").removeClass('disabled');
			} else {
					$(".switch26").addClass('disabled');
			}
		});

		$('#switch27').change(function(){
			if($(this).is(":checked")) {
					$(".switch27").removeClass('disabled');
			} else {
					$(".switch27").addClass('disabled');
			}
		});

		//tablet switch

		$('#switch28').change(function(){
			if($(this).is(":checked")) {
					$(".switch28").removeClass('disabled');
			} else {
					$(".switch28").addClass('disabled');
			}
		});

		$('#switch29').change(function(){
			if($(this).is(":checked")) {
					$(".switch29").removeClass('disabled');
			} else {
					$(".switch29").addClass('disabled');
			}
		});

		$('#switch30').change(function(){
			if($(this).is(":checked")) {
					$(".switch30").removeClass('disabled');
			} else {
					$(".switch30").addClass('disabled');
			}
		});

		$('#switch31').change(function(){
			if($(this).is(":checked")) {
					$(".switch31").removeClass('disabled');
			} else {
					$(".switch31").addClass('disabled');
			}
		});

		$('#switch32').change(function(){
			if($(this).is(":checked")) {
					$(".switch32").removeClass('disabled');
			} else {
					$(".switch32").addClass('disabled');
			}
		});

		$('#switch33').change(function(){
			if($(this).is(":checked")) {
					$(".switch33").removeClass('disabled');
			} else {
					$(".switch33").addClass('disabled');
			}
		});

		$('#switch34').change(function(){
			if($(this).is(":checked")) {
					$(".switch34").removeClass('disabled');
			} else {
					$(".switch34").addClass('disabled');
			}
		});

		$('#switch35').change(function(){
			if($(this).is(":checked")) {
					$(".switch35").removeClass('disabled');
			} else {
					$(".switch35").addClass('disabled');
			}
		});

		$('#switch36').change(function(){
			if($(this).is(":checked")) {
					$(".switch36").removeClass('disabled');
			} else {
					$(".switch36").addClass('disabled');
			}
		});

		$('#switch37').change(function(){
			if($(this).is(":checked")) {
					$(".switch37").removeClass('disabled');
			} else {
					$(".switch37").addClass('disabled');
			}
		});

		$('#switch38').change(function(){
			if($(this).is(":checked")) {
					$(".switch38").removeClass('disabled');
			} else {
					$(".switch38").addClass('disabled');
			}
		});


		$('#switch39').change(function(){
			if($(this).is(":checked")) {
					$(".switch39").removeClass('disabled');
			} else {
					$(".switch39").addClass('disabled');
			}
		});

		$('#switch40').change(function(){
			if($(this).is(":checked")) {
					$(".switch40").removeClass('disabled');
			} else {
					$(".switch40").addClass('disabled');
			}
		});


		$('#switch41').change(function(){
			if($(this).is(":checked")) {
					$(".switch41").removeClass('disabled');
			} else {
					$(".switch41").addClass('disabled');
			}
		});

		$('#switch42').change(function(){
			if($(this).is(":checked")) {
					$(".switch42").removeClass('disabled');
			} else {
					$(".switch42").addClass('disabled');
			}
		});


		$('#switch43').change(function(){
			if($(this).is(":checked")) {
					$(".switch43").removeClass('disabled');
			} else {
					$(".switch43").addClass('disabled');
			}
		});

		$('#switch44').change(function(){
			if($(this).is(":checked")) {
					$(".switch44").removeClass('disabled');
			} else {
					$(".switch44").addClass('disabled');
			}
		});

		//mobile switch

		$('#switch45').change(function(){
			if($(this).is(":checked")) {
					$(".switch45").removeClass('disabled');
			} else {
					$(".switch45").addClass('disabled');
			}
		});


		$('#switch46').change(function(){
			if($(this).is(":checked")) {
					$(".switch46").removeClass('disabled');
			} else {
					$(".switch46").addClass('disabled');
			}
		});

		$('#switch47').change(function(){
			if($(this).is(":checked")) {
					$(".switch47").removeClass('disabled');
			} else {
					$(".switch47").addClass('disabled');
			}
		});

		$('#switch48').change(function(){
			if($(this).is(":checked")) {
					$(".switch48").removeClass('disabled');
			} else {
					$(".switch48").addClass('disabled');
			}
		});


		$('#switch49').change(function(){
			if($(this).is(":checked")) {
					$(".switch49").removeClass('disabled');
			} else {
					$(".switch49").addClass('disabled');
			}
		});


		$('#switch50').change(function(){
			if($(this).is(":checked")) {
					$(".switch50").removeClass('disabled');
			} else {
					$(".switch50").addClass('disabled');
			}
		});



		$('#switch51').change(function(){
			if($(this).is(":checked")) {
					$(".switch51").removeClass('disabled');
			} else {
					$(".switch51").addClass('disabled');
			}
		});

		$('#switch52').change(function(){
			if($(this).is(":checked")) {
					$(".switch52").removeClass('disabled');
			} else {
					$(".switch52").addClass('disabled');
			}
		});

		$('#switch53').change(function(){
			if($(this).is(":checked")) {
					$(".switch53").removeClass('disabled');
			} else {
					$(".switch53").addClass('disabled');
			}
		});


		$('#switch54').change(function(){
			if($(this).is(":checked")) {
					$(".switch54").removeClass('disabled');
			} else {
					$(".switch54").addClass('disabled');
			}
		});

		$('#switch55').change(function(){
			if($(this).is(":checked")) {
					$(".switch55").removeClass('disabled');
			} else {
					$(".switch55").addClass('disabled');
			}
		});


		$('#switch56').change(function(){
			if($(this).is(":checked")) {
					$(".switch56").removeClass('disabled');
			} else {
					$(".switch56").addClass('disabled');
			}
		});

		$('#switch57').change(function(){
			if($(this).is(":checked")) {
					$(".switch57").removeClass('disabled');
			} else {
					$(".switch57").addClass('disabled');
			}
		});


		$('#switch58').change(function(){
			if($(this).is(":checked")) {
					$(".switch58").removeClass('disabled');
			} else {
					$(".switch58").addClass('disabled');
			}
		});


		$('#switch59').change(function(){
			if($(this).is(":checked")) {
					$(".switch59").removeClass('disabled');
			} else {
					$(".switch59").addClass('disabled');
			}
		});

		$('#switch60').change(function(){
			if($(this).is(":checked")) {
					$(".switch60").removeClass('disabled');
			} else {
					$(".switch60").addClass('disabled');
			}
		});


		$('#switch61').change(function(){
			if($(this).is(":checked")) {
					$(".switch61").removeClass('disabled');
			} else {
					$(".switch61").addClass('disabled');
			}
		});


		$('#switch62').change(function(){
			if($(this).is(":checked")) {
					$(".switch62").removeClass('disabled');
			} else {
					$(".switch62").addClass('disabled');
			}
		});

		



		// $(".js-select2").select2({

		// 	allowHtml: true,
		// 	tags: true // создает новые опции на лету
		// });
		// $(".js-example-tokenizer").select2({
        //     tags: true,
        //     tokenSeparators: [',', ' ']
        // });

});



$(document).ready(function() {
	$("#slider").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(0,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider,val) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount = slider == 0?val:$("#amount").val();
	 $( "#amount" ).val($amount);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount;
	$('.rangeslider-fill-lower.one').css({'width': fill + '%'});
	}
	$("#amount").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.one').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.one').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider1").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(1,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount1").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider1,val1) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount1 = slider1 == 1?val1:$("#amount1").val();
	 $( "#amount1" ).val($amount1);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount1;
	$('.rangeslider-fill-lower.two').css({'width': fill + '%'});
	}
	$("#amount1").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider1 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.two').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider1 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.two').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});




$(document).ready(function() {
	$("#slider2").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(2,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount2").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider2,val2) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount2 = slider2 == 2?val2:$("#amount2").val();
	 $( "#amount2" ).val($amount2);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount2;
	$('.rangeslider-fill-lower.three').css({'width': fill + '%'});
	}
	$("#amount2").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider2 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.three').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider2 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.three').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider3").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(3,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount3").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider3,val3) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount3 = slider3 == 3?val3:$("#amount3").val();
	 $( "#amount3" ).val($amount3);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount3;
	$('.rangeslider-fill-lower.four').css({'width': fill + '%'});
	}
	$("#amount3").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider3 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.four').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider3 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.four').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider4").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(4,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount4").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider4,val4) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount4 = slider4 == 4?val4:$("#amount4").val();
	 $( "#amount4" ).val($amount4);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount4;
	$('.rangeslider-fill-lower.five').css({'width': fill + '%'});
	}
	$("#amount4").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider4 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.five').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider4 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.five').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});




$(document).ready(function() {
	$("#slider5").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(5,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount5").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider5,val5) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount5 = slider5 == 5?val5:$("#amount5").val();
	 $( "#amount5" ).val($amount5);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount5;
	$('.rangeslider-fill-lower.six').css({'width': fill + '%'});
	}
	$("#amount5").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider5 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.six').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider5 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.six').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider6").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(6,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount6").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider6,val6) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount6 = slider6 == 6?val6:$("#amount6").val();
	 $( "#amount6" ).val($amount6);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount6;
	$('.rangeslider-fill-lower.seven').css({'width': fill + '%'});
	}
	$("#amount6").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider6 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.seven').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider6 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.seven').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider7").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(7,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount7").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider7,val7) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount7 = slider7 == 7?val7:$("#amount7").val();
	 $( "#amount7" ).val($amount7);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount7;
	$('.rangeslider-fill-lower.eight').css({'width': fill + '%'});
	}
	$("#amount7").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider7 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.eight').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider7 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.eight').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider8").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(8,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount8").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider8,val8) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount8 = slider8 == 8?val8:$("#amount8").val();
	 $( "#amount8" ).val($amount8);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount8;
	$('.rangeslider-fill-lower.nine').css({'width': fill + '%'});
	}
	$("#amount8").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider8 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.nine').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider8 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.nine').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider9").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(9,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount9").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider9,val9) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount9 = slider9 == 9?val9:$("#amount9").val();
	 $( "#amount9" ).val($amount9);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount9;
	$('.rangeslider-fill-lower.ten').css({'width': fill + '%'});
	}
	$("#amount9").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider9 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.ten').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider9 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.ten').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider10").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(10,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount10").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider10,val10) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount10 = slider10 == 10?val10:$("#amount10").val();
	 $( "#amount10" ).val($amount10);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount10;
	$('.rangeslider-fill-lower.eleven').css({'width': fill + '%'});
	}
	$("#amount10").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider10 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.eleven').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider10 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.eleven').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider11").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(11,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount11").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider11,val11) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount11 = slider11 == 11?val11:$("#amount11").val();
	 $( "#amount11" ).val($amount11);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount11;
	$('.rangeslider-fill-lower.twelve').css({'width': fill + '%'});
	}
	$("#amount11").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider11 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twelve').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider11 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twelve').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider12").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(12,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount12").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider12,val12) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount12 = slider12 == 12?val12:$("#amount12").val();
	 $( "#amount12" ).val($amount12);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount12;
	$('.rangeslider-fill-lower.thirteen').css({'width': fill + '%'});
	}
	$("#amount12").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider12 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirteen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider12 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirteen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider13").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(13,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount13").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider13,val13) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount13 = slider13 == 13?val13:$("#amount13").val();
	 $( "#amount13" ).val($amount13);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount13;
	$('.rangeslider-fill-lower.fourteen').css({'width': fill + '%'});
	}
	$("#amount13").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider13 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.fourteen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider13 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.fourteen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider14").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(14,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount14").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider14,val14) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount14 = slider14 == 14?val14:$("#amount14").val();
	 $( "#amount14" ).val($amount14);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount14;
	$('.rangeslider-fill-lower.fifteen').css({'width': fill + '%'});
	}
	$("#amount14").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider14 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.fifteen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider14 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.fifteen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider15").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(15,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount15").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider15,val15) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount15 = slider15 == 15?val15:$("#amount15").val();
	 $( "#amount15" ).val($amount15);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount15;
	$('.rangeslider-fill-lower.sixteen').css({'width': fill + '%'});
	}
	$("#amount15").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider15 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.sixteen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider15 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.sixteen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider16").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(16,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount16").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider16,val16) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount16 = slider16 == 16?val16:$("#amount16").val();
	 $( "#amount16" ).val($amount16);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount16;
	$('.rangeslider-fill-lower.seventeen').css({'width': fill + '%'});
	}
	$("#amount16").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider16 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.seventeen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider16 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.seventeen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});




$(document).ready(function() {
	$("#slider17").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(17,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount17").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider17,val17) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount17 = slider17 == 17?val17:$("#amount17").val();
	 $( "#amount17" ).val($amount17);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount17;
	$('.rangeslider-fill-lower.eighteen').css({'width': fill + '%'});
	}
	$("#amount17").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider17 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.eighteen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider17 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.eighteen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider18").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(18,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount18").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider18,val18) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount18 = slider18 == 18?val18:$("#amount18").val();
	 $( "#amount18" ).val($amount18);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount18;
	$('.rangeslider-fill-lower.nineteen').css({'width': fill + '%'});
	}
	$("#amount18").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider18 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.nineteen').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider18 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.nineteen').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});

$(document).ready(function() {
	$("#slider19").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(19,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount19").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider19,val19) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount19 = slider19 == 19?val19:$("#amount19").val();
	 $( "#amount19" ).val($amount19);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount19;
	$('.rangeslider-fill-lower.twenty').css({'width': fill + '%'});
	}
	$("#amount19").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider19 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twenty').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider19 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twenty').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});

//tablet slider

$(document).ready(function() {
	$("#slider20").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(20,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount20").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider20,val20) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount20 = slider20 == 20?val20:$("#amount20").val();
	 $( "#amount20" ).val($amount20);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount20;
	$('.rangeslider-fill-lower.twentyone').css({'width': fill + '%'});
	}
	$("#amount").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider20 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentyone').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider20 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentyone').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider21").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(21,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount21").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider21,val21) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount21 = slider21 == 21?val21:$("#amount21").val();
	 $( "#amount21" ).val($amount21);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount21;
	$('.rangeslider-fill-lower.twentytwo').css({'width': fill + '%'});
	}
	$("#amount21").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider21 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentytwo').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider21 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentytwo').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});




$(document).ready(function() {
	$("#slider22").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(22,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount22").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider22,val22) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount22 = slider22 == 22?val22:$("#amount22").val();
	 $( "#amount22" ).val($amount22);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount22;
	$('.rangeslider-fill-lower.twentythree').css({'width': fill + '%'});
	}
	$("#amount22").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider22 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentythree').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider22 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentythree').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider23").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(23,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount23").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider23,val23) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount23 = slider23 == 23?val23:$("#amount23").val();
	 $( "#amount23" ).val($amount23);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount23;
	$('.rangeslider-fill-lower.twentyfour').css({'width': fill + '%'});
	}
	$("#amount23").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider23 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentyfour').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider23 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentyfour').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider24").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(24,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount24").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider24,val24) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount24 = slider24 == 24?val24:$("#amount24").val();
	 $( "#amount24" ).val($amount24);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount24;
	$('.rangeslider-fill-lower.twentyfive').css({'width': fill + '%'});
	}
	$("#amount24").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider24 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentyfive').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider24 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentyfive').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});




$(document).ready(function() {
	$("#slider25").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(25,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount25").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider25,val25) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount25 = slider25 == 25?val25:$("#amount25").val();
	 $( "#amount25" ).val($amount25);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount25;
	$('.rangeslider-fill-lower.twentysix').css({'width': fill + '%'});
	}
	$("#amount25").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider25 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentysix').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider25 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentysix').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider26").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(26,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount26").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider26,val26) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount26 = slider26 == 26?val26:$("#amount26").val();
	 $( "#amount26" ).val($amount26);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount26;
	$('.rangeslider-fill-lower.twentyseven').css({'width': fill + '%'});
	}
	$("#amount26").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider26 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentyseven').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider26 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentyseven').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider27").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(27,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount27").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider27,val27) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount27 = slider27 == 27?val27:$("#amount27").val();
	 $( "#amount27" ).val($amount27);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount27;
	$('.rangeslider-fill-lower.twentyeight').css({'width': fill + '%'});
	}
	$("#amount27").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider27 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentyeight').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider27 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentyeight').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider28").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(28,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount28").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider28,val28) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount28 = slider28 == 28?val28:$("#amount28").val();
	 $( "#amount28" ).val($amount28);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount28;
	$('.rangeslider-fill-lower.twentynine').css({'width': fill + '%'});
	}
	$("#amount28").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider28 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.twentynine').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider28 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.twentynine').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider29").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(29,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount29").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider29,val29) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount29 = slider29 == 29?val29:$("#amount29").val();
	 $( "#amount29" ).val($amount29);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount29;
	$('.rangeslider-fill-lower.thirty').css({'width': fill + '%'});
	}
	$("#amount29").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider29 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirty').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider29 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirty').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


//mobile slider


$(document).ready(function() {
	$("#slider30").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(30,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount30").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider30,val30) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount30 = slider30 == 30?val30:$("#amount30").val();
	 $( "#amount30" ).val($amount30);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount30;
	$('.rangeslider-fill-lower.thirtyone').css({'width': fill + '%'});
	}
	$("#amount30").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider30 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtyone').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider30 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtyone').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});



$(document).ready(function() {
	$("#slider31").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(31,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount31").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider31,val31) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount31 = slider31 == 31?val31:$("#amount31").val();
	 $( "#amount31" ).val($amount31);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount31;
	$('.rangeslider-fill-lower.thirtytwo').css({'width': fill + '%'});
	}
	$("#amount31").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider31 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtytwo').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider31 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtytwo').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider32").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(32,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount32").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider32,val32) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount32 = slider32 == 32?val32:$("#amount32").val();
	 $( "#amount32" ).val($amount32);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount32;
	$('.rangeslider-fill-lower.thirtythree').css({'width': fill + '%'});
	}
	$("#amount32").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider32 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtythree').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider32 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtythree').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider33").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(33,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount33").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider33,val33) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount33 = slider33 == 33?val33:$("#amount33").val();
	 $( "#amount33" ).val($amount33);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount33;
	$('.rangeslider-fill-lower.thirtyfour').css({'width': fill + '%'});
	}
	$("#amount33").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider33 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtyfour').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider33 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtyfour').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider34").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(34,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount34").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider34,val34) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount34 = slider34 == 34?val34:$("#amount34").val();
	 $( "#amount34" ).val($amount34);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount34;
	$('.rangeslider-fill-lower.thirtyfive').css({'width': fill + '%'});
	}
	$("#amount34").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider34 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtyfive').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider34 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtyfive').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider35").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(35,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount35").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider35,val35) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount35 = slider35 == 35?val35:$("#amount35").val();
	 $( "#amount35" ).val($amount35);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount35;
	$('.rangeslider-fill-lower.thirtysix').css({'width': fill + '%'});
	}
	$("#amount35").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider35 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtysix').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider35 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtysix').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider36").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(36,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount36").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider36,val36) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount36 = slider36 == 36?val36:$("#amount36").val();
	 $( "#amount36" ).val($amount36);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount36;
	$('.rangeslider-fill-lower.thirtyseven').css({'width': fill + '%'});
	}
	$("#amount36").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider36 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtyseven').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider36 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtyseven').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider37").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(37,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount37").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider37,val37) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount37 = slider37 == 37?val37:$("#amount37").val();
	 $( "#amount37" ).val($amount37);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount37;
	$('.rangeslider-fill-lower.thirtyeight').css({'width': fill + '%'});
	}
	$("#amount37").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider37 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtyeight').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider37 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtyeight').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});


$(document).ready(function() {
	$("#slider38").slider({
			animate: true,
			value:0,
			min: 0,
			max: 100,
			step: 0,
			slide: function(event, ui) {
					update(38,ui.value); //changed
			}
	});
	//Added, set initial value.
	$("#amount38").val(0);
	// $("#amount-label").text(0);
	
	update();

//changed. now with parameter
function update(slider38,val38) {
	//changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
	var $amount38 = slider38 == 38?val38:$("#amount38").val();
	 $( "#amount38" ).val($amount38);
	
	
	 // $('#slider a').html('<label><span class="pluse-icon">+</span>'+$amount+'<span class="percentage-icon">%</span></label>');
	 var fill = $amount38;
	$('.rangeslider-fill-lower.thirtynine').css({'width': fill + '%'});
	}
	$("#amount38").on("keypress keyup blur",function (event) {
	   $(this).val($(this).val().replace(/[^\d].+/, ""));
	   		if (event.which < 48 || event.which > 57) {
	   		event.preventDefault();		
	   	}
   	    var mywidth = parseInt($(this).val());
   	    if(mywidth > 100){
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>100<span class="percentage-icon">%</span></label>');
   	    	$('#slider38 a').css({'left':'100%'});
   	    	$('.rangeslider-fill-lower.thirtynine').css({'width':'100%'});
   	    	$(this).val(100);		
   	    }else{
   	    	// $('#slider a').html('<label><span class="pluse-icon">+</span>'+$(this).val()+'<span class="percentage-icon">%</span></label>');
   	    		$('#slider38 a').css({'left': mywidth + '%'});
   	    		$('.rangeslider-fill-lower.thirtynine').css({'width': mywidth + '%'});	
   	    	}	
   	    });
});

