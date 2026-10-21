const params = new URLSearchParams(window.location.search);
const topicId = params.get("id");

const topic = topics.find(function (t) {
  return t.id === topicId;
});

const content = document.getElementById("topic-content");

if (!topic) {
  content.innerHTML = `
    <p>این موضوع پیدا نشد.</p>
    <a href="index.html#topics" class="back-link">→ بازگشت به موضوع‌ها</a>
  `;
} else {
  document.title = topic.title + " | گفتگوی انگلیسی";

  const sections = [
    { title: "جواب نمونه", body: topic.sampleAnswer }
  ].filter(function (section) {
    return section.body;
  });

  const sectionsHtml = sections
    .map(function (section) {
      return `
        <div class="accordion-item">
          <button class="accordion-header">
            <span>${section.title}</span>
            <span class="arrow">▾</span>
          </button>
          <div class="accordion-body" dir="ltr">
            <p>${section.body}</p>
          </div>
        </div>
      `;
    })
    .join("");

  content.innerHTML = `
    <a href="index.html#topics" class="back-link">→ بازگشت به موضوع‌ها</a>
    <span class="level">${topic.level}</span>
    <h1 dir="ltr">${topic.title}</h1>
    <p class="topic-question" dir="ltr">${topic.question}</p>
    <div class="accordion">${sectionsHtml}</div>
  `;

  document.querySelectorAll(".accordion-header").forEach(function (header) {
    header.addEventListener("click", function () {
      header.parentElement.classList.toggle("open");
    });
  });
}