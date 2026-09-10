/* =====================================================================
   Ringecke Boxbedarf: kleines, funktionales JS
   Kein Deko-Firlefanz: nur Mobile-Menü + Handschuh-Empfehlung.
   ===================================================================== */

(function () {
  "use strict";

  /* ---- Mobile-Navigation ein-/ausklappen ---- */
  var schalter = document.querySelector(".nav-schalter");
  var nav = document.getElementById("hauptnav");

  if (schalter && nav) {
    schalter.addEventListener("click", function () {
      var offen = nav.classList.toggle("ist-offen");
      schalter.setAttribute("aria-expanded", offen ? "true" : "false");
    });

    // Nach Klick auf einen Link das Menü schließen (mobil)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("ist-offen")) {
        nav.classList.remove("ist-offen");
        schalter.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- oz-Empfehlung nach Körpergewicht (Sparring) ----
     Richtwerte, wie wir sie auch im Laden geben. Keine Wissenschaft,
     sondern Erfahrung: fürs Sparring lieber eine Nummer schwerer. */
  var form = document.getElementById("oz-form");
  var ausgabe = document.getElementById("oz-ergebnis");

  function empfehlung(kg) {
    if (kg < 60)  return { oz: "12 oz", satz: "Leicht genug, dass die Hände nicht ermüden, trotzdem genug Polster fürs Sparring." };
    if (kg < 70)  return { oz: "14 oz", satz: "Der Allrounder. Passt für die meisten im Vereinstraining." };
    if (kg <= 90) return { oz: "16 oz", satz: "Mehr Polster schützt dich und deinen Partner bei mehr Schlagkraft." };
    return { oz: "16 bis 18 oz", satz: "Ab dieser Klasse gerne das dickste Polster, deine Partner danken es dir." };
  }

  if (form && ausgabe) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var feld = document.getElementById("gewicht");
      var kg = parseInt(feld.value, 10);

      if (isNaN(kg) || kg < 30 || kg > 180) {
        ausgabe.innerHTML = "Trag bitte ein Gewicht zwischen 30 und 180&nbsp;kg ein, oder komm einfach vorbei, dann probieren wir’s durch.";
        return;
      }

      var e2 = empfehlung(kg);
      ausgabe.innerHTML =
        "<strong>" + e2.oz + "</strong>" + e2.satz +
        " Beim nächsten Ladenbesuch legen wir dir genau die zum Anprobieren raus.";
    });
  }

  /* ===================================================================
     Produktdetailseite (produkt.html) - nur aktiv, wenn vorhanden
     =================================================================== */
  var pdp = document.getElementById("pdp");
  if (pdp) {
    var stand = { oz: "12", farbe: "Grau/Schwarz", code: "GS" };

    var variante = document.getElementById("pdp-variante");
    var artnr = document.getElementById("pdp-artnr");

    function aktualisiereVariante() {
      if (variante) variante.textContent = stand.oz + " oz · " + stand.farbe + " · Rindsleder";
      if (artnr) artnr.textContent = "RB-KP-" + stand.oz + "-" + stand.code;
    }

    /* --- Gewicht (Unzen) --- */
    var ozHinweise = {
      "6":  "Gewählt: 6 oz. Leichter Wettkampfhandschuh.",
      "8":  "Gewählt: 8 oz. Wettkampf und schnelles Pratzentraining.",
      "10": "Gewählt: 10 oz. Training und leichtere Boxer.",
      "12": "Gewählt: 12 oz. Für Sparring ab rund 60 kg gut geeignet."
    };
    var ozBtns = pdp.querySelectorAll(".pdp-oz__btn");
    var ozHinweis = document.getElementById("pdp-oz-hinweis");
    ozBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        ozBtns.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        stand.oz = btn.getAttribute("data-oz");
        if (ozHinweis) ozHinweis.textContent = ozHinweise[stand.oz] || "";
        aktualisiereVariante();
      });
    });

    /* --- Farbwahl (färbt das Bild um) --- */
    var bild = document.getElementById("pdp-bild");
    var codes = { "Grau/Schwarz": "GS", "Rot/Schwarz": "RS", "Komplett Schwarz": "SW" };
    var farbBtns = pdp.querySelectorAll(".pdp-farbe");
    farbBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        farbBtns.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        if (bild) bild.className = "pdp-bild " + btn.getAttribute("data-theme");
        var label = btn.getAttribute("data-label");
        stand.farbe = label;
        stand.code = codes[label] || "GS";
        aktualisiereVariante();
      });
    });

    /* --- Menge --- */
    var mengeFeld = document.getElementById("pdp-menge");
    pdp.querySelectorAll(".pdp-menge__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var wert = parseInt(mengeFeld.value, 10);
        if (isNaN(wert)) wert = 1;
        wert += parseInt(btn.getAttribute("data-step"), 10);
        if (wert < 1) wert = 1;
        if (wert > 99) wert = 99;
        mengeFeld.value = wert;
      });
    });
    if (mengeFeld) {
      mengeFeld.addEventListener("change", function () {
        var wert = parseInt(mengeFeld.value, 10);
        if (isNaN(wert) || wert < 1) wert = 1;
        if (wert > 99) wert = 99;
        mengeFeld.value = wert;
      });
    }

    /* --- In den Warenkorb (Demo-Rückmeldung) --- */
    var korb = document.getElementById("pdp-warenkorb");
    var korbNotiz = document.getElementById("pdp-kauf-notiz");
    if (korb && korbNotiz) {
      korb.addEventListener("click", function () {
        var menge = mengeFeld ? mengeFeld.value : "1";
        korbNotiz.textContent = menge + "× „Karlsplatz“ " + stand.oz + " oz, " +
          stand.farbe + " gemerkt. (Beispiel-Vorlage: hier wird später der Warenkorb angebunden.)";
      });
    }

    /* --- Tabs Beschreibung / Details --- */
    var tabs = pdp.querySelectorAll(".pdp-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = true;
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        var aktiv = document.getElementById(tab.getAttribute("aria-controls"));
        if (aktiv) aktiv.hidden = false;
      });
    });
  }
})();
