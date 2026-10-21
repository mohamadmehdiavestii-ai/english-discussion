const params = new URLSearchParams(window.location.search);
const topicId = params.get("id");

const topic = topics.find(function (t) {
  return t.id === topicId;
});

const content = document.getElementById("topic-content");

function renderSampleAnswer(text) {
  return `<p dir="ltr">${text}</p>`;
}

function renderVocabulary(list) {
  const items = list
    .map(function (item) {
      return `
        <li class="vocab-item">
          <div class="vocab-top">
            <span class="vocab-word" dir="ltr">${item.word}</span>
            <span class="vocab-meaning">${item.meaning}</span>
          </div>
          <p class="vocab-example" dir="ltr">${item.example}</p>
        </li>
      `;
    })
    .join("");

  return `<ul class="vocab-list">${items}</ul>`;
}

function renderPhrases(list) {
  const items = list
    .map(function (phrase) {
      return `<li dir="ltr">${phrase}</li>`;
    })
    .join("");

  return `<ul class="phrase-list">${items}</ul>`;
}

if (!topic) {
  content.innerHTML = `
    <p>این موضوع پیدا نشد.</p>
    <a href="index.html#topics" class="back-link">→ بازگشت به موضوع‌ها</a>
  `;
} else {
  document.title = topic.title + " | گفتگوی انگلیسی";

  const sections = [
    {
      title: "جواب نمونه",
      html: topic.sampleAnswer ? renderSampleAnswer(topic.sampleAnswer) : ""
    },
    {
      title: "لغات کلیدی",
      html: topic.vocabulary ? renderVocabulary(topic.vocabulary) : ""
    },
    {
      title: "جمله‌های آماده",
      html: topic.phrases ? renderPhrases(topic.phrases) : ""
    }
  ].filter(function (section) {
    return section.html;
  });

  const sectionsHtml = sections
    .map(function (section) {
      return `
        <div class="accordion-item">
          <button class="accordion-header">
            <span>${section.title}</span>
            <span class="arrow">▾</span>
          </button>
          <div class="accordion-body">
            ${section.html}
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