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

  const hobbyStack = document.querySelector("[data-hobby-stack]");
  if (hobbyStack) {
    const cards = Array.from(hobbyStack.querySelectorAll("[data-hobby-card]"));
    let activeIndex = 0;

    const renderStack = () => {
      const total = cards.length;
      cards.forEach((card, index) => {
        card.classList.remove("is-active", "is-next", "is-back");
        card.setAttribute("aria-hidden", "true");

        const offset = (index - activeIndex + total) % total;
        if (offset === 0) {
          card.classList.add("is-active");
          card.setAttribute("aria-hidden", "false");
        } else if (offset === 1) {
          card.classList.add("is-next");
        } else {
          card.classList.add("is-back");
        }
      });
    };

    hobbyStack.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % cards.length;
      renderStack();
    });

    renderStack();
  }

  const mapEl = document.getElementById("journey-map");
  if (mapEl && window.L) {
    const map = L.map(mapEl, {
      scrollWheelZoom: false,
      worldCopyJump: true,
    }).setView([20, 0], 2);

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
          "Bethany Elementary School — hometown roots where the journey began.",
        zoom: 11,
      },
      {
        coords: [37.97798, -122.03107],
        title: "Concord, CA",
        detail:
          "De La Salle High School — CS &amp; math tutoring in the Learning Center, API Club president, and varsity basketball.",
        zoom: 12,
      },
      {
        // Tandag City, Surigao del Sur, Philippines
        coords: [9.0794, 126.1711],
        title: "Tandag City, Surigao del Sur",
        detail:
          "Where I learned the value of service and giving back to the community.",
        zoom: 6,
      },
      {
        coords: [47.6671, -117.4024],
        title: "Spokane, WA",
        detail:
          "Gonzaga University — B.S. Computer Science &amp; Hogan Entrepreneurial Leadership, Club Basketball, Class of 2028. Code Lexica via New Venture Lab — ICP research, pitch-deck feedback, and an ROI calculator for sales enablement.",
        zoom: 11,
      },
      {
        coords: [36.9741, -122.0308],
        title: "Santa Cruz, CA",
        detail:
          "BrandCapsule — AI-Native Marketing Intern building lifecycle email systems, KPI dashboards, and AI Discovery Intelligence for brand growth.",
        zoom: 12,
      },
    ];

    const markers = stops.map((stop) => {
      const marker = L.circleMarker(stop.coords, markerStyle).addTo(map);
      marker.bindPopup(`<strong>${stop.title}</strong><br>${stop.detail}`);
      return marker;
    });

    // Connect the U.S. path as a continuous route; Philippines stands apart.
    const usStops = stops.filter((stop) => stop.coords[1] < 0);
    L.polyline(
      usStops.map((stop) => stop.coords),
      {
        color: "#3b2414",
        weight: 3,
        opacity: 0.75,
        dashArray: "8 10",
      }
    ).addTo(map);

    const allBounds = L.latLngBounds(stops.map((stop) => stop.coords));
    map.fitBounds(allBounds.pad(0.15));

    const stopsEl = document.querySelector(".journey-stops");
    const syncMapHeight = () => {
      if (!stopsEl) return;
      const nextHeight = Math.max(Math.round(stopsEl.getBoundingClientRect().height), 320);
      mapEl.style.height = `${nextHeight}px`;
      map.invalidateSize();
    };

    syncMapHeight();
    window.addEventListener("resize", syncMapHeight);
    setTimeout(syncMapHeight, 50);

    const stopButtons = Array.from(document.querySelectorAll(".journey-stop"));
    let activeIndex = -1;

    const flyOptions = {
      duration: 1.5,
      easeLinearity: 0.12,
    };

    const goToStop = (index, { openPopup = false } = {}) => {
      const stop = stops[index];
      const marker = markers[index];
      if (!stop || !marker) return;

      if (activeIndex !== index) {
        activeIndex = index;
        stopButtons.forEach((btn, i) => btn.classList.toggle("is-active", i === index));
        map.flyTo(stop.coords, stop.zoom, flyOptions);

        if (openPopup) {
          map.once("moveend", () => {
            if (activeIndex === index) marker.openPopup();
          });
        }
        return;
      }

      if (openPopup) {
        marker.openPopup();
      }
    };

    stopButtons.forEach((btn) => {
      const index = Number(btn.dataset.stop);
      // Map movement is click-only — hover is visual feedback only.
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        goToStop(index, { openPopup: true });
      });
    });
  }
});
