(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "باز کردن فهرست");
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "باز کردن فهرست" : "بستن فهرست");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const filters = [...document.querySelectorAll("[data-filter]")];
  const products = [...document.querySelectorAll("[data-product-card]")];
  const productCount = document.querySelector("#product-count");

  const updateCatalog = (collection) => {
    let visibleCount = 0;

    products.forEach((product) => {
      const collections = product.dataset.collection.split(/\s+/);
      const isVisible = collection === "all" || collections.includes(collection);
      product.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    filters.forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter.dataset.filter === collection));
    });

    if (productCount) {
      productCount.textContent = `${visibleCount.toLocaleString("fa-IR")} مدل تصویردار`;
    }
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => updateCatalog(filter.dataset.filter));
  });

  const year = document.querySelector("#year");
  if (year) {
    year.textContent = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(new Date());
  }
})();
