// Demo answers for the security agent
const demoAnswers = {
    "Does the data connect to an external source?":
        "Yes, some datasets are connected to external sources such as SQL databases, APIs, or cloud storage. You can review your data connections in the workspace settings.",
    "Does someone connect to my data?":
        "Access to your data is monitored. You can check workspace and sharing permissions to see who can view or edit your data assets. For more details, see the audit logs.",
    "Which data has a sensitivity label (or any other label type)?":
        "Several datasets have sensitivity labels. To view or manage labels, go to the dataset's settings or use the Data Protection module. You can also review compliance reports for detailed labeling."
};

function addMessageToChat(who, text) {
    const chatArea = document.getElementById('chatArea');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
        <span class="${who === 'You' ? 'chat-user' : 'chat-agent'}">
            ${who === 'You' ? 'You:' : 'Agent:'}
        </span>
        <span class="chat-bubble">${text}</span>
    `;
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function agentResponse(question) {
    // Use demo answers, otherwise generic response
    return demoAnswers[question] || "Sorry, I don't have an answer for that yet.";
}

document.querySelectorAll('.suggested-question').forEach(el => {
    el.addEventListener('click', () => {
        const question = el.getAttribute('data-question');
        addMessageToChat("You", question);
        setTimeout(() => {
            addMessageToChat("Agent", agentResponse(question));
        }, 500);
    });
});

document.getElementById('sendBtn').addEventListener('click', sendQuestion);
document.getElementById('questionInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendQuestion();
});

function sendQuestion() {
    const input = document.getElementById('questionInput');
    const question = input.value.trim();
    if (!question) return;
    addMessageToChat("You", question);
    input.value = '';
    setTimeout(() => {
        addMessageToChat("Agent", agentResponse(question));
    }, 500);
}