function trapTab() {
  // Focus on the first focusable element within the chartOptionsMenu
  var firstElement = $("#chartOptionsMenu select, #chartOptionsMenu button").first();
  firstElement.focus();

  $("#chartOptionsMenu").keydown(function handleKeydown(event) {
    if (event.key.toLowerCase() !== "tab") {
      return;
    }

    const selects = $("#chartOptionsMenu select");
    const btns = $("#chartOptionsMenu button");
    const focusableElements = selects.add(btns);
    var target = $(event.target);

    if (event.shiftKey) {
      if (target.is(firstElement)) {
        event.preventDefault();
        focusableElements.last().focus();
      }
    } else {
      if (target.is(focusableElements.last())) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  $(document).mouseup(function (e) {
    var container = $("#chartOptionsMenu");
    var menuButton = $("#menu");
  
    // Check if the click is outside the container or on the menu button
    if (!container.is(e.target) && container.has(e.target).length === 0 && !menuButton.is(e.target)) {
      container.addClass('toggleMenu');
    }
  });
  
  // Handle click on the menu button
  $("#menu").click(function() {
    var container = $("#chartOptionsMenu");
    container.toggleClass('toggleMenu');
  });
}
