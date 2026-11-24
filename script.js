const output = document.getElementById("output");

// Show loading row
output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

function createPromise() {
  const delay = Math.floor(Math.random() * 2000) + 1000; // 1‑3 s
  return new Promise(resolve => {
    setTimeout(() => resolve(delay / 1000), delay);
  });
}

// Kick off three promises
Promise.all([createPromise(), createPromise(), createPromise()])
  .then(rawResults => {
    // 1️⃣ Round each result to 3 decimals
    const results = rawResults.map(v => Number(v.toFixed(3)));

    // 2️⃣ Find the longest (max) from the rounded list
    const totalTime = Math.max(...results);

    // 3️⃣ Build the table rows (no extra spaces)
    let rows = '';
    results.forEach((time, idx) => {
      rows += `<tr><td>Promise ${idx + 1}</td><td>${time.toFixed(3)}</td></tr>`;
    });
    rows += `<tr><td>Total</td><td>${totalTime.toFixed(3)}</td></tr>`;

    // 4️⃣ Replace the loading row with the final rows
    output.innerHTML = rows;
  })
  .catch(console.error);