
var socialNameSpace = (function () {
  const text = {
    EN: "This visualization tool, created by Eurostat, displays an interactive energy balance table with a great level of detail.",
    FR: "Cet outil de visualisation, créé par Eurostat, affiche un tableau interactif de bilan énergétique avec un niveau de détail élevé.",
    DE: "Dieses Visualisierungswerkzeug, erstellt von Eurostat, zeigt eine interaktive Energiebilanz-Tabelle mit einem hohen Detailgrad."
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const language = (REF.language || 'EN').toUpperCase(); // Default to English and ensure uppercase

  function openWindow(url, height = 450, width = 650) {
    window.open(url, "", `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=${height},width=${width}`);
  }

  return {
    linkedin: function () {
      const description = encodeURIComponent(text[language]);
      const url = `https://www.linkedin.com/shareArticle?mini=true&title=Energyprices&summary=${description}&url=${currentUrl}`;
      openWindow(url);
      return false;
    },

    twitter: function () {
      const textContent = encodeURIComponent(text[language]);
      const url = `https://twitter.com/share?text=${textContent}&url=${currentUrl}`;
      openWindow(url, 400, 700);
      return false;
    },

    facebook: function () {
      const description = encodeURIComponent(text[language]);
      const url = `https://www.facebook.com/sharer.php?u=${currentUrl}&quote=${description}`;
      openWindow(url, 500, 700);
      return false;
    },

    email: function () {
      const subject = encodeURIComponent("Energy prices");
      const body = encodeURIComponent(`${text[language]} ${window.location.href}`);
      document.location = `mailto:ESTAT-ENERGY@ec.europa.eu?subject=${subject}&body=${body}`;
    },
  };
})();