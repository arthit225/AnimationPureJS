/*=========================================================
|			aniheader (above sticky area)				|
=========================================================
|			anisticky top(hide quote)					|
--------------------------------------------------------
|			anisticky topspace(show quote)				|
---------------------------------------------------------
|			anisticky cardcontainer	(show card & quote)	|
|				card1									|
|				card2									|
|				...										|
|				card13									|
---------------------------------------------------------
|			anisticky quoteboxcontainer1(quote & icon)	|
|			anisticky quoteboxcontainer2(quote & icon)	|
|							...							|
|			anisticky quoteboxcontainer13(quote & icon)	|
---------------------------------------------------------
|			anisticky bottomspace(show quote)			|
--------------------------------------------------------
|			anisticky bottom(hide quote)				|
========================================================
|			anibottom(under sticky area)				|
========================================================|
*/
document.addEventListener("DOMContentLoaded", function(event) { 
	function fadeIn(el){
	  el.classList.add('show');
	  el.classList.remove('hide'); 
	  console.log("FadeIn", el);
	}

	function fadeOut(el){
		if ( typeof e1 == undefined || !el)
		{
			return;
		}
		el.classList.add('hide');
		el.classList.remove('show');
		console.log("fadeOut", el);
	}

	function fadeRemove(e1)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.remove('hide');
		e1.classList.remove('show');
	}

	function fadeInQuote(el){
		if ( typeof e1 == undefined)
		{
			return;
		}
		console.log("FadeinQuote", el);
		el.classList.add('showQuote');
		el.classList.remove('hideQuote');  
	}

	function fadeOutQuote(el, scrollUp){
		if ( typeof e1 == undefined || !el)
		{
			return;
		}
				console.log("fadeOutQuote", el);
		el.classList.add('hideQuote');
		el.classList.remove('showQuote');
		if (scrollUp)
		{
			el.classList.add('under');
			el.classList.remove('above');
		}
		else
		{
			el.classList.add('above');
			el.classList.remove('under');
		}
	}

	function flipAdd(el){
		if ( typeof e1 == undefined)
		{
			return;
		}

		el.classList.add('flip');
		//console.log(el, "working");
	}

	function flipRemove(el){
		if ( typeof e1 == undefined)
		{
			return;
		}
		//console.log(el, "working");
		el.classList.remove('flip');  
	}



	function stickyMove(e1)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.add('move');
	}

	function stickyHide(e1)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.add('hide');
		
	}
	function stickyShow(e1)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.remove('hide');
	}

	function stickySticky(e1)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.remove('move');
	}

	function addClass(e1, className)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.add(className);
	}

	function removeClass(e1, className)
	{
		if ( typeof e1 == undefined)
		{
			return;
		}
		e1.classList.remove(className);
	}

	function checkFadeQuote2(cardNo)
	{
		console.log("cardNo", cardNo);
		if ( cardNo < 2)
		{
			cardNo = 2;
		}
		else if ( cardNo > maxCardNo)
		{
			cardNo = maxCardNo;
		}
		var quoteid = "quoteDisplay";
		var quoteElement = document.getElementById(quoteid);
		var quoteElementviewportOffset = quoteElement.getBoundingClientRect();
		var quoteElementTop = quoteElementviewportOffset.top;
		var quoteElementH = quoteElement.scrollHeight;
		var showQuoteStartTop = anistickyTopH + anistickyTopSpaceH + anistickycardContainerH - ShowQuoteStartBottom;


//		console.log("quoteElementH", quoteElementH, "quoteElementTop", quoteElementTop);
		var QuoteBoxs = document.querySelectorAll("#" + quoteid + " .quote_icon");

		console.log("scorllUP", scrollUp, "CardNo", cardNo, "FocusQuoteNo", FocusQuoteNo);
	
		/*if ( cardNo == FocusQuoteNo )
		{
			if (scrollUp)
			{
				quoteElement.classList.add('above');
				quoteElement.classList.remove('under');
			}
			else
			{
				quoteElement.classList.add('under');
				quoteElement.classList.remove('above');
			}
			fadeInQuote(quoteElement);
		} else {
			fadeOutQuote(quoteElement, scrollUp);
		}*/
		

		for ( i = 0; i < QuoteBoxs.length; i ++)
		{
			var QuoteBox = QuoteBoxs[i];
			var QuoteBoxviewportOffset = QuoteBox.getBoundingClientRect();
			var QuoteBoxTop = QuoteBoxviewportOffset.top;
			var QuoteBoxH = QuoteBox.scrollHeight;
			
			if ( i >= FocuseQuoteBubbleNo && !QuoteBox.classList.contains("hideQuote"))
			{
				console.log("Hide QuoteBox", QuoteBoxTop);
				fadeOutQuote(QuoteBox, scrollUp);
			}
			
			else if ( i < FocuseQuoteBubbleNo  && !QuoteBox.classList.contains("showQuote"))
			{
				console.log("Show QuoteBox", QuoteBox, "classList", QuoteBox.classList, "including", QuoteBox.classList.contains("showQuote"));
				fadeInQuote(QuoteBox);
			}

		}
		
		// Mark last shown QuoteBox
		for ( i = 0; i < QuoteBoxs.length; i++ )
		{
			var QuoteBox = QuoteBoxs[i];
			if ( QuoteBox.classList.contains('showQuote') && ( i == QuoteBoxs.length - 1 || QuoteBoxs[i + 1].classList.contains('hideQuote') ) )
			{
				addClass(QuoteBoxs[i], 'lastshown');
				console.log("QuoteBox[i]", QuoteBoxs[i]);
				//scroll_snap(QuoteBoxs[i]);
			}
			else
			{
				removeClass(QuoteBoxs[i], 'lastshown');
			}
		}
	}


	/*function checkFadeQuote(cardNo)
	{
		console.log("cardNo", cardNo);
		if ( cardNo < 2)
		{
			cardNo = 2;
		}
		else if ( cardNo > maxCardNo)
		{
			cardNo = maxCardNo;
		}
		var quoteid = "quote" + cardNo;
		var quoteElement = document.getElementById(quoteid);
		var quoteElementviewportOffset = quoteElement.getBoundingClientRect();
		var quoteElementTop = quoteElementviewportOffset.top;
		var quoteElementH = quoteElement.scrollHeight;
		var showQuoteStartTop = anistickyTopH + anistickyTopSpaceH + anistickycardContainerH - ShowQuoteStartBottom;


		function scroll_snap(element)
		{
			var elementviewportOffset = element.getBoundingClientRect();
			var elementTop = elementviewportOffset.top;
			var elementH = element.scrollHeight / 2;
			var scroll_offset = elementTop + elementH  - showQuoteStartTop ;
			console.log("Element", element, "StartTop", showQuoteStartTop, "elementH", elementH, "elementTop", elementTop, "offset", scroll_offset);
			if (scroll_offset > -50 && scroll_offset < 50 && elementTop > anistickyTopH + anistickyTopSpaceH)
			{
				window.scrollBy(0, scroll_offset);
			}
			
		}

//		console.log("quoteElementH", quoteElementH, "quoteElementTop", quoteElementTop);
		var QuoteBoxs = document.querySelectorAll("#" + quoteid + " .quote_icon");

		// In mobile, we need to show QuoteBox(quoteElement) if they are not showing all quotes(QuoteBoxs) in it.
		
		var hideStartTop = 0;
		if (wWidth > 768)
		{
			hideStartTop = anistickyTopH + anistickyTopSpaceH;
		}
	
		if (!scrollUp && quoteElementTop < hideStartTop)
		{
			fadeOutQuote(quoteElement, scrollUp);
		} else if ( scrollUp && quoteElementTop > -quoteElementH ) {
			fadeInQuote(quoteElement);
		}
		

		for ( i = 0; i < QuoteBoxs.length; i ++)
		{
			var QuoteBox = QuoteBoxs[i];
			var QuoteBoxviewportOffset = QuoteBox.getBoundingClientRect();
			var QuoteBoxTop = QuoteBoxviewportOffset.top;
			var QuoteBoxH = QuoteBox.scrollHeight;
			
			if ( scrollUp && QuoteBoxTop > showQuoteStartTop)
			{
				console.log("Hide QuoteBox", QuoteBoxTop);
				fadeOutQuote(QuoteBox, scrollUp);
			}
			
			else if ( !scrollUp &&  QuoteBoxTop < showQuoteStartTop)
			{
				console.log("Show QuoteBox", QuoteBox);
				fadeInQuote(QuoteBox);
			}

		}
		
		// Mark last shown QuoteBox
		for ( i = 0; i < QuoteBoxs.length; i++ )
		{
			var QuoteBox = QuoteBoxs[i];
			if ( QuoteBox.classList.contains('showQuote') && ( i == QuoteBoxs.length - 1 || QuoteBoxs[i + 1].classList.contains('hideQuote') ) )
			{
				addClass(QuoteBoxs[i], 'lastshown');
				console.log("QuoteBox[i]", QuoteBoxs[i]);
				//scroll_snap(QuoteBoxs[i]);
			}
			else
			{
				removeClass(QuoteBoxs[i], 'lastshown');
			}
		}
	}*/

	var wWidth = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	var wHeight = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	var aniheader = document.querySelector(".aniheader");
	var aniSection = document.querySelector(".anisticky_section");
	var aniBack = document.querySelector(".anisticky.back");
	var anistickyTop = document.querySelector(".anisticky.top");
	var anistickyTopSpace = document.querySelector(".anisticky.topspace");
	var anistickycardContainer = document.querySelector(".cardcontainer");
	var anistickyBottomSpace = document.querySelector(".anisticky.bottomspace");
	var anistickybottom = document.querySelector(".anisticky.bottom");
	var quoteboxContainer =  document.querySelector(".quoteboxcontainer");

	var aniheaderH = aniheader.scrollHeight;
	var anistickyTopH = anistickyTop.scrollHeight;
	var anistickyTopSpaceH = anistickyTopSpace.scrollHeight;
	var anistickycardContainerH = anistickycardContainer.scrollHeight;
	var anistickyBottomSpaceH = anistickyBottomSpace.scrollHeight;
	var anistickybottomH = anistickybottom.scrollHeight;
	var quoteboxContainerH = quoteboxContainer.scrollHeight;

	var ShowQuoteStartBottom = 115;
	var lastShownMarinBottom = 200;
	var initQuoteScroll = aniheaderH + anistickyTopH + anistickyTopSpaceH + anistickyBottomSpaceH+ anistickybottomH + ShowQuoteStartBottom;

	var lastScrollTop = 0;
	var precardNo = 1;
	var maxCardNo = 13;
	var scrollUp = 0;
	var is_in_animationarea = 0;
	document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
		if ( fixingPos ) {
			return;
		}

		var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
		var cardNo = 1;
		

		//console.log("aniheader", aniheaderH, "anistickyTop", anistickyTopH, "anistickyTopSpace", anistickyTopSpaceH, "anistickybottomH", anistickybottomH, "ShowQuoteStartBottom", ShowQuoteStartBottom, "initQuoteScroll", initQuoteScroll);
		console.log(st, initQuoteScroll);
		if (st > initQuoteScroll)
		{
			cardNo = Math.trunc((st -initQuoteScroll) / quoteboxContainerH) + 2;
		}

		if (st > lastScrollTop){
		  // downscroll code
		  console.log("down");
		  aniSection.classList.add("scrolldown");
		  removeClass(aniSection, "scrollup");
		  scrollUp = 0;
		} else {
		  // upscroll code
		  console.log("up");
		  aniSection.classList.add("scrollup");
		  removeClass(aniSection, "scrolldown");
		  scrollUp = 1;
		}
		console.log(st , aniheaderH + anistickyTopH + anistickyTopSpaceH + anistickycardContainerH +  
			anistickyBottomSpaceH + anistickybottomH + anistickyBottomSpaceH + quoteboxContainerH * (maxCardNo - 1) - wHeight);
		if (st < aniheaderH)
		{
			aniBack.style.position='absolute';
			aniBack.style.bottom = 'unset';
			aniBack.style.top = '0';
			is_in_animationarea = 0;
			FocusQuoteNo = 0;
		}
		else if (st >= aniheaderH && st < aniheaderH + anistickyTopH + anistickyTopH + anistickyTopSpaceH + anistickycardContainerH +  
			anistickyBottomSpaceH + anistickybottomH + anistickyBottomSpaceH + quoteboxContainerH * (maxCardNo - 1) - wHeight)
		{
			console.log("Leaving Up");
			aniBack.style.position='fixed';
			aniBack.style.top = 0;
			aniBack.style.bottom = 'unset';
			is_in_animationarea = 1;

		}
		else
		{
			aniBack.style.position='absolute';
			aniBack.style.bottom = 0;
			aniBack.style.top = 'unset';
			is_in_animationarea = 0;
			FocusQuoteNo = 14;
		}
		

		

		lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
		//console.log("scrolltop:", st, "pageno", cardNo);
		
		if (cardNo < 1)
		{
			cardNo = 1;
		}
		else if (cardNo > maxCardNo)
		{
			cardNo = maxCardNo;
		}
		
		/*checkFadeQuote(cardNo - 1 );
		checkFadeQuote(cardNo);
		checkFadeQuote(cardNo + 1 );

		console.log("CardNo", cardNo, "PrecardNo", precardNo);
		if (cardNo !== precardNo)
		{
			checkFadeQuote(precardNo - 1);
			checkFadeQuote(precardNo);
			checkFadeQuote(precardNo + 1);
			precardNo = cardNo;
		}*/

		for ( i = 1; i <= maxCardNo; i ++)
		{
			var cardbeforeid = "card" + (i - 1);
			var cardid = "card" + i;
			var cardafterid = "card" + (i + 1);
			var cardElement = document.getElementById(cardid);
			var beforecardElement = document.getElementById(cardbeforeid);
			var aftercardElement = document.getElementById(cardafterid);

			//console.log("cardNo", cardNo, "i", i);
			if ( i == cardNo)
			{
				if (cardElement.classList.contains("back"))
				{
					flipAdd(anistickycardContainer);
					addClass(anistickycardContainer, "fliparea");
					
				}
				else if (cardElement.classList.contains("front"))
				{
					flipRemove(anistickycardContainer);
					addClass(anistickycardContainer, "fliparea");				
				}
				else
				{
					if (cardNo < 7)
					{
						flipRemove(anistickycardContainer);
						removeClass(anistickycardContainer, "fliparea");
					}
					else if (cardNo > 8)
					{
						flipAdd(anistickycardContainer);
						addClass(anistickycardContainer, "fliparea");
					}
					
				}
				fadeIn(cardElement);
			}
			else
			{
				
				fadeOut(cardElement);
				//setTimeout(function(){console.log(cardElement); cardElement.style.visibility = "hidden";}, 5000);
			}
		}

	}, false);


	// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.

	var FocusQuoteNo = 0;
	var preFocusQuoteNo = 0;
	var preFocusBubbleNo = 0;
	var FocuseQuoteBubbleNo = 0;
	var QuoteBubbleCounts =new Array(maxCardNo);
	var startPos = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
	if (startPos > initQuoteScroll)
	{
		FocusQuoteNo = Math.trunc((startPos -initQuoteScroll) / quoteboxContainerH) + 2;
		console.log(FocusQuoteNo);
	}

	initQuoteBubbleCounts();

	function initQuoteBubbleCounts()
	{
		for ( i = 0; i < maxCardNo; i++)
		{
			var cardNo = i + 1;
			var quoteid = "quote" + cardNo;
			var QuoteBoxs = document.querySelectorAll("#" + quoteid + " .quote_icon");
					
			QuoteBubbleCounts[i] = QuoteBoxs.length;
			
		}
		
	}
	var fixingPos = 0;
	/*!
	 * Run a callback function after scrolling has stopped
	 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {Function} callback The function to run after scrolling
	 */
	var scrollStop = function (callback) {

		// Make sure a valid callback was provided
		if (!callback || typeof callback !== 'function') return;

		// Setup scrolling variable
		var isScrolling;

		// Listen for scroll events
		window.addEventListener('scroll', function (event) {
			if ( fixingPos )
			{
				return;
			}
			// =========================================== Set Scroll Stop ===========================================
			//console.log("scrolltop:", st, "pageno", cardNo);
			// Clear our timeout throughout the scroll
			window.clearTimeout(isScrolling);

			// Set a timeout to run after scrolling ends
			isScrolling = setTimeout(function() {

				// Run the callback
				callback();

			}, 66);

		}, false);

	};

	scrollStop(function () {
		console.log("Scroll Stoped, scrollUp:", scrollUp);
		console.log(FocusQuoteNo, FocuseQuoteBubbleNo);
		if ( scrollUp )
		{
			CheckFullScrollUp();
		} else if (!scrollUp ) {
			CheckFullScrollDown();
		}

	});

	function CheckFullScrollUp() {
		if ( is_in_animationarea)	{
			if ( FocuseQuoteBubbleNo <= 0 )
			{
				FocusQuoteNo = FocusQuoteNo - 1;
				FocuseQuoteBubbleNo = QuoteBubbleCounts[FocusQuoteNo - 1];
						console.log("FocusQuoteNo3", FocusQuoteNo, "FocuseQuoteBubbleNo", FocuseQuoteBubbleNo);
			}
			else
			{
				FocuseQuoteBubbleNo = FocuseQuoteBubbleNo - 1;
						console.log("FocusQuoteNo4", FocusQuoteNo, "FocuseQuoteBubbleNo", FocuseQuoteBubbleNo);
			}
			
			SetFocusQuote(FocusQuoteNo, FocuseQuoteBubbleNo);
		}
		else
		{
			var quoteDisplayElement = document.getElementById("quoteDisplay");
			quoteDisplayElement.innerHTML = '';
		}
	}

	function CheckFullScrollDown() {
		if ( is_in_animationarea )
		{
			console.log("focus ", QuoteBubbleCounts[FocusQuoteNo - 1]);
			if ( FocusQuoteNo == 0 || FocuseQuoteBubbleNo >= QuoteBubbleCounts[FocusQuoteNo - 1] )
			{
				FocusQuoteNo = FocusQuoteNo + 1;
				FocuseQuoteBubbleNo = 0;
						console.log("FocusQuoteNo1", FocusQuoteNo, "FocuseQuoteBubbleNo", FocuseQuoteBubbleNo);
			} 
			else
			{
				FocuseQuoteBubbleNo = FocuseQuoteBubbleNo + 1;
						console.log("FocusQuoteNo2", FocusQuoteNo, "FocuseQuoteBubbleNo", FocuseQuoteBubbleNo);
			}
		
			SetFocusQuote(FocusQuoteNo, FocuseQuoteBubbleNo);
		}
		else
		{
			var quoteDisplayElement = document.getElementById("quoteDisplay");
			quoteDisplayElement.innerHTML = '';
		}
		
		
	}
	
	function SetFocusQuote()
	{
		var quoteDisplayElement = document.getElementById("quoteDisplay");
		var quoteDisplayElementviewportOffset = quoteDisplayElement.getBoundingClientRect();


		console.log("preFocusQuoteNo", preFocusQuoteNo, "FocusQuoteNo", FocusQuoteNo, "FocuseQuoteBubbleNo", FocuseQuoteBubbleNo);
		if ( FocusQuoteNo > 1 && FocusQuoteNo <= maxCardNo )
		{
			fixingPos = 1;

			var st = ( FocusQuoteNo - 2 ) * quoteboxContainerH + initQuoteScroll;
			var quoteid = "quote" + FocusQuoteNo;
			var quoteElement = document.getElementById(quoteid);
			var showQuoteStartTop = anistickyTopH + anistickyTopSpaceH + anistickycardContainerH - ShowQuoteStartBottom;
			console.log("preFocusQuoteNo", preFocusQuoteNo, "FocusQuoteNo", FocusQuoteNo);
			if ( preFocusQuoteNo != FocusQuoteNo)
			{
				if ( !scrollUp && preFocusBubbleNo == 3)
				{
					quoteDisplayElement.classList.remove('showQuote');
					quoteDisplayElement.classList.remove('under');
					quoteDisplayElement.classList.add('hideQuote');
					quoteDisplayElement.classList.add('above');
					setTimeout(function(){
						quoteDisplayElement.innerHTML = quoteElement.innerHTML;
						preFocusQuoteNo= FocusQuoteNo;
						preFocusBubbleNo = 0;
						SetFocusQuote();
					}, 100);
					return;
				} else if (scrollUp && FocuseQuoteBubbleNo == 3)
				{
					quoteDisplayElement.innerHTML = quoteElement.innerHTML;
					quoteDisplayElement.style.top = "-1000px";
					/*quoteDisplayElement.classList.remove('hideQuote');
					quoteDisplayElement.classList.remove('above');
					quoteDisplayElement.classList.add('showQuote');
					quoteDisplayElement.classList.add('under');*/
					setTimeout(function(){
						preFocusQuoteNo= FocusQuoteNo;
						SetFocusQuote();
					}, 100);
					return;
				}
				quoteDisplayElement.innerHTML = quoteElement.innerHTML;
			}
			
			var QuoteBoxs = document.querySelectorAll("#quoteDisplay .quote_icon");
			var OffsetBubbles = 0;
			
			
			if ( quoteElement.classList.contains("right") )
			{
				quoteDisplayElement.classList.remove("left");
				quoteDisplayElement.classList.add("right");
			}
			else
			{
				quoteDisplayElement.classList.remove("right");
				quoteDisplayElement.classList.add("left");
			}
			
			console.log(QuoteBoxs);
			if (QuoteBoxs)
			{
				for ( i = 0 ; i < FocuseQuoteBubbleNo; i ++)
				{
					var QuoteBox = QuoteBoxs[i];
					console.log(QuoteBox);
					var QuoteBoxH = QuoteBox.scrollHeight;
					st = st + QuoteBoxH;
					OffsetBubbles = OffsetBubbles + QuoteBoxH;
				}

			}
			quoteDisplayElement.style.top = (showQuoteStartTop - OffsetBubbles) + "px";
			if ( !scrollUp )
			{
				quoteDisplayElement.classList.remove('hideQuote');
				quoteDisplayElement.classList.remove('above');
				quoteDisplayElement.classList.add('showQuote');
				quoteDisplayElement.classList.add('under');
			}
			checkFadeQuote2(FocusQuoteNo);
			console.log("Moving scroll to ", st);
			setTimeout(function() {
					window.scrollTo(0, st);
					
				}, 350);
			
			fadeInQuote(quoteElement);
			
			setTimeout(function() {

				fixingPos = 0;

			}, 600);
			
		}
		else
		{
			quoteDisplayElement.innerHTML = '';
		}
		preFocusQuoteNo = FocusQuoteNo;
		preFocusBubbleNo = FocuseQuoteBubbleNo;

//		console.log("quoteElementH", quoteElementH, "quoteElementTop", quoteElementTop);
			
	}


});