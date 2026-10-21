const cardsContainer = document.getElementById("cards");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderTopics(list) {
  if (list.length === 0) {
    cardsContainer.innerHTML = "<p>موضوعی برای این سطح پیدا نشد.</p>";
    return;
  }

  cardsContainer.innerHTML = list
    .map(function (topic) {
      return `
        <a href="topic.html?id=${topic.id}" class="card">
          <span class="level">${topic.level}</span>
          <h3 dir="ltr">${topic.title}</h3>
          <p dir="ltr">${topic.question}</p>
        </a>
      `;
    })
    .join("");
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    const level = button.dataset.level;

    if (level === "all") {
      renderTopics(topics);
    } else {
      renderTopics(
        topics.filter(function (topic) {
          return topic.level === level;
        })
      );
    }
  });
});

renderTopics(topics);