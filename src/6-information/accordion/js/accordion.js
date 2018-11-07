(function ($) {
	var animationDuration = 100;

	/*
	 Accessibility changes have degraded some of the features of this javascript. Initially each accordion-title (including the "Collapse/Expand all" toggle)
	 had a single rectangular focus outline, the "canfire" data wasn't required (it prevents repeat firing of the "Collapse/Expand all" toggle, introduced by
	 the restructuring of elements), and the HTML and javascript were a lot simpler. Additionally two browser-specific issues have been introduced to the
	 "Collapse/Expand all" toggle:
	 1. It doesn't show a focus outline when navigated to with the keyboard in Firefox.
	 2. It always shows a focus outline when clicked with the mouse in Chrome.
	 Ideally the HTML should be restructured again, and the javascript simplified, to restore the original behaviour.
	 */

	// .accordion-content is closed initially
	$('.accordion-list details summary').each(function() {
		$(this).nextAll().css('display','none');
	});

	// click the summary to toggle the .accordion-content
	// $('.accordion-list details summary').click(function(e) {
	$("body").on("click", ".accordion-list details summary",function(e) {	
		e.preventDefault();

		// store the open state of the accordion when clicked (open/closed)
		var toggleState = $(this).parent('details').prop('open');

		// add/remove class/prop to affect open/close state
		if (!toggleState) {
			//$(this).parent('details').addClass('open');
			$(this).parent('details').prop('open', true);
		}
	});

	/**
	 * Called by mouse click and keyboard space/enter actions
	 * @param oThis - the element clicked or focused
	 */
	function accordionFire(oThis) {
		// Is oThis the expand/collapse node?
		if ($(oThis).find(".accordion-expand").length) {
			$(oThis).data("canfire", "false");
			// Are we expanding or collapsing?
			var bCollapse = ($(oThis).find(".accordion-expand").html() === "Collapse all");
			// Iterate through and make the items match
			$(".accordion-item").each(function (index) {

                // exclude flag-accordion-item from being affected by collapse-all
                //TODO: implement collapse/expand all that doesn't affect all accordions on the page
                if (!$(this).hasClass('flag-contextual-accordion-item')) {
                    accordionItemToggle(this, bCollapse);
                }
			});
		}
		// Otherwise it's an individual item click
		else
			accordionItemToggle($(oThis).parent());
	}

	/**
	 * Toggles the state of an item's content if it meets one of three conditions:
	 *  - always toggle if the bCollapse boolean is undefined
	 *  - toggle if the item is open and we're asked to close it
	 *  - toggle if the item is closed and we're asked to open it
	 * @param oItem - an accordion-item summary
	 * @param bCollapse - true=collapse false=expand
	 */
	function accordionItemToggle(oItem, bCollapse) {
		$(oItem).data("canfire", 'false');
		var oContent = $(oItem).find(".accordion-content");
		if (oContent.length) {
			if (typeof bCollapse === "undefined" || (bCollapse && oContent.is(":visible")) || (!bCollapse && !oContent.is(":visible"))) {
				oContent.animate({
					height: "toggle"
				}, animationDuration, function () {
					if (oContent.is(":visible")) {
						$(oItem).find("details").prop("open", true);
						$(oItem).find(".accordion-close").show();
						$(oItem).find(".accordion-open").hide();
						$(oItem).find("summary").css("color", "#121212");
						$(oItem).addClass("accordion-heading-open");
						$(".book-mobile-menu").addClass("accordion-heading-open");
						$(oItem).find(".accordion-item-button").attr("aria-expanded", "true");
						calculateExpanderState(oItem);
					} else {
						$(oContent).closest('details').removeProp("open");
						$(oItem).find(".accordion-close").hide();
						$(oItem).find(".accordion-open").show();
						$(oItem).find("summary").css("color", "#336699");
						$(oItem).removeClass("accordion-heading-open");
						$(".book-mobile-menu").removeClass("accordion-heading-open");
						$(oItem).find(".accordion-item-button").attr("aria-expanded", "false");
						calculateExpanderState(oItem);
					}
					$(oItem).data("canfire", 'true');
				});
			}
		}
	}

	// Given a change on oItem, a jQuery object that represents the <detail> element that has changed, or an
	// expander button (not a jQuery), determine if it has an expander, and if so, what the new state of that
	// expander should be.
	function calculateExpanderState(oItem) {
		oItem = $(oItem); // make into jQuery

		var $expander, $items;

		// Determine first whether we're talking about an inline <detail> or an older accordion list variation.
		// In each case we want to identify both the expander and the items. $expander will be the expander element, if
		// present, or an empty jquery if not.
		if (oItem.is('button')) {
			// the user has clicked the expand/all button, and the expander is now already in the correct state.
			// So do nothing.
			oItem = null;
		}
		else if (oItem.hasClass('inline-accordion')) {
			// inline is a bit more tricky. We have to go back from oItem, skipping <detail> elements until we
			// see what's before. If it has .accordion-toggle, then it's the expander, otherwise there is no
			// expander and $items will not matter.

			// Get the element before any of the <details> elements.
			$prior = oItem.prev();
			while ($prior.is('details')) {
				$prior = $prior.prev();
			}
			if ($prior.hasClass('accordion-toggle')) {
				$expander = $prior;
				$items = $expander.nextUntil(':not(details)');
			}
		} else {
			// get the accordion list
			var $list = $(oItem).closest('.accordion-list');
			$expander = $list.prev();
			$items = $list.find('.accordion-item');
		}

		// if there are multiple accordion items
		if ($expander && $expander.length > 0) {
			var itemsOpen = 0;
			var itemsClosed = 0;

			// determine the fraction of open vs closed items
			$items.each(function() {

				// check if items are open
				if ($(this).prop("open") == true) {
					itemsOpen = itemsOpen + 1;
				} else {
					itemsClosed = itemsClosed + 1;
				}
			});

			// determine which label to show on the collapse/expand button
			var state = '';
			var buttonClass = '';
			if (itemsOpen >= itemsClosed) {
				state = 'Collapse all';
				buttonClass = 'shrink';
			} else {
				state = 'Expand all';
				buttonClass = 'grow';
			}

			// set the button label
			var button = $expander.find('button');

			$(button).html(state);
			$(button).removeClass('grow shrink');
			$(button).addClass(buttonClass);
		}
	}

	/**
	 * Called when any accordion item is clicked
	 * Note that the "Expand/Collapse all" link at the bottom is an accordion item
	 */
	$("body").on("click", ".accordion-item .accordion-trigger",function() {
		if ($(this).data("canfire") !== 'false') {
			accordionFire(this);
			// Hide focus rectangle for mouse clicks only
			$(this).find(".accordion-item-button").addClass('hidefocus');
		}
	});

	// Restore focus rectangle capability after we leave
	$(".accordion-item .accordion-trigger").on("blur", function () {
		$(this).find(".accordion-item-button").removeClass('hidefocus');
	});


	// $(".SubHubNavigationPageFeature .accordion-item .accordion-trigger").on("click", function () {
	$("body").on("click", ".SubHubNavigationPageFeature .accordion-item .accordion-trigger",function() {	
		var block = $(this).closest('.block-left')
		block.toggleClass('open');
	});


	/**
	 * Set the initial state for the accordion items
	 * If scripting is disabled, all items are displayed, the "Expand/Collapse all" toggle is hidden
	 * and the accordion list has a 2rem bottom margin
	 */
	$(".accordion-item").each(function (index) {
		accordionItemToggle(this, true);
	});
	// Display the "Expand/Collapse all" toggle
	$(".accordion-toggle").show();

	$('.process-nav li:first-child').addClass('selected');

    // Change the state of the flags contextual images toggle button when clicked
    $("body").on("click", ".accordion-item-button.flags-contextual-images-button",function(e) {

        var toggleLabel = $('.accordion-item-button.flags-contextual-images-button .accordion-title');
        if (toggleLabel.hasClass('open')) {
            toggleLabel.removeClass('open');
            toggleLabel.html('See more designs in context');
        } else {
            toggleLabel.addClass('open');
            toggleLabel.html('Hide Contextual images');
        }
    });

	// expand/collapse all items in an accordion list
	$("body").on("click", ".accordion-expand",function(e) {
		var trigger = $(this);
		var target = $(e.target).data('target');
		var scope;
		var items;

		if (target) {
			// This is used for the old accordion implementation where the expander button identifies a top-level
			// container, which acts as the scope, and the items are all .accordion-items within this scope.
			scope = $('#'+target);
			items = $(scope).find('.accordion-item');
		} else {
			// This is used for the inline accordion implementation where the accordion items that are subject to expand
			// and collapse are those detail elements that immediately follow the .accordion-toggle that the button is on.
			scope = trigger.closest('.accordion-toggle');
			items = scope.nextUntil(':not(details)');
		}

		// var content = $(this).find(".accordion-content");
		// var trigger = $(scope).find('.accordion-expand');

		if ($(scope).find('.accordion-expand').hasClass('grow')) {

			$(items).each(function() {
				var itemContent = $(this).find(".accordion-content");

				$(this).prop("open", true);
				$(this).find(".accordion-close").show();
				$(this).find(".accordion-open").hide();
				$(this).find("summary").css("color", "#121212");
				$(".book-mobile-menu").addClass("accordion-heading-open");
				$(this).find(".accordion-item-button").attr("aria-expanded", "true");

				var details = $(this).closest('details');
				if (!details.hasClass('accordion-heading-open')) {
					$(itemContent).animate({
						height: "toggle"
					}, animationDuration, function() {
						$(this).show();
					});
				}
				$(this).addClass("accordion-heading-open");
			});
			$(trigger).removeClass('grow');
			$(trigger).addClass('shrink');
			$(trigger).html('Collapse all');
			calculateExpanderState(this);

		} else {
			$(items).each(function() {
				var itemContent = $(this).find(".accordion-content");

				$(this).find(".accordion-close").hide();
				$(this).find(".accordion-open").show();
				$(this).find("summary").css("color", "#336699");
				$(this).removeClass("accordion-heading-open");
				$(".book-mobile-menu").removeClass("accordion-heading-open");
				$(this).find(".accordion-item-button").attr("aria-expanded", "false");
				$(itemContent).animate({
					height: "toggle"
				}, animationDuration, function() {
					$(this).closest('details').removeProp("open");
					$(itemContent).hide();
				});

			});
			$(scope).find('.accordion-expand').removeClass('shrink');
			$(scope).find('.accordion-expand').addClass('grow');
			$(trigger).html('Expand all');
			calculateExpanderState(this);
		}

	});

	// In each consecutive inline accordion item, add a class for a border bottom if it is not followed
	// by a detail section. i.e. apply the class to each detail element that is the last in it's sequence.
	$('.accordion-item.inline-accordion').each(function() {
		var $next = $(this).next();
		if (!$next.hasClass('accordion-item')) {
			$(this).addClass('last-in-seq');
		}
	});

	/* Inline accordion header, which shows the expand-all/collapse-all, needs to have an aria-controls
	 * attribute with IDs of all the elements it controls. This is in a set timeout, because the IDs are assigned
	 * after load in javascript, so this needs to happen after existing events have processed.
	 * @todo a good refactoring target, esp if old accordion implementations are deprecated.
	 */
	setTimeout(function() {
		$('.accordion-toggle.inline-accordion').each(function() {
			var items = $(this).nextUntil(':not(details)');
			var ids = '';
			items.each(function(i, el) {
				ids += $(el).attr('id') + ' ';
			})
			$('button', this).attr('aria-controls', ids);
		});
	}, 100);

})(jQuery);
