/* ==========================================================================
   feureau.github.io — progressive enhancements.

   Loaded as a classic script (not a module) so the site also works when the
   pages are opened straight from disk. Everything here is optional: with
   JavaScript disabled the site stays complete and readable.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var toArray = function (list) {
    return Array.prototype.slice.call(list);
  };

  /* 1. Current year in the footer ---------------------------------------- */

  toArray(document.querySelectorAll("[data-year]")).forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* 2. Mobile menu -------------------------------------------------------
     The open/closed state is pure CSS; this only closes the menu after a
     link inside it is used, so the next page is not covered by it. */

  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    siteNav.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.tagName === "A" && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  }

  /* 3. Blog tag filter ---------------------------------------------------- */

  var filterBar = document.querySelector("[data-tag-filter]");
  var postList = document.querySelector("[data-post-list]");

  if (filterBar && postList) {
    var buttons = toArray(filterBar.querySelectorAll("[data-tag]"));
    var posts = toArray(postList.querySelectorAll("[data-tags]"));
    var status = filterBar.querySelector("[data-filter-status]");

    var applyFilter = function (tag, announce) {
      var shown = 0;

      posts.forEach(function (post) {
        var tags = (post.getAttribute("data-tags") || "").split(/\s+/);
        var visible = tag === "all" || tags.indexOf(tag) !== -1;
        post.hidden = !visible;
        if (visible) {
          shown += 1;
        }
      });

      buttons.forEach(function (button) {
        var active = button.getAttribute("data-tag") === tag;
        if (active) {
          button.classList.add("is-active");
        } else {
          button.classList.remove("is-active");
        }
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      /* Only announce a change the reader actually asked for; writing the
         status on load would have screen readers announce it unprompted. */
      if (status && announce) {
        status.textContent =
          "Showing " + shown + " of " + posts.length + " posts.";
      }
    };

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyFilter(button.getAttribute("data-tag"), true);
      });
    });

    applyFilter("all");
  }

})();
