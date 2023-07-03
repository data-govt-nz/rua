export default function () {
  let prevScrollTop = 0;
  const initialPos = $(document).scrollTop();
  const topTrigger = $(".js-scroll-top");
  const w = $(window);

  const hideTopTrigger = () => {
    topTrigger.addClass("hidden");
  };

  const showTopTrigger = () => {
    topTrigger.removeClass("hidden");
  };

  function onScroll(currentScrollTop) {
    const t = $(this);
    console.log(t.scrollTop());
    // only show scroll to top button at the very bottom and little bit of scrolling up.
    if (
      t.scrollTop() + t.height() == $(document).height() ||
      t.scrollTop() + 150 + t.height() > $(document).height()
    ) {
      prevScrollTop = currentScrollTop;
      showTopTrigger();
    } else {
      prevScrollTop = currentScrollTop;
      hideTopTrigger();
    }
  }

  if (initialPos == $(document).height()) {
    showTopTrigger();
  } else {
    hideTopTrigger();
  }

  w.on("scroll", function () {
    let currentScrollTop = $(this).scrollTop();
    onScroll.call(this, currentScrollTop);
  });

  w.on("touchmove", function () {
    let currentScrollTop = $(this).scrollTop();
    onScroll.call(this, currentScrollTop);
  });

  topTrigger.on("click", () => {
    $("body, html").animate({ scrollTop: 0 }, 300);
  });
}
