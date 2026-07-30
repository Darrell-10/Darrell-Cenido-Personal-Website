document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-gallery-carousel]");

  carousels.forEach((carousel) => {
    const cards = Array.from(carousel.querySelectorAll("[data-carousel-card]"));
    if (!cards.length) return;

    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const indexEl = carousel.querySelector("[data-carousel-index]");
    const totalEl = carousel.querySelector("[data-carousel-total]");
    let activeIndex = 0;

    if (totalEl) {
      totalEl.textContent = String(cards.length);
    }

    const render = () => {
      const total = cards.length;

      cards.forEach((card, index) => {
        card.classList.remove("is-active", "is-next", "is-prev", "is-back");
        card.setAttribute("aria-hidden", "true");

        const offset = (index - activeIndex + total) % total;
        if (offset === 0) {
          card.classList.add("is-active");
          card.setAttribute("aria-hidden", "false");
        } else if (offset === 1) {
          card.classList.add("is-next");
        } else if (offset === total - 1) {
          card.classList.add("is-prev");
        } else {
          card.classList.add("is-back");
        }
      });

      if (indexEl) {
        indexEl.textContent = String(activeIndex + 1);
      }

      // Re-process embeds when the active Instagram/Twitter card changes.
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process();
      }
      if (window.twttr?.widgets?.load) {
        window.twttr.widgets.load(carousel);
      }
    };

    const go = (delta) => {
      activeIndex = (activeIndex + delta + cards.length) % cards.length;
      render();
    };

    prevBtn?.addEventListener("click", () => go(-1));
    nextBtn?.addEventListener("click", () => go(1));

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    });

    render();
  });
});
