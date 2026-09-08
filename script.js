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
})();
