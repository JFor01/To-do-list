// Same origin when served by Express (express.static). If you open the file
// from somewhere else, set this to 'http://localhost:3000' and enable CORS.
const API_BASE = '';

const list = document.getElementById('tasks');
const status = document.getElementById('status');
const summary = document.getElementById('summary');

function showStatus(text, isError = false) {
    status.textContent = text;
    status.className = 'message' + (isError ? ' error' : '');
    status.hidden = !text;
}

function updateSummary(tasks) {
    const done = tasks.filter(t => t.done).length;
    summary.textContent = tasks.length ? `${done} of ${tasks.length} done` : '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `Mark "${task.description}" as done`);

    const description = document.createElement('span');
    description.className = 'description';
    description.textContent = task.description; // textContent avoids HTML injection

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = task.done ? 'Done' : 'To do';

    checkbox.addEventListener('change', async () => {
        const newDone = checkbox.checked;
        li.classList.add('busy');
        checkbox.disabled = true;
        try {
            const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: newDone }),
            });
            if (!res.ok) throw new Error(`Server responded ${res.status}`);
            task.done = newDone;
            li.classList.toggle('done', newDone);
            badge.textContent = newDone ? 'Done' : 'To do';
            updateSummary(currentTasks);
            showStatus('');
        } catch (err) {
            checkbox.checked = !newDone; // revert on failure
            showStatus(`Could not update task: ${err.message}`, true);
        } finally {
            li.classList.remove('busy');
            checkbox.disabled = false;
        }
    });

    li.append(checkbox, description, badge);
    return li;
}

let currentTasks = [];

async function loadTasks() {
    try {
        const res = await fetch(`${API_BASE}/tasks`);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        currentTasks = await res.json();

        list.replaceChildren(...currentTasks.map(renderTask));
        updateSummary(currentTasks);
        showStatus(currentTasks.length ? '' : 'No tasks yet. Add one with a POST /tasks request.');
    } catch (err) {
        showStatus(`Could not load tasks: ${err.message}`, true);
    }
}

loadTasks();