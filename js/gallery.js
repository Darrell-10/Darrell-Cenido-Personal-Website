const GALLERY_THUMBS = {
  hudl: "assets/images/photo-3.jpg",
  instagram: "assets/images/photo-6.jpg",
};

const GALLERY_MEDIA = [
  { type: "hudl", id: "2Na8bf", title: "2 Blocks vs Salesian", size: "sm", frame: "oval", rotate: -2 },
  { type: "youtube", id: "-wObpoeE2Fc", title: "Capital Clash Tournament G365", size: "lg", frame: "gold", rotate: 1 },
  { type: "instagram", id: "C6wB17XLqK5", title: "Instagram highlight", size: "sm", frame: "black", rotate: 2 },
  { type: "hudl", id: "2Na7k7", title: "De La Salle vs Salesian — Feb. 23, 2024", size: "md", frame: "gold", rotate: -1 },
  { type: "link", url: "https://bayprepsinsider.substack.com/p/nor-cal-tip-off-de-la-salle-upsets", title: "Nor Cal Tip-Off Feature", subtitle: "Bay Preps Insider", size: "sm", frame: "black", rotate: -3 },
  { type: "hudl", id: "2NLKK4", title: "De La Salle vs California — Feb. 2, 2024", size: "md", frame: "gold", rotate: 2 },
  { type: "instagram", id: "C30hdzHJW58", title: "On-court moment", size: "sm", frame: "oval", rotate: 1 },
  { type: "youtube", id: "ErUB-8GQZ3g", title: "Basketball Circuit Fall Championship", size: "lg", frame: "gold", rotate: -2 },
  { type: "hudl", id: "2NHvhY", title: "De La Salle vs San Ramon Valley — Jan. 30, 2024", size: "md", frame: "gold", rotate: 1 },
  { type: "instagram", id: "CzJzNDhPubq", title: "Capital Clash energy", size: "sm", frame: "black", rotate: -2 },
  { type: "hudl", id: "2N74Va", title: "2 Fast Breaks vs Crean Lutheran", size: "sm", frame: "oval", rotate: 3 },
  { type: "link", url: "https://issuu.com/dlshs.concord/docs/de_la_salle_union_fall_2022_web_single_hr", title: "Union Magazine Fall 2022", subtitle: "Pursuing Excellence", size: "sm", frame: "gold", rotate: 2 },
  { type: "youtube", id: "lovD2Velreo", title: "NorCal Frosh/Soph Camp 2022", size: "md", frame: "black", rotate: -1 },
  { type: "hudl", id: "2N74VY", title: "De La Salle vs Crean Lutheran — Jan. 15, 2024", size: "md", frame: "gold", rotate: -2 },
  { type: "instagram", id: "Cx-yhA9BDBS", title: "Fall Championship look", size: "sm", frame: "oval", rotate: 1 },
  { type: "hudl", id: "2N27hs", title: "2 Steals vs Notre Dame", size: "sm", frame: "black", rotate: -1 },
  { type: "youtube", id: "jRqBR6u7Kw4", title: "BALLS OUT at EBC Sacramento 2019", size: "lg", frame: "gold", rotate: 2 },
  { type: "hudl", id: "2MzA88", title: "Game Highlights vs American Fork", size: "md", frame: "gold", rotate: -1 },
  { type: "instagram", id: "Cx5w6ZbMzdi", title: "Circuit highlights", size: "sm", frame: "black", rotate: 2 },
  { type: "hudl", id: "2Mi13V", title: "2 Steals vs Central Catholic", size: "sm", frame: "oval", rotate: -2 },
  { type: "youtube", id: "oprKGK9SXQ4", title: "COLD BLOODED at EBC", size: "md", frame: "black", rotate: 1 },
  { type: "instagram", id: "CsjShV7oQX9", title: "Game-day post", size: "sm", frame: "black", rotate: -2 },
  { type: "hudl", id: "2KCt6N", title: "Game Highlights vs Deer Valley", size: "md", frame: "gold", rotate: 2 },
  { type: "instagram", id: "CnxZCMZheFe", title: "Playing for Legacy AAU", size: "sm", frame: "oval", rotate: -1 },
  { type: "youtube", id: "PBxANOSPAEE", title: "EVERYWHERE at 2018 EBC Jr All American", size: "lg", frame: "gold", rotate: -2 },
  { type: "hudl", id: "2JzpFm", title: "Game Highlights vs Palma", size: "md", frame: "gold", rotate: 1 },
  { type: "instagram", id: "CWzcmBilRHD", kind: "tv", title: "Instagram TV clip", size: "sm", frame: "black", rotate: 2 },
  { type: "youtube", id: "pKPwCnWJFl0", title: "SCORES INSIDE & OUTSIDE at 2018 EBC Oakland", size: "lg", frame: "gold", rotate: 1 },
  { type: "photo", src: "assets/images/photo-4.jpg", title: "Still moments", size: "sm", frame: "oval", rotate: -3 },
];

function youtubeThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function instagramPath(item) {
  const kind = item.kind || "p";
  return `https://www.instagram.com/${kind}/${item.id}/`;
}

function instagramEmbed(item) {
  const kind = item.kind || "p";
  return `https://www.instagram.com/${kind}/${item.id}/embed`;
}

function hudlUrl(id) {
  return `https://www.hudl.com/v/${id}`;
}

