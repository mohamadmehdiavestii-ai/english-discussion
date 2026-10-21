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

  content.innerHTML = `
    <a href="index.html#topics" class="back-link">→ بازگشت به موضوع‌ها</a>
    <span class="level">${topic.level}</span>
    <h1 dir="ltr">${topic.title}</h1>
    <p class="topic-question" dir="ltr">${topic.question}</p>
  `;
}