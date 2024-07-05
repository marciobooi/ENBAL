var socialNameSpace = {
  //social media
  linkedIn: function () {
    var currentUrl = window.location.href;
    var encodedUrl = encodeURIComponent(currentUrl);
    var description = encodeURIComponent("This visualization tool, created by Eurostat, displays an interactive energy balance table with a great level of detail.");
    var url =
      "https://www.linkedin.com/shareArticle?mini=true&title=CompleteEnergyBalances&summary=" + description + "&url=" + encodedUrl;
    window.open(
      url,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=450,width=650"
    );
    return false;
  },

  twitter: function () {
    var currentUrl = window.location.href;
    var encodedUrl = encodeURIComponent(currentUrl);
    var text = encodeURIComponent("This visualization tool, created by Eurostat, displays an interactive energy balance table with a great level of detail. CompleteEnergyBalances");
    var url = "https://twitter.com/share?text=" + text + "&url=" + encodedUrl;
    window.open(
      url,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=700"
    );
    return false;
  },

  facebook: function () {
    var currentUrl = window.location.href;
    var encodedUrl = encodeURIComponent(currentUrl);
    var description = encodeURIComponent("This visualization tool, created by Eurostat, displays an interactive energy balance table with a great level of detail.");
    var url =
      "https://www.facebook.com/sharer.php?u=" + encodedUrl + "&quote=" + description;
    window.open(
      url,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=700"
    );
    return false;
  },

  email: function () {
    var subject = encodeURIComponent("Complete Energy Balances");
    var body = encodeURIComponent("This visualization tool, created by Eurostat, displays an interactive energy balance table with a great level of detail. Check it out here: " + window.location.href);
    document.location =    
      "mailto:ESTAT-ENERGY@ec.europa.eu?subject=" + subject + "&body=" + body;
  },
};
