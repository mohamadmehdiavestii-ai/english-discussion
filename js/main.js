const cardsContainer = document.getElementById("cards");

function renderTopics() {
  cardsContainer.innerHTML = topics
    .map(function (topic) {
      return `
        <a href="#" class="card">
          <span class="level">${topic.level}</span>
          <h3 dir="ltr">${topic.title}</h3>
          <p dir="ltr">${topic.question}</p>
        </a>
      `;
    })
    .join("");
}

renderTopics();