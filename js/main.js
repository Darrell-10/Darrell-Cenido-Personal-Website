document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const tabs = document.querySelectorAll("[data-gallery-tab]");
  const panels = document.querySelectorAll("[data-gallery-panel]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-gallery-tab");

      tabs.forEach((btn) => btn.classList.toggle("active", btn === tab));
      panels.forEach((panel) => {
        panel.classList.toggle(
          "hidden",
          panel.getAttribute("data-gallery-panel") !== target
        );
      });

      if (
        target === "instagram" &&
        window.instgrm &&
        window.instgrm.Embeds &&
        typeof window.instgrm.Embeds.process === "function"
      ) {
        window.instgrm.Embeds.process();
      }
    });
  });

  const mapEl = document.getElementById("journey-map");
  if (mapEl && window.L) {
    const map = L.map(mapEl, {
      scrollWheelZoom: false,
    }).setView([37.7, -121.95], 9);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    const markerStyle = {
      radius: 9,
      fillColor: "#0f1c2e",
      color: "#a8d5e5",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.95,
    };

    const stops = [
      {
        coords: [37.7805, -121.5425],
        title: "Mountain House, CA",
        detail:
          "Home base — where family support and early habits of deliberate improvement began.",
      },
      {
        coords: [37.97798, -122.03107],
        title: "Concord, CA — De La Salle",
        detail:
          "High school leadership, tutoring, varsity basketball, and track & field foundation.",
      },
      {
        coords: [37.8044, -122.2712],
        title: "Oakland / East Bay",
        detail:
          "Oakland Soldiers roots and Bay Area basketball grind that shaped my competitive foundation.",
      },
      {
        coords: [37.7652, -122.2416],
        title: "Alameda College",
        detail:
          "Championship tournament moment — last-second layup that sealed the win and deepened my love for the game.",
      },
      {
        coords: [47.6671, -117.4024],
        title: "Spokane, WA — Gonzaga",
        detail:
          "Computer Science & Hogan Entrepreneurial Leadership · Club Basketball · Class of 2028.",
      },
      {
        coords: [37.7749, -122.4194],
        title: "Bay Area startups & AI work",
        detail:
          "Code Lexica consulting through New Venture Lab and AI-Native Marketing Internship at BrandCapsule.",
      },
      {
        coords: [48.8049, 2.1204],
        title: "Versailles, France",
        detail:
          "Travel milestone — exploring the garden maze and discovering joy in unfamiliar paths.",
      },
    ];

    const latLngs = stops.map((stop) => {
      const marker = L.circleMarker(stop.coords, markerStyle).addTo(map);
      marker.bindPopup(`<strong>${stop.title}</strong><br>${stop.detail}`);
      return stop.coords;
    });

    const bayStops = latLngs.slice(0, 4);
    const route = L.polyline(bayStops, {
      color: "#3b2414",
      weight: 3,
      opacity: 0.75,
      dashArray: "8 10",
    }).addTo(map);

    map.fitBounds(L.latLngBounds(bayStops.concat([stops[4].coords])).pad(0.25));

    const spokaneBtn = document.getElementById("show-spokane");
    if (spokaneBtn) {
      spokaneBtn.addEventListener("click", () => {
        map.flyTo([47.6671, -117.4024], 7, { duration: 1.4 });
      });
    }

    const bayBtn = document.getElementById("show-bay-area");
    if (bayBtn) {
      bayBtn.addEventListener("click", () => {
        map.flyToBounds(L.latLngBounds(bayStops).pad(0.25), { duration: 1.2 });
      });
    }
  }
});