function hudlEmbed(id) {
  return `https://www.hudl.com/embed/video/${id}`;
}

function youtubeEmbed(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1`;
}

function createPlayOverlay() {
  const overlay = document.createElement("span");
  overlay.className = "gallery-play";
  overlay.setAttribute("aria-hidden", "true");
  overlay.textContent = "▶";
  return overlay;
}

function createThumbFrame(item, thumbSrc, embedUrl, externalUrl) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = buildFrameClasses(item);
  button.style.setProperty("--frame-rotate", `${item.rotate || 0}deg`);
  button.setAttribute("data-gallery-open", "true");
  button.setAttribute("data-embed-url", embedUrl);
  if (externalUrl) {
    button.setAttribute("data-external-url", externalUrl);
  }
  button.setAttribute("aria-label", `Open ${item.title}`);

  const inner = document.createElement("div");
  inner.className = "gallery-frame-inner";

  const img = document.createElement("img");
  img.src = thumbSrc;
  img.alt = "";
  img.loading = "lazy";

  inner.appendChild(img);
  inner.appendChild(createPlayOverlay());
  button.appendChild(inner);

  const label = document.createElement("span");
  label.className = "gallery-frame-label";
  label.textContent = item.title;
  button.appendChild(label);

  return button;
}

function createLinkFrame(item) {
  const link = document.createElement("a");
  link.className = buildFrameClasses(item);
  link.style.setProperty("--frame-rotate", `${item.rotate || 0}deg`);
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", item.title);

  const inner = document.createElement("div");
  inner.className = "gallery-frame-inner gallery-frame-inner-link";

  const heading = document.createElement("strong");
  heading.textContent = item.title;

  const sub = document.createElement("span");
  sub.textContent = item.subtitle || "Open article";

  inner.appendChild(heading);
  inner.appendChild(sub);
  link.appendChild(inner);

  return link;
}

function createPhotoFrame(item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = buildFrameClasses(item);
  button.style.setProperty("--frame-rotate", `${item.rotate || 0}deg`);
  button.setAttribute("data-gallery-open", "true");
  button.setAttribute("data-embed-url", item.src);
  button.setAttribute("data-media-type", "photo");
  button.setAttribute("aria-label", item.title);

  const inner = document.createElement("div");
  inner.className = "gallery-frame-inner";

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.title;
  img.loading = "lazy";

  inner.appendChild(img);
  button.appendChild(inner);

  const label = document.createElement("span");
  label.className = "gallery-frame-label";
  label.textContent = item.title;
  button.appendChild(label);

  return button;
}

function createLiveEmbedFrame(item) {
  const article = document.createElement("article");
  article.className = buildFrameClasses(item);
  article.style.setProperty("--frame-rotate", `${item.rotate || 0}deg`);

  const inner = document.createElement("div");
  inner.className = "gallery-frame-inner gallery-frame-inner-live";

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${item.id}`;
  iframe.title = item.title;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";

  inner.appendChild(iframe);
  article.appendChild(inner);

  const label = document.createElement("span");
  label.className = "gallery-frame-label";
  label.textContent = item.title;
  article.appendChild(label);

  return article;
}

function buildFrameClasses(item) {
  return [
    "gallery-frame",
    `gallery-frame--${item.frame}`,
    `gallery-span-${item.size}`,
  ].join(" ");
}

function renderGalleryWall() {
  const wall = document.getElementById("gallery-wall");
  if (!wall) return;

  GALLERY_MEDIA.forEach((item) => {
    let node;

    switch (item.type) {
      case "youtube":
        if (item.size === "lg") {
          node = createLiveEmbedFrame(item);
        } else {
          node = createThumbFrame(
            item,
            youtubeThumb(item.id),
            youtubeEmbed(item.id),
            `https://www.youtube.com/watch?v=${item.id}`
          );
        }
        break;
      case "hudl":
        node = createThumbFrame(
          item,
          GALLERY_THUMBS.hudl,
          hudlEmbed(item.id),
          hudlUrl(item.id)
        );
        break;
      case "instagram":
        node = createThumbFrame(
          item,
          GALLERY_THUMBS.instagram,
          instagramEmbed(item),
          instagramPath(item)
        );
        break;
      case "link":
        node = createLinkFrame(item);
        break;
      case "photo":
        node = createPhotoFrame(item);
        break;
      default:
        return;
    }

    wall.appendChild(node);
  });
}

function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const content = document.getElementById("gallery-lightbox-content");
  const closeBtn = document.querySelector(".gallery-lightbox-close");
  if (!lightbox || !content) return;

  const close = () => {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    content.innerHTML = "";
    document.body.classList.remove("gallery-lightbox-open");
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-gallery-open]");
    if (!trigger) return;

    const embedUrl = trigger.getAttribute("data-embed-url");
    const mediaType = trigger.getAttribute("data-media-type");
    if (!embedUrl) return;

    content.innerHTML = "";

    if (mediaType === "photo") {
      const img = document.createElement("img");
      img.src = embedUrl;
      img.alt = trigger.getAttribute("aria-label") || "Gallery photo";
      content.appendChild(img);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = trigger.getAttribute("aria-label") || "Gallery media";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      content.appendChild(iframe);
    }

    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-lightbox-open");
  });

  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
      close();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderGalleryWall();
  initGalleryLightbox();
});
